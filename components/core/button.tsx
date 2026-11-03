"use client";

import NextLink from "next/link";
import { ComponentPropsWithoutRef, ElementType, ReactNode, RefObject, forwardRef } from "react";

import { classes } from "@/lib/style";
import styles from "./button.module.css";
import { Icon, IconName } from "./icon";
import { Loader } from "./loader";
import { Transition } from "./transition";

function isExternalLink(href?: string) {
  return !!href && /^(https?:)?\/\/|^mailto:|^tel:/.test(href);
}

export type ButtonProps = {
  href?: string;
  as?: ElementType;
  secondary?: boolean;
  loading?: boolean;
  loadingText?: string;
  icon?: IconName;
  iconEnd?: IconName;
  iconHoverShift?: boolean;
  iconOnly?: boolean;
  className?: string;
  children?: ReactNode;
  target?: string;
  rel?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
} & Omit<ComponentPropsWithoutRef<"button">, "type"> &
  Omit<ComponentPropsWithoutRef<"a">, "href" | "type">;

export const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      className,
      as,
      secondary,
      loading,
      loadingText = "loading",
      icon,
      iconEnd,
      iconHoverShift,
      iconOnly,
      children,
      rel,
      target,
      href,
      disabled,
      ...rest
    },
    ref
  ) => {
    const isExternal = isExternalLink(href);
    const isInternalLink = !!href && !isExternal;
    const defaultComponent = href ? "a" : "button";
    const Component: ElementType = as || (isInternalLink ? NextLink : defaultComponent);

    return (
      <Component
        className={classes(styles.button, className)}
        data-loading={loading}
        data-icon-only={iconOnly}
        data-secondary={secondary}
        data-icon={icon}
        href={href}
        rel={rel || (isExternal ? "noopener noreferrer" : undefined)}
        target={target || (isExternal && !/^(mailto|tel):/.test(href!) ? "_blank" : undefined)}
        disabled={disabled}
        ref={ref}
        {...rest}
      >
        {!!icon && (
          <Icon
            className={styles.icon}
            data-start={!iconOnly}
            data-shift={iconHoverShift}
            icon={icon}
          />
        )}
        {!!children && <span className={styles.text}>{children}</span>}
        {!!iconEnd && (
          <Icon
            className={styles.icon}
            data-end={!iconOnly}
            data-shift={iconHoverShift}
            icon={iconEnd}
          />
        )}
        <Transition unmount in={!!loading}>
          {({ visible, nodeRef }) => (
            <Loader
              ref={nodeRef as RefObject<HTMLDivElement>}
              className={styles.loader}
              width={32}
              text={loadingText}
              data-visible={visible}
            />
          )}
        </Transition>
      </Component>
    );
  }
);

Button.displayName = "Button";
