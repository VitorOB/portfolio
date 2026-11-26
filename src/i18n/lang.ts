import { createContext, useContext } from "react";
import { content, type Content } from "../data/content";
import type { Lang } from "../data/site";

export interface LangValue {
  lang: Lang;
  t: Content;
  setLang: (lang: Lang) => void;
}

export const LangContext = createContext<LangValue>({ lang: "pt", t: content.pt, setLang: () => {} });

export const useLang = () => useContext(LangContext);

const isLang = (v: unknown): v is Lang => v === "pt" || v === "en";

/** Fusos horários do Brasil (IANA). */
const BRAZIL_TIMEZONES = new Set([
  "America/Sao_Paulo", "America/Araguaina", "America/Bahia", "America/Belem", "America/Boa_Vista",
  "America/Campo_Grande", "America/Cuiaba", "America/Eirunepe", "America/Fortaleza", "America/Maceio",
  "America/Manaus", "America/Noronha", "America/Porto_Velho", "America/Recife", "America/Rio_Branco",
  "America/Santarem",
]);

function inBrazil(): boolean {
  try {
    return BRAZIL_TIMEZONES.has(Intl.DateTimeFormat().resolvedOptions().timeZone);
  } catch {
    return false;
  }
}

/** Idioma de quem chega sem ?lang= no endereço: Brasil (fuso horário) ou navegador em português = pt. */
export function defaultLang(): Lang {
  if (inBrazil()) return "pt";
  const browser = navigator.languages?.[0] ?? navigator.language ?? "pt";
  return browser.toLowerCase().startsWith("pt") ? "pt" : "en";
}

/**
 * Ordem: ?lang= no endereço → padrão do visitante (ver defaultLang).
 * A escolha não fica salva no navegador: um clique antigo em "EN" não pode fazer quem está
 * no Brasil abrir o site em inglês depois. O botão de idioma grava a escolha no endereço,
 * então ela vale ao recarregar e ao compartilhar o link.
 */
export function detectLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  return isLang(fromUrl) ? fromUrl : defaultLang();
}
