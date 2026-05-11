import * as React from "react";

const MOTION_ONLY_PROPS = new Set([
  "animate",
  "exit",
  "initial",
  "layout",
  "layoutId",
  "transition",
  "variants",
  "viewport",
  "whileHover",
  "whileInView",
  "whileTap",
]);

function createMotionElement(tag: string) {
  return React.forwardRef<HTMLElement, Record<string, unknown>>(function MotionElement(
    props,
    ref,
  ) {
    const cleanProps: Record<string, unknown> = {};

    Object.entries(props).forEach(([key, value]) => {
      if (!MOTION_ONLY_PROPS.has(key)) {
        cleanProps[key] = value;
      }
    });

    return React.createElement(tag, { ...cleanProps, ref });
  });
}

export const motion = new Proxy(
  {},
  {
    get(_target, tag: string) {
      return createMotionElement(tag);
    },
  },
) as Record<string, ReturnType<typeof createMotionElement>>;

export const AnimatePresence = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
