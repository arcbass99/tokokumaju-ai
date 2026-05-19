import type { BusinessBrief } from "@/lib/schemas";
import {
  getBriefCompletenessScore,
  getBriefSuggestions,
} from "@/lib/validators";

type BriefSummaryProps = {
  brief: BusinessBrief;
};

export function BriefSummary({ brief }: BriefSummaryProps) {
  const score = getBriefCompletenessScore(brief);
  const suggestions = getBriefSuggestions(brief);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Ringkasan Brief
        </p>

        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          Cek dulu sebelum lanjut ke AI Strategist.
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <SummaryItem label="Nama usaha" value={brief.businessName} />
          <SummaryItem
            label="Kategori"
            value={
              brief.category === "Lainnya"
                ? brief.customCategory || "Belum diisi"
                : brief.category
            }
          />
          <SummaryItem label="Tujuan website" value={brief.targetGoal} />
          <SummaryItem label="Gaya visual" value={brief.visualVibe} />
          <SummaryItem label="Tone copy" value={brief.copyTone} />
          <SummaryItem label="WhatsApp" value={brief.whatsapp} />
        </div>

        <div className="mt-6 rounded-2xl bg-neutral-100 p-4">
          <div className="flex items-center justify-between gap-4">
            <p className="font-semibold">Kelengkapan brief</p>
            <p className="text-2xl font-semibold">{score}%</p>
          </div>

          <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-emerald-600"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>

      {suggestions.length > 0 ? (
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
          <h3 className="font-semibold text-amber-950">
            Saran agar hasil AI lebih kuat
          </h3>

          <ul className="mt-4 space-y-2 text-sm leading-6 text-amber-900">
            {suggestions.map((suggestion) => (
              <li key={suggestion}>• {suggestion}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
          Brief sudah cukup kuat untuk dianalisis.
        </div>
      )}
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
        {label}
      </p>
      <p className="mt-2 font-medium text-neutral-950">
        {value?.trim() || "Belum diisi"}
      </p>
    </div>
  );
}