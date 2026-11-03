"use client";

import { RefObject, useState } from "react";

import { Button } from "@/components/core/button";
import { Divider } from "@/components/core/divider";
import { Heading } from "@/components/core/heading";
import { Section } from "@/components/core/section";
import { Text } from "@/components/core/text";
import { Transition } from "@/components/core/transition";
import { useSiteTheme } from "@/hooks/use-site-theme";
import { useWindowSize } from "@/hooks/use-window-size";
import { cssProps, media } from "@/lib/style";
import { DeviceFrame } from "./device-frame";
import { KatakanaProject } from "./katakana";
import styles from "./project-summary.module.css";

type ProjectSummaryProps = {
  id: string;
  visible: boolean;
  sectionRef: RefObject<HTMLElement | null>;
  index: number;
  title: string;
  description: string;
  image: { src: string; alt: string };
  buttonText: string;
  buttonLink: string;
  alternate?: boolean;
};

export function ProjectSummary({
  id,
  visible: sectionVisible,
  sectionRef,
  index,
  title,
  description,
  image,
  buttonText,
  buttonLink,
  alternate,
  ...rest
}: ProjectSummaryProps) {
  const [focused, setFocused] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { theme } = useSiteTheme();
  const { width } = useWindowSize();
  const titleId = `${id}-title`;
  const isMobile = width <= media.tablet;
  const svgOpacity = theme === "light" ? 0.7 : 1;
  const indexText = index < 10 ? `0${index}` : index;
  const imageSizes = `(max-width: ${media.tablet}px) 80vw, 40vw`;

  function renderKatakana(visible: boolean) {
    return (
      <KatakanaProject
        data-visible={visible && imageLoaded}
        data-light={theme === "light"}
        style={cssProps({ opacity: svgOpacity })}
        className={styles.svg}
      />
    );
  }

  function renderDetails(visible: boolean) {
    return (
      <div className={styles.details}>
        <div aria-hidden className={styles.index}>
          <Divider
            notchWidth="64px"
            notchHeight="8px"
            collapsed={!visible}
            collapseDelay={1000}
          />
          <span className={styles.indexNumber} data-visible={visible}>
            {indexText}
          </span>
        </div>
        <Heading
          level={3}
          as="h2"
          className={styles.title}
          data-visible={visible}
          id={titleId}
        >
          {title}
        </Heading>
        <Text className={styles.description} data-visible={visible} as="p">
          {description}
        </Text>
        <div className={styles.button} data-visible={visible}>
          <Button iconHoverShift href={buttonLink} iconEnd="arrow-right">
            {buttonText}
          </Button>
        </div>
      </div>
    );
  }

  function renderPreview(visible: boolean) {
    return (
      <div className={styles.preview}>
        {renderKatakana(visible)}
        <div className={styles.model}>
          {visible && (
            <DeviceFrame
              src={image.src}
              alt={image.alt}
              visible={visible}
              sizes={imageSizes}
              onLoad={() => setImageLoaded(true)}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <Section
      className={styles.summary}
      data-alternate={alternate}
      data-first={index === 1}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      aria-labelledby={titleId}
      ref={sectionRef}
      id={id}
      tabIndex={-1}
      {...rest}
    >
      <div className={styles.content}>
        <Transition in={sectionVisible || focused}>
          {({ visible }) => (
            <>
              {!alternate && !isMobile && (
                <>
                  {renderDetails(visible)}
                  {renderPreview(visible)}
                </>
              )}
              {(alternate || isMobile) && (
                <>
                  {renderPreview(visible)}
                  {renderDetails(visible)}
                </>
              )}
            </>
          )}
        </Transition>
      </div>
    </Section>
  );
}
