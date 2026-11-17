import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useLang } from "../i18n/lang";

type Variant = "primary" | "outline" | "dark" | "light";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink/[0.03]",
  dark: "bg-ink text-white hover:bg-ink/85",
  light: "bg-white text-ink hover:bg-white/90",
};

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: "md" | "sm";
  /** Abre em nova aba e avisa leitores de tela. */
  external?: boolean;
  children: ReactNode;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  external = false,
  className = "",
  children,
  ...rest
}: ButtonLinkProps) {
  const { t } = useLang();
  const sizes = size === "sm" ? "min-h-11 px-5 text-[0.9375rem]" : "min-h-12 px-7 text-base";
  return (
    <a
      {...rest}
      {...(external && { target: "_blank", rel: "noopener" })}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-150 ${sizes} ${variants[variant]} ${className}`}
    >
      {children}
      {external && <span className="sr-only"> {t.newTab}</span>}
    </a>
  );
}
