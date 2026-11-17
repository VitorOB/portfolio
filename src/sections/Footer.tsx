import { owner } from "../data/site";
import { useLang } from "../i18n/lang";

export function Footer() {
  const { t } = useLang();
  const links = [
    owner.instagram && { href: owner.instagram, label: "Instagram", external: true },
    owner.email && { href: `mailto:${owner.email}`, label: t.footer.email, external: false },
  ].filter((l): l is { href: string; label: string; external: boolean } => Boolean(l));

  return (
    <footer className="border-t border-line">
      <div className="container-site flex flex-col gap-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {owner.name}</p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
          {links.length > 0 && (
            <ul className="flex gap-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex min-h-11 items-center text-accent underline-offset-4 hover:underline"
                    {...(l.external && { target: "_blank", rel: "noopener" })}
                  >
                    {l.label}
                    {l.external && <span className="sr-only"> {t.newTab}</span>}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <p>{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
