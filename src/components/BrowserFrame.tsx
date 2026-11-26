import type { ReactNode } from "react";

/** Moldura de navegador (barra com três pontos) para miniaturas de sites. */
export function BrowserFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`frame ${className}`}>
      <div aria-hidden="true" className="frame-bar">
        <i />
        <i />
        <i />
      </div>
      {children}
    </div>
  );
}
