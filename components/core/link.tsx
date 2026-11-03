import NextLink from "next/link";
import { ComponentPropsWithoutRef, forwardRef } from "react";

import { classes } from "@/lib/style";
import styles from "./link.module.css";

// File extensions that can be linked to directly
const VALID_EXT = ["txt", "png", "jpg", "pdf", "svg"];

function isAnchor(href?: string) {
  const isValidExtension = VALID_EXT.includes(href?.split(".").pop() ?? "");
  return (
    !!href &&
    (href.includes("://") ||
      href[0] === "#" ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      isValidExtension)
  );
}

type LinkProps = {
  href: string;
  secondary?: boolean;
  className?: string;
} & ComponentPropsWithoutRef<"a">;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ rel, target, children, secondary, className, href, ...rest }, ref) => {
    const isExternal = href?.includes("://");
    const relValue = rel || (isExternal ? "noreferrer noopener" : undefined);
    const targetValue = target || (isExternal ? "_blank" : undefined);

    const linkProps = {
      className: classes(styles.link, className),
      "data-secondary": secondary,
      rel: relValue,
      target: targetValue,
      ref,
      ...rest,
    };

    if (isAnchor(href)) {
      return (
        <a {...linkProps} href={href}>
          {children}
        </a>
      );
    }

    return (
      <NextLink {...linkProps} href={href}>
        {children}
      </NextLink>
    );
  }
);

Link.displayName = "Link";
