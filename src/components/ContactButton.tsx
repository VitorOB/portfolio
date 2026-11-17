import type { ComponentProps } from "react";
import { useLang } from "../i18n/lang";
import { primaryContact } from "../lib/contact";
import { ButtonLink } from "./Button";

type Props = Omit<ComponentProps<typeof ButtonLink>, "href" | "external">;

/**
 * Botão de contato principal do idioma atual (site.ts → owner.primaryContact):
 * WhatsApp em português, e-mail em inglês (se o e-mail estiver preenchido).
 */
export function ContactButton(props: Props) {
  const { lang } = useLang();
  const { href, external } = primaryContact(lang);
  return <ButtonLink {...props} href={href} external={external} />;
}
