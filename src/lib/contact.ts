import { owner, type ContactChannel, type Lang } from "../data/site";

/**
 * https://wa.me/<número>?text=<mensagem>. Sem número: https://wa.me/?text=<mensagem>.
 * `message` substitui a mensagem padrão (ex.: a do plano escolhido em "Preços").
 */
export function whatsappUrl(lang: Lang, message = owner.whatsappMessage[lang]): string {
  const number = owner.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** mailto: com assunto e texto já preenchidos. `message` substitui a primeira linha do texto padrão. */
export function emailUrl(lang: Lang, message?: string): string {
  const body = message
    ? owner.emailBody[lang].replace(owner.whatsappMessage[lang], message)
    : owner.emailBody[lang];
  const q = `subject=${encodeURIComponent(owner.emailSubject[lang])}&body=${encodeURIComponent(body)}`;
  return `mailto:${owner.email}?${q}`;
}

export interface ContactLink {
  channel: ContactChannel;
  href: string;
  /** WhatsApp abre em nova aba; e-mail abre o aplicativo de e-mail. */
  external: boolean;
}

/** Canal principal do idioma. E-mail sem endereço preenchido cai para o WhatsApp. */
export function primaryContact(lang: Lang, message?: string): ContactLink {
  if (owner.primaryContact[lang] === "email" && owner.email) {
    return { channel: "email", href: emailUrl(lang, message), external: false };
  }
  return { channel: "whatsapp", href: whatsappUrl(lang, message), external: true };
}
