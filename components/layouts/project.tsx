"use client";

import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";

import { Button } from "@/components/core/button";
import { Heading } from "@/components/core/heading";
import { Image } from "@/components/core/image";
import { Section } from "@/components/core/section";
import { Text } from "@/components/core/text";
import { classes, cssProps, numToMs } from "@/lib/style";
import styles from "./project.module.css";

const initDelay = 300;

type ProjectHeaderProps = {
  title: string;
  description: string;
  linkLabel?: string;
  url?: string;
  roles?: string[];
  className?: string;
  children?: ReactNode;
};

export function ProjectHeader({
  title,
  description,
  linkLabel = "Visit website",
  url,
  roles,
  className,
  children,
}: ProjectHeaderProps) {
  return (
    <Section className={classes(styles.header, className)} as="section">
      <div
        className={styles.headerContent}
        style={cssProps({ initDelay: numToMs(initDelay) })}
      >
        <div className={styles.details}>
          <Heading className={styles.title} level={2} as="h1">
            {title}
          </Heading>
          <Text className={styles.description} size="xl" as="p">
            {description}
          </Text>
          {!!url && (
            <Button
              secondary
              iconHoverShift
              className={styles.linkButton}
              icon="chevron-right"
              href={url}
            >
              {linkLabel}
            </Button>
          )}
          {children}
        </div>
        {!!roles?.length && (
          <ul className={styles.meta}>
            {roles.map((role, index) => (
              <li
                className={styles.metaItem}
                style={cssProps({ delay: numToMs(initDelay + 300 + index * 140) })}
                key={role}
              >
                <Text secondary>{role}</Text>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}

export const ProjectContainer = ({
  className,
  ...rest
}: ComponentPropsWithoutRef<"article">) => (
  <article className={classes(styles.project, className)} {...rest} />
);

type ProjectSectionProps = {
  light?: boolean;
  padding?: "none" | "both" | "top" | "bottom";
  fullHeight?: boolean;
  className?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<"section">;

export const ProjectSection = forwardRef<HTMLElement, ProjectSectionProps>(
  ({ className, light, padding = "both", fullHeight, children, ...rest }, ref) => (
    <section
      className={classes(styles.section, className)}
      data-light={light}
      data-full-height={fullHeight}
      ref={ref}
      {...rest}
    >
      <Section className={styles.sectionInner} data-padding={padding}>
        {children}
      </Section>
    </section>
  )
);

ProjectSection.displayName = "ProjectSection";

type ProjectImageProps = {
  className?: string;
  alt: string;
  src: string;
  width: number;
  height: number;
  sizes?: string;
  raised?: boolean;
  priority?: boolean;
};

export const ProjectImage = ({ className, alt, ...rest }: ProjectImageProps) => (
  <div className={classes(styles.image, className)}>
    <Image reveal alt={alt} delay={300} {...rest} />
  </div>
);

export const ProjectSectionContent = ({
  className,
  width = "l",
  ...rest
}: { width?: "l" | "xl" | "full" } & ComponentPropsWithoutRef<"div">) => (
  <div
    className={classes(styles.sectionContent, className)}
    data-width={width}
    {...rest}
  />
);

export const ProjectSectionHeading = ({
  className,
  level = 3,
  as = "h2",
  ...rest
}: {
  className?: string;
  level?: 0 | 1 | 2 | 3 | 4 | 5;
  as?: "h1" | "h2" | "h3" | "h4";
  children?: ReactNode;
}) => (
  <Heading
    className={classes(styles.sectionHeading, className)}
    as={as}
    level={level}
    align="auto"
    {...rest}
  />
);

export const ProjectSectionText = ({
  className,
  as = "p",
  ...rest
}: { className?: string; as?: "p" | "div"; children?: ReactNode }) => (
  <Text className={classes(styles.sectionText, className)} size="l" as={as} {...rest} />
);

type ProjectTextRowProps = {
  center?: boolean;
  stretch?: boolean;
  justify?: "start" | "center" | "end";
  width?: "s" | "m" | "l";
  noMargin?: boolean;
  centerMobile?: boolean;
  className?: string;
} & ComponentPropsWithoutRef<"div">;

export const ProjectTextRow = ({
  center,
  stretch,
  justify = "center",
  width = "m",
  noMargin,
  className,
  centerMobile,
  ...rest
}: ProjectTextRowProps) => (
  <div
    className={classes(styles.textRow, className)}
    data-center={center}
    data-stretch={stretch}
    data-center-mobile={centerMobile}
    data-no-margin={noMargin}
    data-width={width}
    data-justify={justify}
    {...rest}
  />
);

export const ProjectSectionColumns = ({
  className,
  centered,
  ...rest
}: { centered?: boolean } & ComponentPropsWithoutRef<"div">) => (
  <ProjectSectionContent
    className={classes(styles.sectionColumns, className)}
    data-centered={centered}
    {...rest}
  />
);

/** Small label chips (tech stack, skills, categories). */
export const ProjectTags = ({
  tags,
  className,
}: {
  tags: string[];
  className?: string;
}) => (
  <ul className={classes(styles.tags, className)}>
    {tags.map((tag) => (
      <li key={tag} className={styles.tag}>
        {tag}
      </li>
    ))}
  </ul>
);
