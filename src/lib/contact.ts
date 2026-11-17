import { owner, type ContactChannel, type Lang } from "../data/site";

/** https://wa.me/<número>?text=<mensagem>. Sem número: https://wa.me/?text=<mensagem>. */
export function whatsappUrl(lang: Lang): string {
  const number = owner.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(owner.whatsappMessage[lang])}`;
}

/** mailto: com assunto e texto já preenchidos. */
export function emailUrl(lang: Lang): string {
  const q = `subject=${encodeURIComponent(owner.emailSubject[lang])}&body=${encodeURIComponent(owner.emailBody[lang])}`;
  return `mailto:${owner.email}?${q}`;
}

export interface ContactLink {
  channel: ContactChannel;
  href: string;
  /** WhatsApp abre em nova aba; e-mail abre o aplicativo de e-mail. */
  external: boolean;
}

/** Canal principal do idioma. E-mail sem endereço preenchido cai para o WhatsApp. */
export function primaryContact(lang: Lang): ContactLink {
  if (owner.primaryContact[lang] === "email" && owner.email) {
    return { channel: "email", href: emailUrl(lang), external: false };
  }
  return { channel: "whatsapp", href: whatsappUrl(lang), external: true };
}
