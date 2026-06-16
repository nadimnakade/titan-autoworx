import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollReveal — wraps content and reveals it on scroll with optional mask/slide.
 */
export function ScrollReveal({
  children,
  className,
  y = 60,
  duration = 1.1,
  ease = "expo.out",
  delay = 0,
  stagger = 0,
  start = "top 85%",
  as: Tag = "div",
  once = true,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  ease?: string;
  delay?: number;
  stagger?: number;
  start?: string;
  as?: "div" | "section" | "span" | "p";
  once?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = stagger
      ? el.querySelectorAll<HTMLElement>("[data-reveal]")
      : [el];

    const anim = gsap.fromTo(
      targets,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        ease,
        delay,
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
          once,
        },
      },
    );
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [y, duration, ease, delay, stagger, start, once]);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
