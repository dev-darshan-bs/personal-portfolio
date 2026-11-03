"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import NextImage from "next/image";
import { MouseEvent, useCallback, useState } from "react";

import { Loader } from "@/components/core/loader";
import { classes, cssProps, numToMs } from "@/lib/style";
import styles from "./device-frame.module.css";

type DeviceFrameProps = {
  src: string;
  alt: string;
  visible: boolean;
  showDelay?: number;
  sizes?: string;
  className?: string;
  onLoad?: () => void;
};

const springConfig = { stiffness: 60, damping: 18, mass: 1 };

/**
 * A stylised laptop frame that stands in for the 3D device models of the
 * reference design. Tilts slightly toward the cursor and slides in on reveal.
 */
export const DeviceFrame = ({
  src,
  alt,
  visible,
  showDelay = 700,
  sizes,
  className,
  onLoad,
}: DeviceFrameProps) => {
  const [loaded, setLoaded] = useState(false);
  const reduceMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, springConfig);
  const springY = useSpring(rotateY, springConfig);

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(x * 10);
      rotateX.set(-y * 8);
    },
    [reduceMotion, rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  const handleLoad = () => {
    setLoaded(true);
    onLoad?.();
  };

  return (
    <div
      className={classes(styles.frame, className)}
      data-visible={visible}
      data-loaded={loaded}
      style={cssProps({ delay: numToMs(showDelay) })}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {!loaded && <Loader center className={styles.loader} data-visible={visible} />}
      <motion.div
        className={styles.device}
        style={{ rotateX: springX, rotateY: springY }}
      >
        <div className={styles.screen}>
          <div className={styles.bezel}>
            <NextImage
              className={styles.image}
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              unoptimized={src.endsWith(".svg")}
              onLoad={handleLoad}
            />
            <div className={styles.glare} />
          </div>
        </div>
        <div className={styles.base}>
          <div className={styles.notch} />
        </div>
        <div className={styles.shadow} />
      </motion.div>
    </div>
  );
};
