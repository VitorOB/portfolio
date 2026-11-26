import type { ReactNode } from "react";
import { InView } from "./Reveal";
import { rv } from "../lib/motion";

interface Props {
  id: string;
  title: string;
  text?: string;
  aside?: ReactNode;
  /** Seção em fundo escuro. */
  dark?: boolean;
}

/**
 * Abertura de seção: título à esquerda e texto de apoio na coluna da direita, os dois
 * alinhados pelo topo e com tamanhos próximos o bastante para lerem como um conjunto.
 */
export function SectionHeading({ id, title, text, aside, dark = false }: Props) {
  return (
    <InView className="mb-12 grid gap-5 md:mb-16 md:grid-cols-12 md:gap-6">
      <h2 id={id} className="rv display h2 md:col-span-6">
        {title}
      </h2>
      {(text || aside) && (
        <div className="rv flex flex-col gap-6 md:col-span-5 md:col-start-8 md:justify-between" style={rv(80)}>
          {text && (
            <p className={`max-w-[44ch] text-lg leading-[1.5] md:pt-2 md:text-[1.25rem] ${dark ? "text-white/70" : "text-muted"}`}>
              {text}
            </p>
          )}
          {aside}
        </div>
      )}
    </InView>
  );
}
