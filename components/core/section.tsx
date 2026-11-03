import { ComponentPropsWithoutRef, ElementType, forwardRef } from "react";

import { classes } from "@/lib/style";
import styles from "./section.module.css";

type SectionProps = {
  as?: ElementType;
  className?: string;
} & ComponentPropsWithoutRef<"div">;

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ as: Component = "div", children, className, ...rest }, ref) => (
    <Component
      className={classes(styles.section, className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Component>
  )
);

Section.displayName = "Section";
