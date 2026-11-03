"use client";

import { useReducedMotion, useSpring } from "framer-motion";
import { ComponentPropsWithoutRef, memo, useEffect, useRef } from "react";

import { delay } from "@/lib/delay";
import { classes } from "@/lib/style";
import styles from "./decoder-text.module.css";
import { VisuallyHidden } from "./visually-hidden";

// prettier-ignore
const glyphs = [
  'ア', 'イ', 'ウ', 'エ', 'オ',
  'カ', 'キ', 'ク', 'ケ', 'コ',
  'サ', 'シ', 'ス', 'セ', 'ソ',
  'タ', 'チ', 'ツ', 'テ', 'ト',
  'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
  'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
  'マ', 'ミ', 'ム', 'メ', 'モ',
  'ヤ', 'ユ', 'ヨ', 'ー',
  'ラ', 'リ', 'ル', 'レ', 'ロ',
  'ワ', 'ヰ', 'ヱ', 'ヲ', 'ン',
  'ガ', 'ギ', 'グ', 'ゲ', 'ゴ',
  'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ',
  'ダ', 'ヂ', 'ヅ', 'デ', 'ド',
  'バ', 'ビ', 'ブ', 'ベ', 'ボ',
  'パ', 'ピ', 'プ', 'ペ', 'ポ',
];

type CharType = "glyph" | "value";
type OutputChar = { type: CharType; value: string };

function shuffle(content: string[], output: OutputChar[], position: number) {
  return content.map((value, index): OutputChar => {
    if (index < position) {
      return { type: "value", value };
    }

    if (position % 1 < 0.5) {
      const rand = Math.floor(Math.random() * glyphs.length);
      return { type: "glyph", value: glyphs[rand] };
    }

    return { type: "glyph", value: output[index]?.value ?? "" };
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

type DecoderTextProps = {
  text: string;
  start?: boolean;
  delay?: number;
  className?: string;
} & ComponentPropsWithoutRef<"span">;

export const DecoderText = memo(function DecoderText({
  text,
  start = true,
  delay: startDelay = 0,
  className,
  ...rest
}: DecoderTextProps) {
  const output = useRef<OutputChar[]>([{ type: "glyph", value: "" }]);
  const container = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const decoderSpring = useSpring(0, { stiffness: 8, damping: 5 });

  useEffect(() => {
    const containerInstance = container.current;
    const content = text.split("");

    const renderOutput = () => {
      if (!containerInstance) return;
      const characterMap = output.current.map((item) => {
        return `<span class="${styles[item.type]}">${escapeHtml(item.value)}</span>`;
      });

      containerInstance.innerHTML = characterMap.join("");
    };

    const unsubscribeSpring = decoderSpring.on("change", (value: number) => {
      output.current = shuffle(content, output.current, value);
      renderOutput();
    });

    const startSpring = async () => {
      await delay(startDelay);
      decoderSpring.set(content.length);
    };

    if (start && !reduceMotion) {
      startSpring();
    }

    if (reduceMotion) {
      output.current = content.map((value) => ({ type: "value", value }));
      renderOutput();
    }

    return () => {
      unsubscribeSpring?.();
    };
  }, [decoderSpring, reduceMotion, start, startDelay, text]);

  return (
    <span className={classes(styles.text, className)} {...rest}>
      <VisuallyHidden className={styles.label}>{text}</VisuallyHidden>
      <span aria-hidden className={styles.content} ref={container} />
    </span>
  );
});
