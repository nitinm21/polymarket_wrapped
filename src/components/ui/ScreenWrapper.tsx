import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface ScreenWrapperProps {
    children: ReactNode;
    gradient?: string;
    className?: string;
}

export const staggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

export const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export const scaleIn: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export function ScreenWrapper({ children, gradient, className = '' }: ScreenWrapperProps) {
    const defaultGradient = 'radial-gradient(ellipse at 50% 0%, rgba(37, 99, 235, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(130, 71, 229, 0.15) 0%, transparent 40%), #12121a';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 flex items-center justify-center overflow-hidden px-4 py-8 sm:px-6 sm:py-12 safe-top safe-bottom ${className}`}
            style={{
                background: gradient || defaultGradient,
            }}
        >
            {/* Matrix grid overlay */}
            <div className="pointer-events-none absolute inset-0 matrix-grid opacity-30" />

            {/* Content */}
            <div className="relative z-10 flex h-full w-full max-w-lg flex-col items-center justify-center">
                {children}
            </div>
        </motion.div>
    );
}
