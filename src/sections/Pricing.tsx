import { Check } from "lucide-react";
import { ButtonLink } from "../components/Button";
import { InView } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { highlightLabel, pricing, type PricingPlan } from "../data/site";
import { useLang } from "../i18n/lang";
import { primaryContact } from "../lib/contact";
import { stagger } from "../lib/motion";

function PlanCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const { lang, t } = useLang();
  // "Quero este" abre o contato principal do idioma já com a mensagem do plano.
  const contact = primaryContact(lang, plan.message[lang]);
  const titleId = `plano-${plan.id}`;

  return (
    <li
      style={stagger(index)}
      className={`rv relative flex min-w-0 flex-col rounded-[var(--radius-card)] bg-surface p-6 md:p-8 ${
        plan.highlight ? "ring-2 ring-accent" : "ring-1 ring-ink/[0.07] ring-inset"
      }`}
    >
      {plan.highlight && (
        <p className="absolute -top-3.5 left-6 rounded-full bg-accent px-3 py-1 text-sm font-semibold text-white md:left-8">
          {highlightLabel[lang]}
        </p>
      )}

      <h3 id={titleId} className="h3 text-[1.5rem] md:text-[1.625rem]">
        {plan.name[lang]}
      </h3>
      <p className="display mt-5 text-[clamp(2.5rem,1.6rem+4vw,4rem)] tabular-nums">{plan.price[lang]}</p>
      <p className="mt-2 text-[0.9375rem] text-muted">{plan.note[lang]}</p>

      <p className="mt-7 border-t border-line pt-5 text-sm font-semibold">{t.pricing.includes}</p>
      <ul className="mt-3 flex flex-1 flex-col gap-2.5">
        {plan.features[lang].map((f) => (
          <li key={f} className="flex gap-3 text-[0.9375rem] leading-snug">
            <Check aria-hidden="true" size={18} strokeWidth={2.5} className="mt-px shrink-0 text-success" />
            {f}
          </li>
        ))}
      </ul>

      <ButtonLink
        href={contact.href}
        external={contact.external}
        variant={plan.highlight ? "primary" : "outline"}
        className="mt-8 w-full"
      >
        {t.pricing.button}
        <span className="sr-only">: {plan.name[lang]}</span>
      </ButtonLink>
    </li>
  );
}

/** Três planos com preço fechado. Tudo vem de site.ts → pricing (e some com showPricing = false). */
export function Pricing() {
  const { t } = useLang();
  return (
    <section aria-labelledby="precos" className="section pt-0 md:pt-0">
      <div className="container-site">
        <SectionHeading id="precos" title={t.pricing.title} text={t.pricing.text} />
        <InView as="ul" className="grid gap-6 pt-3.5 md:gap-4 lg:grid-cols-3">
          {pricing.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} />
          ))}
        </InView>
        <p className="mt-8 max-w-[70ch] text-[0.9375rem] text-muted">{t.pricing.note}</p>
      </div>
    </section>
  );
}
