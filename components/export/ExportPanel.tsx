"use client";

import type { BusinessBrief, GeneratedSite } from "@/lib/schemas";
import {
  buildMarketingKitText,
  buildProjectJson,
  buildStandaloneHtml,
} from "@/lib/export-html";
import { Button } from "@/components/ui/Button";

type ExportPanelProps = {
  brief: BusinessBrief;
  site: GeneratedSite;
};

function sanitizeFileName(value: string) {
  const cleaned = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return cleaned || "tokokumaju-site";
}

function downloadTextFile({
  content,
  filename,
  mimeType,
}: {
  content: string;
  filename: string;
  mimeType: string;
}) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

export function ExportPanel({ brief, site }: ExportPanelProps) {
  const baseFileName = sanitizeFileName(brief.businessName);

  function downloadHtml() {
    const html = buildStandaloneHtml(brief, site);

    downloadTextFile({
      content: html,
      filename: `${baseFileName}-index.html`,
      mimeType: "text/html;charset=utf-8",
    });
  }

  function downloadMarketingKit() {
    const text = buildMarketingKitText(brief, site);

    downloadTextFile({
      content: text,
      filename: `${baseFileName}-marketing-kit.txt`,
      mimeType: "text/plain;charset=utf-8",
    });
  }

  function downloadProjectJson() {
    const json = buildProjectJson(brief, site);

    downloadTextFile({
      content: json,
      filename: `${baseFileName}-project-data.json`,
      mimeType: "application/json;charset=utf-8",
    });
  }

  return (
    <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
        Export Kit
      </p>

      <h2 className="mt-3 text-2xl font-semibold tracking-tight">
        Ambil hasil jadi
      </h2>

      <p className="mt-3 text-sm leading-7 text-neutral-600">
        Download file website dan materi promosi. Semua dibuat dari brief,
        strategi, dan hasil website yang tersimpan di browser.
      </p>

      <div className="mt-6 grid gap-3">
        <Button type="button" onClick={downloadHtml}>
          Download index.html
        </Button>

        <Button type="button" variant="secondary" onClick={downloadMarketingKit}>
          Download Marketing Kit
        </Button>

        <Button type="button" variant="secondary" onClick={downloadProjectJson}>
          Download Project JSON
        </Button>
      </div>

      <div className="mt-6 rounded-2xl bg-neutral-50 p-4 text-sm leading-7 text-neutral-600">
        <p className="font-semibold text-neutral-900">Catatan:</p>
        <p className="mt-1">
          File HTML bisa langsung dibuka di browser. Untuk publish online,
          nanti bisa diunggah ke hosting statis seperti Firebase Hosting, GitHub
          Pages, Netlify, atau layanan hosting lain.
        </p>
      </div>
    </div>
  );
}