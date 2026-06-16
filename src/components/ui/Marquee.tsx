import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite Marquee — duplicates children for seamless loop.
 */
export function Marquee({
  children,
  className,
  reverse = false,
  speed = 30,
  pauseOnHover = false,
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  speed?: number;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--duration:30s] [--gap:2rem] [gap:var(--gap)]",
        className,
      )}
      style={{ ["--duration" as string]: `${speed}s` } as React.CSSProperties}
    >
      <div
        className={cn(
          "flex shrink-0 [gap:var(--gap)]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 [gap:var(--gap)]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{ animationDuration: `${speed}s` }}
        aria-hidden
      >
        {children}
      </div>
    </div>
  );
}
