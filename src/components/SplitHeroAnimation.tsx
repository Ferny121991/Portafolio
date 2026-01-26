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
    const [scrollProgress, setScrollProgress] = useState(0);
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

    // Handle scroll to update frame and 3D transform progress
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
            setScrollProgress(scrollFraction);
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

        // Set canvas size
        const containerWidth = canvas.parentElement?.clientWidth || 600;
        const containerHeight = canvas.parentElement?.clientHeight || 600;
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
                const containerWidth = canvasRef.current.parentElement?.clientWidth || 600;
                const containerHeight = canvasRef.current.parentElement?.clientHeight || 600;
                canvasRef.current.width = containerWidth;
                canvasRef.current.height = containerHeight;
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [imagesLoaded]);

    // 3D transform calculations based on scroll
    const rotateY = scrollProgress * 15; // Rotate up to 15 degrees
    const rotateX = scrollProgress * -5; // Slight tilt
    const scale = 1 - scrollProgress * 0.1; // Slightly shrink
    const translateY = scrollProgress * 50; // Move up slightly

    return (
        <div
            className="relative w-full h-full perspective-1000"
            style={{ perspective: '1200px' }}
        >
            <div
                className="relative w-full h-full transition-transform duration-100 ease-out"
                style={{
                    transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale}) translateY(${translateY}px)`,
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Glow background */}
                <div
                    className="absolute -inset-10 bg-gradient-to-br from-cyan-500/30 via-purple-500/20 to-pink-500/30 blur-3xl rounded-full opacity-60"
                    style={{ opacity: 0.6 - scrollProgress * 0.4 }}
                />

                {/* Canvas container with rounded corners and shadow */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/20 border border-white/10">
                    {/* Loading state */}
                    {!imagesLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-xl">
                            <div className="text-center">
                                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                                <div className="text-white text-sm">Loading...</div>
                            </div>
                        </div>
                    )}

                    {/* Canvas for rendering frames */}
                    <canvas
                        ref={canvasRef}
                        className={`w-full h-full ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
                        style={{ display: 'block' }}
                    />

                    {/* Overlay shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>
            </div>
        </div>
    );
};

export default SplitHeroAnimation;
