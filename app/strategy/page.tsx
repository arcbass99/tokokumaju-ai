import Link from "next/link";
import { StrategyReview } from "@/components/strategy/StrategyReview";
import { WorkflowSteps } from "@/components/ui/WorkflowSteps";

export default function StrategyPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
              Step 2
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              AI Strategist
            </h1>

            <p className="mt-4 max-w-2xl leading-8 text-neutral-300">
              Sebelum membuat website, Gemini membaca brief dan membantu
              merumuskan positioning, target pelanggan, value proposition, CTA,
              serta struktur landing page yang paling masuk akal.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Kembali ke Beranda
          </Link>
        </div>

        <WorkflowSteps activeStep="strategy" />

        <div className="grid gap-4 md:grid-cols-3">
          <InfoCard
            title="Apa yang dinilai AI?"
            body="AI mengecek apakah brief sudah cukup jelas untuk diubah menjadi website dan materi promosi."
          />

          <InfoCard
            title="Kenapa tidak langsung generate?"
            body="Karena website yang bagus butuh arah: siapa targetnya, apa janjinya, dan CTA apa yang harus ditekankan."
          />

          <InfoCard
            title="Apa hasil tahap ini?"
            body="Positioning, target pelanggan, value proposition, CTA utama, struktur halaman, risiko, dan saran peningkatan."
          />
        </div>

        <StrategyReview />
      </section>
    </main>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5">
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-neutral-300">{body}</p>
    </div>
  );
}