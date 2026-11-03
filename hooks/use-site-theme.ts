"use client";

import { useTheme as useNextTheme } from "next-themes";

export type SiteTheme = "dark" | "light";

/**
 * Thin wrapper over next-themes that always resolves to "dark" | "light"
 * (the site defaults to dark before hydration).
 */
export function useSiteTheme() {
  const { theme, setTheme } = useNextTheme();
  const current: SiteTheme = theme === "light" ? "light" : "dark";

  const toggleTheme = (next?: SiteTheme) => {
    setTheme(next ?? (current === "dark" ? "light" : "dark"));
  };

  return { theme: current, toggleTheme, setTheme };
}
