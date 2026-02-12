"use client";
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0, 0, 0]);

    return (
        <section ref={containerRef} className="relative h-[400vh] pointer-events-none">
            <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ opacity: textOpacity }}
                    className="relative z-10 flex flex-col items-center justify-center text-white"
                >
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-center max-w-4xl mx-auto">
                        The Sky is No Longer the Limit.
                    </h1>
                    <p className="mt-6 text-xl text-white/70 tracking-wide font-light max-w-xl text-center">
                        A New Era of Ascent. Experience the seamless fusion of performance and prestige.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
