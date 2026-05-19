import type { BusinessBrief } from "@/lib/schemas";

export function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function normalizeIndonesianWhatsApp(value: string) {
  const digits = value.replace(/[^\d]/g, "");

  if (!digits) return "";

  if (digits.startsWith("62")) {
    return digits;
  }

  if (digits.startsWith("0")) {
    return `62${digits.slice(1)}`;
  }

  if (digits.startsWith("8")) {
    return `62${digits}`;
  }

  return digits;
}

export function isLikelyUrl(value: string) {
  if (!value.trim()) return true;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateBusinessBrief(brief: BusinessBrief) {
  const errors: Partial<Record<keyof BusinessBrief, string>> = {};

  if (!normalizeWhitespace(brief.businessName)) {
    errors.businessName = "Nama usaha wajib diisi.";
  }

  if (!normalizeWhitespace(brief.category)) {
    errors.category = "Kategori usaha wajib dipilih.";
  }

  if (brief.category === "Lainnya" && !normalizeWhitespace(brief.customCategory ?? "")) {
    errors.customCategory = "Kategori custom wajib diisi.";
  }

  if (!normalizeWhitespace(brief.featuredProducts)) {
    errors.featuredProducts = "Produk atau jasa unggulan wajib diisi.";
  }

  if (!normalizeWhitespace(brief.whatsapp)) {
    errors.whatsapp = "Nomor WhatsApp wajib diisi.";
  }

  if (brief.mapsUrl && !isLikelyUrl(brief.mapsUrl)) {
    errors.mapsUrl = "Link Google Maps harus berupa URL valid.";
  }

  if (brief.visualVibe === "custom" && !normalizeWhitespace(brief.customVibe ?? "")) {
    errors.customVibe = "Deskripsi vibe custom wajib diisi.";
  }

  return errors;
}

export function getBriefCompletenessScore(brief: BusinessBrief) {
  const checks = [
    Boolean(normalizeWhitespace(brief.businessName)),
    Boolean(normalizeWhitespace(brief.category)),
    Boolean(normalizeWhitespace(brief.featuredProducts)),
    Boolean(normalizeWhitespace(brief.priceRange ?? "")),
    Boolean(normalizeWhitespace(brief.productStrengths ?? "")),
    Boolean(normalizeWhitespace(brief.reasonToChoose ?? "")),
    Boolean(normalizeWhitespace(brief.whatsapp)),
    Boolean(normalizeWhitespace(brief.mapsUrl ?? "")),
    Boolean(normalizeWhitespace(brief.operatingHours ?? "")),
    brief.paymentMethods.length > 0,
    Boolean(brief.targetGoal),
    Boolean(brief.visualVibe),
    Boolean(brief.colorPalette),
    Boolean(brief.copyTone),
  ];

  const passed = checks.filter(Boolean).length;
  return Math.round((passed / checks.length) * 100);
}

export function getBriefSuggestions(brief: BusinessBrief) {
  const suggestions: string[] = [];

  if (!brief.priceRange?.trim()) {
    suggestions.push("Tambahkan kisaran harga agar calon pelanggan lebih cepat mengambil keputusan.");
  }

  if (!brief.reasonToChoose?.trim()) {
    suggestions.push("Tambahkan alasan pelanggan harus memilih usaha ini agar copy lebih meyakinkan.");
  }

  if (!brief.mapsUrl?.trim()) {
    suggestions.push("Tambahkan link Google Maps jika tujuanmu adalah mendatangkan pelanggan ke lokasi.");
  }

  if (!brief.operatingHours?.trim()) {
    suggestions.push("Tambahkan jam operasional agar pelanggan tahu kapan bisa menghubungi atau datang.");
  }

  if (brief.paymentMethods.length === 0) {
    suggestions.push("Pilih minimal satu metode pembayaran agar informasi transaksi lebih jelas.");
  }

  return suggestions;
}