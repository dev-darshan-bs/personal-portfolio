"use client";

import { RefObject } from "react";

import { Button } from "@/components/core/button";
import { DecoderText } from "@/components/core/decoder-text";
import { Divider } from "@/components/core/divider";
import { Footer } from "@/components/core/footer";
import { Heading } from "@/components/core/heading";
import { Icon } from "@/components/core/icon";
import { Section } from "@/components/core/section";
import { Text } from "@/components/core/text";
import { Transition } from "@/components/core/transition";
import { siteConfig } from "@/config/site";
import { cssProps, durations, numToMs } from "@/lib/style";
import styles from "./contact.module.css";

const initDelay = durations.s;

export const Contact = () => {
  const telHref = `tel:${siteConfig.phone.replace(/\s+/g, "")}`;
  const mailHref = `mailto:${siteConfig.email}`;

  return (
    <Section className={styles.contact}>
      <Transition in timeout={1600}>
        {({ status, nodeRef }) => (
          <div className={styles.form} ref={nodeRef as RefObject<HTMLDivElement>}>
            <Heading
              className={styles.title}
              data-status={status}
              level={3}
              as="h1"
              style={getDelay(durations.xs, initDelay, 0.3)}
            >
              <DecoderText text="Say hello" start={status !== "exited"} delay={300} />
            </Heading>
            <Divider
              className={styles.divider}
              data-status={status}
              style={getDelay(durations.xs, initDelay, 0.4)}
            />
            <Text
              className={styles.intro}
              data-status={status}
              size="l"
              as="p"
              style={getDelay(durations.xs, initDelay)}
            >
              Interested in discussing a backend problem, a role, or just want to
              say hi? Reach me directly on either of these and I’ll get back to
              you within a couple of days.
            </Text>
            <a
              className={styles.channel}
              data-status={status}
              style={getDelay(durations.s, initDelay)}
              href={mailHref}
            >
              <span className={styles.channelLabel}>
                <Icon icon="mail" /> Email
              </span>
              <span className={styles.channelValue}>{siteConfig.email}</span>
            </a>
            <a
              className={styles.channel}
              data-status={status}
              style={getDelay(durations.m, initDelay)}
              href={telHref}
            >
              <span className={styles.channelLabel}>
                <Icon icon="phone" /> Phone
              </span>
              <span className={styles.channelValue}>{siteConfig.phone}</span>
            </a>
            <div
              className={styles.actions}
              data-status={status}
              style={getDelay(durations.l, initDelay)}
            >
              <Button href={mailHref} icon="send">
                Send an email
              </Button>
              <Button
                secondary
                iconHoverShift
                href={siteConfig.resume}
                icon="document"
                target="_blank"
              >
                View resume
              </Button>
            </div>
          </div>
        )}
      </Transition>
      <Footer className={styles.footer} />
    </Section>
  );
};

function getDelay(delayMs: number, offset = 0, multiplier = 1) {
  const numDelay = delayMs * multiplier;
  return cssProps({ delay: numToMs(Number((offset + numDelay).toFixed(0))) });
}
