import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { owner, showPricing } from "../data/site";
import { useLang } from "../i18n/lang";
import { ContactButton } from "../components/ContactButton";

function LanguageSwitch() {
  const { t, setLang } = useLang();
  const { short, label, target } = t.langSwitch;
  return (
    <button
      type="button"
      onClick={() => setLang(target)}
      className="btn inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-ink/20 px-3 text-sm font-semibold tracking-[0.04em] hover:border-ink"
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
  // Com a seção de preços escondida (site.ts → showPricing), o item "Preços" some do menu.
  const navItems = t.nav.items.filter((item) => showPricing || item.id !== "precos");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // No topo o cabeçalho some no fundo; depois de rolar ganha fundo e linha, para separar do conteúdo.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
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
    <header
      data-scrolled={scrolled || open}
      className="sticky top-0 z-40 border-b border-transparent transition-[background-color,border-color] duration-300 data-[scrolled=true]:border-line data-[scrolled=true]:bg-bg/85 data-[scrolled=true]:backdrop-blur-md"
    >
      <div className="container-site flex h-16 items-center justify-between gap-3">
        <a
          href="#inicio"
          className="display inline-flex min-h-11 items-center text-[1.375rem] whitespace-nowrap"
          onClick={() => setOpen(false)}
        >
          {owner.name}
        </a>

        <nav aria-label={t.nav.label} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="nav-link inline-flex min-h-11 items-center px-3.5 text-[0.9375rem] text-muted hover:text-ink"
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
            className="btn inline-flex size-11 items-center justify-center rounded-full text-ink hover:bg-ink/5 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
            <span className="sr-only">{open ? t.nav.closeMenu : t.nav.openMenu}</span>
          </button>
        </div>
      </div>

      <div id="menu-mobile" ref={panelRef} hidden={!open} className="menu-panel border-t border-line bg-bg lg:hidden">
        <nav aria-label={`${t.nav.label} (mobile)`} className="container-site py-4">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="display flex min-h-14 items-center border-b border-line text-[2rem]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 sm:hidden">
            <ContactButton variant="dark" className="w-full">
              {t.cta}
            </ContactButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
