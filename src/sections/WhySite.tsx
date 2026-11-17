import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { useLang } from "../i18n/lang";

export function WhySite() {
  const { t } = useLang();
  return (
    <section aria-labelledby="por-que" className="section">
      <Reveal className="container-site">
        <SectionHeading id="por-que" title={t.why.title} text={t.why.text} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.why.items.map((r, i) => (
            <li key={i} className="rounded-[var(--radius-card)] border border-border bg-surface p-6 md:p-7">
              <span aria-hidden="true" className="font-display text-sm font-semibold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.01em]">{r.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-muted">{r.text}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
