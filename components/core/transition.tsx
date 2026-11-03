"use client";

import { AnimatePresence, usePresence } from "framer-motion";
import { MutableRefObject, ReactNode, RefObject, useEffect, useRef, useState } from "react";

export type TransitionStatus = "entering" | "entered" | "exiting" | "exited";

export type TransitionRenderProps = {
  visible: boolean;
  status: TransitionStatus;
  nodeRef: RefObject<HTMLElement | null>;
};

type TransitionProps = {
  in?: boolean;
  unmount?: boolean;
  initial?: boolean;
  timeout?: number | { enter: number; exit: number };
  onEnter?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExited?: () => void;
  nodeRef?: RefObject<HTMLElement | null>;
  children: (props: TransitionRenderProps) => ReactNode;
};

type TimeoutRef = MutableRefObject<ReturnType<typeof setTimeout> | undefined>;

/**
 * A lightweight Framer Motion `AnimatePresence` implementation of
 * `react-transition-group` to be used for simple vanilla css transitions
 */
export const Transition = ({
  children,
  in: show = false,
  unmount,
  initial = true,
  ...props
}: TransitionProps) => {
  const enterTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const exitTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (show) {
      clearTimeout(exitTimeout.current);
    } else {
      clearTimeout(enterTimeout.current);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {(show || !unmount) && (
        <TransitionContent
          enterTimeout={enterTimeout}
          exitTimeout={exitTimeout}
          in={show}
          initial={initial}
          {...props}
        >
          {children}
        </TransitionContent>
      )}
    </AnimatePresence>
  );
};

type TransitionContentProps = Omit<TransitionProps, "unmount"> & {
  enterTimeout: TimeoutRef;
  exitTimeout: TimeoutRef;
  initial: boolean;
};

const TransitionContent = ({
  children,
  timeout = 0,
  enterTimeout,
  exitTimeout,
  onEnter,
  onEntered,
  onExit,
  onExited,
  initial,
  nodeRef: defaultNodeRef,
  in: show,
}: TransitionContentProps) => {
  const [status, setStatus] = useState<TransitionStatus>(
    initial ? "exited" : "entered"
  );
  const [isPresent, safeToRemove] = usePresence();
  const [hasEntered, setHasEntered] = useState(initial ? false : true);
  const splitTimeout = typeof timeout === "object";
  const internalNodeRef = useRef<HTMLElement | null>(null);
  const nodeRef = defaultNodeRef || internalNodeRef;
  const visible = hasEntered && show ? isPresent : false;

  useEffect(() => {
    if (hasEntered || !show) return;

    const actualTimeout = splitTimeout ? timeout.enter : timeout;

    clearTimeout(enterTimeout.current);
    clearTimeout(exitTimeout.current);

    setHasEntered(true);
    setStatus("entering");
    onEnter?.();

    // Force reflow
    void nodeRef.current?.offsetHeight;

    enterTimeout.current = setTimeout(() => {
      setStatus("entered");
      onEntered?.();
    }, actualTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onEnter, onEntered, timeout, status, show]);

  useEffect(() => {
    if (isPresent && show) return;

    const actualTimeout = splitTimeout ? timeout.exit : timeout;

    clearTimeout(enterTimeout.current);
    clearTimeout(exitTimeout.current);

    setStatus("exiting");
    onExit?.();

    // Force reflow
    void nodeRef.current?.offsetHeight;

    exitTimeout.current = setTimeout(() => {
      setStatus("exited");
      safeToRemove?.();
      onExited?.();
    }, actualTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPresent, onExit, safeToRemove, timeout, onExited, show]);

  return <>{children({ visible, status, nodeRef })}</>;
};
