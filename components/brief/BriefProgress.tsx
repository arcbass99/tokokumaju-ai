type BriefProgressProps = {
  steps: string[];
  currentStep: number;
};

export function BriefProgress({ steps, currentStep }: BriefProgressProps) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap gap-2">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isDone = index < currentStep;

          return (
            <div
              key={step}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                isActive
                  ? "bg-neutral-950 text-white"
                  : isDone
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-neutral-100 text-neutral-500"
              }`}
            >
              {index + 1}. {step}
            </div>
          );
        })}
      </div>
    </div>
  );
}