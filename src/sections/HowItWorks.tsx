import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { useLang } from "../i18n/lang";

export function HowItWorks() {
  const { t } = useLang();
  return (
    <section aria-labelledby="como-funciona" className="section">
      <Reveal className="container-site">
        <SectionHeading id="como-funciona" title={t.how.title} />
        <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
          {t.how.items.map((s, i) => (
            <li key={i} className="border-t border-line pt-6">
              <span
                aria-hidden="true"
                className="block font-display text-6xl leading-none font-semibold tracking-[-0.04em] text-accent"
              >
                {i + 1}
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em] md:text-2xl">{s.title}</h3>
              <p className="mt-2 text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
