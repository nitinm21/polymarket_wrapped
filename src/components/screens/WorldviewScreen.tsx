import { motion } from 'framer-motion';
import { ScreenWrapper } from '../ui/ScreenWrapper';
import type { WrappedData } from '../../data/sampleData';

interface WorldviewScreenProps {
    data: WrappedData;
}

const worldviewLabels = {
    polls_vs_markets: { left: 'Polls', right: 'Markets', color: '#2563EB' },
    incumbents_vs_challengers: { left: 'Incumbents', right: 'Challengers', color: '#8247E5' },
    stability_vs_chaos: { left: 'Stability', right: 'Chaos', color: '#F7931A' },
    institutions_vs_outsiders: { left: 'Institutions', right: 'Outsiders', color: '#10B981' },
};

export function WorldviewScreen({ data }: WorldviewScreenProps) {
    const worldviewEntries = Object.entries(data.worldview) as [keyof typeof worldviewLabels, number][];

    return (
        <ScreenWrapper
            gradient="radial-gradient(ellipse at 30% 30%, rgba(130, 71, 229, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(37, 99, 235, 0.1) 0%, transparent 40%), #14141a"
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
                    Your predictions painted a picture of how you see the world.
                </motion.p>

                {/* Sliders */}
                <div className="mb-8 w-full max-w-sm space-y-5">
                    {worldviewEntries.map(([key, value], index) => {
                        const label = worldviewLabels[key];
                        return (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + index * 0.2, duration: 0.6 }}
                                className="w-full"
                            >
                                {/* Labels */}
                                <div className="mb-2 flex justify-between text-xs">
                                    <span className="text-white/40">{label.left}</span>
                                    <span style={{ color: label.color }}>{label.right}</span>
                                </div>

                                {/* Track */}
                                <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
                                    {/* Fill */}
                                    <motion.div
                                        className="absolute inset-y-0 left-0 rounded-full"
                                        style={{
                                            background: `linear-gradient(90deg, rgba(255,255,255,0.2) 0%, ${label.color} 100%)`,
                                        }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${value * 100}%` }}
                                        transition={{ delay: 0.8 + index * 0.2, duration: 1, ease: 'easeOut' }}
                                    />

                                    {/* Marker */}
                                    <motion.div
                                        className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-white/50"
                                        style={{
                                            background: label.color,
                                            boxShadow: `0 0 12px ${label.color}80`,
                                        }}
                                        initial={{ left: 0 }}
                                        animate={{ left: `calc(${value * 100}% - 8px)` }}
                                        transition={{ delay: 0.8 + index * 0.2, duration: 1, ease: 'easeOut' }}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.6 }}
                    className="mb-4"
                >
                    <p className="text-base text-white/80">
                        You faded the polls, bet on disruption, and trusted the market over the media.
                    </p>
                </motion.div>

                {/* Subtext */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.4, duration: 0.6 }}
                    className="glass-card-poly rounded-xl px-5 py-3"
                >
                    <p className="text-sm italic text-white/60">
                        "{data.worldview_summary}"
                    </p>
                </motion.div>
            </motion.div>
        </ScreenWrapper>
    );
}
