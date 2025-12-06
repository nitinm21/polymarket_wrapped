import { motion } from 'framer-motion';
import { ScreenWrapper } from '../ui/ScreenWrapper';
import type { WrappedData } from '../../data/sampleData';

interface WhatsNextScreenProps {
    data: WrappedData;
}

const categoryColors: Record<string, string> = {
    Crypto: '#F7931A',
    Politics: '#2563EB',
    Geopolitics: '#8247E5',
    Sports: '#10B981',
    AI: '#EC4899',
};

export function WhatsNextScreen({ data }: WhatsNextScreenProps) {
    return (
        <ScreenWrapper
            gradient="radial-gradient(ellipse at 50% 50%, rgba(37, 99, 235, 0.15) 0%, transparent 50%), #14141a"
        >
            <motion.div
                className="flex w-full flex-col items-center text-center"
                initial="initial"
                animate="animate"
            >
                {/* Intro */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mb-2 text-lg text-white/70"
                >
                    Based on your worldview, here are
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mb-8 text-2xl font-bold text-white sm:text-3xl"
                >
                    3 markets to ape into 🦍
                </motion.h2>

                {/* Market cards */}
                <div className="mb-8 w-full max-w-sm space-y-4">
                    {data.recommended_markets.map((market, index) => (
                        <motion.div
                            key={market.title}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.8 + index * 0.2,
                                duration: 0.6,
                                type: 'spring',
                            }}
                            className="glass-card group relative overflow-hidden rounded-xl p-4 transition-all hover:scale-[1.02]"
                            style={{
                                borderColor: `${categoryColors[market.category]}30`,
                            }}
                        >
                            {/* Category badge */}
                            <div
                                className="mb-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium"
                                style={{
                                    background: `${categoryColors[market.category]}20`,
                                    color: categoryColors[market.category],
                                }}
                            >
                                {market.category}
                            </div>

                            {/* Market title */}
                            <h3 className="mb-3 text-left text-base font-semibold text-white">
                                {market.title}
                            </h3>

                            {/* Price and volume */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-black text-[#10B981]">
                                        {(market.price * 100).toFixed(0)}¢
                                    </span>
                                    <span className="text-xs text-white/40">Yes</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-white/40">Volume</p>
                                    <p className="font-mono text-sm text-white/60">{market.volume}</p>
                                </div>
                            </div>

                            {/* Hover shimmer */}
                            <motion.div
                                className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                                style={{
                                    background: `linear-gradient(90deg, transparent, ${categoryColors[market.category]}10, transparent)`,
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6, duration: 0.6 }}
                    className="mb-6 text-lg text-white/70"
                >
                    Your instincts. Your edge. Your USDC.
                </motion.p>

                {/* CTA Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.6, type: 'spring' }}
                    className="btn-degen"
                    onClick={() => window.open('https://polymarket.com', '_blank')}
                >
                    Deploy to 2026 Markets →
                </motion.button>
            </motion.div>
        </ScreenWrapper>
    );
}
