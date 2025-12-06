import { motion } from 'framer-motion';
import { ScreenWrapper } from '../ui/ScreenWrapper';
import type { WrappedData } from '../../data/sampleData';

interface TimingScreenProps {
    data: WrappedData;
}

const timingProfiles = {
    alpha_hunter: {
        title: 'Alpha Hunter',
        description: "You find value before the crowd piles in.",
        position: 0.15,
    },
    patient_sniper: {
        title: 'Patient Sniper',
        description: "You wait for the right moment to strike.",
        position: 0.5,
    },
    late_validator: {
        title: 'Late Validator',
        description: "You confirm the trend before committing.",
        position: 0.85,
    },
};

export function TimingScreen({ data }: TimingScreenProps) {
    const profile = timingProfiles[data.timing_profile];
    const avgEntry = data.avg_entry_price * 100;

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
                    When you enter a market, the average price is
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.6, type: 'spring' }}
                    className="mb-8"
                >
                    <span
                        className="gradient-text-poly text-6xl font-black sm:text-7xl"
                        style={{ fontFamily: 'Rajdhani, system-ui, sans-serif' }}
                    >
                        {avgEntry.toFixed(0)}¢
                    </span>
                </motion.div>

                {/* Profile reveal */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="mb-2 text-sm uppercase tracking-widest text-white/50"
                >
                    That makes you an
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8, type: 'spring' }}
                    className="mb-8 text-3xl font-black text-[#2563EB] sm:text-4xl"
                    style={{
                        textShadow: '0 0 40px rgba(37, 99, 235, 0.5)',
                    }}
                >
                    {profile.title}
                </motion.h2>

                {/* Spectrum visualization */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 0.8 }}
                    className="mb-8 w-full max-w-sm"
                >
                    {/* Labels */}
                    <div className="mb-3 flex justify-between text-xs text-white/40">
                        <span>Late Validator</span>
                        <span>Patient Sniper</span>
                        <span className="text-[#2563EB]">Alpha Hunter</span>
                    </div>

                    {/* Track */}
                    <div className="relative h-3 overflow-hidden rounded-full bg-white/10">
                        {/* Gradient fill */}
                        <div
                            className="absolute inset-y-0 left-0 right-0 rounded-full"
                            style={{
                                background: 'linear-gradient(90deg, #6B7280 0%, #8247E5 50%, #2563EB 100%)',
                                opacity: 0.5,
                            }}
                        />

                        {/* Marker */}
                        <motion.div
                            className="absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-2 border-white bg-[#2563EB]"
                            style={{
                                boxShadow: '0 0 20px rgba(37, 99, 235, 0.6)',
                            }}
                            initial={{ left: '50%' }}
                            animate={{ left: `calc(${(1 - profile.position) * 100}% - 12px)` }}
                            transition={{ delay: 2.2, duration: 1.2, ease: 'easeOut' }}
                        />
                    </div>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3, duration: 0.6 }}
                    className="mb-6 text-lg text-white/70"
                >
                    {profile.description}
                </motion.p>

                {/* Example */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.4, duration: 0.6 }}
                    className="glass-card-poly rounded-xl px-5 py-3"
                >
                    <p className="text-sm text-white/60">
                        {data.timing_example}
                    </p>
                </motion.div>
            </motion.div>
        </ScreenWrapper>
    );
}
