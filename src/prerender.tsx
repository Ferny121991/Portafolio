import { renderToString } from "react-dom/server";
import App from "./App";
import { content, type Language } from "./content";

const escape = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export function renderPage(template: string, language: Language) {
  const t = content[language];
  const url = `https://fernelydev.com/${language === "en" ? "en/" : ""}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Fernely Dev",
    url,
    description: t.seoDescription,
    image: "https://fernelydev.com/img/profile.jpg",
    logo: "https://fernelydev.com/img/logo.png",
    email: "fernelydev@gmail.com",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "fernelydev@gmail.com",
      availableLanguage: ["Spanish", "English"],
    },
    sameAs: ["https://github.com/Ferny121991"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t.servicesLabel,
      itemListElement: t.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
      })),
    },
  };
  return template
    .replace('<html lang="es"', `<html lang="${language}"`)
    .replace(/<title>.*?<\/title>/, `<title>${escape(t.seoTitle)}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*("\s*\/?>)/,
      `$1${escape(t.seoDescription)}$2`,
    )
    .replace(
      "<!-- localized-seo -->",
      `
      <link rel="canonical" href="${url}" />
      <link rel="alternate" hreflang="es" href="https://fernelydev.com/" />
      <link rel="alternate" hreflang="en" href="https://fernelydev.com/en/" />
      <link rel="alternate" hreflang="x-default" href="https://fernelydev.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Fernely Dev" />
      <meta property="og:title" content="${escape(t.seoTitle)}" />
      <meta property="og:description" content="${escape(t.seoDescription)}" />
      <meta property="og:url" content="${url}" />
      <meta property="og:locale" content="${language === "es" ? "es_ES" : "en_US"}" />
      <meta property="og:locale:alternate" content="${language === "es" ? "en_US" : "es_ES"}" />
      <meta property="og:image" content="https://fernelydev.com/img/optimized/oasis.webp" />
      <meta property="og:image:alt" content="${escape(t.heroImage)}" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${escape(t.seoTitle)}" />
      <meta name="twitter:description" content="${escape(t.seoDescription)}" />
      <meta name="twitter:image" content="https://fernelydev.com/img/optimized/oasis.webp" />
      <script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`,
    )
    .replace(
      '<div id="root"></div>',
      `<div id="root">${renderToString(<App language={language} />)}</div>`,
    );
}
