import type { GeneratedSite } from "@/lib/schemas";

type QualityScoreCardProps = {
  site: GeneratedSite;
};

export function QualityScoreCard({ site }: QualityScoreCardProps) {
  const scores = [
    { label: "Clarity", value: site.qualityScore.clarity },
    { label: "Conversion", value: site.qualityScore.conversion },
    { label: "Trust", value: site.qualityScore.trust },
    { label: "Mobile", value: site.qualityScore.mobileReadiness },
    { label: "Completeness", value: site.qualityScore.completeness },
  ];

  return (
    <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
        Quality Score
      </p>

      <h2 className="mt-3 text-2xl font-semibold tracking-tight">
        Kesiapan hasil website
      </h2>

      <div className="mt-6 space-y-4">
        {scores.map((score) => (
          <div key={score.label}>
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>{score.label}</span>
              <span>{score.value}/100</span>
            </div>

            <div className="mt-2 h-3 overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-emerald-600"
                style={{ width: `${Math.max(0, Math.min(100, score.value))}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {site.qualityScore.suggestions.length > 0 ? (
        <div className="mt-6 rounded-2xl bg-amber-50 p-4 text-sm leading-7 text-amber-900">
          <p className="font-semibold">Saran peningkatan:</p>

          <ul className="mt-2 space-y-1">
            {site.qualityScore.suggestions.map((suggestion, index) => (
              <li key={`${suggestion}-${index}`}>• {suggestion}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}