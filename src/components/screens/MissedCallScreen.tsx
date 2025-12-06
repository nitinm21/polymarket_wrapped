import { motion } from 'framer-motion';
import { ScreenWrapper } from '../ui/ScreenWrapper';
import type { WrappedData } from '../../data/sampleData';

interface MissedCallScreenProps {
    data: WrappedData;
}

export function MissedCallScreen({ data }: MissedCallScreenProps) {
    const { worst_miss } = data;

    // Generate mock price data showing the missed opportunity
    const generatePriceData = () => {
        const points = 20;
        const data = [];
        const exitPrice = worst_miss.exit_price;

        for (let i = 0; i <= points; i++) {
            const progress = i / points;
            if (progress < 0.3) {
                // Flat/declining before exit
                data.push(exitPrice + (Math.random() - 0.5) * 0.1);
            } else {
                // Sharp rise after exit
                const sigmoid = 1 / (1 + Math.exp(-12 * (progress - 0.5)));
                data.push(exitPrice + (1 - exitPrice) * sigmoid);
            }
        }
        return data;
    };

    const priceData = generatePriceData();
    const exitPointIndex = 6; // Exit at ~30% of timeline

    return (
        <ScreenWrapper
            gradient="radial-gradient(ellipse at 50% 30%, rgba(239, 68, 68, 0.15) 0%, transparent 50%), #14141a"
        >
            <motion.div
                className="flex w-full flex-col items-center text-center"
                initial="initial"
                animate="animate"
                style={{ filter: 'saturate(0.85)' }}
            >
                {/* Intro */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mb-6 text-lg text-white/60"
                >
                    But there was one that slipped...
                </motion.p>

                {/* Market name */}
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="mb-2 text-2xl font-bold text-white/80 sm:text-3xl"
                >
                    "{worst_miss.market}"
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="mb-6 text-white/50"
                >
                    You sold at{' '}
                    <span className="font-bold text-[#EF4444]">{(worst_miss.exit_price * 100).toFixed(0)}¢</span>
                    . It settled at{' '}
                    <span className="font-bold text-white">$1.00</span>
                </motion.p>

                {/* Price chart - desaturated style */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6, duration: 0.8 }}
                    className="glass-card mb-6 w-full max-w-sm rounded-2xl p-4"
                    style={{ filter: 'saturate(0.7)' }}
                >
                    <svg viewBox="0 0 200 80" className="h-32 w-full">
                        {/* Grid lines */}
                        <line x1="0" y1="0" x2="200" y2="0" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                        <line x1="0" y1="40" x2="200" y2="40" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                        <line x1="0" y1="80" x2="200" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

                        {/* Vertical line at exit point */}
                        <motion.line
                            x1={(exitPointIndex / (priceData.length - 1)) * 200}
                            y1="0"
                            x2={(exitPointIndex / (priceData.length - 1)) * 200}
                            y2="80"
                            stroke="rgba(239, 68, 68, 0.3)"
                            strokeWidth="1"
                            strokeDasharray="3,3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2, duration: 0.5 }}
                        />

                        {/* Price line before exit */}
                        <motion.path
                            d={`M ${priceData.slice(0, exitPointIndex + 1).map((p, i) => `${(i / (priceData.length - 1)) * 200},${80 - p * 70}`).join(' L ')}`}
                            fill="none"
                            stroke="#6B7280"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 1.8, duration: 1, ease: 'easeOut' }}
                        />

                        {/* Price line after exit (missed gains) */}
                        <motion.path
                            d={`M ${priceData.slice(exitPointIndex).map((p, i) => `${((exitPointIndex + i) / (priceData.length - 1)) * 200},${80 - p * 70}`).join(' L ')}`}
                            fill="none"
                            stroke="rgba(239, 68, 68, 0.5)"
                            strokeWidth="2"
                            strokeDasharray="4,2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 2.5, duration: 1, ease: 'easeOut' }}
                        />

                        {/* Exit point marker */}
                        <motion.g
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2.2, duration: 0.5, type: 'spring' }}
                        >
                            <circle
                                cx={(exitPointIndex / (priceData.length - 1)) * 200}
                                cy={80 - priceData[exitPointIndex] * 70}
                                r="6"
                                fill="#EF4444"
                                stroke="white"
                                strokeWidth="2"
                            />
                            <text
                                x={(exitPointIndex / (priceData.length - 1)) * 200}
                                y={80 - priceData[exitPointIndex] * 70 + 20}
                                textAnchor="middle"
                                fill="#EF4444"
                                fontSize="8"
                            >
                                SOLD
                            </text>
                        </motion.g>

                        {/* What it settled at */}
                        <motion.g
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 3.2, duration: 0.5, type: 'spring' }}
                        >
                            <circle
                                cx={200}
                                cy={80 - priceData[priceData.length - 1] * 70}
                                r="4"
                                fill="rgba(255,255,255,0.3)"
                                stroke="white"
                                strokeWidth="1"
                            />
                        </motion.g>
                    </svg>
                </motion.div>

                {/* Context */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.5, duration: 0.6 }}
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3"
                >
                    <p className="text-sm text-white/60">{worst_miss.context}</p>
                </motion.div>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.8, duration: 0.6 }}
                    className="mt-6 text-sm italic text-white/30"
                >
                    "Sometimes the market knows before the market knows."
                </motion.p>
            </motion.div>
        </ScreenWrapper>
    );
}
