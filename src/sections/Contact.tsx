import { Reveal } from "../components/Reveal";
import { ContactButton } from "../components/ContactButton";
import { owner } from "../data/site";
import { useLang } from "../i18n/lang";
import { primaryContact, whatsappUrl } from "../lib/contact";

export function Contact() {
  const { lang, t } = useLang();
  const { channel } = primaryContact(lang);
  // Com e-mail como canal principal, o WhatsApp vira opção secundária (só se houver número).
  const showWhatsAppAlt = channel === "email" && owner.whatsappNumber !== "";

  return (
    <section aria-labelledby="contato" className="section">
      <Reveal className="container-site">
        <div className="on-dark rounded-[var(--radius-card)] bg-ink px-6 py-14 text-white sm:px-12 md:px-16 md:py-20">
          <h2 id="contato" className="h2 max-w-xl">
            {t.contact.title}
          </h2>
          <p className="mt-4 max-w-xl text-lg text-on-dark-muted">{t.contact.text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <ContactButton variant="light" className="w-full sm:w-auto">
              {channel === "email" ? t.contact.buttonEmail : t.contact.buttonWhatsApp}
            </ContactButton>
            {showWhatsAppAlt && (
              <a
                href={whatsappUrl(lang)}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center justify-center font-medium text-white underline underline-offset-4 hover:text-on-dark-muted"
              >
                {t.contact.orWhatsApp}
                <span className="sr-only"> {t.newTab}</span>
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
