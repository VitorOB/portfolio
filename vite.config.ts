import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { faq, owner, seo } from "./src/data/site";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Gera title, description, Open Graph e JSON-LD (ProfessionalService) a partir de src/data/site.ts. */
function seoFromSiteData(): Plugin {
  return {
    name: "seo-from-site-data",
    transformIndexHtml(html) {
      const base = owner.siteUrl.replace(/\/$/, "");
      const ogImage = `${base}/og.png`;
      const phone = owner.whatsappNumber.replace(/\D/g, "");
      const sameAs = [owner.instagram].filter(Boolean);

      // Só os dados preenchidos em site.ts.
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: seo.title.pt,
        alternateName: seo.title.en,
        description: seo.description.pt,
        availableLanguage: ["pt-BR", "en"],
        founder: { "@type": "Person", name: owner.name },
        ...(base && { url: `${base}/`, image: ogImage }),
        ...(phone && { telephone: `+${phone}` }),
        ...(owner.email && { email: owner.email }),
        ...(sameAs.length > 0 && { sameAs }),
      };

      const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: "pt-BR",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.question.pt,
          acceptedAnswer: { "@type": "Answer", text: f.answer.pt },
        })),
      };

      const tags = [
        `<title>${escapeHtml(seo.title.pt)}</title>`,
        `<meta name="description" content="${escapeHtml(seo.description.pt)}" />`,
        // Versões por idioma (o inglês é a mesma página com ?lang=en).
        ...(base
          ? [
              `<link rel="alternate" hreflang="pt-BR" href="${escapeHtml(base)}/" />`,
              `<link rel="alternate" hreflang="en" href="${escapeHtml(base)}/?lang=en" />`,
              `<link rel="alternate" hreflang="x-default" href="${escapeHtml(base)}/" />`,
            ]
          : []),
        `<meta property="og:type" content="website" />`,
        `<meta property="og:locale" content="pt_BR" />`,
        `<meta property="og:locale:alternate" content="en_US" />`,
        `<meta property="og:site_name" content="${escapeHtml(owner.name)}" />`,
        `<meta property="og:title" content="${escapeHtml(seo.title.pt)}" />`,
        `<meta property="og:description" content="${escapeHtml(seo.description.pt)}" />`,
        ...(base ? [`<meta property="og:url" content="${escapeHtml(base)}/" />`] : []),
        `<meta property="og:image" content="${escapeHtml(ogImage)}" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta property="og:image:alt" content="${escapeHtml(seo.title.pt)}" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`,
        // Perguntas frequentes, só em português (o HTML entregue é o da versão PT).
        `<script type="application/ld+json">${JSON.stringify(faqLd).replace(/</g, "\\u003c")}</script>`,
      ].join("\n    ");

      return html.replace("<!--seo-->", tags);
    },
  };
}

/** Pré-carrega a fonte do site (Archivo variável, latin), cujo nome recebe hash no build. */
function preloadDisplayFont(): Plugin {
  return {
    name: "preload-display-font",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        const file = Object.keys(ctx.bundle ?? {}).find((f) =>
          /archivo-latin-wdth-normal-[\w-]+\.woff2$/.test(f),
        );
        if (!file) throw new Error("preload-display-font: woff2 da Archivo não encontrado no bundle");
        const tag = `<link rel="preload" as="font" type="font/woff2" href="/${file}" crossorigin />`;
        return html.replace("</title>", `</title>\n    ${tag}`);
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoFromSiteData(), preloadDisplayFont()],
});
