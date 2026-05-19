import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient, getGeminiModel } from "@/lib/gemini";
import { buildAnalyzeBriefPrompt } from "@/lib/prompt-builders";
import { checkRateLimit } from "@/lib/rate-limit";
import { classifyGeminiError, isDemoBriefName } from "@/lib/gemini-error";
import { kueRinaDemoStrategy } from "@/data/demo-results";
import type { AIStrategy, BusinessBrief } from "@/lib/schemas";

export const runtime = "nodejs";

function isValidStrategy(value: unknown): value is AIStrategy {
  if (!value || typeof value !== "object") return false;

  const data = value as Partial<AIStrategy>;

  return (
    typeof data.positioning === "string" &&
    typeof data.targetAudience === "string" &&
    typeof data.valueProposition === "string" &&
    typeof data.mainCTA === "string" &&
    Array.isArray(data.recommendedStructure) &&
    Array.isArray(data.missingInformation) &&
    Array.isArray(data.riskNotes) &&
    Array.isArray(data.improvementSuggestions)
  );
}

function parseGeminiJson(text: string) {
  const cleaned = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  return JSON.parse(cleaned);
}

export async function POST(request: NextRequest) {
  const model = getGeminiModel();

  let brief: BusinessBrief | null = null;

  try {
    const rateLimit = await checkRateLimit(request, "analyze-brief");

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: "Terlalu banyak request.",
          detail:
            "AI Strategist sedang dibatasi agar kuota demo tetap aman. Coba lagi beberapa menit lagi.",
          hint:
            "Jika sedang mencoba demo, gunakan hasil yang sudah tersimpan atau tunggu sampai rate limit reset.",
          reset: rateLimit.reset,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": String(rateLimit.limit),
            "X-RateLimit-Remaining": String(rateLimit.remaining),
            "X-RateLimit-Reset": String(rateLimit.reset),
          },
        }
      );
    }

    brief = (await request.json()) as BusinessBrief;

    if (
      !brief.businessName?.trim() ||
      !brief.category?.trim() ||
      !brief.featuredProducts?.trim() ||
      !brief.whatsapp?.trim()
    ) {
      return NextResponse.json(
        {
          error: "Brief belum lengkap.",
          detail:
            "Nama usaha, kategori, produk/jasa unggulan, dan WhatsApp wajib diisi.",
        },
        { status: 400 }
      );
    }

    const ai = getGeminiClient();

    const response = await ai.models.generateContent({
      model,
      contents: buildAnalyzeBriefPrompt(brief),
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const text = response.text;

    if (!text) {
      if (isDemoBriefName(brief.businessName)) {
        return NextResponse.json({
          ...kueRinaDemoStrategy,
          _fallback: true,
        });
      }

      return NextResponse.json(
        {
          error: "AI tidak mengembalikan respons.",
          detail:
            "Gemini tidak mengembalikan teks analisis. Coba ulangi beberapa saat lagi.",
          hint:
            "Jika memakai free tier, kemungkinan model sedang sibuk atau kuota sedang terbatas.",
          model,
        },
        { status: 502 }
      );
    }

    let parsed: unknown;

    try {
      parsed = parseGeminiJson(text);
    } catch {
      if (isDemoBriefName(brief.businessName)) {
        return NextResponse.json({
          ...kueRinaDemoStrategy,
          _fallback: true,
        });
      }

      return NextResponse.json(
        {
          error: "Respons AI tidak bisa dibaca.",
          detail:
            "Gemini mengembalikan respons yang bukan JSON valid. Coba lagi beberapa saat lagi.",
          hint:
            "Ini bisa terjadi saat model tidak mengikuti format output. Request berikutnya biasanya bisa berhasil.",
          model,
        },
        { status: 502 }
      );
    }

    if (!isValidStrategy(parsed)) {
      if (isDemoBriefName(brief.businessName)) {
        return NextResponse.json({
          ...kueRinaDemoStrategy,
          _fallback: true,
        });
      }

      return NextResponse.json(
        {
          error: "Format respons AI belum sesuai.",
          detail:
            "Respons berhasil dibaca, tetapi struktur strateginya belum lengkap.",
          hint:
            "Coba ulangi request. Jika sering terjadi, prompt/schema perlu diperketat.",
          model,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    const friendly = classifyGeminiError(error);

    console.error("Analyze brief error:", {
      model,
      friendly,
      raw: friendly.raw,
    });

    if (
      brief &&
      isDemoBriefName(brief.businessName) &&
      (friendly.kind === "high-demand" || friendly.kind === "quota-exceeded")
    ) {
      return NextResponse.json({
        ...kueRinaDemoStrategy,
        _fallback: true,
      });
    }

    return NextResponse.json(
      {
        error: friendly.error,
        detail: friendly.detail,
        hint: friendly.hint,
        retryable: friendly.retryable,
        model,
      },
      { status: friendly.kind === "quota-exceeded" ? 429 : 503 }
    );
  }
}