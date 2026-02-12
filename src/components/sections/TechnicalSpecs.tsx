"use client";
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export const TechnicalSpecs = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Fade in during the middle of the sequence, fade out at end
    const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="relative h-[400vh] pointer-events-none">
            <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden">
                {/* Text overlay removed as per user request to focus on animation */}
            </div>
        </section>
    );
};
