import { useState, useEffect } from 'react';

export const useImagePreloader = (sequencePath: string, frameCount: number) => {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadImages = async () => {
            const promises = Array.from({ length: frameCount }, (_, i) => {
                return new Promise<HTMLImageElement>((resolve) => {
                    const img = new Image();
                    img.decoding = 'async';
                    img.src = `${sequencePath}/${(i + 1).toString().padStart(3, '0')}.jpg`;
                    img.onload = () => resolve(img);
                    img.onerror = () => {
                        // Resolve with empty image or retry, but strict resolution keeps array order
                        // For now, resolve anyway to avoid hanging
                        console.error(`Failed to load image: ${img.src}`);
                        resolve(img);
                    }
                });
            });

            const loadedImages = await Promise.all(promises);
            const validImages = loadedImages.filter(img => img.width > 0);
            console.log(`[useImagePreloader] ${sequencePath}: Loaded ${validImages.length}/${frameCount} images`);
            setImages(validImages);
            setLoaded(true);
        };

        loadImages();
    }, [sequencePath, frameCount]);

    return { images, loaded };
};
