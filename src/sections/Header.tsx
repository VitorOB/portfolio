import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { owner } from "../data/site";
import { useLang } from "../i18n/lang";
import { ContactButton } from "../components/ContactButton";

function LanguageSwitch() {
  const { t, setLang } = useLang();
  const { short, label, target } = t.langSwitch;
  return (
    <button
      type="button"
      onClick={() => setLang(target)}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-ink/20 px-3 text-sm font-semibold tracking-[0.04em] transition-colors duration-150 hover:border-ink"
    >
      <span lang={target === "en" ? "en" : "pt-BR"}>
        {short}
        <span className="sr-only"> — {label}</span>
      </span>
    </button>
  );
}

export function Header() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Ao abrir, leva o foco ao primeiro link; Esc fecha e devolve o foco ao botão.
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/80">
      <div className="container-site flex h-16 items-center justify-between gap-3">
        <a
          href="#inicio"
          className="inline-flex min-h-11 items-center font-display text-lg font-bold tracking-[-0.02em] whitespace-nowrap"
          onClick={() => setOpen(false)}
        >
          {owner.name}
        </a>

        <nav aria-label={t.nav.label} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {t.nav.items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.9375rem] text-muted transition-colors duration-150 hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitch />
          <div className="hidden sm:block">
            <ContactButton variant="dark" size="sm">
              {t.cta}
            </ContactButton>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-ink hover:bg-ink/5 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
            <span className="sr-only">{open ? t.nav.closeMenu : t.nav.openMenu}</span>
          </button>
        </div>
      </div>

      <div id="menu-mobile" ref={panelRef} hidden={!open} className="border-t border-line bg-bg lg:hidden">
        <nav aria-label={`${t.nav.label} (mobile)`} className="container-site py-4">
          <ul className="flex flex-col">
            {t.nav.items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex min-h-12 items-center text-lg font-medium"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 sm:hidden">
            <ContactButton variant="dark" className="w-full">
              {t.cta}
            </ContactButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
