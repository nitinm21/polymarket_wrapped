import { motion } from 'framer-motion';
import { ScreenWrapper } from '../ui/ScreenWrapper';
import type { WrappedData } from '../../data/sampleData';

interface ContrarianScreenProps {
    data: WrappedData;
}

export function ContrarianScreen({ data }: ContrarianScreenProps) {
    const contrarian = data.contrarian_score * 100;

    return (
        <ScreenWrapper
            gradient="radial-gradient(ellipse at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%), #14141a"
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
                    className="mb-4 text-lg text-white/70"
                >
                    The crowd said "Kamala."
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="mb-8 text-2xl font-bold text-white"
                >
                    You said "check the fundamentals."
                </motion.p>

                {/* Spectrum visualization */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6, duration: 0.8 }}
                    className="mb-8 w-full max-w-sm"
                >
                    {/* Labels */}
                    <div className="mb-3 flex justify-between text-sm">
                        <span className="text-white/40">Normie</span>
                        <span className="font-bold text-[#10B981]">Based</span>
                    </div>

                    {/* Track */}
                    <div className="relative h-3 overflow-hidden rounded-full bg-white/10">
                        {/* Gradient fill */}
                        <motion.div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{
                                background: 'linear-gradient(90deg, #6B7280 0%, #10B981 100%)',
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${contrarian}%` }}
                            transition={{ delay: 2, duration: 1.5, ease: 'easeOut' }}
                        />

                        {/* Marker */}
                        <motion.div
                            className="absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-2 border-white bg-[#10B981]"
                            style={{
                                boxShadow: '0 0 20px rgba(16, 185, 129, 0.6)',
                            }}
                            initial={{ left: 0 }}
                            animate={{ left: `calc(${contrarian}% - 12px)` }}
                            transition={{ delay: 2, duration: 1.5, ease: 'easeOut' }}
                        />
                    </div>

                    {/* Percentage label */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3.2, duration: 0.5 }}
                        className="mt-4 text-center"
                    >
                        <span className="text-4xl font-black text-[#10B981]">{Math.round(contrarian)}%</span>
                        <span className="ml-2 text-white/60">contrarian</span>
                    </motion.div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.5, duration: 0.6 }}
                    className="mb-6 text-lg text-white/80"
                >
                    You bet against mainstream polling{' '}
                    <span className="font-bold text-white">{Math.round(contrarian)}%</span> of the time.
                </motion.div>

                {/* Percentile badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 3.8, duration: 0.6, type: 'spring' }}
                    className="glass-card-poly rounded-xl px-6 py-4"
                >
                    <p className="text-sm text-white/60">
                        That puts you in the{' '}
                        <span className="font-bold text-[#10B981]">top {100 - data.contrarian_percentile}%</span>
                        {' '}of contrarians on Polymarket.
                    </p>
                </motion.div>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4.2, duration: 0.6 }}
                    className="mt-6 text-sm italic text-white/40"
                >
                    "While pundits hedged, you sized up."
                </motion.p>
            </motion.div>
        </ScreenWrapper>
    );
}
