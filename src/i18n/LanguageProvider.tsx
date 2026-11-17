import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { content } from "../data/content";
import { seo, type Lang } from "../data/site";
import { LangContext, detectLang, saveLang } from "./lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = useCallback((next: Lang) => {
    saveLang(next);
    setLangState(next);
    // Mantém ?lang= na URL só para inglês, para o link poder ser compartilhado já no idioma.
    const url = new URL(window.location.href);
    if (next === "en") url.searchParams.set("lang", "en");
    else url.searchParams.delete("lang");
    window.history.replaceState(null, "", url);
  }, []);

  // Idioma do documento, título e descrição acompanham a escolha.
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.title = seo.title[lang];
    document.querySelector('meta[name="description"]')?.setAttribute("content", seo.description[lang]);
  }, [lang]);

  const value = useMemo(() => ({ lang, t: content[lang], setLang }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
