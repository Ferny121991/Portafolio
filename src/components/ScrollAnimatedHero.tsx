import { useState, useEffect, useRef } from 'react';

interface ScrollAnimatedHeroProps {
    totalFrames?: number;
    scrollHeight?: number; // How many pixels of scroll for full animation
}

const ScrollAnimatedHero: React.FC<ScrollAnimatedHeroProps> = ({
    totalFrames = 192,
    scrollHeight = 3000, // 3000px of scroll to complete the animation
}) => {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);

    // Preload all images
    useEffect(() => {
        const loadImages = async () => {
            const imagePromises: Promise<HTMLImageElement>[] = [];

            for (let i = 0; i < totalFrames; i++) {
                const promise = new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    img.src = `/homehero/frame_${String(i).padStart(3, '0')}_delay-0.04${i % 3 === 0 ? '1' : '2'}s.jpg`;
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                });
                imagePromises.push(promise);
            }

            try {
                const loadedImages = await Promise.all(imagePromises);
                imagesRef.current = loadedImages;
                setImagesLoaded(true);
            } catch (error) {
                console.error('Error loading hero images:', error);
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
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [totalFrames, scrollHeight]);

    // Generate current frame path
    const getCurrentFramePath = () => {
        const frameNum = String(currentFrame).padStart(3, '0');
        const delay = currentFrame % 3 === 0 ? '1' : '2';
        return `/homehero/frame_${frameNum}_delay-0.04${delay}s.jpg`;
    };

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 w-full h-screen z-0"
            style={{ pointerEvents: 'none' }}
        >
            {/* Loading state */}
            {!imagesLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <div className="text-white text-xl">Loading animation...</div>
                </div>
            )}

            {/* Animated background */}
            <img
                src={getCurrentFramePath()}
                alt="Hero Animation"
                className="w-full h-full object-cover transition-opacity duration-100"
                style={{ opacity: imagesLoaded ? 1 : 0 }}
            />

            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50/90" />
        </div>
    );
};

export default ScrollAnimatedHero;
