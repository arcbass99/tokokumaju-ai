import Link from "next/link";
import { BusinessBriefForm } from "@/components/brief/BusinessBriefForm";
import { WorkflowStepsLight } from "@/components/ui/WorkflowStepsLight";

export default function BriefPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-10 text-neutral-950">
      <section className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
              Step 1
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Smart Brief
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">
              Ceritakan usahamu dalam beberapa langkah. Brief ini akan dipakai
              Gemini untuk menyusun strategi, website, dan materi promosi.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-100"
          >
            Kembali ke Beranda
          </Link>
        </div>

        <WorkflowStepsLight activeStep="brief" />

        <BusinessBriefForm />
      </section>
    </main>
  );
}