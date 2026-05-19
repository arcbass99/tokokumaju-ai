import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient, getGeminiModel } from "@/lib/gemini";
import { buildGenerateSitePrompt } from "@/lib/prompt-builders";
import { checkRateLimit } from "@/lib/rate-limit";
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

function getSafeErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;

  try {
    return JSON.stringify(error);
  } catch {
    return "Unknown error";
  }
}

export async function POST(request: NextRequest) {
  const model = getGeminiModel();

  try {
    const rateLimit = await checkRateLimit(request, "generate-site");

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: "Terlalu banyak request.",
          detail:
            "Generator website sedang dibatasi agar kuota demo tetap aman. Coba lagi beberapa menit lagi.",
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

    const brief = body.brief;
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
      return NextResponse.json(
        {
          error: "Gemini tidak mengembalikan respons teks.",
          detail:
            "Respons kosong. Coba ulangi, ganti model, atau periksa API key.",
          model,
        },
        { status: 502 }
      );
    }

    let parsed: unknown;

    try {
      parsed = parseGeminiJson(text);
    } catch {
      return NextResponse.json(
        {
          error: "Respons Gemini bukan JSON valid.",
          detail:
            "Model mengembalikan teks yang tidak bisa di-parse sebagai JSON.",
          rawText: text.slice(0, 1200),
          model,
        },
        { status: 502 }
      );
    }

    if (!isValidGeneratedSite(parsed)) {
      return NextResponse.json(
        {
          error: "Respons Gemini tidak sesuai format GeneratedSite.",
          detail:
            "JSON berhasil dibaca, tetapi struktur utama GeneratedSite tidak lengkap.",
          raw: parsed,
          model,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    const detail = getSafeErrorMessage(error);

    console.error("Generate site error:", {
      model,
      detail,
      error,
    });

    return NextResponse.json(
      {
        error: "Gagal membuat website.",
        detail,
        model,
        hint:
          "Cek GEMINI_API_KEY, GEMINI_MODEL, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN, quota, koneksi, atau format brief/strategy.",
      },
      { status: 500 }
    );
  }
}