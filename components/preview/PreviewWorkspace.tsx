"use client";

import { ExportPanel } from "@/components/export/ExportPanel";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { AIStrategy, BusinessBrief, GeneratedSite } from "@/lib/schemas";
import { Button } from "@/components/ui/Button";
import {
  DevicePreview,
  type PreviewDevice,
} from "@/components/preview/DevicePreview";
import { QualityScoreCard } from "@/components/preview/QualityScoreCard";
import { MarketingKit } from "@/components/marketing/MarketingKit";

const BRIEF_STORAGE_KEY = "tokokumaju.businessBrief";
const STRATEGY_STORAGE_KEY = "tokokumaju.aiStrategy";
const GENERATED_SITE_STORAGE_KEY = "tokokumaju.generatedSite";

type RequestState =
  | "idle"
  | "loading"
  | "success"
  | "error"
  | "missing-data";

type ApiErrorResponse = {
  error?: string;
  detail?: string;
  hint?: string;
  model?: string;
  rawText?: string;
};

export function PreviewWorkspace() {
  const router = useRouter();

  const [brief, setBrief] = useState<BusinessBrief | null>(null);
  const [strategy, setStrategy] = useState<AIStrategy | null>(null);
  const [site, setSite] = useState<GeneratedSite | null>(null);
  const [requestState, setRequestState] = useState<RequestState>("idle");
  const [errorInfo, setErrorInfo] = useState<ApiErrorResponse | null>(null);
  const [device, setDevice] = useState<PreviewDevice>("mobile");

  useEffect(() => {
    try {
      const savedBrief = window.localStorage.getItem(BRIEF_STORAGE_KEY);
      const savedStrategy = window.localStorage.getItem(STRATEGY_STORAGE_KEY);
      const savedSite = window.localStorage.getItem(GENERATED_SITE_STORAGE_KEY);

      if (!savedBrief || !savedStrategy) {
        setRequestState("missing-data");
        return;
      }

      const parsedBrief = JSON.parse(savedBrief) as BusinessBrief;
      const parsedStrategy = JSON.parse(savedStrategy) as AIStrategy;

      setBrief(parsedBrief);
      setStrategy(parsedStrategy);

      if (savedSite) {
        const parsedSite = JSON.parse(savedSite) as GeneratedSite;
        setSite(parsedSite);
        setRequestState("success");
        return;
      }

      setRequestState("idle");
    } catch {
      window.localStorage.removeItem(GENERATED_SITE_STORAGE_KEY);
      setRequestState("missing-data");
    }
  }, []);

  async function generateSite() {
    if (!brief || !strategy) {
      setRequestState("missing-data");
      return;
    }

    setRequestState("loading");
    setErrorInfo(null);

    try {
      const response = await fetch("/api/generate-site", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brief,
          strategy,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      const nextSite = data as GeneratedSite;

      window.localStorage.setItem(
        GENERATED_SITE_STORAGE_KEY,
        JSON.stringify(nextSite)
      );

      setSite(nextSite);
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

  function regenerateSite() {
    window.localStorage.removeItem(GENERATED_SITE_STORAGE_KEY);
    setSite(null);
    generateSite();
  }

  function goToStrategy() {
    router.push("/strategy");
  }

  function goToBrief() {
    router.push("/brief");
  }

  if (requestState === "missing-data") {
    return (
      <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight">
          Data belum lengkap.
        </h1>

        <p className="mt-4 max-w-2xl leading-7 text-neutral-600">
          Halaman preview membutuhkan Smart Brief dan hasil AI Strategist. Data
          yang sudah ada tidak akan dihapus saat kamu kembali.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button type="button" onClick={goToBrief}>
            Isi Smart Brief
          </Button>

          <Button type="button" variant="secondary" onClick={goToStrategy}>
            Ke AI Strategist
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
              Website Review
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight">
              Review hasil website sebelum diekspor.
            </h1>

            <p className="mt-4 max-w-2xl leading-8 text-neutral-600">
              Hasil website dibuat dari brief dan strategi yang sudah tersimpan.
              Kamu bisa kembali ke brief atau strategy tanpa kehilangan
              konfigurasi. Jika error muncul, kemungkinannya sedang High Demand. Mohon bersabar.
            </p>
          </div>

          {brief ? (
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5 lg:w-80">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Project aktif
              </p>

              <p className="mt-3 text-xl font-semibold">
                {brief.businessName || "Tanpa nama"}
              </p>

              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {brief.category === "Lainnya"
                  ? brief.customCategory || "Kategori custom"
                  : brief.category}
              </p>

              <p className="mt-4 text-sm leading-6 text-neutral-500">
                Konfigurasi tersimpan otomatis di browser.
              </p>
            </div>
          ) : null}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button type="button" variant="secondary" onClick={goToStrategy}>
            Kembali ke AI Strategist
          </Button>

          <Button type="button" variant="ghost" onClick={goToBrief}>
            Edit Brief
          </Button>

          {requestState === "idle" ? (
            <Button type="button" onClick={generateSite}>
              Generate Website
            </Button>
          ) : null}

          {requestState === "loading" ? (
            <Button type="button" disabled>
              Membuat website...
            </Button>
          ) : null}

          {requestState === "success" ? (
            <Button type="button" onClick={regenerateSite}>
              Generate Ulang
            </Button>
          ) : null}

          {requestState === "error" ? (
            <Button type="button" onClick={generateSite}>
              Coba Lagi
            </Button>
          ) : null}
        </div>

        {requestState === "error" ? (
          <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-5 text-sm leading-7 text-red-800">
            <p className="font-semibold">Generate gagal.</p>

            <p className="mt-2">
              {errorInfo?.error || "Gagal membuat website."}
            </p>

            {errorInfo?.detail ? (
              <div className="mt-4 rounded-2xl bg-white p-4">
                <p className="font-semibold">Detail teknis:</p>
                <p className="mt-2 break-words">{errorInfo.detail}</p>
              </div>
            ) : null}

            {errorInfo?.model ? (
              <p className="mt-4">
                Model aktif:{" "}
                <span className="font-semibold">{errorInfo.model}</span>
              </p>
            ) : null}

            {errorInfo?.hint ? <p className="mt-4">{errorInfo.hint}</p> : null}

            {errorInfo?.rawText ? (
              <details className="mt-4">
                <summary className="cursor-pointer font-semibold">
                  Lihat raw response
                </summary>
                <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap rounded-2xl bg-white p-4 text-xs">
                  {errorInfo.rawText}
                </pre>
              </details>
            ) : null}
          </div>
        ) : null}
      </section>

      {requestState === "loading" ? (
        <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <div className="h-[720px] animate-pulse rounded-[2rem] bg-neutral-200" />
          <div className="h-[360px] animate-pulse rounded-[2rem] bg-neutral-200" />
        </div>
      ) : null}

      {site && brief ? (
        <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            <div className="rounded-[2rem] border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap gap-2">
                {(["mobile", "tablet", "desktop"] as PreviewDevice[]).map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setDevice(item)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        device === item
                          ? "bg-neutral-950 text-white"
                          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>

            <DevicePreview device={device} brief={brief} site={site} />
          </div>

          <div className="space-y-6">
            <QualityScoreCard site={site} />
            <MarketingKit site={site} />
            <ExportPanel brief={brief} site={site} />
          </div>
        </div>
      ) : null}
    </div>
  );
}