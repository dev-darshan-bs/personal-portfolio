"use client";

import NextImage from "next/image";
import { ComponentPropsWithoutRef, useCallback, useRef, useState } from "react";

import { useInViewport } from "@/hooks/use-in-viewport";
import { classes, cssProps, numToMs } from "@/lib/style";
import styles from "./image.module.css";

type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  reveal?: boolean;
  delay?: number;
  raised?: boolean;
  cover?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
  className?: string;
  imageClassName?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "children">;

/**
 * Image with a lazy reveal animation (accent wipe) when it enters the viewport.
 */
export const Image = ({
  className,
  imageClassName,
  style,
  reveal,
  delay = 0,
  raised,
  cover,
  src,
  alt,
  width,
  height,
  sizes,
  priority,
  unoptimized,
  ...rest
}: ImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inViewport = useInViewport(containerRef, true);
  const isSvg = src.endsWith(".svg");

  const onLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <div
      className={classes(styles.image, className)}
      data-visible={inViewport || loaded}
      data-reveal={reveal}
      data-raised={raised}
      style={cssProps({ delay: numToMs(delay) }, style)}
      ref={containerRef}
      {...rest}
    >
      <div
        className={styles.elementWrapper}
        data-reveal={reveal}
        data-visible={inViewport || loaded}
        style={cssProps({ delay: numToMs(delay + 1000) })}
      >
        <NextImage
          className={classes(styles.element, imageClassName)}
          data-loaded={loaded}
          data-cover={cover}
          onLoad={onLoad}
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          unoptimized={unoptimized ?? isSvg}
        />
      </div>
    </div>
  );
};
