"use client";

import { Fragment, RefObject, useState } from "react";

import { Button } from "@/components/core/button";
import { DecoderText } from "@/components/core/decoder-text";
import { Divider } from "@/components/core/divider";
import { Heading } from "@/components/core/heading";
import { Image } from "@/components/core/image";
import { Link } from "@/components/core/link";
import { Section } from "@/components/core/section";
import { Text } from "@/components/core/text";
import { Transition } from "@/components/core/transition";
import { siteConfig } from "@/config/site";
import { media } from "@/lib/style";
import { KatakanaProfile } from "./katakana";
import styles from "./profile.module.css";

const ProfileText = ({ visible, titleId }: { visible: boolean; titleId: string }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="Hi there" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I’m Darshan, a Bengaluru-based Engineer at{" "}
      <Link href={siteConfig.companyUrl}>{siteConfig.company}</Link>. I build the backend engines on Java, Spring Boot, and Kafka that power half a Million transactions daily. Low latency, high availability, zero excuses-engineered for peak scale. Dive into my {" "}
      <Link href="/experience">experience</Link> and{" "}
      <Link href="/skills">skills</Link>.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      Outside of work I’m usually reading about distributed-systems internals or
      tinkering with side projects. I’m always up for hearing about interesting
      backend problems, so feel free to drop me a line.
    </Text>
  </Fragment>
);

type ProfileProps = {
  id: string;
  visible: boolean;
  sectionRef: RefObject<HTMLElement | null>;
};

export const Profile = ({ id, visible, sectionRef }: ProfileProps) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {({ visible, nodeRef }) => (
          <div className={styles.content} ref={nodeRef as RefObject<HTMLDivElement>}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href="/contact"
                icon="send"
              >
                Send me a message
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  About me
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  cover
                  delay={100}
                  className={styles.profileImage}
                  src="/profile_1.jpg"
                  width={960}
                  height={960}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt={`${siteConfig.authorName} smiling at the camera`}
                />
                <KatakanaProfile className={styles.svg} data-visible={visible} />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
