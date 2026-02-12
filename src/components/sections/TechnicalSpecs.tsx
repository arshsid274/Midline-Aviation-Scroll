"use client";
import { useRef } from 'react';
import { useScroll } from 'framer-motion';

export const TechnicalSpecs = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section
            id="fleet"
            ref={containerRef}
            aria-labelledby="fleet-heading"
            className="relative h-[400vh] scroll-mt-24 pointer-events-none"
        >
            <div className="sticky top-0 left-0 w-full h-[100svh] flex items-center justify-center overflow-hidden">
                <div className="sr-only">
                    <h2 id="fleet-heading">Fleet and Aviation Services</h2>
                    <h3>Private Jet Charter</h3>
                    <h3>Aircraft Management</h3>
                    <h3>Aircraft Sales</h3>
                    <h3>Cargo Transportation</h3>
                    <h3>MRO Services</h3>
                </div>
            </div>
        </section>
    );
};
