export type GeminiErrorKind =
  | "high-demand"
  | "quota-exceeded"
  | "rate-limited"
  | "api-key"
  | "unknown";

export type FriendlyGeminiError = {
  kind: GeminiErrorKind;
  error: string;
  detail: string;
  hint: string;
  retryable: boolean;
};

function toRawErrorText(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;

  try {
    return JSON.stringify(error);
  } catch {
    return "Unknown error";
  }
}

export function classifyGeminiError(error: unknown): FriendlyGeminiError & {
  raw: string;
} {
  const raw = toRawErrorText(error);
  const lower = raw.toLowerCase();

  if (
    lower.includes("503") ||
    lower.includes("unavailable") ||
    lower.includes("high demand") ||
    lower.includes("overloaded")
  ) {
    return {
      kind: "high-demand",
      error: "AI sedang ramai digunakan.",
      detail:
        "Model Gemini sedang mengalami lonjakan permintaan sementara. Ini biasanya bukan kesalahan input kamu.",
      hint:
        "Coba lagi beberapa saat lagi. Untuk demo Kue Rina Homemade, TokokuMaju AI akan memakai hasil cadangan agar alur tetap bisa ditampilkan.",
      retryable: true,
      raw,
    };
  }

  if (
    lower.includes("429") ||
    lower.includes("resource_exhausted") ||
    lower.includes("quota") ||
    lower.includes("rate limit")
  ) {
    return {
      kind: "quota-exceeded",
      error: "Kuota AI sementara habis.",
      detail:
        "Batas penggunaan Gemini untuk project ini sedang tercapai, kemungkinan karena free tier atau terlalu banyak request.",
      hint:
        "Coba lagi nanti, kurangi generate ulang, atau gunakan demo Kue Rina Homemade dengan hasil cadangan.",
      retryable: true,
      raw,
    };
  }

  if (
    lower.includes("api key") ||
    lower.includes("api_key") ||
    lower.includes("permission") ||
    lower.includes("unauthorized") ||
    lower.includes("forbidden")
  ) {
    return {
      kind: "api-key",
      error: "Konfigurasi API key bermasalah.",
      detail:
        "Server tidak berhasil memakai API key Gemini. Periksa environment variable di Vercel.",
      hint:
        "Pastikan GEMINI_API_KEY tersedia di Vercel dan redeploy project setelah mengubah environment variable.",
      retryable: false,
      raw,
    };
  }

  return {
    kind: "unknown",
    error: "AI gagal memproses permintaan.",
    detail:
      "Terjadi error yang belum dikenali saat menghubungi Gemini.",
    hint:
      "Coba lagi. Jika masih gagal, cek log server atau gunakan mode demo.",
    retryable: true,
    raw,
  };
}

export function isDemoBriefName(value: string | undefined) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .includes("kue rina");
}