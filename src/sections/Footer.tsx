import { owner } from "../data/site";
import { useLang } from "../i18n/lang";

export function Footer() {
  const { t } = useLang();
  const links = [
    owner.instagram && { href: owner.instagram, label: "Instagram", external: true },
    owner.email && { href: `mailto:${owner.email}`, label: t.footer.email, external: false },
  ].filter((l): l is { href: string; label: string; external: boolean } => Boolean(l));

  return (
    <footer className="on-accent bg-ink text-white">
      <div className="container-site flex flex-col gap-4 py-8 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © 2026 {owner.name} · {t.footer.tagline}
        </p>
        {links.length > 0 && (
          <ul className="flex gap-6">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="inline-flex min-h-11 items-center text-white underline decoration-white/40 underline-offset-4 transition-[text-decoration-color] duration-200 hover:decoration-white"
                  {...(l.external && { target: "_blank", rel: "noopener" })}
                >
                  {l.label}
                  {l.external && <span className="sr-only"> {t.newTab}</span>}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  );
}
