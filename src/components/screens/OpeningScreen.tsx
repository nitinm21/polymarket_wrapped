import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ScreenWrapper } from '../ui/ScreenWrapper';
import type { WrappedData } from '../../data/sampleData';

interface OpeningScreenProps {
    data: WrappedData;
}

function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <span className="tabular-nums">
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
}

export function OpeningScreen({ data }: OpeningScreenProps) {
    return (
        <ScreenWrapper
            gradient="radial-gradient(ellipse at 50% 30%, rgba(37, 99, 235, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(130, 71, 229, 0.15) 0%, transparent 40%), #14141a"
        >
            <motion.div
                className="flex w-full flex-col items-center text-center"
                initial="initial"
                animate="animate"
            >
                {/* Intro text */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mb-6 text-lg text-white/70 sm:text-xl"
                >
                    In 2025, you didn't just scroll through headlines.
                </motion.p>

                {/* Beat */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="mb-12 text-2xl font-bold text-white sm:text-3xl"
                >
                    You put money where your mouth was.
                </motion.p>

                {/* Main stat - USDC deployed */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.2, duration: 0.8, type: 'spring', bounce: 0.3 }}
                    className="relative mb-8"
                >
                    {/* Glow effect */}
                    <motion.div
                        className="absolute -inset-8 rounded-full opacity-50 blur-3xl"
                        style={{
                            background: 'radial-gradient(circle, rgba(38, 161, 123, 0.6) 0%, transparent 70%)',
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />

                    <div className="relative">
                        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-white/50">
                            You deployed
                        </p>
                        <h1
                            className="gradient-text-usdc text-5xl font-black sm:text-7xl"
                            style={{
                                fontFamily: 'Rajdhani, system-ui, sans-serif',
                            }}
                        >
                            <AnimatedNumber value={data.total_usdc_deployed} prefix="$" suffix=" USDC" />
                        </h1>
                    </div>
                </motion.div>

                {/* Markets stat */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.2, duration: 0.8 }}
                    className="mb-4 text-xl text-white/80 sm:text-2xl"
                >
                    across <span className="font-bold text-white">{data.total_markets}</span> markets.
                </motion.p>

                {/* Subtext */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.8, duration: 0.8 }}
                    className="glass-card-poly rounded-xl px-6 py-3"
                >
                    <p className="text-sm text-white/60">
                        Your predictions were recorded on-chain, forever.
                    </p>
                </motion.div>

                {/* Wallet address hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4.2, duration: 0.8 }}
                    className="mt-6 font-mono text-xs text-white/30"
                >
                    {data.wallet_address}
                </motion.p>
            </motion.div>
        </ScreenWrapper>
    );
}
