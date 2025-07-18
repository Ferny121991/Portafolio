import React, { CSSProperties, ReactNode } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ScrollRevealProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  delay = 0,
  duration = 0.8,
  className = '',
  style = {},
}) => {
  const { ref, isVisible } = useScrollReveal({
    threshold,
    rootMargin,
    triggerOnce,
  });

  const animationStyle: CSSProperties = isVisible
    ? {
        opacity: 1,
        transform: 'translateY(0)',
        transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
      }
    : {
        opacity: 0,
        transform: 'translateY(30px)',
        transition: 'none',
      };

  return (
    <div
      // @ts-ignore - necesario porque TypeScript no permite asignar el ref genérico
      ref={ref}
      className={className}
      style={{
        ...style,
        ...animationStyle,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
