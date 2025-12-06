import { motion } from 'framer-motion';
import { ScreenWrapper } from '../ui/ScreenWrapper';
import type { WrappedData } from '../../data/sampleData';

interface BestCallScreenProps {
    data: WrappedData;
}

export function BestCallScreen({ data }: BestCallScreenProps) {
    const { best_call } = data;
    const roi = ((best_call.settlement_price - best_call.entry_price) / best_call.entry_price * 100).toFixed(0);

    // Generate mock price data for chart
    const generatePriceData = () => {
        const points = 20;
        const data = [];
        const startPrice = best_call.entry_price;
        const endPrice = best_call.settlement_price;

        for (let i = 0; i <= points; i++) {
            const progress = i / points;
            // Sigmoid-like curve for prediction market price movement
            const sigmoid = 1 / (1 + Math.exp(-10 * (progress - 0.6)));
            const noise = (Math.random() - 0.5) * 0.1;
            const price = startPrice + (endPrice - startPrice) * sigmoid + noise;
            data.push(Math.max(0, Math.min(1, price)));
        }
        return data;
    };

    const priceData = generatePriceData();
    const entryPointIndex = 3; // Entry at ~15% of timeline

    return (
        <ScreenWrapper
            gradient="radial-gradient(ellipse at 50% 30%, rgba(16, 185, 129, 0.2) 0%, transparent 50%), #14141a"
        >
            <motion.div
                className="flex w-full flex-col items-center text-center"
                initial="initial"
                animate="animate"
            >
                {/* Glitch intro */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mb-6"
                >
                    <motion.p
                        className="text-lg text-white/70"
                        animate={{
                            opacity: [1, 0.3, 1, 0.3, 1],
                            x: [0, -2, 2, -1, 0],
                        }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                    >
                        One call that hit different...
                    </motion.p>
                </motion.div>

                {/* Market name */}
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.8, type: 'spring' }}
                    className="mb-6 text-2xl font-bold text-white sm:text-3xl"
                >
                    "{best_call.market}"
                </motion.h2>

                {/* Price chart */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="glass-card mb-6 w-full max-w-sm rounded-2xl p-4"
                >
                    <svg viewBox="0 0 200 80" className="h-32 w-full">
                        {/* Grid lines */}
                        <line x1="0" y1="0" x2="200" y2="0" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                        <line x1="0" y1="40" x2="200" y2="40" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                        <line x1="0" y1="80" x2="200" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

                        {/* Price line */}
                        <motion.path
                            d={`M ${priceData.map((p, i) => `${(i / (priceData.length - 1)) * 200},${80 - p * 70}`).join(' L ')}`}
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 1.8, duration: 2, ease: 'easeOut' }}
                        />

                        {/* Gradient definition */}
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#2563EB" />
                                <stop offset="100%" stopColor="#10B981" />
                            </linearGradient>
                        </defs>

                        {/* Entry point marker */}
                        <motion.g
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2.5, duration: 0.5, type: 'spring' }}
                        >
                            <circle
                                cx={(entryPointIndex / (priceData.length - 1)) * 200}
                                cy={80 - priceData[entryPointIndex] * 70}
                                r="6"
                                fill="#2563EB"
                                stroke="white"
                                strokeWidth="2"
                            />
                            <text
                                x={(entryPointIndex / (priceData.length - 1)) * 200}
                                y={80 - priceData[entryPointIndex] * 70 - 12}
                                textAnchor="middle"
                                fill="white"
                                fontSize="8"
                            >
                                {(best_call.entry_price * 100).toFixed(0)}¢
                            </text>
                        </motion.g>

                        {/* Settlement point */}
                        <motion.g
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 3.5, duration: 0.5, type: 'spring' }}
                        >
                            <circle
                                cx={200}
                                cy={80 - priceData[priceData.length - 1] * 70}
                                r="6"
                                fill="#10B981"
                                stroke="white"
                                strokeWidth="2"
                            />
                            <text
                                x={185}
                                y={80 - priceData[priceData.length - 1] * 70 - 12}
                                textAnchor="middle"
                                fill="#10B981"
                                fontSize="8"
                                fontWeight="bold"
                            >
                                $1.00
                            </text>
                        </motion.g>
                    </svg>
                </motion.div>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.8, duration: 0.6 }}
                    className="mb-6 flex gap-6"
                >
                    <div className="text-center">
                        <p className="text-xs uppercase tracking-wider text-white/50">Entry</p>
                        <p className="text-2xl font-bold text-[#2563EB]">{(best_call.entry_price * 100).toFixed(0)}¢</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs uppercase tracking-wider text-white/50">Settlement</p>
                        <p className="text-2xl font-bold text-[#10B981]">$1.00</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs uppercase tracking-wider text-white/50">ROI</p>
                        <p className="text-2xl font-bold text-[#10B981]">+{roi}%</p>
                    </div>
                </motion.div>

                {/* Context */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4.2, duration: 0.6 }}
                    className="glass-card-poly rounded-xl px-5 py-3"
                >
                    <p className="text-sm text-white/70">{best_call.context}</p>
                </motion.div>
            </motion.div>
        </ScreenWrapper>
    );
}
