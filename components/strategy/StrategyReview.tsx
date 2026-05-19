"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { AIStrategy, BusinessBrief } from "@/lib/schemas";
import { Button } from "@/components/ui/Button";
import { StrategyCard } from "@/components/strategy/StrategyCard";
import { FallbackNotice } from "@/components/ui/FallbackNotice";

const BRIEF_STORAGE_KEY = "tokokumaju.businessBrief";
const STRATEGY_STORAGE_KEY = "tokokumaju.aiStrategy";

type RequestState = "idle" | "loading" | "success" | "error" | "missing-brief";

type ApiErrorResponse = {
  error?: string;
  detail?: string;
  hint?: string;
  model?: string;
  rawText?: string;
};

export function StrategyReview() {
  const router = useRouter();

  const [brief, setBrief] = useState<BusinessBrief | null>(null);
    type StrategyWithMeta = AIStrategy & {
    _fallback?: boolean;
  };

  const [strategy, setStrategy] = useState<StrategyWithMeta | null>(null);
  const [requestState, setRequestState] = useState<RequestState>("idle");
  const [errorInfo, setErrorInfo] = useState<ApiErrorResponse | null>(null);

  useEffect(() => {
    try {
      const savedBrief = window.localStorage.getItem(BRIEF_STORAGE_KEY);
      const savedStrategy = window.localStorage.getItem(STRATEGY_STORAGE_KEY);

      if (!savedBrief) {
        setRequestState("missing-brief");
        return;
      }

      const parsedBrief = JSON.parse(savedBrief) as BusinessBrief;
      setBrief(parsedBrief);

      if (savedStrategy) {
        const parsedStrategy = JSON.parse(savedStrategy) as StrategyWithMeta;
        setStrategy(parsedStrategy);
        setRequestState("success");
        return;
      }

      setRequestState("idle");
    } catch {
      window.localStorage.removeItem(STRATEGY_STORAGE_KEY);
      setRequestState("missing-brief");
    }
  }, []);

  async function analyzeBrief() {
    if (!brief) {
      setRequestState("missing-brief");
      return;
    }

    setRequestState("loading");
    setErrorInfo(null);

    try {
      const response = await fetch("/api/analyze-brief", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(brief),
      });

      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      const nextStrategy = data as StrategyWithMeta;

      window.localStorage.setItem(
        STRATEGY_STORAGE_KEY,
        JSON.stringify(nextStrategy)
      );

      setStrategy(nextStrategy);
      setRequestState("success");
    } catch (error) {
      const normalizedError =
        typeof error === "object" && error !== null
          ? (error as ApiErrorResponse)
          : {
              error: "Terjadi error yang tidak diketahui.",
              detail: String(error),
            };

      setRequestState("error");
      setErrorInfo(normalizedError);
    }
  }

  function clearStrategyAndRetry() {
    window.localStorage.removeItem(STRATEGY_STORAGE_KEY);
    setStrategy(null);
    analyzeBrief();
  }

  function goToBrief() {
    router.push("/brief");
  }

  function goToPreview() {
    router.push("/preview");
  }

  if (requestState === "missing-brief") {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8">
        <h2 className="text-2xl font-semibold">Brief belum ditemukan.</h2>

        <p className="mt-4 max-w-2xl leading-7 text-neutral-300">
          Kamu perlu mengisi Smart Brief dulu sebelum AI Strategist bisa
          menganalisis usaha.
        </p>

        <div className="mt-8">
          <Button type="button" onClick={goToBrief}>
            Isi Smart Brief
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
              AI Strategist
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight">
              Analisis strategi sebelum website dibuat.
            </h1>

            <p className="mt-4 max-w-2xl leading-8 text-neutral-300">
              Gemini akan membaca brief usaha, lalu menyusun positioning, target
              pelanggan, value proposition, CTA utama, dan saran struktur
              landing page. Jika error muncul, kemungkinan sedang High Demand. Mohon bersabar.
            </p>
          </div>

          {brief ? (
            <div className="rounded-3xl border border-white/10 bg-black/20 p-5 md:w-80">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                Brief aktif
              </p>

              <p className="mt-3 text-xl font-semibold">
                {brief.businessName || "Tanpa nama"}
              </p>

              <p className="mt-2 text-sm leading-6 text-neutral-300">
                {brief.category === "Lainnya"
                  ? brief.customCategory || "Kategori custom"
                  : brief.category}
              </p>

              <p className="mt-4 text-sm leading-6 text-neutral-400">
                Tujuan: {brief.targetGoal}
              </p>
            </div>
          ) : null}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button type="button" variant="secondary" onClick={goToBrief}>
            Kembali ke Brief
          </Button>

          {requestState === "idle" ? (
            <Button type="button" onClick={analyzeBrief}>
              Jalankan AI Strategist
            </Button>
          ) : null}

          {requestState === "loading" ? (
            <Button type="button" disabled>
              Menganalisis brief...
            </Button>
          ) : null}

          {requestState === "success" ? (
            <>
              <Button type="button" onClick={goToPreview}>
                Buat Website
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={clearStrategyAndRetry}
              >
                Analisis Ulang
              </Button>
            </>
          ) : null}

          {requestState === "error" ? (
            <Button type="button" onClick={analyzeBrief}>
              Coba Lagi
            </Button>
          ) : null}
        </div>

        {requestState === "error" ? (
          <div className="mt-6 rounded-3xl border border-red-400/30 bg-red-500/10 p-5 text-sm leading-7 text-red-100">
            <p className="font-semibold">Analisis gagal.</p>

            <p className="mt-2">
              {errorInfo?.error || "Gagal menganalisis brief."}
            </p>

            {errorInfo?.detail ? (
              <div className="mt-4 rounded-2xl bg-black/30 p-4">
                <p className="font-semibold text-red-50">Detail teknis:</p>
                <p className="mt-2 break-words text-red-100">
                  {errorInfo.detail}
                </p>
              </div>
            ) : null}

            {errorInfo?.model ? (
              <p className="mt-4 text-red-100">
                Model aktif: <span className="font-semibold">{errorInfo.model}</span>
              </p>
            ) : null}

            {errorInfo?.hint ? (
              <p className="mt-4 text-red-100">{errorInfo.hint}</p>
            ) : null}

            {errorInfo?.rawText ? (
              <details className="mt-4">
                <summary className="cursor-pointer font-semibold">
                  Lihat raw response
                </summary>
                <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap rounded-2xl bg-black/40 p-4 text-xs text-red-50">
                  {errorInfo.rawText}
                </pre>
              </details>
            ) : null}
          </div>
        ) : null}
      </section>

      {requestState === "loading" ? <StrategySkeleton /> : null}

            {strategy?._fallback ? (
        <FallbackNotice
          title="Demo tetap berjalan dengan hasil cadangan"
          description="Gemini sedang ramai atau kuota sementara terbatas. Untuk demo Kue Rina Homemade, TokokuMaju AI memakai strategi cadangan agar alur tetap bisa dicoba."
        />
      ) : null}

      {strategy ? <StrategyResult strategy={strategy} /> : null}
    </div>
  );
}

function StrategySkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-44 animate-pulse rounded-3xl border border-white/10 bg-white/[0.06]"
        />
      ))}
    </div>
  );
}

function StrategyResult({ strategy }: { strategy: AIStrategy }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <StrategyCard title="Positioning">
        <p>{strategy.positioning}</p>
      </StrategyCard>

      <StrategyCard title="Target Pelanggan">
        <p>{strategy.targetAudience}</p>
      </StrategyCard>

      <StrategyCard title="Value Proposition">
        <p>{strategy.valueProposition}</p>
      </StrategyCard>

      <StrategyCard title="CTA Utama">
        <p>{strategy.mainCTA}</p>
      </StrategyCard>

      <StrategyCard title="Struktur Landing Page">
        <List items={strategy.recommendedStructure} />
      </StrategyCard>

      <StrategyCard title="Informasi yang Masih Kurang">
        <List
          items={
            strategy.missingInformation.length > 0
              ? strategy.missingInformation
              : ["Brief sudah cukup lengkap untuk tahap awal."]
          }
        />
      </StrategyCard>

      <StrategyCard title="Catatan Risiko">
        <List
          items={
            strategy.riskNotes.length > 0
              ? strategy.riskNotes
              : ["Tidak ada risiko besar yang terdeteksi dari brief saat ini."]
          }
        />
      </StrategyCard>

      <StrategyCard title="Saran Peningkatan">
        <List
          items={
            strategy.improvementSuggestions.length > 0
              ? strategy.improvementSuggestions
              : ["Brief sudah cukup kuat untuk lanjut ke pembuatan website."]
          }
        />
      </StrategyCard>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}