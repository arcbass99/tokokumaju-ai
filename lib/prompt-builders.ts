import type { AIStrategy, BusinessBrief } from "@/lib/schemas";

export function buildAnalyzeBriefPrompt(brief: BusinessBrief) {
  return `
Anda adalah AI strategist untuk UMKM Indonesia.

Analisis brief usaha berikut. Jangan membuat website dulu.

Tugas Anda:
1. Tentukan positioning usaha.
2. Tentukan target pelanggan paling masuk akal.
3. Rumuskan value proposition yang jelas.
4. Tentukan CTA utama sesuai targetGoal.
5. Sarankan struktur landing page.
6. Sebutkan informasi yang masih kurang.
7. Sebutkan risiko jika copy terlalu berlebihan atau klaim tidak didukung data.
8. Beri saran peningkatan brief.

Aturan penting:
- Gunakan Bahasa Indonesia natural.
- Jangan mengarang fakta.
- Jangan membuat klaim seperti nomor satu, terbaik, terpercaya sejak tahun tertentu, rating tertentu, atau jumlah pelanggan tertentu jika tidak ada di brief.
- Jika data kurang, sebutkan sebagai missingInformation.
- Output wajib JSON valid.
- Jangan bungkus output dengan markdown.
- Jangan menambahkan komentar di luar JSON.

Format output wajib:
{
  "positioning": "string",
  "targetAudience": "string",
  "valueProposition": "string",
  "mainCTA": "string",
  "recommendedStructure": ["string"],
  "missingInformation": ["string"],
  "riskNotes": ["string"],
  "improvementSuggestions": ["string"]
}

Brief:
${JSON.stringify(brief, null, 2)}
`;
}

export function buildGenerateSitePrompt(brief: BusinessBrief, strategy: AIStrategy) {
  return `
Anda adalah UI/UX designer, conversion copywriter, dan brand strategist untuk UMKM Indonesia.

Buat konten landing page dan marketing kit berdasarkan BusinessBrief dan AIStrategy.
Jangan membuat HTML.
Output wajib JSON valid sesuai format yang ditentukan.

Prioritas:
1. Mobile-first.
2. CTA jelas sesuai targetGoal.
3. Copy natural, spesifik, dan tidak generik.
4. Jangan mengarang testimoni, rating, jumlah pelanggan, sertifikasi, atau fakta lain yang tidak diberikan user.
5. Jika data kurang, gunakan wording aman seperti "cocok untuk..." bukan klaim palsu.
6. Buat section yang ringkas tetapi meyakinkan.
7. Buat marketing copy siap pakai untuk WhatsApp, Instagram, dan Google Business Profile.
8. Beri qualityScore 0-100 untuk clarity, conversion, trust, mobileReadiness, completeness.
9. Gunakan Bahasa Indonesia.
10. Jangan menambahkan komentar di luar JSON.

Format output wajib:
{
  "brandStrategy": {
    "positioning": "string",
    "targetAudience": "string",
    "valueProposition": "string",
    "mainCTA": "string"
  },
  "designTokens": {
    "headingFont": "string",
    "bodyFont": "string",
    "primaryColor": "hex color string",
    "secondaryColor": "hex color string",
    "accentColor": "hex color string",
    "backgroundColor": "hex color string",
    "textColor": "hex color string",
    "radius": "none | small | medium | large | full",
    "styleDirection": "string"
  },
  "sections": {
    "hero": {
      "headline": "string",
      "subheadline": "string",
      "primaryCTA": "string",
      "secondaryCTA": "string"
    },
    "highlights": [
      {
        "title": "string",
        "description": "string"
      }
    ],
    "products": [
      {
        "name": "string",
        "description": "string",
        "price": "string"
      }
    ],
    "whyChooseUs": [
      {
        "title": "string",
        "description": "string"
      }
    ],
    "trustSignals": ["string"],
    "location": {
      "title": "string",
      "description": "string",
      "mapsUrl": "string",
      "operatingHours": "string"
    },
    "faq": [
      {
        "question": "string",
        "answer": "string"
      }
    ],
    "finalCTA": {
      "headline": "string",
      "description": "string",
      "buttonText": "string"
    }
  },
  "marketingCopy": {
    "whatsappBroadcast": "string",
    "instagramCaption": "string",
    "instagramBio": "string",
    "googleBusinessDescription": "string",
    "faqForCustomers": [
      {
        "question": "string",
        "answer": "string"
      }
    ],
    "alternativeTaglines": ["string"],
    "alternativeCTAs": ["string"]
  },
  "qualityScore": {
    "clarity": 0,
    "conversion": 0,
    "trust": 0,
    "mobileReadiness": 0,
    "completeness": 0,
    "suggestions": ["string"]
  }
}

BusinessBrief:
${JSON.stringify(brief, null, 2)}

AIStrategy:
${JSON.stringify(strategy, null, 2)}
`;
}