import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { content } from "../data/content";
import { seo, type Lang } from "../data/site";
import { LangContext, defaultLang, detectLang } from "./lang";

/** Remove a escolha antiga salva no navegador pelas versões anteriores do site. */
try {
  localStorage.removeItem("lang");
} catch {
  /* armazenamento bloqueado: nada a limpar */
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    // A escolha fica no endereço (?lang=): vale ao recarregar e ao compartilhar o link.
    // Se for o idioma padrão do visitante, o endereço fica limpo.
    const url = new URL(window.location.href);
    if (next === defaultLang()) url.searchParams.delete("lang");
    else url.searchParams.set("lang", next);
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
