import { useEffect, useRef, type CSSProperties } from "react";
import { ButtonLink } from "../components/Button";
import { ContactButton } from "../components/ContactButton";
import { BrowserFrame } from "../components/BrowserFrame";
import { projects } from "../data/site";
import { useLang } from "../i18n/lang";

/** Atraso de cada peça na entrada (ver .hero-* em index.css). */
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Três projetos com identidades bem diferentes, empilhados como provas sobre a mesa.
 * `speed` = quanto cada um sobe ao rolar (profundidade): o da frente anda mais.
 */
const COLLAGE = [
  { slug: "lume", className: "top-0 left-0 w-[64%] -rotate-[4deg]", speed: 0.06, d: 520 },
  { slug: "studio-lirio", className: "top-[14%] right-0 w-[60%] rotate-[3deg]", speed: 0.12, d: 620 },
  { slug: "forno-e-grao", className: "bottom-0 left-[12%] w-[72%] -rotate-[1deg]", speed: 0.2, d: 700 },
];

/** Parallax leve: escreve o transform direto no elemento (sem re-render), só enquanto o hero está na tela. */
function useParallax() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-speed]"));
    let frame = 0;
    let visible = true;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      for (const el of layers) el.style.transform = `translate3d(0, ${(-y * Number(el.dataset.speed)).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(root);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return ref;
}

export function Hero() {
  const { t } = useLang();
  const collageRef = useParallax();

  return (
    <section id="inicio" aria-labelledby="hero-title" className="overflow-hidden pt-8 pb-20 md:pt-12 md:pb-28">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <p className="hero-support label" style={delay(0)}>
            {t.hero.eyebrow}
          </p>
          <h1 id="hero-title" className="display mt-5 text-[clamp(2.875rem,1rem+4.6vw,5.5rem)]">
            {t.hero.title.map((line, i) => (
              // A máscara (overflow) esconde a frase enquanto ela sobe. O padding guarda acentos e descendentes.
              <span key={i} className="hero-line -my-[0.06em] block overflow-hidden py-[0.06em]">
                <span style={delay(80 + i * 110)}>{line}</span>
                {i < t.hero.title.length - 1 && " "}
              </span>
            ))}
          </h1>
          <p className="hero-support mt-7 max-w-[44ch] text-lg leading-[1.5] text-muted md:text-xl" style={delay(380)}>
            {t.hero.text}
          </p>
          <div className="hero-support mt-9 flex flex-col gap-3 sm:flex-row" style={delay(440)}>
            <ContactButton variant="primary">{t.cta}</ContactButton>
            <ButtonLink href="#projetos" variant="outline">
              {t.hero.secondary}
            </ButtonLink>
          </div>
        </div>

        {/* Colagem decorativa: os mesmos projetos aparecem com nome e link na seção Projetos. */}
        <div
          ref={collageRef}
          aria-hidden="true"
          className="relative mx-auto aspect-[10/9] w-full max-w-[640px] lg:col-span-5 lg:max-w-none"
        >
          {COLLAGE.map(({ slug, className, speed, d }, i) => {
            const p = projects.find((x) => x.slug === slug);
            if (!p?.image) return null;
            return (
              <div key={slug} data-speed={speed} className={`absolute ${className}`}>
                <div className="hero-card" style={delay(d)}>
                  <BrowserFrame>
                    <img
                      src={p.image}
                      alt=""
                      width={1200}
                      height={750}
                      decoding="async"
                      fetchPriority={i === 2 ? "high" : "auto"}
                      className="block aspect-[16/10] w-full object-cover object-top"
                    />
                  </BrowserFrame>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
