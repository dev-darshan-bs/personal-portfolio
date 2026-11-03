import { ComponentPropsWithoutRef, forwardRef, useId } from "react";

import { classes } from "@/lib/style";
import styles from "./monogram.module.css";

type MonogramProps = {
  highlight?: boolean;
  className?: string;
} & ComponentPropsWithoutRef<"svg">;

/**
 * "DB" monogram for Darshan BS. Geometric letterforms with a slanted cut so it
 * sits with the angular button/divider language of the rest of the site.
 */
export const Monogram = forwardRef<SVGSVGElement, MonogramProps>(
  ({ highlight, className, ...props }, ref) => {
    const id = useId();
    const clipId = `${id}monogram-clip`;

    return (
      <svg
        aria-hidden
        className={classes(styles.monogram, className)}
        width="48"
        height="29"
        viewBox="0 0 48 29"
        ref={ref}
        {...props}
      >
        <defs>
          <clipPath id={clipId}>
            <path
              clipRule="evenodd"
              d="M0 0h10.5C19.06 0 24 6.3 24 14.5S19.06 29 10.5 29H0V0Zm6 6v17h4.5c5 0 7.5-3.6 7.5-8.5S15.5 6 10.5 6H6Zm21-6h11.6c4.9 0 8.4 2.9 8.4 7.3 0 2.7-1.4 4.8-3.6 6 2.9 1.1 4.6 3.5 4.6 6.7 0 5-3.8 8-9.2 8H27V0Zm6 5.6v6h5c2 0 3.2-1.2 3.2-3s-1.2-3-3.2-3h-5Zm0 11.4v6.4h5.8c2.2 0 3.5-1.3 3.5-3.2s-1.3-3.2-3.5-3.2H33Z"
            />
          </clipPath>
        </defs>
        <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
        {highlight && (
          <g clipPath={`url(#${clipId})`}>
            <rect className={styles.highlight} width="100%" height="100%" />
          </g>
        )}
      </svg>
    );
  }
);

Monogram.displayName = "Monogram";
