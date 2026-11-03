"use client";

import { useReducedMotion } from "framer-motion";
import { ComponentPropsWithoutRef, forwardRef } from "react";

import { classes, cssProps } from "@/lib/style";
import styles from "./loader.module.css";
import { Text } from "./text";

type LoaderProps = {
  width?: number;
  height?: number;
  text?: string;
  center?: boolean;
  className?: string;
} & ComponentPropsWithoutRef<"div">;

export const Loader = forwardRef<HTMLDivElement, LoaderProps>(
  (
    { className, style, width = 32, height = 4, text = "Loading...", center, ...rest },
    ref
  ) => {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) {
      return (
        <Text className={classes(styles.text, className)} weight="medium" {...rest}>
          {text}
        </Text>
      );
    }

    return (
      <div
        ref={ref}
        className={classes(styles.loader, className)}
        data-center={center}
        style={cssProps({ width, height }, style)}
        {...rest}
      >
        <div className={styles.span} />
      </div>
    );
  }
);

Loader.displayName = "Loader";
