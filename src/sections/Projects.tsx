import { useCallback, useEffect, useRef, useState, type FocusEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
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
 * Tempo que cada projeto fica parado antes de a lista avançar sozinha.
 * Somado à animação da rolagem (~0,5 s), dá cerca de 2,5 s entre um avanço e outro.
 */
const AUTOPLAY_MS = 2000;

/**
 * Largura de cada cartão no carrossel: celular 1 cartão (com o próximo aparecendo),
 * a partir do tablet 2 cartões. A largura desconta o espaço entre eles (md:gap-6 = 24px).
 *
 * `relative` em cada item: os textos só para leitor de tela (.sr-only) são `position: absolute`
 * e, sem um ancestral posicionado aqui dentro, escapam do recorte da rolagem e alargam a página.
 */
const slideClass = "relative shrink-0 snap-start w-[85%] md:w-[calc((100%-24px)/2)]";

type ScrollState = { canPrev: boolean; canNext: boolean; progress: number; ratio: number };

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Carrossel com rolagem nativa (scroll-snap) e passagem automática.
 * A passagem automática para enquanto o visitante interage (mouse em cima, foco do teclado,
 * dedo na tela), quando a seção sai da tela ou a aba fica em segundo plano, e pode ser
 * pausada no botão (WCAG 2.2.2). Com "reduzir movimento" ligado, começa pausada.
 */
function useCarousel() {
  const ref = useRef<HTMLUListElement>(null);
  const [state, setState] = useState<ScrollState>({ canPrev: false, canNext: false, progress: 0, ratio: 1 });
  const [userPaused, setUserPaused] = useState(prefersReducedMotion);

  // Motivos temporários para não avançar (não precisam renderizar de novo).
  const hovering = useRef(false);
  const focused = useRef(false);
  const pointerDown = useRef(false);
  const onScreen = useRef(false);
  const lastMove = useRef(Date.now());

  // Estado dos botões e da barra de progresso.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      lastMove.current = Date.now();
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
    const io = new IntersectionObserver(([entry]) => (onScreen.current = entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", update);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  /** Índice do cartão alinhado ao início da área visível. */
  const currentIndex = useCallback(() => {
    const el = ref.current;
    if (!el) return 0;
    const start = el.getBoundingClientRect().left + parseFloat(getComputedStyle(el).paddingLeft);
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((li, i) => {
      const dist = Math.abs(li.getBoundingClientRect().left - start);
      if (dist < bestDist) [best, bestDist] = [i, dist];
    });
    return best;
  }, []);

  /** Rola até alinhar exatamente o cartão `index` (evita parar com um cartão cortado). */
  const goTo = useCallback((index: number) => {
    const el = ref.current;
    const li = el?.children[index] as HTMLElement | undefined;
    if (!el || !li) return;
    const padding = parseFloat(getComputedStyle(el).paddingLeft);
    const left = el.scrollLeft + li.getBoundingClientRect().left - el.getBoundingClientRect().left - padding;
    el.scrollTo({ left, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    lastMove.current = Date.now();
  }, []);

  const next = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
    goTo(atEnd ? 0 : currentIndex() + 1);
  }, [goTo, currentIndex]);

  const prev = useCallback(() => goTo(Math.max(0, currentIndex() - 1)), [goTo, currentIndex]);

  // Passagem automática: confere a cada 250 ms se já pode avançar.
  useEffect(() => {
    if (userPaused) return;
    const timer = window.setInterval(() => {
      const busy = hovering.current || focused.current || pointerDown.current;
      if (busy || !onScreen.current || document.hidden) {
        lastMove.current = Date.now();
        return;
      }
      if (Date.now() - lastMove.current >= AUTOPLAY_MS) next();
    }, 250);
    return () => window.clearInterval(timer);
  }, [userPaused, next]);

  /** Eventos que pausam enquanto o visitante interage com a lista. */
  const interactionProps = {
    onMouseEnter: () => (hovering.current = true),
    onMouseLeave: () => (hovering.current = false),
    onFocus: () => (focused.current = true),
    onBlur: (e: FocusEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) focused.current = false;
    },
    onPointerDown: () => (pointerDown.current = true),
    onPointerUp: () => (pointerDown.current = false),
    onPointerCancel: () => (pointerDown.current = false),
  };

  return { ref, state, next, prev, userPaused, setUserPaused, interactionProps };
}

function NavButton({ label, disabled = false, onClick, children }: {
  label: string;
  disabled?: boolean;
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
  const { ref, state, next, prev, userPaused, setUserPaused, interactionProps } = useCarousel();
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
                  <NavButton
                    label={userPaused ? t.projects.play : t.projects.pause}
                    onClick={() => setUserPaused((v) => !v)}
                  >
                    {userPaused ? <Play aria-hidden="true" size={18} /> : <Pause aria-hidden="true" size={18} />}
                  </NavButton>
                  <NavButton label={t.projects.prev} disabled={!state.canPrev} onClick={prev}>
                    <ArrowLeft aria-hidden="true" size={20} />
                  </NavButton>
                  <NavButton label={t.projects.next} onClick={next}>
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
          {...interactionProps}
          className="-mx-2 flex snap-x snap-mandatory scroll-px-2 gap-4 overflow-x-auto overscroll-x-contain p-2 scrollbar-none md:gap-6 [&::-webkit-scrollbar]:hidden"
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
              className="absolute inset-y-0 rounded-full bg-ink transition-[left] duration-300"
              style={{ width: `${state.ratio * 100}%`, left: `${state.progress * (1 - state.ratio) * 100}%` }}
            />
          </div>
        )}
      </Reveal>
    </section>
  );
}
