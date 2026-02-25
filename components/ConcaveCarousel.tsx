"use client";

import { useRef, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";

const slides = [
  { src: "/1.avif", label: "Look 01" },
  { src: "/2.avif", label: "Look 02" },
  { src: "/3.avif", label: "Look 03" },
  { src: "/4.avif", label: "Look 04" },
  { src: "/5.avif", label: "Look 05" },
  { src: "/6.avif", label: "Look 06" },
];

/* ── helper: per-card inline style ── */
function cardStyle(i: number, count: number, radius: number) {
  const theta = (360 / count) * i;
  return {
    position: "absolute" as const,
    width: "clamp(170px, 22vw, 290px)",
    aspectRatio: "3 / 4",
    transform: `rotateY(${theta}deg) translateZ(${radius}px)`,
    backfaceVisibility: "hidden" as const,
  };
}

/* ── Card (pure presentation) ── */
function Card({ src, label }: { src: string; label: string }) {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.35)]">
      <Image
        src={src}
        alt={label}
        className="w-full h-full object-cover select-none pointer-events-none"
        draggable={false}
        width={600}
        height={800}
      />
    </div>
  );
}

/* ── Main carousel ── */
export default function ConcaveCarousel() {
  const count = slides.length;
  const radius = 340;

  /* framer-motion values */
  const rawAngle = useMotionValue(0);
  const angle: MotionValue<number> = useSpring(rawAngle, {
    stiffness: 60,
    damping: 20,
    mass: 0.8,
  });

  /* refs for drag mechanics */
  const dragging = useRef(false);
  const lastX = useRef(0);
  const velocityX = useRef(0);
  const rafId = useRef(0);

  /* ── auto-rotate ── */
  useEffect(() => {
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = now - prev;
      prev = now;
      if (!dragging.current) {
        // ~18°/sec at 60 fps
        rawAngle.set(rawAngle.get() + 0.03 * dt);
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [rawAngle]);

  /* ── pointer handlers ── */
  const onDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      lastX.current = e.clientX;
      velocityX.current = 0;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [],
  );

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;
      velocityX.current = dx;
      rawAngle.set(rawAngle.get() + dx * 0.2);
    },
    [rawAngle],
  );

  const onUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    /* momentum flick */
    rawAngle.set(rawAngle.get() + velocityX.current * 3);
    velocityX.current = 0;
  }, [rawAngle]);

  return (
    <div
      className="relative w-full cursor-grab active:cursor-grabbing select-none"
      style={{
        height: "clamp(340px, 46vw, 560px)",
        perspective: "1400px",
        perspectiveOrigin: "center 42%",
      }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          rotateY: angle,
        }}
      >
        {slides.map((s, i) => (
          <div key={i} style={cardStyle(i, count, radius)}>
            <Card src={s.src} label={s.label} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
