import { InView } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { useLang } from "../i18n/lang";
import { rv } from "../lib/motion";

/**
 * Três passos em sequência. Uma linha liga os passos e se preenche quando a seção entra;
 * cada passo aparece quando a linha chega nele.
 */
export function HowItWorks() {
  const { t } = useLang();
  return (
    <section aria-labelledby="como-funciona" className="section pt-0 md:pt-0">
      <div className="container-site">
        <SectionHeading id="como-funciona" title={t.how.title} />
        <InView className="relative">
          {/* Trilho e preenchimento: horizontal no desktop, vertical no celular. */}
          <div aria-hidden="true" className="absolute top-0 bottom-20 left-[1.375rem] w-px bg-line md:top-[1.375rem] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-auto">
            <div className="steps-line size-full bg-ink" />
          </div>
          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-6">
            {t.how.items.map((s, i) => (
              <li key={i} className="rv flex gap-6 md:flex-col md:gap-0" style={rv(120 + i * 300)}>
                <span
                  aria-hidden="true"
                  className="grid size-11 shrink-0 place-items-center rounded-full bg-ink font-semibold text-white tabular-nums"
                >
                  {i + 1}
                </span>
                <div className="md:mt-8 md:pr-8">
                  <h3 className="h3 text-[1.625rem] md:text-[1.875rem]">{s.title}</h3>
                  <p className="mt-2 max-w-[36ch] text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </InView>
      </div>
    </section>
  );
}
