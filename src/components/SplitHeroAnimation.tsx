import { useState, useEffect, useRef } from 'react';

interface SplitHeroAnimationProps {
    totalFrames?: number;
    scrollHeight?: number;
    startFrame?: number;
}

const SplitHeroAnimation: React.FC<SplitHeroAnimationProps> = ({
    totalFrames = 178,
    scrollHeight = 600,
    startFrame = 14,
}) => {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);

    // Generate frame path
    const getFramePath = (frameIndex: number) => {
        const actualFrame = startFrame + frameIndex;
        return `/homehero/frame_${String(actualFrame).padStart(3, '0')}.jpg`;
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
                    console.error(`Failed to load frame ${startFrame + i}`);
                    loadedCount++;
                    if (loadedCount === totalFrames) {
                        imagesRef.current = images;
                        setImagesLoaded(true);
                    }
                };

                images.push(img);
            }
        };

        loadImages();
    }, [totalFrames, startFrame]);

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

        // Set canvas size to full container
        const containerWidth = canvas.parentElement?.clientWidth || window.innerWidth;
        const containerHeight = canvas.parentElement?.clientHeight || window.innerHeight;
        canvas.width = containerWidth;
        canvas.height = containerHeight;

        // Draw image to fit container (cover style)
        const scale = Math.max(
            canvas.width / img.width,
            canvas.height / img.height
        );
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }, [currentFrame, imagesLoaded]);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current && imagesLoaded) {
                const containerWidth = canvasRef.current.parentElement?.clientWidth || window.innerWidth;
                const containerHeight = canvasRef.current.parentElement?.clientHeight || window.innerHeight;
                canvasRef.current.width = containerWidth;
                canvasRef.current.height = containerHeight;
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [imagesLoaded]);

    return (
        <div className="relative w-full h-full">
            {/* Loading state */}
            {!imagesLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-transparent">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <div className="text-white/60 text-sm">Loading...</div>
                    </div>
                </div>
            )}

            {/* Canvas for rendering frames - full background, no styling */}
            <canvas
                ref={canvasRef}
                className={`w-full h-full object-cover ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ display: 'block' }}
            />
        </div>
    );
};

export default SplitHeroAnimation;
