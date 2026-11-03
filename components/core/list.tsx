import { ComponentPropsWithoutRef } from "react";

import { classes } from "@/lib/style";
import styles from "./list.module.css";

type ListProps = {
  ordered?: boolean;
  className?: string;
} & ComponentPropsWithoutRef<"ul">;

export const List = ({ ordered, children, className, ...rest }: ListProps) => {
  const Element = ordered ? "ol" : "ul";

  return (
    <Element className={classes(styles.list, className)} {...rest}>
      {children}
    </Element>
  );
};

export const ListItem = ({
  children,
  className,
  ...rest
}: ComponentPropsWithoutRef<"li">) => {
  return (
    <li className={classes(styles.item, className)} {...rest}>
      {children}
    </li>
  );
};
