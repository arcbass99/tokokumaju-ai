import type { BusinessBrief, GeneratedSite } from "@/lib/schemas";

function escapeHtml(value: string | undefined | null) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function sanitizeUrl(value: string | undefined | null) {
  const raw = String(value ?? "").trim();

  if (!raw) return "#";

  try {
    const url = new URL(raw);

    if (url.protocol === "http:" || url.protocol === "https:") {
      return escapeHtml(url.toString());
    }

    return "#";
  } catch {
    return "#";
  }
}

function getWhatsAppUrl(whatsapp: string) {
  const digits = whatsapp.replace(/[^\d]/g, "");
  return digits ? `https://wa.me/${digits}` : "#";
}

function getRadiusValue(radius: GeneratedSite["designTokens"]["radius"]) {
  const radiusMap = {
    none: "0px",
    small: "10px",
    medium: "18px",
    large: "28px",
    full: "999px",
  };

  return radiusMap[radius] ?? "28px";
}

export function buildStandaloneHtml(brief: BusinessBrief, site: GeneratedSite) {
  const tokens = site.designTokens;
  const sections = site.sections;

  const businessName = escapeHtml(brief.businessName || "Usaha Lokal");
  const category = escapeHtml(
    brief.category === "Lainnya"
      ? brief.customCategory || "UMKM Lokal"
      : brief.category || "UMKM Lokal"
  );

  const whatsappUrl = getWhatsAppUrl(brief.whatsapp);
  const mapsUrl = sanitizeUrl(brief.mapsUrl || sections.location.mapsUrl);
  const radius = getRadiusValue(tokens.radius);

  const highlightsHtml = sections.highlights
    .map(
      (item) => `
        <article class="card">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description)}</p>
        </article>
      `
    )
    .join("");

  const productsHtml = sections.products
    .map(
      (product) => `
        <article class="card product-card">
          <h3>${escapeHtml(product.name)}</h3>
          <p>${escapeHtml(product.description)}</p>
          ${
            product.price
              ? `<span class="price">${escapeHtml(product.price)}</span>`
              : ""
          }
        </article>
      `
    )
    .join("");

  const whyHtml = sections.whyChooseUs
    .map(
      (item) => `
        <article class="card">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description)}</p>
        </article>
      `
    )
    .join("");

  const trustHtml = sections.trustSignals
    .map((signal) => `<span class="pill">${escapeHtml(signal)}</span>`)
    .join("");

  const paymentHtml = brief.paymentMethods
    .map((method) => `<span class="pill">${escapeHtml(method)}</span>`)
    .join("");

  const faqHtml = sections.faq
    .map(
      (item) => `
        <article class="faq-item">
          <h3>${escapeHtml(item.question)}</h3>
          <p>${escapeHtml(item.answer)}</p>
        </article>
      `
    )
    .join("");

  const socialHtml = brief.socialLinks
    .filter((social) => social.platform || social.value)
    .map(
      (social) =>
        `<span>${escapeHtml(social.platform)}: ${escapeHtml(
          social.value
        )}</span>`
    )
    .join("");

  return `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${businessName}</title>
  <meta name="description" content="${escapeHtml(
    site.brandStrategy.valueProposition
  )}" />
  <style>
    :root {
      --primary: ${tokens.primaryColor || "#111827"};
      --secondary: ${tokens.secondaryColor || "#374151"};
      --accent: ${tokens.accentColor || "#047857"};
      --bg: ${tokens.backgroundColor || "#ffffff"};
      --text: ${tokens.textColor || "#111827"};
      --radius: ${radius};
      --heading-font: ${tokens.headingFont || "Inter, Arial, sans-serif"};
      --body-font: ${tokens.bodyFont || "Inter, Arial, sans-serif"};
    }

    * {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      background: var(--bg);
      color: var(--text);
      font-family: var(--body-font);
      line-height: 1.6;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    .page {
      overflow: hidden;
    }

    .section {
      padding: 80px 24px;
    }

    .container {
      width: min(1120px, 100%);
      margin: 0 auto;
    }

    .hero {
      padding: 96px 24px 72px;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 48px;
      align-items: center;
    }

    .badge {
      display: inline-flex;
      margin-bottom: 24px;
      border: 1px solid rgba(0,0,0,0.1);
      border-radius: 999px;
      background: rgba(255,255,255,0.72);
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 700;
    }

    h1, h2, h3 {
      margin: 0;
      font-family: var(--heading-font);
      letter-spacing: -0.04em;
      line-height: 1.05;
    }

    h1 {
      max-width: 820px;
      font-size: clamp(42px, 7vw, 84px);
    }

    h2 {
      font-size: clamp(32px, 4vw, 52px);
    }

    h3 {
      font-size: 22px;
      letter-spacing: -0.025em;
    }

    p {
      margin: 0;
      color: color-mix(in srgb, var(--text) 74%, transparent);
    }

    .hero-copy {
      margin-top: 24px;
      max-width: 680px;
      font-size: 20px;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 32px;
    }

    .button {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      min-height: 48px;
      border-radius: var(--radius);
      padding: 14px 22px;
      font-weight: 800;
    }

    .button-primary {
      background: var(--primary);
      color: white;
      box-shadow: 0 18px 40px rgba(0,0,0,0.16);
    }

    .button-secondary {
      border: 1px solid rgba(0,0,0,0.12);
      background: rgba(255,255,255,0.76);
    }

    .hero-card,
    .card,
    .faq-item,
    .contact-card,
    .cta-box {
      border: 1px solid rgba(0,0,0,0.1);
      border-radius: var(--radius);
      background: rgba(255,255,255,0.82);
      box-shadow: 0 20px 60px rgba(0,0,0,0.08);
    }

    .hero-card {
      padding: 32px;
    }

    .hero-card .label,
    .section-label {
      color: var(--accent);
      font-size: 13px;
      font-weight: 900;
      letter-spacing: 0.2em;
      text-transform: uppercase;
    }

    .hero-card h2 {
      margin-top: 18px;
      font-size: 34px;
    }

    .hero-card p {
      margin-top: 16px;
    }

    .grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 18px;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 18px;
    }

    .card {
      padding: 28px;
      transition: transform 180ms ease, box-shadow 180ms ease;
    }

    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 26px 70px rgba(0,0,0,0.12);
    }

    .card p,
    .faq-item p,
    .contact-card p {
      margin-top: 12px;
    }

    .price {
      display: inline-flex;
      margin-top: 22px;
      border-radius: 999px;
      background: var(--secondary);
      color: white;
      padding: 8px 14px;
      font-size: 14px;
      font-weight: 800;
    }

    .section-title {
      margin-bottom: 32px;
    }

    .section-title h2 {
      margin-top: 10px;
    }

    .pill-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 20px;
    }

    .pill {
      display: inline-flex;
      border: 1px solid rgba(0,0,0,0.08);
      border-radius: 999px;
      background: white;
      padding: 9px 14px;
      font-size: 14px;
      font-weight: 750;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .contact-card {
      padding: 32px;
    }

    .faq-list {
      display: grid;
      gap: 14px;
      margin-top: 32px;
    }

    .faq-item {
      padding: 24px;
    }

    .cta-box {
      padding: 56px 32px;
      background: var(--primary);
      color: white;
      text-align: center;
    }

    .cta-box p {
      max-width: 680px;
      margin: 18px auto 0;
      color: rgba(255,255,255,0.78);
    }

    .cta-box .button {
      margin-top: 30px;
      background: white;
      color: #111827;
    }

    .footer {
      border-top: 1px solid rgba(0,0,0,0.1);
      padding: 28px 24px;
      font-size: 14px;
    }

    .footer-inner {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: space-between;
      align-items: center;
    }

    .socials {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    @media (max-width: 820px) {
      .hero {
        padding-top: 72px;
      }

      .hero-grid,
      .grid-3,
      .grid-2,
      .contact-grid {
        grid-template-columns: 1fr;
      }

      .section {
        padding: 56px 20px;
      }

      .actions {
        flex-direction: column;
      }

      .button {
        width: 100%;
      }

      .hero-card,
      .card,
      .contact-card,
      .faq-item {
        padding: 24px;
      }
    }
  </style>
</head>
<body>
  <main class="page">
    <section class="hero">
      <div class="container">
        <span class="badge">${category}</span>

        <div class="hero-grid">
          <div>
            <h1>${escapeHtml(sections.hero.headline)}</h1>
            <p class="hero-copy">${escapeHtml(sections.hero.subheadline)}</p>

            <div class="actions">
              <a class="button button-primary" href="${whatsappUrl}" target="_blank" rel="noreferrer">
                ${escapeHtml(sections.hero.primaryCTA)}
              </a>

              ${
                sections.hero.secondaryCTA
                  ? `<a class="button button-secondary" href="${
                      brief.mapsUrl ? mapsUrl : "#lokasi"
                    }" ${
                      brief.mapsUrl ? 'target="_blank" rel="noreferrer"' : ""
                    }>
                      ${escapeHtml(sections.hero.secondaryCTA)}
                    </a>`
                  : ""
              }
            </div>
          </div>

          <aside class="hero-card">
            <span class="label">${businessName}</span>
            <h2>${escapeHtml(site.brandStrategy.valueProposition)}</h2>
            <p>${escapeHtml(site.brandStrategy.positioning)}</p>
          </aside>
        </div>
      </div>
    </section>

    ${
      sections.highlights.length
        ? `<section class="section">
            <div class="container grid-3">
              ${highlightsHtml}
            </div>
          </section>`
        : ""
    }

    ${
      sections.products.length
        ? `<section class="section">
            <div class="container">
              <div class="section-title">
                <span class="section-label">Produk & Layanan</span>
                <h2>Yang bisa kamu pilih</h2>
              </div>
              <div class="grid-3">${productsHtml}</div>
            </div>
          </section>`
        : ""
    }

    ${
      sections.whyChooseUs.length
        ? `<section class="section">
            <div class="container">
              <div class="section-title">
                <span class="section-label">Kenapa Kami</span>
                <h2>Alasan pelanggan memilih kami</h2>
              </div>
              <div class="grid-2">${whyHtml}</div>
            </div>
          </section>`
        : ""
    }

    ${
      sections.trustSignals.length
        ? `<section class="section">
            <div class="container">
              <div class="contact-card">
                <span class="section-label">Trust Signals</span>
                <div class="pill-list">${trustHtml}</div>
              </div>
            </div>
          </section>`
        : ""
    }

    <section id="lokasi" class="section">
      <div class="container contact-grid">
        <article class="contact-card">
          <span class="section-label">Lokasi & Jam</span>
          <h2>${escapeHtml(sections.location.title)}</h2>
          <p>${escapeHtml(sections.location.description)}</p>
          ${
            sections.location.operatingHours || brief.operatingHours
              ? `<p><strong>${escapeHtml(
                  sections.location.operatingHours || brief.operatingHours
                )}</strong></p>`
              : ""
          }
          ${
            paymentHtml
              ? `<div class="pill-list">${paymentHtml}</div>`
              : ""
          }
        </article>

        <article class="contact-card">
          <span class="section-label">Kontak</span>
          <h2>Hubungi kami</h2>
          <p>Punya pertanyaan, ingin pesan, atau ingin tahu info terbaru? Langsung hubungi kami lewat WhatsApp.</p>

          <div class="actions">
            <a class="button button-primary" href="${whatsappUrl}" target="_blank" rel="noreferrer">Chat WhatsApp</a>
            ${
              brief.mapsUrl
                ? `<a class="button button-secondary" href="${mapsUrl}" target="_blank" rel="noreferrer">Buka Google Maps</a>`
                : ""
            }
          </div>
        </article>
      </div>
    </section>

    ${
      sections.faq.length
        ? `<section class="section">
            <div class="container" style="max-width: 860px;">
              <div class="section-title">
                <span class="section-label">FAQ</span>
                <h2>Pertanyaan yang sering ditanyakan</h2>
              </div>
              <div class="faq-list">${faqHtml}</div>
            </div>
          </section>`
        : ""
    }

    <section class="section">
      <div class="container">
        <div class="cta-box">
          <h2>${escapeHtml(sections.finalCTA.headline)}</h2>
          <p>${escapeHtml(sections.finalCTA.description)}</p>
          <a class="button" href="${whatsappUrl}" target="_blank" rel="noreferrer">
            ${escapeHtml(sections.finalCTA.buttonText)}
          </a>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="container footer-inner">
        <span>© ${businessName}. Dibuat dengan TokokuMaju AI.</span>
        ${socialHtml ? `<div class="socials">${socialHtml}</div>` : ""}
      </div>
    </footer>
  </main>
</body>
</html>`;
}

export function buildMarketingKitText(brief: BusinessBrief, site: GeneratedSite) {
  const faqText = site.marketingCopy.faqForCustomers
    .map((item, index) => {
      return `${index + 1}. ${item.question}\n${item.answer}`;
    })
    .join("\n\n");

  const taglines = site.marketingCopy.alternativeTaglines
    .map((item, index) => `${index + 1}. ${item}`)
    .join("\n");

  const ctas = site.marketingCopy.alternativeCTAs
    .map((item, index) => `${index + 1}. ${item}`)
    .join("\n");

  return `TOKOKUMAJU AI - MARKETING KIT
================================

Nama Usaha:
${brief.businessName}

Kategori:
${brief.category === "Lainnya" ? brief.customCategory : brief.category}

Positioning:
${site.brandStrategy.positioning}

Target Pelanggan:
${site.brandStrategy.targetAudience}

Value Proposition:
${site.brandStrategy.valueProposition}

CTA Utama:
${site.brandStrategy.mainCTA}


WHATSAPP BROADCAST
------------------
${site.marketingCopy.whatsappBroadcast}


CAPTION INSTAGRAM
-----------------
${site.marketingCopy.instagramCaption}


BIO INSTAGRAM
-------------
${site.marketingCopy.instagramBio}


DESKRIPSI GOOGLE BUSINESS PROFILE
---------------------------------
${site.marketingCopy.googleBusinessDescription}


FAQ PELANGGAN
-------------
${faqText || "-"}


ALTERNATIF TAGLINE
------------------
${taglines || "-"}


ALTERNATIF CTA
--------------
${ctas || "-"}


QUALITY SCORE
-------------
Clarity: ${site.qualityScore.clarity}/100
Conversion: ${site.qualityScore.conversion}/100
Trust: ${site.qualityScore.trust}/100
Mobile Readiness: ${site.qualityScore.mobileReadiness}/100
Completeness: ${site.qualityScore.completeness}/100

Saran:
${site.qualityScore.suggestions.map((item) => `- ${item}`).join("\n") || "-"}
`;
}

export function buildProjectJson(brief: BusinessBrief, site: GeneratedSite) {
  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      app: "TokokuMaju AI",
      brief,
      site,
    },
    null,
    2
  );
}