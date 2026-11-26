import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../data/site";
import { useLang } from "../i18n/lang";
import { primaryContact } from "../lib/contact";

const THUMB_W = 1200;
const THUMB_H = 750;

/**
 * Cartão sem caixa: a miniatura é a moldura, e o nome fica embaixo como legenda de exposição.
 * O anel interno (ring-inset) separa miniaturas claras do fundo sem precisar de borda.
 */
const cardBase = "group flex h-full flex-col";

function Thumb({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative aspect-[16/10] overflow-hidden rounded-[var(--radius-frame)] ring-1 ring-ink/10 ring-inset ${className}`}
    >
      {children}
    </div>
  );
}

function Meta({
  name,
  description,
  badge,
  linked = false,
}: {
  name: string;
  description: string;
  badge?: string;
  linked?: boolean;
}) {
  return (
    <div className="flex flex-1 flex-col gap-1.5 pt-5">
      <div className="flex items-start justify-between gap-4">
        <h3 className="h3 text-[1.75rem] md:text-[2.25rem]">{name}</h3>
        {linked && (
          <ArrowUpRight aria-hidden="true" size={26} strokeWidth={1.75} className="arrow-out mt-1 shrink-0" />
        )}
      </div>
      <p className="text-muted">{description}</p>
      {badge && (
        <p className="mt-1 inline-flex w-fit items-center gap-2 text-sm font-medium text-success">
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
            style={{ backgroundColor: project.placeholderColor ?? "#E4E4E0" }}
            aria-hidden="true"
          />
          <span
            aria-hidden="true"
            className="display relative px-6 text-center text-[clamp(2rem,1.2rem+2vw,3rem)] text-ink/80"
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
    <Thumb className="bg-line">
      {project.image && (
        <img
          src={project.image}
          alt={t.projects.thumbAlt(project.name)}
          width={THUMB_W}
          height={THUMB_H}
          loading="lazy"
          decoding="async"
          className="thumb-img size-full object-cover object-top"
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
      className={cardBase}
    >
      {thumb}
      <Meta name={project.name} description={description} badge={badge} linked />
      <span className="sr-only">{t.newTab}</span>
    </a>
  );
}

/** Último cartão: convite para o próximo projeto, no azul de ação. */
export function YourBusinessCard() {
  const { lang, t } = useLang();
  const contact = primaryContact(lang);
  return (
    <a
      href={contact.href}
      className={cardBase}
      {...(contact.external && { target: "_blank", rel: "noopener" })}
    >
      <Thumb className="on-accent flex flex-col justify-between bg-accent p-6 text-white ring-0 transition-colors duration-200 group-hover:bg-accent-hover md:p-8">
        <span className="display max-w-[9ch] text-[clamp(2.5rem,1.4rem+3vw,4.5rem)]">{t.projects.yourBusiness}</span>
        <span className="inline-flex items-center gap-1.5 font-semibold">
          {t.projects.quote}
          <ArrowUpRight aria-hidden="true" size={20} className="arrow-out" />
        </span>
      </Thumb>
      <Meta name={t.projects.nextTitle} description={t.projects.nextText} />
      <span className="sr-only">{contact.channel === "email" ? t.opensEmail : t.newTabWhatsApp}</span>
    </a>
  );
}
