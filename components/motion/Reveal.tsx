"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds */
  delay?: number;
  y?: number;
  once?: boolean;
}

/** Fade/slide-in when the element enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        }
      );
    },
    { scope: ref, dependencies: [delay, y, once] }
  );

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  childSelector?: string;
  stagger?: number;
}

/** Stagger children that match `childSelector` (default: direct children). */
export function StaggerReveal({
  children,
  className,
  childSelector = ":scope > *",
  stagger = 0.1,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = el.querySelectorAll(childSelector);
      if (!items.length) return;

      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref, dependencies: [childSelector, stagger] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
