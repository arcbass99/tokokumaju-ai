"use client";

import { useRouter } from "next/navigation";
import type { BusinessBrief } from "@/lib/schemas";

const BRIEF_STORAGE_KEY = "tokokumaju.businessBrief";
const STRATEGY_STORAGE_KEY = "tokokumaju.aiStrategy";
const GENERATED_SITE_STORAGE_KEY = "tokokumaju.generatedSite";

type DemoBriefButtonProps = {
  brief: BusinessBrief;
};

export function DemoBriefButton({ brief }: DemoBriefButtonProps) {
  const router = useRouter();

  function loadDemoBrief() {
    window.localStorage.setItem(BRIEF_STORAGE_KEY, JSON.stringify(brief));
    window.localStorage.removeItem(STRATEGY_STORAGE_KEY);
    window.localStorage.removeItem(GENERATED_SITE_STORAGE_KEY);

    router.push("/strategy");
  }

  return (
    <button
      type="button"
      onClick={loadDemoBrief}
      className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-center font-semibold text-white transition hover:bg-white/15"
    >
      Coba Demo: Kue Rina Homemade
    </button>
  );
}