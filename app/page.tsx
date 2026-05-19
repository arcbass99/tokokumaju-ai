import Link from "next/link";
import { DemoBriefButton } from "@/components/home/DemoBriefButton";
import { kueRinaDemoBrief } from "@/data/demo-briefs";

const problems = [
  "UMKM punya produk bagus, tapi tidak tahu cara mengemasnya secara digital.",
  "Promosi WhatsApp dan Instagram sering seadanya, tanpa struktur copy yang jelas.",
  "Website builder biasa masih terasa teknis untuk pemilik usaha non-coding.",
  "Calon pelanggan sering tidak langsung paham apa yang dijual, kenapa harus percaya, dan bagaimana cara membeli.",
];

const outputs = [
  "Landing page mobile-friendly",
  "Strategi positioning usaha",
  "Value proposition dan CTA utama",
  "WhatsApp broadcast",
  "Caption dan bio Instagram",
  "FAQ pelanggan",
  "Deskripsi Google Business Profile",
  "Quality score",
  "File HTML siap unduh",
];

const steps = [
  {
    title: "1. Ceritakan Usaha",
    body: "User mengisi Smart Brief sederhana tentang produk, harga, lokasi, kontak, tujuan website, dan gaya brand.",
  },
  {
    title: "2. Gemini Susun Strategi",
    body: "AI Strategist membantu merumuskan positioning, target pelanggan, value proposition, CTA, dan struktur landing page.",
  },
  {
    title: "3. Review Website",
    body: "TokokuMaju AI merender landing page dari JSON terstruktur, lalu user bisa melihat preview mobile, tablet, dan desktop.",
  },
  {
    title: "4. Ambil Marketing Kit",
    body: "User mendapat copy WhatsApp, caption Instagram, FAQ, quality score, dan file HTML yang bisa diunduh.",
  },
];

const uniqueness = [
  {
    title: "Bukan sekadar website generator",
    body: "Aplikasi ini membantu menyusun strategi brand, copywriting, dan marketing kit, bukan hanya membuat tampilan halaman.",
  },
  {
    title: "Dibuat untuk UMKM Indonesia",
    body: "Bahasa, contoh input, alur, dan output dibuat untuk pemilik usaha lokal yang tidak harus paham istilah teknis.",
  },
  {
    title: "Output AI lebih terkendali",
    body: "Gemini menghasilkan data terstruktur, lalu aplikasi merender website agar hasil lebih konsisten dan aman.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute right-0 top-40 h-[360px] w-[360px] rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-200">
              AI co-builder untuk UMKM non-teknis
            </div>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              Dari cerita usaha ke website dan paket promosi siap pakai.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
              TokokuMaju AI membantu UMKM Indonesia membuat landing page,
              strategi brand, copy WhatsApp, caption Instagram, FAQ, dan file
              HTML hanya dari brief sederhana berbahasa Indonesia.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/brief"
                className="rounded-full bg-white px-6 py-3 text-center font-semibold text-neutral-950 transition hover:bg-neutral-200"
              >
                Mulai dari Brief Sendiri
              </Link>

              <DemoBriefButton brief={kueRinaDemoBrief} />
            </div>

            <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-400">
              Mode demo akan mengisi contoh usaha “Kue Rina Homemade” agar kamu
              bisa langsung melihat alur AI Strategist, website preview,
              marketing kit, dan export.
            </p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            <MetricCard label="Problem" value="UMKM sulit go digital" />
            <MetricCard label="Solution" value="Brief → Strategy → Website" />
            <MetricCard label="Output" value="Website + Marketing Kit" />
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Problem"
            title="Produk bagus sering kalah karena kemasan digitalnya belum jelas."
            description="Banyak pemilik UMKM tidak butuh sistem rumit. Mereka butuh cara cepat untuk menjelaskan usaha, membangun kepercayaan, dan mengarahkan calon pelanggan untuk membeli."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {problems.map((problem) => (
              <div
                key={problem}
                className="rounded-3xl border border-white/10 bg-neutral-950/70 p-6"
              >
                <p className="leading-7 text-neutral-300">{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Solution"
            title="TokokuMaju AI mengubah brief sederhana menjadi aset digital."
            description="User tidak perlu memikirkan struktur landing page, copywriting, CTA, atau desain dari nol. Gemini membantu menyusun strategi, lalu aplikasi merender hasilnya menjadi website dan marketing kit."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {steps.map((step) => (
              <div
                key={step.title}
                className="rounded-3xl border border-white/10 bg-white/[0.05] p-6"
              >
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 leading-7 text-neutral-300">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-900 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Output"
            title="Bukan hanya halaman website. User mendapat satu paket digital."
            description="Hasil akhirnya dirancang agar langsung bisa dipakai untuk promosi, chat pelanggan, dan publikasi sederhana."
          />

          <div className="mt-10 flex flex-wrap gap-3">
            {outputs.map((output) => (
              <span
                key={output}
                className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-neutral-200"
              >
                {output}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Uniqueness"
            title="Dibangun sebagai AI co-builder, bukan generator template biasa."
            description="Keunggulan TokokuMaju AI ada pada alur berpikirnya: mulai dari memahami usaha, menyusun strategi, membuat website, lalu memberi marketing kit dan quality score."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {uniqueness.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.05] p-6"
              >
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-7 text-neutral-300">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.03] px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
              Demo Story
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Bu Rina punya usaha kue rumahan. TokokuMaju AI bantu ia tampil
              lebih siap jual.
            </h2>

            <p className="mt-5 leading-8 text-neutral-300">
              Dalam demo, Kue Rina Homemade diubah dari brief sederhana menjadi
              strategi usaha, landing page, marketing kit, quality score, dan
              file HTML yang bisa diunduh.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <DemoBriefButton brief={kueRinaDemoBrief} />

              <Link
                href="/brief"
                className="rounded-full bg-white px-6 py-3 text-center font-semibold text-neutral-950 transition hover:bg-neutral-200"
              >
                Buat Brief Sendiri
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-neutral-950 p-6 shadow-2xl">
            <div className="rounded-3xl bg-white p-6 text-neutral-950">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Contoh Brief
              </p>

              <h3 className="mt-4 text-3xl font-semibold tracking-tight">
                Kue Rina Homemade
              </h3>

              <p className="mt-4 leading-7 text-neutral-600">
                Brownies kukus, bolu pandan, risoles mayo, pastel isi, dan
                snack box untuk arisan, kantor, ulang tahun, atau acara
                keluarga.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  "Tujuan: Pesan produk lewat WhatsApp",
                  "Vibe: Ramah dan hangat",
                  "Tone: Hangat kekeluargaan",
                  "Output: Website + Marketing Kit",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-neutral-100 px-4 py-3 text-sm font-semibold text-neutral-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-neutral-400 md:flex-row md:items-center md:justify-between">
          <p>TokokuMaju AI by Nafis — dari cerita usaha ke aset digital siap pakai.</p>

          <div className="flex gap-4">
            <Link href="/brief" className="hover:text-white">
              Smart Brief
            </Link>
            <Link href="/strategy" className="hover:text-white">
              AI Strategist
            </Link>
            <Link href="/preview" className="hover:text-white">
              Preview
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h2>

      <p className="mt-5 leading-8 text-neutral-300">{description}</p>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
        {label}
      </p>

      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}