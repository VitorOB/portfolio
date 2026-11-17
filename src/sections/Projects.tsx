import { projects, showComingSoon } from "../data/site";
import { ProjectCard, YourBusinessCard } from "../components/ProjectCard";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { useLang } from "../i18n/lang";

const visible = projects.filter((p) => p.status === "published" || showComingSoon);

if (import.meta.env.DEV) {
  for (const p of projects) {
    if (p.status === "published" && !p.url) {
      console.warn(`[site.ts] O projeto "${p.name}" está publicado mas sem url: o cartão não será clicável.`);
    }
  }
}

export function Projects() {
  const { t } = useLang();
  return (
    <section aria-labelledby="projetos" className="section">
      <Reveal className="container-site">
        <SectionHeading
          id="projetos"
          title={t.projects.title}
          text={t.projects.text}
          aside={<p className="shrink-0 text-sm text-muted">{t.projects.note}</p>}
        />
        <ul className="grid gap-5 md:grid-cols-2 md:gap-6">
          {visible.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
          <li>
            <YourBusinessCard />
          </li>
        </ul>
      </Reveal>
    </section>
  );
}
