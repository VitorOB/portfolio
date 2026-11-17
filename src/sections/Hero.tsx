import { ButtonLink } from "../components/Button";
import { ContactButton } from "../components/ContactButton";
import { useLang } from "../i18n/lang";

export function Hero() {
  const { t } = useLang();
  return (
    <section id="inicio" aria-labelledby="hero-title" className="pt-16 pb-20 md:pt-28 md:pb-28">
      <div className="container-site">
        <p className="eyebrow">{t.hero.eyebrow}</p>
        <h1
          id="hero-title"
          className="mt-5 max-w-4xl text-[clamp(2.5rem,1.6rem+3.6vw,4rem)] leading-[1.05] font-semibold tracking-[-0.03em]"
        >
          {t.hero.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted md:text-xl">{t.hero.text}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ContactButton variant="primary">{t.cta}</ContactButton>
          <ButtonLink href="#projetos" variant="outline">
            {t.hero.secondary}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
