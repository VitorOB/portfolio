import { ContactButton } from "../components/ContactButton";
import { InView } from "../components/Reveal";
import { owner } from "../data/site";
import { useLang } from "../i18n/lang";
import { primaryContact, whatsappUrl } from "../lib/contact";
import { rv } from "../lib/motion";

/** Fechamento: painel azul dentro da página. O azul do site sempre significa "fale comigo". */
export function Contact() {
  const { lang, t } = useLang();
  const { channel } = primaryContact(lang);
  // Com e-mail como canal principal, o WhatsApp vira opção secundária (só se houver número).
  const showWhatsAppAlt = channel === "email" && owner.whatsappNumber !== "";

  return (
    <section aria-labelledby="contato" className="pb-16 md:pb-24">
      <div className="container-site">
        <InView className="rv on-accent grid gap-10 rounded-[28px] bg-accent px-6 py-12 text-white sm:px-10 md:grid-cols-12 md:items-end md:gap-6 md:px-14 md:py-16">
          <div className="md:col-span-7">
            <h2 id="contato" className="display h2">
              {t.contact.title}
            </h2>
            <p className="mt-4 max-w-[38ch] text-lg text-on-accent-muted md:text-xl">{t.contact.text}</p>
          </div>
          <div className="rv flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 md:col-span-5 md:justify-end" style={rv(120)}>
            <ContactButton variant="light" className="w-full sm:w-auto">
              {channel === "email" ? t.contact.buttonEmail : t.contact.buttonWhatsApp}
            </ContactButton>
            {showWhatsAppAlt && (
              <a
                href={whatsappUrl(lang)}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center justify-center font-medium text-white underline decoration-white/50 underline-offset-4 transition-[text-decoration-color] duration-200 hover:decoration-white"
              >
                {t.contact.orWhatsApp}
                <span className="sr-only"> {t.newTab}</span>
              </a>
            )}
          </div>
        </InView>
      </div>
    </section>
  );
}
