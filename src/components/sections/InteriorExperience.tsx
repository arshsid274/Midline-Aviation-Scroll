"use client";
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export const InteriorExperience = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const textOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="relative h-[400vh] pointer-events-none">
            <div className="sticky top-0 left-0 w-full h-screen flex flex-col items-center justify-end pb-20 overflow-hidden">
                <motion.div
                    style={{ opacity: textOpacity }}
                    className="relative z-10 flex flex-col items-center justify-center text-white"
                >
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-center">
                        Unrivaled Comfort.
                    </h2>
                    <p className="mt-6 text-xl text-white/80 tracking-wide font-light max-w-xl text-center">
                        Your Sanctuary in the Clouds. Hand-stitched leather, ambient acoustics, and panoramic views.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
