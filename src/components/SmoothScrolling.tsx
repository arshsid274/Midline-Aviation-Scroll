"use client";
import { useEffect } from "react";
import Lenis from "lenis";

declare global {
    interface Window {
        __lenis?: Lenis;
    }
}

function SmoothScrolling({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.08,
            duration: 1.5,
            smoothWheel: true,
            syncTouch: true,      // enables Lenis on iOS/touch
            touchMultiplier: 1.5, // controls scroll speed on touch
        });
        window.__lenis = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            if (window.__lenis === lenis) {
                delete window.__lenis;
            }
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}

export default SmoothScrolling;
