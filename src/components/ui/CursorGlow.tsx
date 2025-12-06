import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function CursorGlow() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show on desktop
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) return;

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <motion.div
            className="pointer-events-none fixed z-50"
            animate={{
                x: mousePosition.x - 150,
                y: mousePosition.y - 150,
            }}
            transition={{
                type: 'spring',
                damping: 30,
                stiffness: 200,
                mass: 0.5,
            }}
        >
            <div
                className="h-[300px] w-[300px] rounded-full opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(130, 71, 229, 0.4) 0%, rgba(37, 99, 235, 0.2) 40%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
            />
        </motion.div>
    );
}
