import { Check } from "lucide-react";
import { InView } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { BrowserFrame } from "../components/BrowserFrame";
import { projects } from "../data/site";
import { useLang } from "../i18n/lang";
import { stagger } from "../lib/motion";

/** Exemplo real de cada tipo de site (miniatura dos projetos demonstrativos). */
const EXAMPLES = ["forno-e-grao", "confeitaria-lucrativa"];

function PlanVisual({ items }: { items: string[] }) {
  return (
    <div className="lift w-[78%] translate-y-6 rounded-t-2xl bg-white p-5 shadow-[0_0_0_1px_rgb(20_20_20/0.08),0_24px_48px_-16px_rgb(20_20_20/0.2)]">
      <ul className="divide-y divide-line">
        {items.map((item) => (
          <li key={item} className="flex items-center justify-between py-3 font-medium">
            {item}
            <span className="grid size-6 place-items-center rounded-full bg-success text-white">
              <Check size={14} strokeWidth={3} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Três serviços, cada um com a imagem do que ele entrega. */
export function Services() {
  const { t } = useLang();
  return (
    <section aria-labelledby="servicos" className="section">
      <div className="container-site">
        <SectionHeading id="servicos" title={t.services.title} />
        <InView as="ul" className="grid gap-4 md:grid-cols-3">
          {t.services.items.map((s, i) => {
            const example = projects.find((p) => p.slug === EXAMPLES[i]);
            return (
              <li
                key={i}
                style={stagger(i)}
                className="rv group flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-surface ring-1 ring-ink/[0.07] ring-inset"
              >
                <div aria-hidden="true" className="flex h-56 items-end justify-center overflow-hidden bg-bg-deep pt-8 md:h-64">
                  {example?.image ? (
                    <BrowserFrame className="lift w-[82%] translate-y-6">
                      <img
                        src={example.image}
                        alt=""
                        width={1200}
                        height={750}
                        loading="lazy"
                        decoding="async"
                        className="block aspect-[16/10] w-full object-cover object-top"
                      />
                    </BrowserFrame>
                  ) : (
                    <PlanVisual items={t.services.planItems} />
                  )}
                </div>
                <div className="p-6 md:p-7">
                  <h3 className="h3 text-[1.625rem] md:text-[1.75rem]">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.text}</p>
                </div>
              </li>
            );
          })}
        </InView>
      </div>
    </section>
  );
}
