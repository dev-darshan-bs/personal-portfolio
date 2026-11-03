import { ComponentPropsWithoutRef } from "react";

import { classes, cssProps, numToMs } from "@/lib/style";
import styles from "./divider.module.css";

type DividerProps = {
  lineWidth?: string;
  lineHeight?: string;
  notchWidth?: string;
  notchHeight?: string;
  collapseDelay?: number;
  collapsed?: boolean;
  className?: string;
} & ComponentPropsWithoutRef<"div">;

export const Divider = ({
  lineWidth = "100%",
  lineHeight = "2px",
  notchWidth = "90px",
  notchHeight = "10px",
  collapseDelay = 0,
  collapsed = false,
  className,
  style,
  ...rest
}: DividerProps) => (
  <div
    className={classes(styles.divider, className)}
    style={cssProps(
      {
        lineWidth,
        lineHeight,
        notchWidth,
        notchHeight,
        collapseDelay: numToMs(collapseDelay),
      },
      style
    )}
    {...rest}
  >
    <div className={styles.line} data-collapsed={collapsed} />
    <div
      className={styles.notch}
      data-collapsed={collapsed}
      style={cssProps({ collapseDelay: numToMs(collapseDelay + 160) })}
    />
  </div>
);
