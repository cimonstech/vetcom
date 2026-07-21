"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface HeroNetworkEffectProps {
  className?: string;
  /** Particle count — keep moderate for performance */
  particleCount?: number;
  opacity?: number;
}

/**
 * Subtle telecom-style particle network for hero backgrounds.
 */
export function HeroNetworkEffect({
  className,
  particleCount = 70,
  opacity = 0.55,
}: HeroNetworkEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    const gold = new THREE.Color("#D4AF37");
    const soft = new THREE.Color("#8eb4d8");

    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 42;
      positions[i3 + 1] = (Math.random() - 0.5) * 24;
      positions[i3 + 2] = (Math.random() - 0.5) * 18;
      velocities[i3] = (Math.random() - 0.5) * 0.012;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.008;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      color: gold,
      size: 0.18,
      transparent: true,
      opacity: 0.9 * opacity,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geometry, pointsMaterial);
    scene.add(points);

    const maxConnections = particleCount * 3;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: soft,
      transparent: true,
      opacity: 0.35 * opacity,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const connectionDistance = 7.5;

    const resize = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
    }
    window.addEventListener("resize", resize);

    let rafId = 0;
    let running = true;

    const animate = () => {
      if (!running) return;
      rafId = requestAnimationFrame(animate);

      const pos = geometry.attributes.position.array as Float32Array;

      if (!prefersReducedMotion) {
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          pos[i3] += velocities[i3];
          pos[i3 + 1] += velocities[i3 + 1];
          pos[i3 + 2] += velocities[i3 + 2];

          if (pos[i3] > 21 || pos[i3] < -21) velocities[i3] *= -1;
          if (pos[i3 + 1] > 12 || pos[i3 + 1] < -12) velocities[i3 + 1] *= -1;
          if (pos[i3 + 2] > 9 || pos[i3 + 2] < -9) velocities[i3 + 2] *= -1;
        }
        geometry.attributes.position.needsUpdate = true;
        points.rotation.y += 0.0008;
        lines.rotation.y += 0.0008;
      }

      let lineVertex = 0;
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const i3 = i * 3;
          const j3 = j * 3;
          const dx = pos[i3] - pos[j3];
          const dy = pos[i3 + 1] - pos[j3 + 1];
          const dz = pos[i3 + 2] - pos[j3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < connectionDistance && lineVertex < maxConnections * 2) {
            const v = lineVertex * 3;
            linePositions[v] = pos[i3];
            linePositions[v + 1] = pos[i3 + 1];
            linePositions[v + 2] = pos[i3 + 2];
            linePositions[v + 3] = pos[j3];
            linePositions[v + 4] = pos[j3 + 1];
            linePositions[v + 5] = pos[j3 + 2];
            lineVertex += 2;
          }
        }
      }
      lineGeometry.setDrawRange(0, lineVertex);
      lineGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      resizeObserver?.disconnect();
      geometry.dispose();
      lineGeometry.dispose();
      pointsMaterial.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [particleCount, opacity]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={className}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}
    />
  );
}
