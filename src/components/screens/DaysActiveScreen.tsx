import { motion } from 'framer-motion';
import { ScreenWrapper } from '../ui/ScreenWrapper';
import type { WrappedData } from '../../data/sampleData';

interface DaysActiveScreenProps {
    data: WrappedData;
}

export function DaysActiveScreen({ data }: DaysActiveScreenProps) {
    // Generate calendar heat map data
    const generateHeatMap = () => {
        const months = ['Sep', 'Oct', 'Nov', 'Dec'];
        const days = Array.from({ length: 30 }, (_, i) => i + 1);

        return months.map((month, monthIndex) => ({
            month,
            days: days.slice(0, monthIndex === 1 ? 31 : 30).map((day) => {
                // Simulate activity intensity (higher in Oct-Nov for election)
                const isElectionPeriod = monthIndex === 1 || monthIndex === 2;
                const baseIntensity = isElectionPeriod ? 0.6 : 0.3;
                const intensity = Math.random() * 0.4 + baseIntensity;
                return { day, intensity };
            }),
        }));
    };

    const heatMapData = generateHeatMap();

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <ScreenWrapper
            gradient="radial-gradient(ellipse at 50% 20%, rgba(37, 99, 235, 0.15) 0%, transparent 50%), #14141a"
        >
            <motion.div
                className="flex w-full flex-col items-center text-center"
                initial="initial"
                animate="animate"
            >
                {/* Header */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mb-2 text-2xl font-bold text-white sm:text-3xl"
                >
                    You were active for
                </motion.h2>

                {/* Days count */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
                    className="relative mb-4"
                >
                    <span
                        className="gradient-text-poly text-7xl font-black sm:text-8xl"
                        style={{ fontFamily: 'Rajdhani, system-ui, sans-serif' }}
                    >
                        {data.days_active}
                    </span>
                    <span className="ml-2 text-2xl text-white/60">days</span>
                </motion.div>

                {/* Streak info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mb-6 text-lg text-white/70"
                >
                    Your longest streak: <span className="font-bold text-white">{data.longest_streak} days straight</span>
                </motion.div>

                {/* Calendar heat map */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="glass-card mb-6 w-full max-w-sm rounded-2xl p-4"
                >
                    <div className="mb-3 flex justify-between text-xs text-white/40">
                        {heatMapData.map((m) => (
                            <span key={m.month}>{m.month}</span>
                        ))}
                    </div>
                    <div className="flex gap-1">
                        {heatMapData.map((month, monthIdx) => (
                            <div key={month.month} className="flex flex-1 flex-wrap gap-[2px]">
                                {month.days.slice(0, 15).map((day, dayIdx) => (
                                    <motion.div
                                        key={`${month.month}-${day.day}`}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            delay: 1.2 + (monthIdx * 15 + dayIdx) * 0.02,
                                            duration: 0.2,
                                        }}
                                        className="h-2 w-2 rounded-sm"
                                        style={{
                                            background: day.intensity > 0.7
                                                ? 'linear-gradient(135deg, #2563EB, #8247E5)'
                                                : day.intensity > 0.4
                                                    ? 'rgba(37, 99, 235, 0.6)'
                                                    : 'rgba(37, 99, 235, 0.2)',
                                            boxShadow: day.intensity > 0.7
                                                ? '0 0 8px rgba(37, 99, 235, 0.5)'
                                                : 'none',
                                        }}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Streak dates */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 0.6 }}
                    className="glass-card-poly rounded-xl px-5 py-3"
                >
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-white/50">
                        {formatDate(data.streak_dates[0])} → {formatDate(data.streak_dates[1])}
                    </p>
                    <p className="text-sm text-white/70">
                        {data.streak_context}
                    </p>
                </motion.div>
            </motion.div>
        </ScreenWrapper>
    );
}
