import { motion } from 'framer-motion';
import { ScreenWrapper } from '../ui/ScreenWrapper';
import type { WrappedData } from '../../data/sampleData';

interface YourArenaScreenProps {
    data: WrappedData;
}

const categoryColors: Record<string, string> = {
    Politics: '#2563EB',
    Crypto: '#F7931A',
    Sports: '#10B981',
    'Pop Culture': '#EC4899',
    AI: '#8247E5',
};

const categoryIcons: Record<string, string> = {
    Politics: '🗳️',
    Crypto: '₿',
    Sports: '⚽',
    'Pop Culture': '🎬',
    AI: '🤖',
};

export function YourArenaScreen({ data }: YourArenaScreenProps) {
    const categories = Object.entries(data.category_breakdown)
        .sort(([, a], [, b]) => b - a);

    const topCategory = categories[0];
    const otherCategories = categories.slice(1);

    return (
        <ScreenWrapper
            gradient="radial-gradient(ellipse at 30% 30%, rgba(37, 99, 235, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(130, 71, 229, 0.1) 0%, transparent 40%), #14141a"
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
                    When the world got chaotic...
                </motion.p>

                {/* Top category reveal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.8, type: 'spring', bounce: 0.4 }}
                    className="relative mb-4"
                >
                    {/* Glow */}
                    <motion.div
                        className="absolute -inset-8 rounded-full opacity-40 blur-3xl"
                        style={{
                            background: `radial-gradient(circle, ${categoryColors[topCategory[0]]}80 0%, transparent 70%)`,
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />

                    <p className="relative mb-2 text-sm uppercase tracking-widest text-white/50">
                        You went straight to
                    </p>
                    <h1
                        className="relative text-5xl font-black sm:text-7xl"
                        style={{
                            color: categoryColors[topCategory[0]],
                            fontFamily: 'Rajdhani, system-ui, sans-serif',
                            textShadow: `0 0 60px ${categoryColors[topCategory[0]]}60`,
                        }}
                    >
                        {categoryIcons[topCategory[0]]} {topCategory[0]}
                    </h1>
                </motion.div>

                {/* Percentage */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                    className="mb-8 text-xl text-white/80"
                >
                    <span className="font-bold text-white">{Math.round(topCategory[1] * 100)}%</span> of your volume was in {topCategory[0]} markets.
                </motion.p>

                {/* Other categories - bubble visualization */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.6 }}
                    className="mb-6 flex flex-wrap justify-center gap-3"
                >
                    {otherCategories.map(([category, percentage], index) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                delay: 2 + index * 0.15,
                                duration: 0.4,
                                type: 'spring',
                            }}
                            className="glass-card flex items-center gap-2 rounded-full px-4 py-2"
                            style={{
                                borderColor: `${categoryColors[category]}40`,
                            }}
                        >
                            <span>{categoryIcons[category]}</span>
                            <span className="text-sm text-white/80">{category}</span>
                            <span
                                className="text-sm font-bold"
                                style={{ color: categoryColors[category] }}
                            >
                                {Math.round(percentage * 100)}%
                            </span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Subtext */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.6, duration: 0.6 }}
                    className="glass-card-poly rounded-xl px-5 py-3"
                >
                    <p className="text-sm text-white/70">
                        {data.category_subtext}
                    </p>
                </motion.div>
            </motion.div>
        </ScreenWrapper>
    );
}
