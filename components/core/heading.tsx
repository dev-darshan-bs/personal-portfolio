import { ComponentPropsWithoutRef, ElementType } from "react";

import { classes } from "@/lib/style";
import styles from "./heading.module.css";

type HeadingProps = {
  level?: 0 | 1 | 2 | 3 | 4 | 5;
  as?: ElementType;
  align?: "auto" | "start" | "center";
  weight?: "regular" | "medium" | "bold";
  className?: string;
} & ComponentPropsWithoutRef<"h1">;

export const Heading = ({
  children,
  level = 1,
  as,
  align = "auto",
  weight = "medium",
  className,
  ...rest
}: HeadingProps) => {
  const clampedLevel = Math.min(Math.max(level, 0), 5);
  const Component = (as || `h${Math.max(clampedLevel, 1)}`) as ElementType;

  return (
    <Component
      className={classes(styles.heading, className)}
      data-align={align}
      data-weight={weight}
      data-level={clampedLevel}
      {...rest}
    >
      {children}
    </Component>
  );
};
