import type { ReactNode } from "react";
import type { Project } from "../data/site";
import { useLang } from "../i18n/lang";
import { primaryContact } from "../lib/contact";

const THUMB_W = 1200;
const THUMB_H = 750;

const cardBase = "group flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-surface p-3 sm:p-4";
const linkCard = `${cardBase} transition-colors duration-150 hover:border-ink/30`;

function Thumb({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative aspect-[16/10] overflow-hidden rounded-[var(--radius-thumb)] ${className}`}>{children}</div>
  );
}

function Meta({ name, description, badge }: { name: string; description: string; badge?: string }) {
  return (
    <div className="flex flex-1 flex-col gap-1 px-1 pt-4 pb-1 sm:px-2">
      <h3 className="text-xl font-semibold tracking-[-0.01em] sm:text-2xl">{name}</h3>
      <p className="text-[0.9375rem] text-muted">{description}</p>
      {badge && (
        <p className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-success-soft px-3 py-1 text-sm font-medium text-success">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-success" />
          {badge}
        </p>
      )}
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const { lang, t } = useLang();
  const description = project.description[lang];
  const badge = project.badge?.[lang];

  if (project.status === "coming-soon") {
    return (
      <div className={cardBase}>
        <Thumb className="flex items-center justify-center">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: project.placeholderColor ?? "#EEEEEA" }}
            aria-hidden="true"
          />
          <span
            aria-hidden="true"
            className="relative px-6 text-center font-display text-[clamp(1.5rem,1rem+1.2vw,1.875rem)] leading-none font-semibold tracking-[-0.02em] text-ink/80"
          >
            {project.name}
          </span>
          <span className="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-sm font-semibold text-ink">
            {t.projects.comingSoon}
          </span>
        </Thumb>
        <Meta name={project.name} description={description} />
      </div>
    );
  }

  const thumb = (
    <Thumb className="bg-border">
      {project.image && (
        <img
          src={project.image}
          alt={t.projects.thumbAlt(project.name)}
          width={THUMB_W}
          height={THUMB_H}
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      )}
    </Thumb>
  );

  if (!project.url) {
    return (
      <div className={cardBase}>
        {thumb}
        <Meta name={project.name} description={description} badge={badge} />
      </div>
    );
  }

  return (
    <a
      href={lang === "en" && project.hasEnglish ? `${project.url}/?lang=en` : project.url}
      target="_blank"
      rel="noopener"
      className={linkCard}
    >
      {thumb}
      <Meta name={project.name} description={description} badge={badge} />
      <span className="sr-only">{t.newTab}</span>
    </a>
  );
}

/** Último cartão da grade: convite para o próximo projeto. */
export function YourBusinessCard() {
  const { lang, t } = useLang();
  const contact = primaryContact(lang);
  return (
    <a
      href={contact.href}
      className={linkCard}
      {...(contact.external && { target: "_blank", rel: "noopener" })}
    >
      <Thumb className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-line bg-bg px-6 text-center">
        <span className="font-display text-[clamp(1.5rem,1rem+1.2vw,1.875rem)] leading-none font-semibold tracking-[-0.02em]">
          {t.projects.yourBusiness}
        </span>
        <span className="font-semibold text-accent group-hover:underline">
          {t.projects.quote} <span aria-hidden="true">→</span>
        </span>
      </Thumb>
      <Meta name={t.projects.nextTitle} description={t.projects.nextText} />
      <span className="sr-only">{contact.channel === "email" ? t.opensEmail : t.newTabWhatsApp}</span>
    </a>
  );
}
