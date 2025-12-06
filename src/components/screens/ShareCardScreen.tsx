import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ScreenWrapper } from '../ui/ScreenWrapper';
import type { WrappedData } from '../../data/sampleData';
import { personalityTitles } from '../../data/sampleData';

interface ShareCardScreenProps {
    data: WrappedData;
    onStartOver?: () => void;
}

export function ShareCardScreen({ data, onStartOver }: ShareCardScreenProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const personality = personalityTitles[data.personality] || personalityTitles.narrative_trader;

    const handleStartOver = () => {
        if (onStartOver) {
            onStartOver();
        }
    };

    return (
        <ScreenWrapper
            gradient="radial-gradient(ellipse at 50% 50%, rgba(37, 99, 235, 0.2) 0%, rgba(130, 71, 229, 0.1) 30%, transparent 60%), #14141a"
        >
            <motion.div
                className="flex w-full flex-col items-center"
                initial="initial"
                animate="animate"
            >
                {/* Share card */}
                <motion.div
                    ref={cardRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="relative mb-8 w-full max-w-sm overflow-hidden rounded-2xl p-5 sm:p-6"
                    style={{
                        background: 'linear-gradient(135deg, #12122a 0%, #1f1040 50%, #0f1a30 100%)',
                        border: '1px solid rgba(37, 99, 235, 0.4)',
                        boxShadow: '0 0 40px rgba(37, 99, 235, 0.15)',
                    }}
                >
                    {/* Grid background */}
                    <div
                        className="absolute inset-0 opacity-30"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(37, 99, 235, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.15) 1px, transparent 1px)',
                            backgroundSize: '20px 20px',
                        }}
                    />

                    {/* Content */}
                    <div className="relative">
                        {/* Header */}
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-white">Polymarket</h3>
                                <p className="text-xs text-white/60">Wrapped 2025</p>
                            </div>
                            <motion.span
                                className="text-3xl"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                {personality.icon}
                            </motion.span>
                        </div>

                        {/* Personality */}
                        <div className="mb-6 text-center">
                            <p className="text-xs uppercase tracking-widest text-white/50">I'm a</p>
                            <h2
                                className="gradient-text-poly text-2xl font-black"
                                style={{ fontFamily: 'Rajdhani, sans-serif' }}
                            >
                                {personality.title}
                            </h2>
                        </div>

                        {/* Stats grid */}
                        <div className="mb-4 grid grid-cols-3 gap-3 sm:gap-4">
                            <div className="text-center">
                                <p className="text-xl sm:text-2xl font-bold text-white">${(data.total_usdc_deployed / 1000).toFixed(0)}K</p>
                                <p className="text-xs text-white/50">USDC</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xl sm:text-2xl font-bold text-white">{data.total_markets}</p>
                                <p className="text-xs text-white/50">Markets</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xl sm:text-2xl font-bold text-[#34D399]">{data.win_rate}%</p>
                                <p className="text-xs text-white/50">Win Rate</p>
                            </div>
                        </div>

                        {/* Top category */}
                        <div className="rounded-lg bg-white/8 p-3 text-center">
                            <p className="text-xs text-white/50">Most traded</p>
                            <p className="font-bold text-[#3B82F6]">{data.top_category}</p>
                        </div>

                        {/* Footer */}
                        <div className="mt-4 flex items-center justify-between text-xs text-white/40">
                            <span>polymarket.com</span>
                            <span>Top {100 - data.percentile}%</span>
                        </div>
                    </div>
                </motion.div>

                {/* Start Over button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    onClick={handleStartOver}
                    className="relative overflow-hidden rounded-full px-8 py-4 font-bold text-white uppercase tracking-wide"
                    style={{
                        background: 'linear-gradient(135deg, #3B82F6 0%, #A855F7 100%)',
                        boxShadow: '0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(168, 85, 247, 0.2)',
                    }}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: '0 0 50px rgba(59, 130, 246, 0.6), 0 0 80px rgba(168, 85, 247, 0.4)',
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Shimmer effect */}
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                        }}
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                    <span className="relative flex items-center gap-2">
                        <span>🔄</span>
                        <span>Start Over</span>
                    </span>
                </motion.button>

                {/* Hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="mt-4 text-xs text-white/40"
                >
                    Relive your 2025 predictions journey
                </motion.p>
            </motion.div>
        </ScreenWrapper>
    );
}
