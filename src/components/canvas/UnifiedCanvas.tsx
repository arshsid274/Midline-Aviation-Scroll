"use client";
import { useRef, useEffect, useMemo } from 'react';
import { useImagePreloader } from '@/hooks/useImagePreloader';

declare global {
    interface Window {
        __midlineSequenceComplete?: boolean;
    }
}

const detectIOS = () => {
    if (typeof window === 'undefined') return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export const UnifiedCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const sequenceCompletionAnnounced = useRef(false);

    const { images: seq1, loaded: loaded1 } = useImagePreloader('/sequence-1', 120);
    const { images: seq2, loaded: loaded2 } = useImagePreloader('/sequence-2', 120);
    const { images: seq3, loaded: loaded3 } = useImagePreloader('/sequence-3', 120);

    const allImages = useMemo(() => {
        return { seq1, seq2, seq3 };
    }, [seq1, seq2, seq3]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        window.__midlineSequenceComplete = false;
        sequenceCompletionAnnounced.current = false;
    }, []);

    useEffect(() => {
        if (!loaded1 || !loaded2 || !loaded3) return;

        let animationId: number;

        const drawFrame = (currentFrame: number) => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (!ctx || !canvas) return;

            let img: HTMLImageElement | undefined;
            if (currentFrame < 120) {
                img = allImages.seq1[Math.min(currentFrame, 119)];
            } else if (currentFrame < 240) {
                img = allImages.seq2[Math.min(currentFrame - 120, 119)];
            } else {
                img = allImages.seq3[Math.min(currentFrame - 240, 119)];
            }

            if (img) {
                const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                const x = (canvas.width / 2) - (img.width / 2) * scale;
                const y = (canvas.height / 2) - (img.height / 2) * scale;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            }

            if (!sequenceCompletionAnnounced.current && currentFrame >= 359) {
                sequenceCompletionAnnounced.current = true;
                if (typeof window !== 'undefined') {
                    window.__midlineSequenceComplete = true;
                    window.dispatchEvent(new Event('midline:sequence-complete'));
                }
            }
        };

        // Shared RAF render loop — reads scroll position via getBoundingClientRect
        const render = () => {
            const canvas = canvasRef.current;
            const container = containerRef.current;
            const ctx = canvas?.getContext('2d');

            if (ctx && canvas && container) {
                const rect = container.getBoundingClientRect();
                const scrollableHeight = rect.height - window.innerHeight;
                const scrollProgress = scrollableHeight > 0
                    ? Math.max(0, Math.min(1, -rect.top / scrollableHeight))
                    : 0;
                const currentFrame = Math.floor(scrollProgress * 359);
                drawFrame(currentFrame);
            }

            animationId = requestAnimationFrame(render);
        };

        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        animationId = requestAnimationFrame(render);

        // iOS-specific: intercept native momentum scroll and replace with
        // controlled manual scroll so the animation plays at finger speed.
        let cleanupTouch: (() => void) | undefined;

        if (detectIOS()) {
            let touchLastY = 0;
            let touchLastTime = 0;
            let touchVelocity = 0; // px per ms
            let isControlled = false;
            let momentumId: number;

            const getProgress = () => {
                const container = containerRef.current;
                if (!container) return { inRange: false };
                const rect = container.getBoundingClientRect();
                const scrollableHeight = rect.height - window.innerHeight;
                if (scrollableHeight <= 0) return { inRange: false };
                const progress = -rect.top / scrollableHeight;
                // Control scroll from the very start of the animation until it finishes
                return { inRange: progress >= 0 && progress < 1 };
            };

            const onTouchStart = (e: TouchEvent) => {
                const { inRange } = getProgress();
                isControlled = inRange;
                if (isControlled) {
                    cancelAnimationFrame(momentumId);
                    touchLastY = e.touches[0].clientY;
                    touchLastTime = performance.now();
                    touchVelocity = 0;
                }
            };

            const onTouchMove = (e: TouchEvent) => {
                if (!isControlled) return;
                e.preventDefault(); // Block iOS native momentum scroll

                const now = performance.now();
                const currentY = e.touches[0].clientY;
                const deltaY = touchLastY - currentY; // positive = finger moving up = scrolling down
                const dt = now - touchLastTime;

                if (dt > 0) touchVelocity = deltaY / dt;
                touchLastY = currentY;
                touchLastTime = now;

                window.scrollBy(0, deltaY);
            };

            const onTouchEnd = () => {
                if (!isControlled) return;

                // Simulate natural deceleration after finger lift
                let v = touchVelocity * 16; // px/ms → px/frame at ~60fps

                const applyMomentum = () => {
                    if (Math.abs(v) < 0.5) return;
                    const { inRange } = getProgress();
                    if (!inRange) return; // Animation finished — release scroll
                    window.scrollBy(0, v);
                    v *= 0.92; // decelerate each frame
                    momentumId = requestAnimationFrame(applyMomentum);
                };

                momentumId = requestAnimationFrame(applyMomentum);
            };

            document.addEventListener('touchstart', onTouchStart, { passive: true });
            document.addEventListener('touchmove', onTouchMove, { passive: false });
            document.addEventListener('touchend', onTouchEnd, { passive: true });

            cleanupTouch = () => {
                cancelAnimationFrame(momentumId);
                document.removeEventListener('touchstart', onTouchStart);
                document.removeEventListener('touchmove', onTouchMove);
                document.removeEventListener('touchend', onTouchEnd);
            };
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            cleanupTouch?.();
        };
    }, [loaded1, loaded2, loaded3, allImages]);

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full h-[1200vh] -z-10 bg-[#0e152e]">
            <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
                {(!loaded1 || !loaded2 || !loaded3) ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0e152e] text-white z-50" aria-live="polite">
                        <div className="text-center px-6">
                            <div className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Initializing Experience...</div>
                        </div>
                    </div>
                ) : (
                    <>
                        <canvas
                            ref={canvasRef}
                            role="img"
                            aria-describedby="canvas-description"
                            aria-label="Animated Midline Airlines fleet and cabin showcase"
                            className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                        <p id="canvas-description" className="sr-only">
                            Cinematic animation featuring Midline Airlines private aircraft, luxury cabin interiors, and aviation service highlights.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};
