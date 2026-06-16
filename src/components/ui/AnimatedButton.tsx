import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

/**
 * Animated Button with hover-reactive effects.
 */
export function AnimatedButton({
  children,
  onClick,
  className,
  variant = "primary",
  icon,
  href,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "ghost" | "outline";
  icon?: React.ReactNode;
  href?: string;
}) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const fillRef = useRef<HTMLSpanElement | null>(null);

  const onEnter = () => {
    gsap.to(fillRef.current, { scaleX: 1, duration: 0.5, ease: "expo.out" });
  };
  const onLeave = () => {
    gsap.to(fillRef.current, { scaleX: 0, duration: 0.5, ease: "expo.out" });
  };

  const base =
    "group relative inline-flex items-center gap-3 px-6 py-3 font-mono text-[11px] tracking-[0.3em] uppercase clip-corner-sm overflow-hidden transition-colors";
  const variants = {
    primary: "bg-titan-ember text-titan-void hover:text-titan-bone",
    ghost: "bg-transparent text-titan-bone hover:text-titan-void",
    outline:
      "bg-transparent text-titan-bone border border-titan-steel/30 hover:border-titan-ember",
  };

  const content = (
    <>
      <span
        ref={fillRef}
        className="absolute inset-0 bg-titan-void origin-left"
        style={{ transform: "scaleX(0)" }}
        aria-hidden
      />
      <span
        className={cn(
          "absolute inset-0 transition-colors",
          variant === "primary" && "group-hover:bg-titan-ember",
        )}
        aria-hidden
      />
      <span className="relative z-10">{children}</span>
      {icon && (
        <span className="relative z-10 transition-transform group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className={cn(base, variants[variant], className)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={cn(base, variants[variant], className)}
    >
      {content}
    </button>
  );
}
