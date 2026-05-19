import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient, getGeminiModel } from "@/lib/gemini";
import { buildGenerateSitePrompt } from "@/lib/prompt-builders";
import { checkRateLimit } from "@/lib/rate-limit";
import { classifyGeminiError, isDemoBriefName } from "@/lib/gemini-error";
import { kueRinaDemoGeneratedSite } from "@/data/demo-results";
import type { AIStrategy, BusinessBrief, GeneratedSite } from "@/lib/schemas";

export const runtime = "nodejs";

function isValidGeneratedSite(value: unknown): value is GeneratedSite {
  if (!value || typeof value !== "object") return false;

  const data = value as Partial<GeneratedSite>;

  if (
    !data.brandStrategy ||
    !data.designTokens ||
    !data.sections ||
    !data.marketingCopy ||
    !data.qualityScore
  ) {
    return false;
  }

  return (
    typeof data.brandStrategy === "object" &&
    typeof data.designTokens === "object" &&
    typeof data.sections === "object" &&
    typeof data.marketingCopy === "object" &&
    typeof data.qualityScore === "object"
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
    const rateLimit = await checkRateLimit(request, "generate-site");

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: "Terlalu banyak request.",
          detail:
            "Generator website sedang dibatasi agar kuota demo tetap aman. Coba lagi beberapa menit lagi.",
          hint:
            "Jika hasil website sudah pernah dibuat, refresh halaman tidak akan menghapusnya karena tersimpan di browser.",
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

    const body = (await request.json()) as {
      brief?: BusinessBrief;
      strategy?: AIStrategy;
    };

    brief = body.brief ?? null;
    const strategy = body.strategy;

    if (!brief || !strategy) {
      return NextResponse.json(
        {
          error: "Brief dan strategy wajib dikirim.",
          detail:
            "Endpoint generate-site membutuhkan body berisi brief dan strategy.",
        },
        { status: 400 }
      );
    }

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

    if (
      !strategy.positioning?.trim() ||
      !strategy.targetAudience?.trim() ||
      !strategy.valueProposition?.trim() ||
      !strategy.mainCTA?.trim()
    ) {
      return NextResponse.json(
        {
          error: "Strategy belum lengkap.",
          detail:
            "Strategy wajib punya positioning, targetAudience, valueProposition, dan mainCTA.",
        },
        { status: 400 }
      );
    }

    const ai = getGeminiClient();

    const response = await ai.models.generateContent({
      model,
      contents: buildGenerateSitePrompt(brief, strategy),
      config: {
        responseMimeType: "application/json",
        temperature: 0.35,
      },
    });

    const text = response.text;

    if (!text) {
      if (isDemoBriefName(brief.businessName)) {
        return NextResponse.json({
          ...kueRinaDemoGeneratedSite,
          _fallback: true,
        });
      }

      return NextResponse.json(
        {
          error: "AI tidak mengembalikan respons.",
          detail:
            "Gemini tidak mengembalikan teks website. Coba ulangi beberapa saat lagi.",
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
          ...kueRinaDemoGeneratedSite,
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

    if (!isValidGeneratedSite(parsed)) {
      if (isDemoBriefName(brief.businessName)) {
        return NextResponse.json({
          ...kueRinaDemoGeneratedSite,
          _fallback: true,
        });
      }

      return NextResponse.json(
        {
          error: "Format respons AI belum sesuai.",
          detail:
            "Respons berhasil dibaca, tetapi struktur website belum lengkap.",
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

    console.error("Generate site error:", {
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
        ...kueRinaDemoGeneratedSite,
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