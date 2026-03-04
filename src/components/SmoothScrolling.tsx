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
        // Prevent browser from restoring previous scroll position on reload
        history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);

        // On iOS we intercept touch in UnifiedCanvas (preventDefault).
        // Lenis syncTouch must be off there so it doesn't fight us.
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

        const lenis = new Lenis({
            lerp: 0.08,
            duration: 1.5,
            smoothWheel: true,
            syncTouch: !isIOS,    // Android touch smoothing on; iOS handled separately
            touchMultiplier: 1.5,
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
