import type { BusinessBrief, GeneratedSite } from "@/lib/schemas";

type LandingPageRendererProps = {
  brief: BusinessBrief;
  site: GeneratedSite;
};

const radiusMap = {
  none: "rounded-none",
  small: "rounded-lg",
  medium: "rounded-2xl",
  large: "rounded-3xl",
  full: "rounded-full",
};

function getWhatsAppUrl(whatsapp: string) {
  const digits = whatsapp.replace(/[^\d]/g, "");
  return digits ? `https://wa.me/${digits}` : "#";
}

export function LandingPageRenderer({ brief, site }: LandingPageRendererProps) {
  const tokens = site.designTokens;
  const sections = site.sections;
  const radius = radiusMap[tokens.radius] ?? "rounded-3xl";
  const whatsappUrl = getWhatsAppUrl(brief.whatsapp);

  return (
    <article
      className="min-h-screen"
      style={{
        backgroundColor: tokens.backgroundColor || "#ffffff",
        color: tokens.textColor || "#111827",
        fontFamily: tokens.bodyFont || "Inter, sans-serif",
      }}
    >
      <section className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 inline-flex items-center rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold">
            {brief.category === "Lainnya"
              ? brief.customCategory || "UMKM Lokal"
              : brief.category}
          </div>

          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <h1
                className="text-4xl font-bold tracking-tight md:text-6xl"
                style={{
                  fontFamily: tokens.headingFont || "Inter, sans-serif",
                  color: tokens.textColor || "#111827",
                }}
              >
                {sections.hero.headline}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 opacity-80">
                {sections.hero.subheadline}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white shadow-lg ${radius}`}
                  style={{ backgroundColor: tokens.primaryColor || "#111827" }}
                >
                  {sections.hero.primaryCTA}
                </a>

                {sections.hero.secondaryCTA ? (
                  <a
                    href={brief.mapsUrl || "#lokasi"}
                    target={brief.mapsUrl ? "_blank" : undefined}
                    rel={brief.mapsUrl ? "noreferrer" : undefined}
                    className={`inline-flex items-center justify-center border border-black/10 bg-white/70 px-6 py-3 text-sm font-bold ${radius}`}
                  >
                    {sections.hero.secondaryCTA}
                  </a>
                ) : null}
              </div>
            </div>

            <div
              className={`border border-black/10 bg-white/80 p-6 shadow-xl ${radius}`}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">
                {brief.businessName}
              </p>

              <h2
                className="mt-4 text-3xl font-bold tracking-tight"
                style={{
                  fontFamily: tokens.headingFont || "Inter, sans-serif",
                }}
              >
                {site.brandStrategy.valueProposition}
              </h2>

              <p className="mt-4 leading-7 opacity-75">
                {site.brandStrategy.positioning}
              </p>
            </div>
          </div>
        </div>
      </section>

      {sections.highlights.length > 0 ? (
        <section className="px-6 py-12 md:px-12">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
            {sections.highlights.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className={`border border-black/10 bg-white/75 p-6 shadow-sm ${radius}`}
              >
                <p
                  className="text-xl font-bold"
                  style={{
                    fontFamily: tokens.headingFont || "Inter, sans-serif",
                  }}
                >
                  {item.title}
                </p>
                <p className="mt-3 leading-7 opacity-75">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {sections.products.length > 0 ? (
        <section className="px-6 py-16 md:px-12">
          <div className="mx-auto max-w-6xl">
            <SectionTitle
              eyebrow="Produk & Layanan"
              title="Yang bisa kamu pilih"
              tokens={tokens}
            />

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {sections.products.map((product, index) => (
                <div
                  key={`${product.name}-${index}`}
                  className={`border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${radius}`}
                >
                  <h3
                    className="text-xl font-bold"
                    style={{
                      fontFamily: tokens.headingFont || "Inter, sans-serif",
                    }}
                  >
                    {product.name}
                  </h3>

                  <p className="mt-3 leading-7 opacity-75">
                    {product.description}
                  </p>

                  {product.price ? (
                    <p
                      className="mt-5 inline-flex rounded-full px-4 py-2 text-sm font-bold text-white"
                      style={{
                        backgroundColor: tokens.secondaryColor || "#111827",
                      }}
                    >
                      {product.price}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {sections.whyChooseUs.length > 0 ? (
        <section className="px-6 py-16 md:px-12">
          <div className="mx-auto max-w-6xl">
            <SectionTitle
              eyebrow="Kenapa Kami"
              title="Alasan pelanggan memilih kami"
              tokens={tokens}
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {sections.whyChooseUs.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className={`border border-black/10 bg-white/75 p-6 ${radius}`}
                >
                  <h3
                    className="text-xl font-bold"
                    style={{
                      fontFamily: tokens.headingFont || "Inter, sans-serif",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 opacity-75">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {sections.trustSignals.length > 0 ? (
        <section className="px-6 py-12 md:px-12">
          <div className="mx-auto max-w-6xl">
            <div
              className={`border border-black/10 bg-white/80 p-6 shadow-sm ${radius}`}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">
                Trust Signals
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {sections.trustSignals.map((signal, index) => (
                  <span
                    key={`${signal}-${index}`}
                    className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold"
                  >
                    {signal}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section id="lokasi" className="px-6 py-16 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <div className={`border border-black/10 bg-white p-6 ${radius}`}>
            <SectionTitle
              eyebrow="Lokasi & Jam"
              title={sections.location.title}
              tokens={tokens}
            />

            <p className="mt-4 leading-7 opacity-75">
              {sections.location.description}
            </p>

            {sections.location.operatingHours || brief.operatingHours ? (
              <p className="mt-5 font-semibold">
                {sections.location.operatingHours || brief.operatingHours}
              </p>
            ) : null}

            {brief.paymentMethods.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {brief.paymentMethods.map((method) => (
                  <span
                    key={method}
                    className="rounded-full bg-black/5 px-4 py-2 text-sm font-semibold"
                  >
                    {method}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className={`border border-black/10 bg-white p-6 ${radius}`}>
            <h3
              className="text-2xl font-bold"
              style={{
                fontFamily: tokens.headingFont || "Inter, sans-serif",
              }}
            >
              Hubungi kami
            </h3>

            <p className="mt-4 leading-7 opacity-75">
              Punya pertanyaan, ingin pesan, atau ingin tahu info terbaru?
              Langsung hubungi kami lewat WhatsApp.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white ${radius}`}
                style={{ backgroundColor: tokens.primaryColor || "#111827" }}
              >
                Chat WhatsApp
              </a>

              {brief.mapsUrl ? (
                <a
                  href={brief.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center justify-center border border-black/10 bg-white px-6 py-3 text-sm font-bold ${radius}`}
                >
                  Buka Google Maps
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {sections.faq.length > 0 ? (
        <section className="px-6 py-16 md:px-12">
          <div className="mx-auto max-w-4xl">
            <SectionTitle
              eyebrow="FAQ"
              title="Pertanyaan yang sering ditanyakan"
              tokens={tokens}
            />

            <div className="mt-8 space-y-3">
              {sections.faq.map((item, index) => (
                <div
                  key={`${item.question}-${index}`}
                  className={`border border-black/10 bg-white p-5 ${radius}`}
                >
                  <p className="font-bold">{item.question}</p>
                  <p className="mt-2 leading-7 opacity-75">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-6 py-20 md:px-12">
        <div
          className={`mx-auto max-w-5xl p-8 text-center text-white shadow-xl md:p-12 ${radius}`}
          style={{ backgroundColor: tokens.primaryColor || "#111827" }}
        >
          <h2
            className="text-3xl font-bold tracking-tight md:text-5xl"
            style={{
              fontFamily: tokens.headingFont || "Inter, sans-serif",
            }}
          >
            {sections.finalCTA.headline}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/80">
            {sections.finalCTA.description}
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-neutral-950"
          >
            {sections.finalCTA.buttonText}
          </a>
        </div>
      </section>

      <footer className="border-t border-black/10 px-6 py-8 md:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm opacity-70 md:flex-row md:items-center md:justify-between">
          <p>© {brief.businessName}. Dibuat dengan TokokuMaju AI.</p>

          {brief.socialLinks.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {brief.socialLinks.map((social, index) =>
                social.platform || social.value ? (
                  <span key={`${social.platform}-${index}`}>
                    {social.platform}: {social.value}
                  </span>
                ) : null
              )}
            </div>
          ) : null}
        </div>
      </footer>
    </article>
  );
}

function SectionTitle({
  eyebrow,
  title,
  tokens,
}: {
  eyebrow: string;
  title: string;
  tokens: GeneratedSite["designTokens"];
}) {
  return (
    <div>
      <p
        className="text-sm font-bold uppercase tracking-[0.25em]"
        style={{ color: tokens.accentColor || tokens.primaryColor || "#047857" }}
      >
        {eyebrow}
      </p>

      <h2
        className="mt-3 text-3xl font-bold tracking-tight md:text-4xl"
        style={{
          fontFamily: tokens.headingFont || "Inter, sans-serif",
          color: tokens.textColor || "#111827",
        }}
      >
        {title}
      </h2>
    </div>
  );
}