import Link from "next/link";
import { ReactNode } from "react";

import { Button } from "@/components/core/button";
import { DecoderText } from "@/components/core/decoder-text";
import { Divider } from "@/components/core/divider";
import { Heading } from "@/components/core/heading";
import { Image } from "@/components/core/image";
import { Section } from "@/components/core/section";
import { Text } from "@/components/core/text";
import { classes, cssProps } from "@/lib/style";
import styles from "./entry.module.css";

export type EntryData = {
  href: string;
  label: string;
  title: string;
  abstract: string;
  cta: string;
  meta?: string;
  tag?: string;
  image?: { src: string; alt: string; width: number; height: number };
};

type EntryRowProps = EntryData & { index?: number };

/** A single row in an entry list (project, role, article). */
export function EntryRow({
  href,
  label,
  title,
  abstract,
  cta,
  meta,
  index,
}: EntryRowProps) {
  return (
    <article
      className={styles.post}
      data-featured="false"
      style={index !== undefined ? cssProps({ delay: index * 100 + 200 }) : undefined}
    >
      <Link href={href} className={styles.postLink}>
        <div className={styles.postDetails}>
          <div aria-hidden className={styles.postDate}>
            <Divider notchWidth="64px" notchHeight="8px" />
            {label}
          </div>
          <Heading as="h2" level={4}>
            {title}
          </Heading>
          <Text size="s" as="p">
            {abstract}
          </Text>
          <div className={styles.postFooter}>
            <Button secondary iconHoverShift icon="chevron-right" as="div">
              {cta}
            </Button>
            {meta && (
              <Text className={styles.timecode} size="s">
                {meta}
              </Text>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}

/** The large, sticky featured entry. */
export function FeaturedEntry({
  href,
  label,
  title,
  abstract,
  cta,
  meta,
  tag,
  image,
}: EntryData) {
  return (
    <article className={classes(styles.post, styles.featured)} data-featured="true">
      <Text className={styles.postLabel} size="s">
        Featured
      </Text>
      {!!image && (
        <div className={styles.postImage}>
          <Image
            cover
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 1190px) 100vw, 55vw"
            className={styles.postImageInner}
          />
        </div>
      )}
      <Link href={href} className={styles.postLink}>
        <div className={styles.postDetails}>
          <div aria-hidden className={styles.postDate}>
            <Divider notchWidth="64px" notchHeight="8px" />
            {label}
          </div>
          <Heading as="h2" level={2}>
            {title}
          </Heading>
          <Text size="l" as="p">
            {abstract}
          </Text>
          <div className={styles.postFooter}>
            <Button secondary iconHoverShift icon="chevron-right" as="div">
              {cta}
            </Button>
            {meta && (
              <Text className={styles.timecode} size="s">
                {meta}
              </Text>
            )}
          </div>
        </div>
      </Link>
      {tag && (
        <Text aria-hidden className={styles.postTag} size="s">
          {tag}
        </Text>
      )}
    </article>
  );
}

/** Placeholder row used when a list has no entries yet. */
export function SkeletonEntry({ index, label = "Coming soon..." }: { index: number; label?: string }) {
  return (
    <article
      aria-hidden="true"
      className={classes(styles.post, styles.skeleton)}
      data-featured="false"
      style={cssProps({ delay: index * 100 + 200 })}
    >
      <div className={styles.postLink}>
        <div className={styles.postDetails}>
          <div aria-hidden className={styles.postDate}>
            <Divider notchWidth="64px" notchHeight="8px" />
            {label}
          </div>
          <Heading
            className={styles.skeletonBone}
            as="h2"
            level={4}
            style={{ height: 24, width: "70%" }}
          />
          <Text
            className={styles.skeletonBone}
            size="s"
            as="p"
            style={{ height: 90, width: "100%" }}
          />
          <div className={styles.postFooter}>
            <Button secondary iconHoverShift icon="chevron-right" as="div">
              Read more
            </Button>
            <Text className={styles.timecode} size="s">
              00:00:00:00
            </Text>
          </div>
        </div>
      </div>
    </article>
  );
}

type EntryGridProps = {
  heading: string;
  featured?: ReactNode;
  children: ReactNode;
};

/**
 * Two column layout: a list of entries beside a sticky featured entry. Falls
 * back to a single column (header, featured, list) on narrow viewports.
 */
export function EntryGrid({ heading, featured, children }: EntryGridProps) {
  return (
    <Section className={styles.content}>
      <div className={styles.grid} data-has-featured={!!featured}>
        <header className={styles.header}>
          <Heading className={styles.heading} level={5} as="h1">
            <DecoderText text={heading} />
          </Heading>
          <Barcode className={styles.barcode} />
        </header>
        {featured}
        <div className={styles.list}>{children}</div>
      </div>
    </Section>
  );
}

export function EntryPage({ children }: { children: ReactNode }) {
  return <article className={styles.articles}>{children}</article>;
}

function Barcode({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="153"
      height="20"
      fill="currentColor"
      viewBox="0 0 153 20"
    >
      <path
        fillOpacity=".6"
        d="M153 0v20h-2V0h2Zm-4 0v20h-4V0h4Zm-6 0v20h-2V0h2Zm-4 4v3h-2V4h2Zm-5 0V0h3v4h-3Zm-2 0h2v6h-2V4Zm0 0h-2V0h2v4Zm-4-4v4h-4v5h-2v4h-5V9h3V6h-5V0h13Zm-11 13v3h-2v-3h2Zm-4-13v6h-2v4h2v4h-2v2h2v4h-4V0h4Zm-6 4V0h-2v4h2Zm-1 6V7h-4V4h-2V0h-2v4h-2V0H86v4h-2v3h-2v2h-2v4h6v3h-2v4h6v-4h-2v-3h-2V9h-2V7h4V4h3v9h2v7h7v-4h-5v-3h-2V9h2V7h3v3h2v4h6v-4ZM74 7v3h-2v2h2v8h-4V0h8v5h-3V4h-3v3h2Zm28 13h4v-4h-4v4Zm28-6v-4h-2v6h2v4h2v-6h-2Zm9 2v-6h-2v6h-2v4h4v-4Zm-12 4v-4h-4v4h4ZM0 20h2V0H0v20Zm4 0h4V0H4v20Zm6 0h2V0h-2v20Zm5 0h7V0h-7v20Zm12 0h-3V0h3v20Zm5 0h3v-4h5v-6h-5V6h7V3h3V0h-7v3h-3V0h-3v20ZM52 3v3h-3v3h-4V6h1V3h6Zm23 13h6v4h-6v-4Zm-29-6v3h3v-3h3v3h-2v6h-3v-3h-2v-3h-2v-3h3Zm8 6v3h-2v-3h2Zm3 0v3h2v-3h2v-3h-2v3h-2Zm0 0v-6h-3v6h3Zm4-7V6h2V0h-2v6h-2v3h2Zm5-3v3h-2V6h2Zm2 0h-2V3h2v3Zm-9-3V0h-2v3h2Z"
      />
    </svg>
  );
}
