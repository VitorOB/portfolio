import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { useLang } from "../i18n/lang";

export function Services() {
  const { t } = useLang();
  return (
    <section aria-labelledby="servicos" className="section">
      <Reveal className="container-site">
        <SectionHeading id="servicos" title={t.services.title} />
        <ul className="grid gap-4 md:grid-cols-3">
          {t.services.items.map((s, i) => (
            <li key={i} className="rounded-[var(--radius-card)] border border-border bg-surface p-6 md:p-8">
              <h3 className="text-xl font-semibold tracking-[-0.01em] md:text-2xl">{s.title}</h3>
              <p className="mt-3 text-muted">{s.text}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
