import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { WhySite } from "./sections/WhySite";
import { Projects } from "./sections/Projects";
import { HowItWorks } from "./sections/HowItWorks";
import { Guarantee } from "./sections/Guarantee";
import { Pricing } from "./sections/Pricing";
import { Faq } from "./sections/Faq";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { showPricing } from "./data/site";
import { useLang } from "./i18n/lang";

export default function App() {
  const { t } = useLang();
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
      >
        {t.skipLink}
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <WhySite />
        <Projects />
        <HowItWorks />
        <Guarantee />
        {showPricing && <Pricing />}
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
