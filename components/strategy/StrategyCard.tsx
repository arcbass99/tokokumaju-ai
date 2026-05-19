import type { ReactNode } from "react";

type StrategyCardProps = {
  title: string;
  children: ReactNode;
};

export function StrategyCard({ title, children }: StrategyCardProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className="mt-4 text-sm leading-7 text-neutral-300">{children}</div>
    </section>
  );
}