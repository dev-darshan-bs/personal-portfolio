"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useRef } from "react";

export function useScrollToHash() {
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const reduceMotion = useReducedMotion();

  const scrollToHash = useCallback(
    (hash: string, onDone?: () => void) => {
      const id = hash.split("#")[1];
      const targetElement = document.getElementById(id);

      if (!targetElement) return;

      targetElement.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
      });

      const handleScroll = () => {
        clearTimeout(scrollTimeout.current);

        scrollTimeout.current = setTimeout(() => {
          window.removeEventListener("scroll", handleScroll);
          onDone?.();
          window.history.replaceState(null, "", `${window.location.pathname}#${id}`);
        }, 50);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(scrollTimeout.current);
      };
    },
    [reduceMotion]
  );

  return scrollToHash;
}
