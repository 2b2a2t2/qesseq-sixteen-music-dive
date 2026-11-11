import { COPY, type Locale } from "./i18n";

export function landingHead(locale: Locale) {
  const c = COPY[locale].meta;
  const path = locale === "en" ? "/" : "/fr";
  return {
    meta: [
      { title: c.title },
      { name: "description", content: c.description },
      { property: "og:title", content: c.title },
      { property: "og:description", content: c.description },
      { property: "og:type", content: "product" },
      { property: "og:url", content: path },
      { property: "og:locale", content: locale === "en" ? "en_US" : "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: c.title },
      { name: "twitter:description", content: c.description },
    ],
    links: [
      { rel: "canonical", href: path },
      { rel: "alternate", hrefLang: "en", href: "/" },
      { rel: "alternate", hrefLang: "fr", href: "/fr" },
      { rel: "alternate", hrefLang: "x-default", href: "/" },
    ],
  };
}
