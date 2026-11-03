import { ComponentPropsWithoutRef, ElementType } from "react";

import { classes } from "@/lib/style";
import styles from "./text.module.css";

type TextProps = {
  size?: "s" | "m" | "l" | "xl";
  as?: ElementType;
  align?: "auto" | "start" | "center";
  weight?: "auto" | "regular" | "medium" | "bold";
  secondary?: boolean;
  className?: string;
} & ComponentPropsWithoutRef<"span">;

export const Text = ({
  children,
  size = "m",
  as: Component = "span",
  align = "auto",
  weight = "auto",
  secondary,
  className,
  ...rest
}: TextProps) => {
  return (
    <Component
      className={classes(styles.text, className)}
      data-align={align}
      data-size={size}
      data-weight={weight}
      data-secondary={secondary}
      {...rest}
    >
      {children}
    </Component>
  );
};
