import type { CSSProperties } from "react";

/** Atraso de entrada de um item (ms). Use valores curtos e desiguais: 0, 70, 120, 160… */
export const rv = (ms: number) => ({ "--rv": `${ms}ms` }) as CSSProperties;

/** Atrasos que encurtam a cada item: a sequência lê como uma onda, não como uma fila. */
export const stagger = (i: number) => rv(Math.round(Math.sqrt(i) * 90));
