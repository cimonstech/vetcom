"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image, { type ImageProps } from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

interface TiltMediaProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  maxTilt?: number;
}

/**
 * 3D tilt-on-hover image wrapper powered by GSAP.
 */
export function TiltMedia({
  src,
  alt,
  className = "",
  imageClassName = "object-cover",
  sizes,
  priority,
  fill = true,
  width,
  height,
  maxTilt = 8,
}: TiltMediaProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const inner = innerRef.current;
      if (!wrap || !inner) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.matchMedia("(hover: none)").matches) return;

      const onMove = (event: MouseEvent) => {
        const rect = wrap.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const rotateY = (x - 0.5) * (maxTilt * 2);
        const rotateX = (0.5 - y) * (maxTilt * 2);

        gsap.to(inner, {
          rotateX,
          rotateY,
          transformPerspective: 900,
          transformOrigin: "center",
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const onLeave = () => {
        gsap.to(inner, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.7,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      wrap.addEventListener("mousemove", onMove);
      wrap.addEventListener("mouseleave", onLeave);

      return () => {
        wrap.removeEventListener("mousemove", onMove);
        wrap.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: wrapRef, dependencies: [maxTilt] }
  );

  const imageProps: ImageProps = fill
    ? {
        src,
        alt,
        fill: true,
        sizes: sizes ?? "100vw",
        priority,
        className: imageClassName,
      }
    : {
        src,
        alt,
        width: width ?? 800,
        height: height ?? 600,
        priority,
        className: imageClassName,
      };

  return (
    <div
      ref={wrapRef}
      className={`tilt-media [perspective:1000px] ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        ref={innerRef}
        className="relative h-full w-full overflow-hidden rounded-[inherit] will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image {...imageProps} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-tr from-navy/20 via-transparent to-gold/15 opacity-70"
        />
      </div>
    </div>
  );
}
