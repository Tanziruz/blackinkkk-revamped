"use client";

/**
 * Lightweight Framer Motion wrappers used throughout the site.
 * All scroll-triggered variants use `once: true` so they fire a single time.
 */

import { motion, type MotionProps, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type BaseProps = {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    once?: boolean;
};

// ──────────────────────────────────────────────
// FadeUp  – fade + rise from below (scroll trigger)
// ──────────────────────────────────────────────
export function FadeUp({
    children,
    className,
    delay = 0,
    duration = 0.65,
    distance = 28,
    once = true,
}: BaseProps & { distance?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: distance }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once }}
            transition={{ duration, delay, ease: EASE }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ──────────────────────────────────────────────
// FadeIn  – opacity only (scroll trigger)
// ──────────────────────────────────────────────
export function FadeIn({ children, className, delay = 0, duration = 0.7, once = true }: BaseProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once }}
            transition={{ duration, delay, ease: EASE }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ──────────────────────────────────────────────
// SlideInLeft  – slides from left (scroll trigger)
// ──────────────────────────────────────────────
export function SlideInLeft({
    children,
    className,
    delay = 0,
    duration = 0.7,
    distance = 48,
    once = true,
}: BaseProps & { distance?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -distance }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once }}
            transition={{ duration, delay, ease: EASE }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ──────────────────────────────────────────────
// SlideInRight  – slides from right (scroll trigger)
// ──────────────────────────────────────────────
export function SlideInRight({
    children,
    className,
    delay = 0,
    duration = 0.7,
    distance = 48,
    once = true,
}: BaseProps & { distance?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: distance }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once }}
            transition={{ duration, delay, ease: EASE }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ──────────────────────────────────────────────
// Stagger  – parent that staggers its children
// Use with <StaggerItem> children for best results.
// ──────────────────────────────────────────────
const staggerContainer: Variants = {
    hidden: {},
    show: (stagger: number) => ({
        transition: { staggerChildren: stagger, delayChildren: 0 },
    }),
};
const staggerItem: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASE },
    },
};

export function Stagger({
    children,
    className,
    stagger = 0.09,
    delay = 0,
    once = true,
    triggerOnView = true,
}: BaseProps & { stagger?: number; triggerOnView?: boolean }) {
    return (
        <motion.div
            variants={staggerContainer}
            custom={stagger}
            initial="hidden"
            {...(triggerOnView
                ? { whileInView: "show", viewport: { once } }
                : { animate: "show" })}
            transition={{ delayChildren: delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({
    children,
    className,
    ...rest
}: { children: React.ReactNode; className?: string } & MotionProps) {
    return (
        <motion.div variants={staggerItem} className={className} {...rest}>
            {children}
        </motion.div>
    );
}

// ──────────────────────────────────────────────
// EntryFadeUp  – for page-load hero content (animate on mount, NOT on scroll)
// ──────────────────────────────────────────────
export function EntryStagger({
    children,
    className,
    stagger = 0.1,
    delayChildren = 0.15,
}: BaseProps & { stagger?: number; delayChildren?: number }) {
    return (
        <motion.div
            variants={{
                hidden: {},
                show: { transition: { staggerChildren: stagger, delayChildren } },
            }}
            initial="hidden"
            animate="show"
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function EntryItem({
    children,
    className,
    distance = 22,
    ...rest
}: {
    children: React.ReactNode;
    className?: string;
    distance?: number;
} & MotionProps) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: distance },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
            }}
            className={className}
            {...rest}
        >
            {children}
        </motion.div>
    );
}

// ──────────────────────────────────────────────
// ScaleIn  – subtle scale + fade on scroll
// ──────────────────────────────────────────────
export function ScaleIn({
    children,
    className,
    delay = 0,
    duration = 0.7,
    once = true,
}: BaseProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once }}
            transition={{ duration, delay, ease: EASE }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
