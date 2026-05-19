import Link from "next/link";
import { PreviewWorkspace } from "@/components/preview/PreviewWorkspace";
import { WorkflowStepsLight } from "@/components/ui/WorkflowStepsLight";

export default function PreviewPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-10 text-neutral-950">
      <section className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
              Step 3
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              Website Review
            </h1>

            <p className="mt-4 max-w-2xl leading-8 text-neutral-600">
              Review landing page, marketing kit, quality score, dan export
              file. Semua hasil tetap tersimpan di browser selama kamu tidak
              mengosongkan brief.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-100"
          >
            Kembali ke Beranda
          </Link>
        </div>

        <WorkflowStepsLight activeStep="preview" />

        <div className="grid gap-4 md:grid-cols-3">
          <InfoCard
            title="Preview responsif"
            body="Cek tampilan mobile, tablet, dan desktop agar hasilnya siap dibuka dari HP calon pelanggan."
          />

          <InfoCard
            title="Marketing kit"
            body="Ambil pesan WhatsApp, caption Instagram, bio, FAQ, dan deskripsi Google Business Profile."
          />

          <InfoCard
            title="Export"
            body="Download HTML, marketing kit, dan data project agar hasilnya bisa dipakai atau dilanjutkan."
          />
        </div>

        <PreviewWorkspace />
      </section>
    </main>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
      <h2 className="font-semibold text-neutral-950">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-neutral-600">{body}</p>
    </div>
  );
}