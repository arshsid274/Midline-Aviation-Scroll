"use client";
import { useRef, useEffect, useMemo } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useImagePreloader } from '@/hooks/useImagePreloader';

export const UnifiedCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Load all sequences
    const { images: seq1, loaded: loaded1 } = useImagePreloader('/sequence-1', 120);
    const { images: seq2, loaded: loaded2 } = useImagePreloader('/sequence-2', 120);
    const { images: seq3, loaded: loaded3 } = useImagePreloader('/sequence-3', 120);

    // Combine images into one timeline? 
    // No, checking index is better to avoid massive array allocation if needed, but combined array is easier for index mapping.
    // Let's keep them separate to manage memory or just combined reference.
    const allImages = useMemo(() => {
        // Only combine if all loaded to avoid partial renders or index mismatches?
        // Actually, we can just access them by index range.
        return { seq1, seq2, seq3 };
    }, [seq1, seq2, seq3]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Total frames approx 360. 
    // Map 0-1 progress to 0-359 frames.
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 359]);

    useEffect(() => {
        if (!loaded1 || !loaded2 || !loaded3) return;

        let animationId: number;

        const render = () => {
            const ctx = canvasRef.current?.getContext('2d');
            if (ctx) {
                // Clear logic
                const currentFrame = Math.floor(frameIndex.get());
                let img: HTMLImageElement | undefined;

                if (currentFrame < 120) {
                    img = allImages.seq1[Math.min(currentFrame, 119)];
                } else if (currentFrame < 240) {
                    img = allImages.seq2[Math.min(currentFrame - 120, 119)];
                } else {
                    img = allImages.seq3[Math.min(currentFrame - 240, 119)];
                }

                if (img) {
                    const canvas = canvasRef.current!;
                    // Cover logic
                    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                    const x = (canvas.width / 2) - (img.width / 2) * scale;
                    const y = (canvas.height / 2) - (img.height / 2) * scale;

                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
                }
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

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
        };
    }, [loaded1, loaded2, loaded3, allImages, frameIndex]);

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full h-[1200vh] -z-10 bg-[#0e152e]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {(!loaded1 || !loaded2 || !loaded3) ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0e152e] text-white z-50">
                        <div className="text-center">
                            <div className="text-2xl font-bold mb-4">Initializing Experience...</div>
                            {/* Could add meaningful progress here */}
                        </div>
                    </div>
                ) : (
                    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full object-cover" />
                )}
            </div>
        </div>
    );
};
