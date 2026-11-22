import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

const LIST_ID = "lista-projetos";

/**
 * Largura de cada cartão no carrossel:
 * celular 1 cartão (com o próximo aparecendo), tablet 2, desktop 3.
 * As larguras descontam o espaço entre os cartões (gap-4 = 16px, sm:gap-6 = 24px).
 */
const slideWidth = "w-[85%] sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]";

/**
 * `relative` em cada item: os textos só para leitor de tela (.sr-only) são `position: absolute`
 * e, sem um ancestral posicionado aqui dentro, escapam do recorte da rolagem e alargam a página.
 */
const slideClass = `relative shrink-0 snap-start ${slideWidth}`;

type ScrollState = { canPrev: boolean; canNext: boolean; progress: number; ratio: number };

/** Acompanha a posição da rolagem horizontal para os botões e a barra de progresso. */
function useCarousel() {
  const ref = useRef<HTMLUListElement>(null);
  const [state, setState] = useState<ScrollState>({ canPrev: false, canNext: false, progress: 0, ratio: 1 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = el.scrollWidth - el.clientWidth;
        setState({
          canPrev: el.scrollLeft > 4,
          canNext: el.scrollLeft < max - 4,
          progress: max > 0 ? el.scrollLeft / max : 0,
          ratio: el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1,
        });
      });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  /** Avança ou volta exatamente um cartão. */
  const step = useCallback((direction: 1 | -1) => {
    const el = ref.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: reduced ? "auto" : "smooth" });
  }, []);

  return { ref, state, step };
}

function NavButton({ label, disabled, onClick, children }: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-controls={LIST_ID}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex size-11 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-white disabled:cursor-default disabled:border-ink/10 disabled:text-ink/30 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}

export function Projects() {
  const { t } = useLang();
  const { ref, state, step } = useCarousel();
  const scrollable = state.canPrev || state.canNext;

  return (
    <section aria-labelledby="projetos" className="section">
      <Reveal className="container-site">
        <SectionHeading
          id="projetos"
          title={t.projects.title}
          text={t.projects.text}
          aside={
            <div className="flex shrink-0 items-center justify-between gap-6 md:flex-col md:items-end md:gap-4">
              <p className="text-sm text-muted">{t.projects.note}</p>
              {scrollable && (
                <div className="flex gap-2">
                  <NavButton label={t.projects.prev} disabled={!state.canPrev} onClick={() => step(-1)}>
                    <ArrowLeft aria-hidden="true" size={20} />
                  </NavButton>
                  <NavButton label={t.projects.next} disabled={!state.canNext} onClick={() => step(1)}>
                    <ArrowRight aria-hidden="true" size={20} />
                  </NavButton>
                </div>
              )}
            </div>
          }
        />

        {/* Rolagem horizontal com encaixe. O padding de 8px deixa o anel de foco aparecer sem ser cortado. */}
        <ul
          ref={ref}
          id={LIST_ID}
          aria-label={t.projects.listLabel}
          className="-mx-2 flex snap-x snap-mandatory scroll-px-2 gap-4 overflow-x-auto overscroll-x-contain p-2 scrollbar-none sm:gap-6 [&::-webkit-scrollbar]:hidden"
        >
          {visible.map((p) => (
            <li key={p.slug} className={slideClass}>
              <ProjectCard project={p} />
            </li>
          ))}
          <li className={slideClass}>
            <YourBusinessCard />
          </li>
        </ul>

        {/* Barra de progresso: mostra quanto da lista já foi visto. */}
        {scrollable && (
          <div aria-hidden="true" className="relative mt-6 h-0.5 overflow-hidden rounded-full bg-line">
            <div
              className="absolute inset-y-0 rounded-full bg-ink"
              style={{ width: `${state.ratio * 100}%`, left: `${state.progress * (1 - state.ratio) * 100}%` }}
            />
          </div>
        )}
      </Reveal>
    </section>
  );
}
