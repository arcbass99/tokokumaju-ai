"use client";

import type { GeneratedSite } from "@/lib/schemas";
import { Button } from "@/components/ui/Button";

type MarketingKitProps = {
  site: GeneratedSite;
};

export function MarketingKit({ site }: MarketingKitProps) {
  async function copyText(text: string) {
    await navigator.clipboard.writeText(text);
  }

  return (
    <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
        Marketing Kit
      </p>

      <h2 className="mt-3 text-2xl font-semibold tracking-tight">
        Materi promosi siap pakai
      </h2>

      <div className="mt-6 grid gap-4">
        <CopyBlock
          title="WhatsApp Broadcast"
          text={site.marketingCopy.whatsappBroadcast}
          onCopy={copyText}
        />

        <CopyBlock
          title="Caption Instagram"
          text={site.marketingCopy.instagramCaption}
          onCopy={copyText}
        />

        <CopyBlock
          title="Bio Instagram"
          text={site.marketingCopy.instagramBio}
          onCopy={copyText}
        />

        <CopyBlock
          title="Deskripsi Google Business Profile"
          text={site.marketingCopy.googleBusinessDescription}
          onCopy={copyText}
        />

        {site.marketingCopy.alternativeTaglines.length > 0 ? (
          <ListBlock
            title="Alternatif Tagline"
            items={site.marketingCopy.alternativeTaglines}
            onCopy={copyText}
          />
        ) : null}

        {site.marketingCopy.alternativeCTAs.length > 0 ? (
          <ListBlock
            title="Alternatif CTA"
            items={site.marketingCopy.alternativeCTAs}
            onCopy={copyText}
          />
        ) : null}
      </div>
    </div>
  );
}

function CopyBlock({
  title,
  text,
  onCopy,
}: {
  title: string;
  text: string;
  onCopy: (text: string) => Promise<void>;
}) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-semibold">{title}</h3>

        <Button type="button" variant="secondary" onClick={() => onCopy(text)}>
          Copy
        </Button>
      </div>

      <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-neutral-700">
        {text}
      </p>
    </div>
  );
}

function ListBlock({
  title,
  items,
  onCopy,
}: {
  title: string;
  items: string[];
  onCopy: (text: string) => Promise<void>;
}) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-semibold">{title}</h3>

        <Button
          type="button"
          variant="secondary"
          onClick={() => onCopy(items.join("\n"))}
        >
          Copy Semua
        </Button>
      </div>

      <ul className="mt-4 space-y-2 text-sm leading-7 text-neutral-700">
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}