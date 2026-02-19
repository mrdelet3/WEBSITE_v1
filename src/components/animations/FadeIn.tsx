import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    duration?: number;
    variant?: any;
}

export function FadeIn({
    children,
    delay = 0,
    className = "",
    direction = 'up',
    duration = 0.5,
    variant
}: FadeInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    const defaultVariants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
            x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration: duration,
                delay: delay,
                ease: "easeOut" as const
            }
        }
    };

    // Use custom variant if provided, otherwise use default
    const finalVariants = variant ? (typeof variant.show === 'function' ? { ...variant, show: variant.show(delay) } : variant) : defaultVariants;
    const initialLabel = variant ? "hidden" : "hidden";
    const animateLabel = variant ? (variant.show ? "show" : "visible") : "visible";

    return (
        <motion.div
            ref={ref}
            initial={initialLabel}
            animate={isInView ? animateLabel : initialLabel}
            variants={finalVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// FadeInStagger Component for lists
export function FadeInStagger({
    children,
    className = "",
    staggerDelay = 0.1
}: {
    children: React.ReactNode,
    className?: string,
    staggerDelay?: number
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            variants={{
                hidden: { opacity: 0 },
                show: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
