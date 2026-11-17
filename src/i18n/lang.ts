import { createContext, useContext } from "react";
import { content, type Content } from "../data/content";
import type { Lang } from "../data/site";

const STORAGE_KEY = "lang";

export interface LangValue {
  lang: Lang;
  t: Content;
  setLang: (lang: Lang) => void;
}

export const LangContext = createContext<LangValue>({ lang: "pt", t: content.pt, setLang: () => {} });

export const useLang = () => useContext(LangContext);

const isLang = (v: unknown): v is Lang => v === "pt" || v === "en";

/** Ordem: ?lang= na URL → escolha salva → idioma do navegador (português = pt, outros = en). */
export function detectLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (isLang(fromUrl)) return fromUrl;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    /* armazenamento bloqueado: segue para o idioma do navegador */
  }
  const browser = navigator.languages?.[0] ?? navigator.language ?? "pt";
  return browser.toLowerCase().startsWith("pt") ? "pt" : "en";
}

export function saveLang(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* sem armazenamento: a escolha vale só nesta visita */
  }
}
