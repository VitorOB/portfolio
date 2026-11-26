import { Plus } from "lucide-react";
import { InView } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { faq } from "../data/site";
import { useLang } from "../i18n/lang";

/**
 * Acordeão com <details>/<summary>: acessível sem JavaScript. O mesmo `name` em todos faz
 * o navegador manter uma pergunta aberta por vez. Todas começam fechadas.
 */
export function Faq() {
  const { lang, t } = useLang();
  return (
    <section aria-labelledby="duvidas" className="section pt-0 md:pt-0">
      <div className="container-site">
        <SectionHeading id="duvidas" title={t.faq.title} />
        <InView className="rv border-b border-line">
          {faq.map((item, i) => (
            <details key={i} name="faq" className="faq-item group border-t border-line">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <span className="h3 text-[1.25rem] md:text-[1.5rem]">{item.question[lang]}</span>
                <span
                  aria-hidden="true"
                  className="faq-icon grid size-10 shrink-0 place-items-center rounded-full ring-1 ring-ink/20 group-open:bg-ink group-open:text-white"
                >
                  <Plus size={20} />
                </span>
              </summary>
              <p className="max-w-[68ch] pb-7 text-muted md:text-lg">{item.answer[lang]}</p>
            </details>
          ))}
        </InView>
      </div>
    </section>
  );
}
