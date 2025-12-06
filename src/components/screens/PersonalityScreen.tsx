import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ScreenWrapper } from '../ui/ScreenWrapper';
import type { WrappedData } from '../../data/sampleData';
import { personalityTitles } from '../../data/sampleData';

interface PersonalityScreenProps {
    data: WrappedData;
}

const personalityGradients: Record<string, string> = {
    narrative_trader: 'linear-gradient(135deg, #3B82F6 0%, #A855F7 100%)',
    degen_philosopher: 'linear-gradient(135deg, #A855F7 0%, #F7931A 100%)',
    election_trader: 'linear-gradient(135deg, #F87171 0%, #3B82F6 100%)',
    whale_whisperer: 'linear-gradient(135deg, #3B82F6 0%, #34D399 100%)',
    black_swan_hunter: 'linear-gradient(135deg, #2d2d4a 0%, #A855F7 100%)',
    the_oracle: 'linear-gradient(135deg, #34D399 0%, #3B82F6 100%)',
    the_hedge_fund: 'linear-gradient(135deg, #9CA3AF 0%, #34D399 100%)',
};

const personalityAccents: Record<string, string> = {
    narrative_trader: '#3B82F6',
    degen_philosopher: '#A855F7',
    election_trader: '#F87171',
    whale_whisperer: '#3B82F6',
    black_swan_hunter: '#A855F7',
    the_oracle: '#34D399',
    the_hedge_fund: '#34D399',
};

// Floating particles component
function FloatingParticles({ color }: { color: string }) {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                        background: `radial-gradient(circle, ${color}80 0%, transparent 70%)`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

export function PersonalityScreen({ data }: PersonalityScreenProps) {
    const personality = personalityTitles[data.personality] || personalityTitles.narrative_trader;
    const gradient = personalityGradients[data.personality] || personalityGradients.narrative_trader;
    const accent = personalityAccents[data.personality] || personalityAccents.narrative_trader;

    const [isRevealed, setIsRevealed] = useState(false);
    const [countValue, setCountValue] = useState(0);

    // Animate the percentage counter
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsRevealed(true);
        }, 1500);

        const counterTimer = setTimeout(() => {
            const duration = 1500;
            const steps = 60;
            const increment = data.personality_percentile / steps;
            let current = 0;
            const interval = setInterval(() => {
                current += increment;
                if (current >= data.personality_percentile) {
                    setCountValue(data.personality_percentile);
                    clearInterval(interval);
                } else {
                    setCountValue(Math.floor(current));
                }
            }, duration / steps);
            return () => clearInterval(interval);
        }, 2000);

        return () => {
            clearTimeout(timer);
            clearTimeout(counterTimer);
        };
    }, [data.personality_percentile]);

    return (
        <ScreenWrapper
            gradient={`radial-gradient(circle at 50% 30%, ${accent}25 0%, transparent 50%), radial-gradient(circle at 30% 70%, ${accent}15 0%, transparent 40%), #14141f`}
        >
            {/* Floating particles */}
            <FloatingParticles color={accent} />

            <motion.div
                className="flex w-full flex-col items-center text-center relative z-10"
                initial="initial"
                animate="animate"
            >
                {/* Intro */}
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mb-6 sm:mb-8 text-xs sm:text-sm font-medium uppercase tracking-widest text-white/60"
                >
                    Your prediction style is hard to pin down, but if we had to...
                </motion.p>

                {/* Main hexagonal badge container */}
                <motion.div
                    initial={{ scale: 0, rotateY: -180 }}
                    animate={{ scale: 1, rotateY: 0 }}
                    transition={{
                        delay: 0.6,
                        duration: 1.2,
                        type: 'spring',
                        bounce: 0.4,
                    }}
                    className="relative mb-6 sm:mb-8"
                >
                    {/* Outer glow ring - pulsing */}
                    <motion.div
                        className="absolute -inset-12 rounded-full"
                        style={{
                            background: `radial-gradient(circle, ${accent}40 0%, ${accent}20 30%, transparent 70%)`,
                        }}
                        animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.4, 0.8, 0.4],
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    {/* Secondary ring */}
                    <motion.div
                        className="absolute -inset-8 rounded-full"
                        style={{
                            background: `radial-gradient(circle, ${accent}60 0%, transparent 60%)`,
                        }}
                        animate={{
                            scale: [1.1, 1.3, 1.1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.3, ease: 'easeInOut' }}
                    />

                    {/* Rotating border ring */}
                    <motion.div
                        className="absolute -inset-4 rounded-full"
                        style={{
                            background: `conic-gradient(from 0deg, transparent, ${accent}, transparent, ${accent}, transparent)`,
                        }}
                        animate={{
                            rotate: 360,
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Hexagon container */}
                    <motion.div
                        className="relative flex h-32 w-32 items-center justify-center sm:h-44 sm:w-44"
                        style={{
                            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                            background: `linear-gradient(135deg, ${accent}50 0%, ${accent}30 100%)`,
                        }}
                        animate={{
                            boxShadow: [
                                `0 0 40px ${accent}50, inset 0 0 20px ${accent}30`,
                                `0 0 80px ${accent}80, inset 0 0 40px ${accent}50`,
                                `0 0 40px ${accent}50, inset 0 0 20px ${accent}30`,
                            ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Inner hexagon with gradient */}
                        <div
                            className="absolute inset-2 sm:inset-3 flex items-center justify-center"
                            style={{
                                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                                background: gradient,
                            }}
                        >
                            {/* Shimmer effect inside */}
                            <motion.div
                                className="absolute inset-0"
                                style={{
                                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                                }}
                                animate={{
                                    x: ['-100%', '200%'],
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                            />

                            <motion.span
                                className="relative text-4xl sm:text-6xl z-10"
                                animate={{
                                    scale: [1, 1.15, 1],
                                    rotate: [0, 5, -5, 0],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                {personality.icon}
                            </motion.span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Title with reveal animation */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="mb-3 sm:mb-4 overflow-hidden"
                >
                    <motion.h1
                        className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight"
                        style={{
                            background: gradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontFamily: 'Rajdhani, sans-serif',
                            filter: `drop-shadow(0 0 30px ${accent}60)`,
                        }}
                        animate={{
                            textShadow: [
                                `0 0 30px ${accent}40`,
                                `0 0 60px ${accent}60`,
                                `0 0 30px ${accent}40`,
                            ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {personality.title}
                    </motion.h1>
                </motion.div>

                {/* Description with fade in */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="mb-6 sm:mb-8 max-w-sm px-4 text-sm sm:text-base leading-relaxed text-white/90"
                >
                    {personality.description}
                </motion.p>

                {/* Rarity badge with enhanced styling */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.6, type: 'spring' }}
                    className="relative overflow-hidden rounded-2xl px-5 sm:px-8 py-4 sm:py-5"
                    style={{
                        background: `linear-gradient(135deg, ${accent}20 0%, ${accent}10 50%, transparent 100%)`,
                        border: `2px solid ${accent}50`,
                        boxShadow: `0 0 30px ${accent}20, inset 0 1px 0 0 ${accent}30`,
                    }}
                    whileHover={{ scale: 1.03, boxShadow: `0 0 50px ${accent}40` }}
                    whileTap={{ scale: 0.98 }}
                >
                    {/* Animated shimmer */}
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(90deg, transparent, ${accent}50, transparent)`,
                        }}
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Glowing border animation */}
                    <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                            border: `2px solid transparent`,
                            background: `linear-gradient(135deg, ${accent}60, transparent, ${accent}60) border-box`,
                            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude',
                        }}
                        animate={{
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />

                    <div className="relative flex flex-col sm:flex-row items-center sm:items-baseline gap-1 sm:gap-2">
                        <span className="text-sm text-white/80">Only</span>
                        <motion.span
                            className="text-4xl sm:text-5xl font-black"
                            style={{
                                background: gradient,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                fontFamily: 'Rajdhani, sans-serif',
                                filter: `drop-shadow(0 0 20px ${accent}60)`,
                            }}
                            animate={{
                                scale: isRevealed ? [1, 1.1, 1] : 1,
                            }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {countValue}%
                        </motion.span>
                        <span className="text-sm text-white/80 text-center sm:text-left">of traders share this profile.</span>
                    </div>
                </motion.div>

                {/* Decorative sparkles */}
                <motion.div
                    className="absolute top-1/4 left-1/4 text-2xl"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.8, 0.3],
                        rotate: [0, 180, 360],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                >
                    ✨
                </motion.div>
                <motion.div
                    className="absolute top-1/3 right-1/4 text-xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 0.9, 0.4],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                    ⭐
                </motion.div>
            </motion.div>
        </ScreenWrapper>
    );
}
