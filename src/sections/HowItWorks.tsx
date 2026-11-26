import { InView } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { useLang } from "../i18n/lang";
import { rv } from "../lib/motion";

/**
 * Quatro passos em sequência: 4 colunas no desktop, 2 no tablet e 1 no celular.
 * Uma linha liga os passos (horizontal no desktop, vertical no celular) e se preenche quando a
 * seção entra; cada passo aparece quando a linha chega nele. No tablet (2×2) não há linha.
 */
export function HowItWorks() {
  const { t } = useLang();
  return (
    <section aria-labelledby="como-funciona" className="section pb-12 md:pb-16">
      <div className="container-site">
        <SectionHeading id="como-funciona" title={t.how.title} text={t.how.text} />
        <InView className="relative">
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-20 left-[1.375rem] w-px bg-line md:hidden lg:top-[1.375rem] lg:right-0 lg:bottom-auto lg:left-0 lg:block lg:h-px lg:w-auto"
          >
            <div className="steps-line size-full bg-ink" />
          </div>
          <ol className="relative grid gap-10 md:grid-cols-2 md:gap-x-6 md:gap-y-12 lg:grid-cols-4">
            {t.how.items.map((s, i) => (
              <li key={i} className="rv flex gap-6 md:flex-col md:gap-0" style={rv(100 + i * 220)}>
                <span
                  aria-hidden="true"
                  className="grid size-11 shrink-0 place-items-center rounded-full bg-ink font-semibold text-white tabular-nums"
                >
                  {i + 1}
                </span>
                <div className="md:mt-7 lg:pr-6">
                  <h3 className="h3 text-[1.5rem] md:text-[1.625rem]">{s.title}</h3>
                  <p className="mt-2 max-w-[38ch] text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </InView>
      </div>
    </section>
  );
}
