import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type SplitType = "chars" | "words" | "lines";

/**
 * GSAP SplitText — character/word/line animation.
 */
export function SplitText({
  text,
  className,
  type = "chars",
  delay = 0,
  stagger = 0.03,
  duration = 0.9,
  ease = "expo.out",
  y = 80,
  trigger = false,
  as: Tag = "h1",
  triggerStart = "top 80%",
}: {
  text: string;
  className?: string;
  type?: SplitType;
  delay?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
  y?: number;
  trigger?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  triggerStart?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const units =
      type === "chars"
        ? [...text]
        : type === "words"
          ? text.split(" ")
          : text.split("\n");

    el.innerHTML = units
      .map((u) => {
        if (u === " ") return `<span class="inline-block">&nbsp;</span>`;
        if (u === "\n") return `<br />`;
        return `<span class="split-unit inline-block" style="will-change: transform; opacity: 0;">${u}</span>`;
      })
      .join(" ");

    const targets = el.querySelectorAll<HTMLElement>(".split-unit");

    const animConfig = {
      y: 0,
      opacity: 1,
      duration,
      ease,
      stagger,
      delay,
    };

    if (trigger) {
      const st = ScrollTrigger.create({
        trigger: el,
        start: triggerStart,
        once: true,
        onEnter: () => gsap.to(targets, animConfig),
      });
      return () => st.kill();
    } else {
      gsap.to(targets, animConfig);
    }
  }, [text, type, delay, stagger, duration, ease, y, trigger, triggerStart]);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn("split-text", className)}
      style={{ display: "inline-block" }}
    >
      {text}
    </Tag>
  );
}
