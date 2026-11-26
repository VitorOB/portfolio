import type { ReactNode } from "react";
import { Check, Search } from "lucide-react";
import { InView } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { BrowserFrame } from "../components/BrowserFrame";
import { projects } from "../data/site";
import { useLang } from "../i18n/lang";
import { stagger } from "../lib/motion";

/* ---------- Ilustrações: pedaços de interface que mostram cada motivo (decorativas) ---------- */

function SearchVisual() {
  const { t } = useLang();
  const v = t.why.visual;
  const forno = projects.find((p) => p.slug === "forno-e-grao");
  return (
    <div className="flex w-full max-w-[420px] flex-col gap-3">
      <div className="flex items-center gap-3 rounded-full bg-white px-4 py-3 text-[0.9375rem] text-ink shadow-[0_8px_24px_-8px_rgb(0_0_0/0.5)]">
        <Search size={17} className="shrink-0 text-muted" />
        <span className="truncate">{v.query}</span>
      </div>
      <div className="rounded-2xl bg-white p-4 text-ink shadow-[0_8px_24px_-8px_rgb(0_0_0/0.5)]">
        <p className="truncate text-xs text-muted">{forno?.url.replace("https://", "")}</p>
        <p className="mt-0.5 font-semibold text-accent">{v.resultTitle}</p>
        <p className="mt-1 text-sm text-muted">{v.resultText}</p>
      </div>
      <div className="rounded-2xl bg-white/10 p-4">
        <div className="h-2 w-1/3 rounded-full bg-white/25" />
        <div className="mt-2.5 h-2 w-4/5 rounded-full bg-white/15" />
      </div>
    </div>
  );
}

function TrustVisual() {
  const p = projects.find((x) => x.slug === "studio-lirio");
  if (!p) return null;
  return (
    <BrowserFrame className="lift w-[88%] translate-y-6">
      <img src={p.image} alt="" width={1200} height={750} loading="lazy" decoding="async" className="block aspect-[16/10] w-full object-cover object-top" />
    </BrowserFrame>
  );
}

function AlwaysOnVisual() {
  const { t } = useLang();
  const v = t.why.visual;
  return (
    <div className="w-full max-w-[340px] rounded-2xl bg-white p-5 text-ink shadow-[0_8px_24px_-8px_rgb(0_0_0/0.5)]">
      <p className="h3 text-xl">{v.infoTitle}</p>
      <dl className="mt-3 divide-y divide-line text-sm">
        {v.infoRows.map(([k, val]) => (
          <div key={k} className="flex justify-between gap-4 py-2">
            <dt className="text-muted">{k}</dt>
            <dd className="text-right font-medium">{val}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-success">
        <span className="live-dot size-2 rounded-full bg-live" />
        {v.infoStatus}
      </p>
    </div>
  );
}

function ChatVisual() {
  const { t } = useLang();
  const v = t.why.visual;
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-2.5 text-[0.9375rem]">
      <p className="max-w-[85%] self-start rounded-2xl rounded-bl-md bg-white px-4 py-2.5 text-ink">{v.chatIn}</p>
      <p className="inline-flex max-w-[85%] items-end gap-2 self-end rounded-2xl rounded-br-md bg-[#d9fdd3] px-4 py-2.5 text-ink">
        {v.chatOut}
        <Check size={15} className="mb-0.5 shrink-0 text-[#1e8bd6]" />
      </p>
    </div>
  );
}

const VISUALS: ReactNode[] = [<SearchVisual key="s" />, <TrustVisual key="t" />, <AlwaysOnVisual key="a" />, <ChatVisual key="c" />];

/** Grade 2-1 / 1-2 no desktop: os cartões largos e estreitos se alternam. */
const SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];

/** Capítulo escuro: dá ritmo à página e faz as ilustrações claras saltarem. */
export function WhySite() {
  const { t } = useLang();
  return (
    <section aria-labelledby="por-que" className="on-accent section bg-night text-white">
      <div className="container-site">
        <SectionHeading id="por-que" title={t.why.title} text={t.why.text} dark />
        <InView as="ul" className="grid gap-4 md:grid-cols-12">
          {t.why.items.map((r, i) => (
            <li
              key={i}
              style={stagger(i)}
              className={`rv group flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-white/[0.06] ring-1 ring-white/10 ring-inset ${SPANS[i]}`}
            >
              <div
                aria-hidden="true"
                className={`flex min-h-[15rem] flex-1 justify-center px-6 pt-8 md:min-h-[17rem] ${i === 1 ? "items-end" : "items-center pb-2"}`}
              >
                {VISUALS[i]}
              </div>
              <div className="relative z-10 bg-night/40 p-6 backdrop-blur-sm md:p-8">
                <h3 className="h3 text-[1.625rem] md:text-[1.875rem]">{r.title}</h3>
                <p className="mt-2 max-w-[46ch] text-white/70">{r.text}</p>
              </div>
            </li>
          ))}
        </InView>
      </div>
    </section>
  );
}
