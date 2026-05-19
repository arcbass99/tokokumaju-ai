type WorkflowStep = {
  label: string;
  description: string;
};

type WorkflowStepsProps = {
  activeStep: "brief" | "strategy" | "preview";
};

const steps: { key: WorkflowStepsProps["activeStep"]; data: WorkflowStep }[] = [
  {
    key: "brief",
    data: {
      label: "Smart Brief",
      description: "Ceritakan usaha",
    },
  },
  {
    key: "strategy",
    data: {
      label: "AI Strategist",
      description: "Susun arah brand",
    },
  },
  {
    key: "preview",
    data: {
      label: "Review & Export",
      description: "Lihat dan ambil hasil",
    },
  },
];

export function WorkflowSteps({ activeStep }: WorkflowStepsProps) {
  const activeIndex = steps.findIndex((step) => step.key === activeStep);

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-4 text-white shadow-sm">
      <div className="grid gap-3 md:grid-cols-3">
        {steps.map((step, index) => {
          const isActive = step.key === activeStep;
          const isDone = index < activeIndex;

          return (
            <div
              key={step.key}
              className={`rounded-3xl border p-4 transition ${
                isActive
                  ? "border-emerald-300/50 bg-emerald-300/10"
                  : isDone
                    ? "border-white/10 bg-white/[0.06]"
                    : "border-white/10 bg-black/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    isActive
                      ? "bg-emerald-300 text-neutral-950"
                      : isDone
                        ? "bg-white text-neutral-950"
                        : "bg-white/10 text-neutral-400"
                  }`}
                >
                  {index + 1}
                </span>

                <div>
                  <p className="font-semibold">{step.data.label}</p>
                  <p className="mt-1 text-xs text-neutral-400">
                    {step.data.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}