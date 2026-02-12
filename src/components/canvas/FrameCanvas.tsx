"use client";
import { useRef, useEffect } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

interface Props {
    images: HTMLImageElement[];
    // If we pass containerRef, we use it for scroll progress. 
    // Alternatively we can use passed-in scrollProgress or handle local scroll if needed.
    // The plan implies using a container ref for scroll progress.
    containerRef?: React.RefObject<HTMLElement | null>;
    className?: string;
}

export const FrameCanvas = ({ images, containerRef, className }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const hasLoggedRef = useRef(false);

    // If containerRef is provided, track its scroll. 
    // If not, we might rely on window scroll (default useScroll behavior with no target tracks window).
    // But for sticky sections, usually we track the container.
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, images.length - 1]);

    useEffect(() => {
        if (!images.length) return;

        let animationId: number;
        const render = () => {
            const ctx = canvasRef.current?.getContext('2d');
            if (ctx && images.length > 0) {
                const currentFrame = Math.floor(frameIndex.get());
                const safeFrame = Math.max(0, Math.min(currentFrame, images.length - 1));
                const img = images[safeFrame];

                if (!hasLoggedRef.current) {
                    console.log("Canvas rendering started for sequence:", img.src);
                    hasLoggedRef.current = true;
                }

                if (img) {
                    const canvas = canvasRef.current!;
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
        }
    }, [images, frameIndex]);

    return <canvas ref={canvasRef} className={`absolute top-0 left-0 w-full h-full object-cover ${className || ''}`} />;
};
