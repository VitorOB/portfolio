import { ShieldCheck } from "lucide-react";
import { InView } from "../components/Reveal";
import { useLang } from "../i18n/lang";

/** Faixa curta logo depois de "Como funciona": responde "qual é o risco?". */
export function Guarantee() {
  const { t } = useLang();
  return (
    <section aria-labelledby="garantia" className="pb-20 md:pb-28">
      <div className="container-site">
        <InView className="rv flex flex-col gap-5 rounded-[var(--radius-card)] bg-surface p-6 ring-1 ring-line ring-inset sm:flex-row sm:items-center sm:gap-6 md:px-10 md:py-8">
          <span
            aria-hidden="true"
            className="grid size-14 shrink-0 place-items-center rounded-full bg-success/10 text-success"
          >
            <ShieldCheck size={28} strokeWidth={1.75} />
          </span>
          <div>
            <h2 id="garantia" className="h3 text-[1.5rem] md:text-[1.75rem]">
              {t.guarantee.title}
            </h2>
            <p className="mt-1.5 text-muted md:text-lg">{t.guarantee.text}</p>
          </div>
        </InView>
      </div>
    </section>
  );
}
