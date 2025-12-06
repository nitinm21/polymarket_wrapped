import { motion } from 'framer-motion';

interface ProgressBarProps {
    currentIndex: number;
    totalScreens: number;
}

export function ProgressBar({ currentIndex, totalScreens }: ProgressBarProps) {
    return (
        <div className="fixed left-0 right-0 top-0 z-50 flex gap-1 px-2 py-3 safe-top sm:px-4">
            {Array.from({ length: totalScreens }).map((_, index) => (
                <div
                    key={index}
                    className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10"
                >
                    <motion.div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                            background: 'linear-gradient(90deg, #2563EB 0%, #8247E5 100%)',
                        }}
                        initial={false}
                        animate={{
                            width: index < currentIndex ? '100%' : index === currentIndex ? '100%' : '0%',
                            opacity: index <= currentIndex ? 1 : 0.3,
                        }}
                        transition={{
                            duration: 0.3,
                            ease: 'easeOut',
                        }}
                    />
                    {/* Glow effect for current segment */}
                    {index === currentIndex && (
                        <motion.div
                            className="absolute inset-y-0 right-0 w-4 rounded-full"
                            style={{
                                background: 'linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.8))',
                                filter: 'blur(2px)',
                            }}
                            animate={{
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
