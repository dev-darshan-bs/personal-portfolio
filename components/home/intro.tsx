"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { MouseEvent, RefObject, useEffect, useState } from "react";

import { DecoderText } from "@/components/core/decoder-text";
import { Heading } from "@/components/core/heading";
import { Section } from "@/components/core/section";
import { Transition } from "@/components/core/transition";
import { VisuallyHidden } from "@/components/core/visually-hidden";
import { siteConfig } from "@/config/site";
import { useHydrated } from "@/hooks/use-hydrated";
import { useInterval } from "@/hooks/use-interval";
import { usePrevious } from "@/hooks/use-previous";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";
import { useSiteTheme } from "@/hooks/use-site-theme";
import { cssProps } from "@/lib/style";
import styles from "./intro.module.css";

const DisplacementSphere = dynamic(
  () => import("./displacement-sphere").then((mod) => mod.DisplacementSphere),
  { ssr: false }
);

type IntroProps = {
  id: string;
  sectionRef: RefObject<HTMLElement | null>;
  scrollIndicatorHidden: boolean;
};

export function Intro({ id, sectionRef, scrollIndicatorHidden, ...rest }: IntroProps) {
  const { theme } = useSiteTheme();
  const { role, disciplines, authorName } = siteConfig;
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const prevTheme = usePrevious(theme);
  const introLabel = [disciplines.slice(0, -1).join(", "), disciplines.slice(-1)[0]].join(
    ", and "
  );
  const currentDiscipline = disciplines.find((item, index) => index === disciplineIndex);
  const titleId = `${id}-title`;
  const scrollToHash = useScrollToHash();
  const isHydrated = useHydrated();

  useInterval(
    () => {
      const index = (disciplineIndex + 1) % disciplines.length;
      setDisciplineIndex(index);
    },
    5000,
    theme
  );

  useEffect(() => {
    if (prevTheme && prevTheme !== theme) {
      setDisciplineIndex(0);
    }
  }, [theme, prevTheme]);

  const handleScrollClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToHash(event.currentTarget.href);
  };

  return (
    <Section
      className={styles.intro}
      as="section"
      ref={sectionRef}
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      {...rest}
    >
      <Transition in key={theme} timeout={3000}>
        {({ visible, status }) => (
          <>
            {isHydrated && <DisplacementSphere />}
            <header className={styles.text}>
              <h1 className={styles.name} data-visible={visible} id={titleId}>
                <DecoderText text={authorName} delay={500} />
              </h1>
              <Heading level={0} as="h2" className={styles.title}>
                <VisuallyHidden className={styles.label}>
                  {`${role} + ${introLabel}`}
                </VisuallyHidden>
                <span aria-hidden className={styles.row}>
                  <span
                    className={styles.word}
                    data-status={status}
                    style={cssProps({ delay: "200ms" })}
                  >
                    {role}
                  </span>
                  <span className={styles.line} data-status={status} />
                </span>
                <div className={styles.row}>
                  {disciplines.map((item) => (
                    <Transition
                      unmount
                      in={item === currentDiscipline}
                      timeout={{ enter: 3000, exit: 2000 }}
                      key={item}
                    >
                      {({ status, nodeRef }) => (
                        <span
                          aria-hidden
                          ref={nodeRef as RefObject<HTMLSpanElement>}
                          className={styles.word}
                          data-plus={true}
                          data-status={status}
                          style={cssProps({ delay: "600ms" })}
                        >
                          {item}
                        </span>
                      )}
                    </Transition>
                  ))}
                </div>
              </Heading>
            </header>
            <Link
              href="/#project-1"
              className={styles.scrollIndicator}
              data-status={status}
              data-hidden={scrollIndicatorHidden}
              onClick={handleScrollClick}
            >
              <VisuallyHidden>Scroll to projects</VisuallyHidden>
            </Link>
            <Link
              href="/#project-1"
              className={styles.mobileScrollIndicator}
              data-status={status}
              data-hidden={scrollIndicatorHidden}
              onClick={handleScrollClick}
            >
              <VisuallyHidden>Scroll to projects</VisuallyHidden>
              <svg
                aria-hidden
                stroke="currentColor"
                width="43"
                height="15"
                viewBox="0 0 43 15"
              >
                <path d="M1 1l20.5 12L42 1" strokeWidth="2" fill="none" />
              </svg>
            </Link>
          </>
        )}
      </Transition>
    </Section>
  );
}
