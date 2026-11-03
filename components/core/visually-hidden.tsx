import { ComponentPropsWithoutRef, ElementType } from "react";

import { classes } from "@/lib/style";
import styles from "./visually-hidden.module.css";

type VisuallyHiddenProps = {
  as?: ElementType;
  showOnFocus?: boolean;
  visible?: boolean;
  className?: string;
  href?: string;
} & ComponentPropsWithoutRef<"span">;

export const VisuallyHidden = ({
  className,
  showOnFocus,
  as: Component = "span",
  children,
  visible,
  ...rest
}: VisuallyHiddenProps) => {
  return (
    <Component
      className={classes(styles.hidden, className)}
      data-hidden={!visible && !showOnFocus}
      data-show-on-focus={showOnFocus}
      {...rest}
    >
      {children}
    </Component>
  );
};
