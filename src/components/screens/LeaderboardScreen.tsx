import { motion } from 'framer-motion';
import { ScreenWrapper } from '../ui/ScreenWrapper';
import type { WrappedData } from '../../data/sampleData';

interface LeaderboardScreenProps {
    data: WrappedData;
}

export function LeaderboardScreen({ data }: LeaderboardScreenProps) {
    const stats = [
        { label: 'by volume', percentile: data.volume_percentile, icon: '📊', color: '#2563EB' },
        { label: 'by accuracy', percentile: data.accuracy_percentile, icon: '🎯', color: '#10B981' },
        { label: 'by contrarian score', percentile: 100 - data.contrarian_percentile, icon: '🧠', color: '#8247E5' },
    ];

    return (
        <ScreenWrapper
            gradient="radial-gradient(ellipse at 50% 20%, rgba(247, 147, 26, 0.1) 0%, transparent 50%), #14141a"
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
                    className="mb-8 text-lg text-white/70"
                >
                    Across all Polymarket traders in 2025...
                </motion.p>

                {/* Trophy animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                        delay: 0.5,
                        duration: 0.8,
                        type: 'spring',
                        bounce: 0.4,
                    }}
                    className="mb-8 text-6xl"
                >
                    🏆
                </motion.div>

                {/* Stat cards */}
                <div className="mb-8 w-full max-w-sm space-y-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
                            className="glass-card flex items-center justify-between rounded-xl px-5 py-4"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{stat.icon}</span>
                                <span className="text-sm text-white/60">Top</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <motion.span
                                    className="text-3xl font-black"
                                    style={{ color: stat.color, fontFamily: 'Rajdhani, sans-serif' }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 + index * 0.2 }}
                                >
                                    {stat.percentile}%
                                </motion.span>
                                <span className="text-xs text-white/40">{stat.label}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Summary stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.6 }}
                    className="glass-card-poly mb-4 rounded-2xl px-6 py-4"
                >
                    <div className="flex gap-8">
                        <div className="text-center">
                            <p className="text-xs uppercase tracking-wider text-white/40">USDC Deployed</p>
                            <p className="font-mono text-xl font-bold text-white">
                                ${data.total_usdc_deployed.toLocaleString()}
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs uppercase tracking-wider text-white/40">Markets</p>
                            <p className="font-mono text-xl font-bold text-white">{data.total_markets}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs uppercase tracking-wider text-white/40">Win Rate</p>
                            <p className="font-mono text-xl font-bold text-[#10B981]">{data.win_rate}%</p>
                        </div>
                    </div>
                </motion.div>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 0.6 }}
                    className="text-sm italic text-white/40"
                >
                    "Not bad for betting against the experts."
                </motion.p>
            </motion.div>
        </ScreenWrapper>
    );
}
