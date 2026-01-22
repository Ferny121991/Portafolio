import { useState, useEffect, useRef } from 'react';

interface ScrollAnimatedHeroProps {
    totalFrames?: number;
    scrollHeight?: number;
}

const ScrollAnimatedHero: React.FC<ScrollAnimatedHeroProps> = ({
    totalFrames = 192,
    scrollHeight = 2500,
}) => {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);

    // Generate frame path - simpler format now: frame_000.jpg, frame_001.jpg, etc.
    const getFramePath = (frameIndex: number) => {
        return `/homehero/frame_${String(frameIndex).padStart(3, '0')}.jpg`;
    };

    // Preload all images
    useEffect(() => {
        const loadImages = async () => {
            const images: HTMLImageElement[] = [];
            let loadedCount = 0;

            for (let i = 0; i < totalFrames; i++) {
                const img = new Image();
                img.src = getFramePath(i);

                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === totalFrames) {
                        imagesRef.current = images;
                        setImagesLoaded(true);
                    }
                };

                img.onerror = () => {
                    console.error(`Failed to load frame ${i}`);
                    loadedCount++;
                };

                images.push(img);
            }
        };

        loadImages();
    }, [totalFrames]);

    // Handle scroll to update frame
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const maxScroll = scrollHeight;
            const scrollFraction = Math.min(scrollTop / maxScroll, 1);
            const frameIndex = Math.min(
                Math.floor(scrollFraction * totalFrames),
                totalFrames - 1
            );
            setCurrentFrame(frameIndex);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [totalFrames, scrollHeight]);

    // Draw current frame to canvas
    useEffect(() => {
        if (!imagesLoaded || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = imagesRef.current[currentFrame];
        if (!img) return;

        // Set canvas size to window size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Draw image covering the entire canvas
        const scale = Math.max(
            canvas.width / img.width,
            canvas.height / img.height
        );
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }, [currentFrame, imagesLoaded]);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current && imagesLoaded) {
                const canvas = canvasRef.current;
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [imagesLoaded]);

    return (
        <div className="fixed inset-0 w-full h-screen z-0">
            {/* Loading state */}
            {!imagesLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <div className="text-white text-lg">Cargando animación...</div>
                    </div>
                </div>
            )}

            {/* Canvas for rendering frames */}
            <canvas
                ref={canvasRef}
                className={`w-full h-full ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ display: 'block' }}
            />
        </div>
    );
};

export default ScrollAnimatedHero;
