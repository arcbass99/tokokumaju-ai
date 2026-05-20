# TokokuMaju AI

**Dari cerita usaha ke website dan paket promosi siap pakai.**

TokokuMaju AI adalah AI co-builder untuk membantu UMKM Indonesia membuat landing page, strategi brand, copy promosi, dan marketing kit hanya dari brief sederhana berbahasa Indonesia.

Live demo: https://tokokumaju-ai.vercel.app

---

## Problem

Banyak UMKM kecil di Indonesia punya produk atau jasa yang layak jual, tetapi belum punya kemampuan teknis, biaya, atau pemahaman copywriting untuk membangun kehadiran digital yang rapi.

Masalah yang sering terjadi:

- Calon pelanggan tidak langsung paham apa yang dijual.
- Keunggulan usaha tidak tersampaikan dengan jelas.
- Promosi WhatsApp dan Instagram masih seadanya.
- Pemilik usaha tidak tahu struktur landing page yang efektif.
- Website builder biasa masih terasa teknis untuk user non-coding.
- CTA tidak jelas: pelanggan harus chat, datang, booking, atau pesan ke mana.

TokokuMaju AI mencoba menjembatani masalah itu dengan mengubah cerita usaha menjadi aset digital yang siap digunakan.

---

## Solution

TokokuMaju AI membantu pemilik UMKM melalui tiga tahap utama:

1. **Smart Brief**  
   User mengisi informasi usaha seperti nama bisnis, produk/jasa, harga, lokasi, WhatsApp, metode pembayaran, tujuan website, tone copywriting, dan gaya visual.

2. **AI Strategist**  
   Gemini membantu menganalisis brief menjadi positioning, target pelanggan, value proposition, CTA utama, struktur landing page, risiko klaim berlebihan, dan saran peningkatan.

3. **Review & Export**  
   TokokuMaju AI membuat landing page, marketing kit, quality score, dan file export yang bisa langsung dipakai.

---

## Key Features

- Smart Brief multi-step
- Auto-save brief di browser
- AI Strategist dengan Gemini
- Website generator berbasis structured JSON
- Renderer landing page responsif
- Preview mode: mobile, tablet, desktop
- Marketing Kit:
  - WhatsApp broadcast
  - Caption Instagram
  - Bio Instagram
  - FAQ pelanggan
  - Deskripsi Google Business Profile
  - Alternatif tagline
  - Alternatif CTA
- Quality Score:
  - Clarity
  - Conversion
  - Trust
  - Mobile readiness
  - Completeness
- Export Kit:
  - HTML file
  - Marketing kit text file
  - Project JSON
- Demo mode: Kue Rina Homemade
- Rate limit untuk melindungi kuota API
- Fallback demo agar alur tetap berjalan saat Gemini high demand atau quota free tier habis

---

## Why It Is Different

TokokuMaju AI bukan sekadar website generator.

Aplikasi ini tidak langsung meminta AI membuat HTML mentah. Sebaliknya, Gemini digunakan untuk menyusun strategi dan struktur konten dalam format JSON, lalu aplikasi merender hasilnya menjadi landing page yang lebih konsisten.

Keunikan utama:

- Fokus pada UMKM Indonesia.
- Menggunakan bahasa dan alur yang ramah untuk user non-teknis.
- Menghasilkan website sekaligus marketing kit.
- Menyediakan AI Strategist sebelum website dibuat.
- Menyertakan quality score agar user tahu kekuatan dan kelemahan hasil.
- Memiliki fallback demo agar presentasi tetap bisa berjalan saat model AI sedang penuh.

---

## Demo Story

Contoh demo utama menggunakan usaha fiktif **Kue Rina Homemade**.

Bu Rina menjual kue rumahan dan snack box, tetapi selama ini hanya promosi lewat WhatsApp dan Instagram seadanya. Ia tidak bisa coding dan tidak tahu cara membuat landing page yang meyakinkan.

Dengan TokokuMaju AI, Bu Rina cukup mengisi brief sederhana. Gemini kemudian membantu menyusun strategi brand, target pelanggan, value proposition, dan CTA. Setelah itu, aplikasi membuat landing page, marketing kit, quality score, dan file HTML yang bisa diunduh.

Demo flow:

```txt
Home
→ Coba Demo: Kue Rina Homemade
→ AI Strategist
→ Generate Website
→ Website Review
→ Marketing Kit
→ Export HTML
```

---

## Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI:** Gemini API
- **Deployment:** Vercel
- **Rate Limit:** Upstash Redis + Upstash Ratelimit
- **State Persistence:** Browser localStorage

---

## Architecture

Simplified flow:

```txt
User fills Smart Brief
        ↓
BusinessBrief stored in localStorage
        ↓
/api/analyze-brief
        ↓
Gemini generates AIStrategy JSON
        ↓
AIStrategy stored in localStorage
        ↓
/api/generate-site
        ↓
Gemini generates GeneratedSite JSON
        ↓
React renderer displays landing page
        ↓
User reviews, copies marketing kit, and exports files
```

The app uses server-side API routes so the Gemini API key is never exposed to the browser.

---

## Environment Variables

Create a `.env.local` file:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash

UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

Important:

Do not use `NEXT_PUBLIC_GEMINI_API_KEY`.

The Gemini API key must stay server-side.

---

## Running Locally

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

Build for production:

```bash
npm run build
```

Start production server locally:

```bash
npm run start
```

---

## Main Routes

```txt
/          Landing page aplikasi
/brief     Smart Brief form
/strategy  AI Strategist
/preview   Website Review & Export
```

---

## API Routes

```txt
/api/analyze-brief
```

Analyzes the business brief and returns AI strategy.

```txt
/api/generate-site
```

Generates website content, marketing kit, design tokens, and quality score.

Both API routes use:

- Server-side Gemini API calls
- Rate limiting
- Error handling
- Demo fallback for Kue Rina Homemade

---

## Data Structures

Core app data:

```ts
BusinessBrief
AIStrategy
GeneratedSite
```

The AI does not directly produce final HTML for preview. It produces structured JSON, and the app renders that JSON into a landing page.

This makes the output more consistent, safer, and easier to export.

---

## Resilience Strategy

Gemini free tier or public demo usage may face:

- High demand
- Temporary model unavailability
- Daily quota limit
- Rate limit

TokokuMaju AI handles this with:

- Friendly error messages
- Per-IP rate limiting
- Cached localStorage results
- Static fallback for the Kue Rina demo

This ensures the demo flow can still be shown even when the AI model is temporarily unavailable.

---

## Current Limitations

- No login system yet.
- No database project history yet.
- Image upload is not included yet.
- Export ZIP is not included yet.
- Generated website is exported as standalone HTML, not deployed automatically.
- Free-tier AI usage may hit quota during repeated testing.

These limitations are intentional for MVP scope.

---

## Future Improvements

Possible next improvements:

- Upload logo and product photos.
- Generate ZIP export.
- Save project history with database.
- Add section-level editing.
- Regenerate individual sections.
- Add more demo business categories.
- Add direct publishing flow.
- Add analytics and QR code generation.

---

## Submission Angle

TokokuMaju AI is built around a simple idea:

**UMKM often do not lack good products. They lack a clear digital presentation.**

TokokuMaju AI helps turn local business knowledge into a website, strategy, and marketing kit that can be used immediately.

Tagline:

**Ceritakan usahamu. Biarkan AI merapikan digital presence-mu.**

---

## License

This project is currently developed as a prototype/MVP for learning, demonstration, and competition purposes.