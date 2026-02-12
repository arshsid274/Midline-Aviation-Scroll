"use client";
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0, 0, 0]);

    return (
        <section
            id="home"
            ref={containerRef}
            aria-labelledby="home-heading"
            className="relative h-[400vh] scroll-mt-24 pointer-events-none"
        >
            <div className="sticky top-0 left-0 w-full h-[100svh] flex items-center justify-center overflow-hidden px-6 sm:px-8 md:px-10">
                <motion.div
                    style={{ opacity: textOpacity }}
                    className="relative z-10 flex flex-col items-center justify-center text-white"
                >
                    <h1
                        id="home-heading"
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-center max-w-4xl mx-auto"
                    >
                        {"Midline Airlines \u2013 Luxury Aviation Solutions"}
                    </h1>
                    <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-white/70 tracking-wide font-light max-w-xl text-center">
                        Private jet charter, aircraft management, cargo transportation, aircraft sales, and MRO services tailored for premium travel.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
