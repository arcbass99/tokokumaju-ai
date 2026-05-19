type WorkflowStep = {
  label: string;
  description: string;
};

type WorkflowStepsLightProps = {
  activeStep: "brief" | "strategy" | "preview";
};

const steps: {
  key: WorkflowStepsLightProps["activeStep"];
  data: WorkflowStep;
}[] = [
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

export function WorkflowStepsLight({ activeStep }: WorkflowStepsLightProps) {
  const activeIndex = steps.findIndex((step) => step.key === activeStep);

  return (
    <div className="rounded-[2rem] border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-3">
        {steps.map((step, index) => {
          const isActive = step.key === activeStep;
          const isDone = index < activeIndex;

          return (
            <div
              key={step.key}
              className={`rounded-3xl border p-4 transition ${
                isActive
                  ? "border-emerald-300 bg-emerald-50"
                  : isDone
                    ? "border-neutral-200 bg-neutral-100"
                    : "border-neutral-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    isActive
                      ? "bg-emerald-600 text-white"
                      : isDone
                        ? "bg-neutral-950 text-white"
                        : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {index + 1}
                </span>

                <div>
                  <p className="font-semibold text-neutral-950">
                    {step.data.label}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
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