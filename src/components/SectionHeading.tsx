import type { ReactNode } from "react";

interface Props {
  id: string;
  title: string;
  text?: string;
  aside?: ReactNode;
}

/** h2 + texto de apoio, com um complemento opcional à direita no desktop. */
export function SectionHeading({ id, title, text, aside }: Props) {
  return (
    <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between md:gap-10">
      <div className="max-w-2xl">
        <h2 id={id} className="h2">
          {title}
        </h2>
        {text && <p className="mt-4 text-lg text-muted">{text}</p>}
      </div>
      {aside}
    </div>
  );
}
