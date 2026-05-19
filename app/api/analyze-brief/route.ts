import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient, getGeminiModel } from "@/lib/gemini";
import { buildAnalyzeBriefPrompt } from "@/lib/prompt-builders";
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

function getSafeErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return "Unknown error";
  }
}

export async function POST(request: NextRequest) {
  const model = getGeminiModel();

  try {
    const brief = (await request.json()) as BusinessBrief;

    if (
      !brief.businessName?.trim() ||
      !brief.category?.trim() ||
      !brief.featuredProducts?.trim() ||
      !brief.whatsapp?.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Brief belum lengkap. Nama usaha, kategori, produk/jasa unggulan, dan WhatsApp wajib diisi.",
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
      return NextResponse.json(
        {
          error: "Gemini tidak mengembalikan respons teks.",
          detail:
            "Respons kosong. Coba ulangi, ganti model, atau periksa status API key.",
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

    if (!isValidStrategy(parsed)) {
      return NextResponse.json(
        {
          error: "Respons Gemini tidak sesuai format AIStrategy.",
          detail:
            "JSON berhasil dibaca, tetapi field wajib seperti positioning, targetAudience, valueProposition, atau array rekomendasi tidak lengkap.",
          raw: parsed,
          model,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    const detail = getSafeErrorMessage(error);

    console.error("Analyze brief error:", {
      model,
      detail,
      error,
    });

    return NextResponse.json(
      {
        error: "Gagal menganalisis brief.",
        detail,
        model,
        hint:
          "Cek .env.local, pastikan GEMINI_API_KEY benar, restart npm run dev setelah mengubah env, dan pastikan model tersedia untuk API key kamu.",
      },
      { status: 500 }
    );
  }
}