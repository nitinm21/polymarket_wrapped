import { motion } from 'framer-motion';
import { ScreenWrapper } from '../ui/ScreenWrapper';
import type { WrappedData } from '../../data/sampleData';

interface CryptoDegenScreenProps {
    data: WrappedData;
}

export function CryptoDegenScreen({ data }: CryptoDegenScreenProps) {
    const { crypto_bet } = data;
    const roi = ((crypto_bet.settlement_price - crypto_bet.entry_price) / crypto_bet.entry_price * 100).toFixed(0);

    // Mock Bitcoin price movement
    const generateBtcData = () => {
        const points = 25;
        const data = [];
        for (let i = 0; i <= points; i++) {
            const progress = i / points;
            // Simulate Bitcoin's volatile but upward path to 100k
            const base = 60000 + progress * 45000;
            const volatility = Math.sin(i * 0.8) * 5000 + (Math.random() - 0.5) * 3000;
            data.push(base + volatility);
        }
        return data;
    };

    const btcPrices = generateBtcData();

    return (
        <ScreenWrapper
            gradient="radial-gradient(ellipse at 50% 30%, rgba(247, 147, 26, 0.35) 0%, rgba(247, 147, 26, 0.1) 30%, transparent 60%), #14141a"
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
                    className="mb-2 text-lg text-white/80"
                >
                    You didn't just predict politics...
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mb-6 text-sm uppercase tracking-widest text-white/60"
                >
                    Your wildest crypto bet
                </motion.p>

                {/* Bitcoin icon with enhanced glow and contrast */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.8, type: 'spring', bounce: 0.4 }}
                    className="relative mb-6"
                >
                    {/* Outer glow ring */}
                    <motion.div
                        className="absolute -inset-12 rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(247, 147, 26, 0.5) 0%, rgba(247, 147, 26, 0.2) 40%, transparent 70%)' }}
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    {/* Inner glow */}
                    <motion.div
                        className="absolute -inset-6 rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(247, 147, 26, 0.8) 0%, transparent 60%)' }}
                        animate={{
                            scale: [1.1, 1.4, 1.1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    />
                    <span
                        className="relative text-6xl font-bold"
                        style={{
                            color: '#F7931A',
                            textShadow: '0 0 30px rgba(247, 147, 26, 0.8), 0 0 60px rgba(247, 147, 26, 0.5)',
                            filter: 'drop-shadow(0 0 20px rgba(247, 147, 26, 0.6))'
                        }}
                    >₿</span>
                </motion.div>

                {/* Market name */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                    className="mb-6 max-w-sm text-xl font-bold text-white sm:text-2xl"
                >
                    "{crypto_bet.market}"
                </motion.h2>

                {/* Mini chart */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 0.8 }}
                    className="glass-card mb-6 w-full max-w-xs rounded-xl p-3"
                >
                    <svg viewBox="0 0 200 50" className="h-20 w-full">
                        {/* Area fill */}
                        <motion.path
                            d={`M 0,50 ${btcPrices.map((p, i) => `L ${(i / (btcPrices.length - 1)) * 200},${50 - ((p - 55000) / 55000) * 45}`).join(' ')} L 200,50 Z`}
                            fill="url(#btcGradient)"
                            opacity="0.3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            transition={{ delay: 2, duration: 1 }}
                        />

                        {/* Line */}
                        <motion.path
                            d={`M ${btcPrices.map((p, i) => `${(i / (btcPrices.length - 1)) * 200},${50 - ((p - 55000) / 55000) * 45}`).join(' L ')}`}
                            fill="none"
                            stroke="#F7931A"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 2, duration: 2, ease: 'easeOut' }}
                        />

                        <defs>
                            <linearGradient id="btcGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#F7931A" />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                        </defs>

                        {/* $100K line */}
                        <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 3.5 }}
                        >
                            <line x1="0" y1="5" x2="200" y2="5" stroke="#F7931A" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
                            <text x="195" y="12" textAnchor="end" fill="#F7931A" fontSize="8">$100K 🚀</text>
                        </motion.g>
                    </svg>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.8, duration: 0.6 }}
                    className="mb-6 flex gap-6"
                >
                    <div className="text-center">
                        <p className="text-xs uppercase tracking-wider text-white/50">Entry</p>
                        <p className="text-2xl font-bold text-white">{(crypto_bet.entry_price * 100).toFixed(0)}¢</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs uppercase tracking-wider text-white/50">Settlement</p>
                        <p className="text-2xl font-bold text-[#F7931A]">$1.00</p>
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
                    className="rounded-xl border border-[#F7931A]/30 bg-[#F7931A]/10 px-5 py-3"
                >
                    <p className="text-sm text-white/70">{crypto_bet.context}</p>
                </motion.div>
            </motion.div>
        </ScreenWrapper>
    );
}
