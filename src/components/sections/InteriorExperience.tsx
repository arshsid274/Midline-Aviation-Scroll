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
        <section
            id="services"
            ref={containerRef}
            aria-labelledby="services-heading"
            className="relative h-[400vh] scroll-mt-24 pointer-events-none"
        >
            <span id="aircraft-charter" aria-hidden="true" className="absolute left-0 top-[12%] h-px w-px scroll-mt-24" />
            <span id="aircraft-management" aria-hidden="true" className="absolute left-0 top-[30%] h-px w-px scroll-mt-24" />
            <span id="aircraft-sales" aria-hidden="true" className="absolute left-0 top-[48%] h-px w-px scroll-mt-24" />
            <span id="cargo-transportation" aria-hidden="true" className="absolute left-0 top-[66%] h-px w-px scroll-mt-24" />
            <span id="mro" aria-hidden="true" className="absolute left-0 top-[84%] h-px w-px scroll-mt-24" />
            <div className="sticky top-0 left-0 w-full h-[100svh] flex flex-col items-center justify-end pb-12 sm:pb-16 md:pb-20 overflow-hidden px-6 sm:px-8 md:px-10">
                <motion.div
                    style={{ opacity: textOpacity }}
                    className="relative z-10 flex flex-col items-center justify-center text-white"
                >
                    <h2
                        id="services-heading"
                        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-center"
                    >
                        Unrivaled Comfort.
                    </h2>
                    <h3 className="sr-only">Luxury aviation interior experience</h3>
                    <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-white/80 tracking-wide font-light max-w-xl text-center">
                        Your Sanctuary in the Clouds. Hand-stitched leather, ambient acoustics, and panoramic views.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
