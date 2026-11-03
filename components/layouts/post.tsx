"use client";

import { MouseEvent, ReactNode, RefObject } from "react";

import { Button } from "@/components/core/button";
import { Divider } from "@/components/core/divider";
import { Footer } from "@/components/core/footer";
import { Heading } from "@/components/core/heading";
import { Image } from "@/components/core/image";
import { Section } from "@/components/core/section";
import { Text } from "@/components/core/text";
import { Transition } from "@/components/core/transition";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";
import { cssProps, durations, numToMs } from "@/lib/style";
import { formatDate } from "@/lib/utils";
import styles from "./post.module.css";

type PostProps = {
  title: string;
  date: string;
  banner?: string;
  readingTime?: number;
  tags?: string[];
  children: ReactNode;
};

export const Post = ({ children, title, date, banner, readingTime, tags }: PostProps) => {
  const scrollToHash = useScrollToHash();
  const words = title.split(" ");

  const handleScrollIndicatorClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToHash(event.currentTarget.href);
  };

  return (
    <article className={styles.post}>
      <Section>
        {banner && (
          <div className={styles.banner}>
            <div className={styles.bannerImage}>
              <Image
                cover
                priority
                src={banner}
                alt=""
                width={1600}
                height={900}
                sizes="100vw"
                className={styles.bannerImageInner}
              />
            </div>
          </div>
        )}
        <header className={styles.header}>
          <div className={styles.headerText}>
            <Transition in timeout={durations.m}>
              {({ visible, nodeRef }) => (
                <div className={styles.date} ref={nodeRef as RefObject<HTMLDivElement>}>
                  <Divider notchWidth="64px" notchHeight="8px" collapsed={!visible} />
                  <Text className={styles.dateText} data-visible={visible}>
                    {formatDate(date)}
                  </Text>
                </div>
              )}
            </Transition>
            <Heading level={2} as="h1" className={styles.title} aria-label={title}>
              {words.map((word, index) => (
                <span className={styles.titleWordWrapper} key={`${word}-${index}`}>
                  <span
                    className={styles.titleWord}
                    style={cssProps({ delay: numToMs(index * 100 + 100) })}
                  >
                    {word}
                    {index !== words.length - 1 ? " " : ""}
                  </span>
                </span>
              ))}
            </Heading>
            <div className={styles.details}>
              <a
                href="#postContent"
                className={styles.arrow}
                aria-label="Scroll to post content"
                onClick={handleScrollIndicatorClick}
              >
                <svg
                  aria-hidden
                  stroke="currentColor"
                  width="43"
                  height="15"
                  viewBox="0 0 43 15"
                >
                  <path d="M1 1l20.5 12L42 1" strokeWidth="2" fill="none" />
                </svg>
              </a>
              <div className={styles.timecode}>
                {readingTime ? `${readingTime} min read` : tags?.slice(0, 2).join(" · ")}
              </div>
            </div>
          </div>
        </header>
      </Section>
      <Section className={styles.wrapper} id="postContent" tabIndex={-1}>
        <Text as="div" size="l" className={styles.content}>
          {children}
          <div className={styles.footerNav}>
            <Button secondary iconHoverShift icon="arrow-left" href="/blogs">
              All articles
            </Button>
          </div>
        </Text>
      </Section>
      <Footer />
    </article>
  );
};
