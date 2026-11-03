"use client";

import { Button } from "@/components/core/button";
import { DecoderText } from "@/components/core/decoder-text";
import { Heading } from "@/components/core/heading";
import { Text } from "@/components/core/text";
import { Transition } from "@/components/core/transition";
import styles from "./error-page.module.css";

type ErrorPageProps = {
  status?: number | string;
  summary: string;
  message: string;
};

export function ErrorPage({ status = 404, summary, message }: ErrorPageProps) {
  return (
    <section className={styles.page}>
      <Transition in>
        {({ visible }) => (
          <>
            <div className={styles.details}>
              <div className={styles.text}>
                <Heading
                  className={styles.title}
                  data-visible={visible}
                  level={0}
                  weight="bold"
                >
                  {status}
                </Heading>
                <Heading
                  aria-hidden
                  className={styles.subheading}
                  data-visible={visible}
                  as="h2"
                  level={4}
                >
                  <DecoderText text={summary} start={visible} delay={300} />
                </Heading>
                <Text className={styles.description} data-visible={visible} as="p">
                  {message}
                </Text>
                <Button
                  secondary
                  iconHoverShift
                  className={styles.button}
                  data-visible={visible}
                  href="/"
                  icon="chevron-right"
                >
                  Back to homepage
                </Button>
              </div>
            </div>
            <div className={styles.visual} data-visible={visible} aria-hidden>
              <div className={styles.visualInner}>
                <span className={styles.glyph}>ア</span>
                <span className={styles.glyph}>ノ</span>
                <span className={styles.glyph}>マ</span>
                <span className={styles.glyph}>リ</span>
              </div>
            </div>
          </>
        )}
      </Transition>
    </section>
  );
}
