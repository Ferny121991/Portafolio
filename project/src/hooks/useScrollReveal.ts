import { useEffect, useState, useRef } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

// Hook personalizado para detectar cuando un elemento es visible en el viewport
export const useScrollReveal = ({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true
}: UseScrollRevealOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const currentElement = ref.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Actualiza el estado cuando el elemento se vuelve visible
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Si solo se debe activar una vez, desconectar después de activarse
          if (triggerOnce) {
            observer.unobserve(currentElement);
          }
        } else if (!triggerOnce) {
          // Si no es triggerOnce, actualiza a false cuando sale del viewport
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};
