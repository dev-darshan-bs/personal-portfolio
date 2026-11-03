import type { CSSProperties } from "react";

/**
 * Media query breakpoints (max-width, px). Mirror the values in globals.css.
 */
export const media = {
  desktop: 2080,
  laptop: 1680,
  tablet: 1040,
  mobile: 696,
  mobileS: 400,
} as const;

/** Convert a number to a px string */
export const numToPx = (num: number) => `${num}px`;

/** Convert pixel values to rem for a11y */
export const pxToRem = (px: number) => `${px / 16}rem`;

/** Convert an ms string ("400ms") to a number */
export const msToNum = (msString: string) => Number(msString.replace("ms", ""));

/** Convert a number to an ms string */
export const numToMs = (num: number) => `${num}ms`;

/** Duration tokens (keep in sync with globals.css) */
export const durations = {
  xs: 200,
  s: 300,
  m: 400,
  l: 600,
  xl: 800,
} as const;

type CssPropValue = string | number | undefined | null | boolean;

/**
 * Convert a JS object into `--` prefixed css custom properties.
 * Optionally pass a second param for normal styles.
 */
export function cssProps(
  props: Record<string, CssPropValue>,
  style: CSSProperties = {}
): CSSProperties {
  const result: Record<string, string> = {};

  for (const key of Object.keys(props)) {
    let value = props[key];

    if (value === undefined || value === null || value === false) continue;

    if (typeof value === "number" && key === "delay") {
      value = numToMs(value);
    }

    if (typeof value === "number" && key !== "opacity") {
      value = numToPx(value);
    }

    if (typeof value === "number" && key === "opacity") {
      value = `${value * 100}%`;
    }

    result[`--${key}`] = String(value);
  }

  return { ...result, ...style } as CSSProperties;
}

/** Concatenate classNames together */
export function classes(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}
