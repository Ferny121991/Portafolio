"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "../../lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  
  useEffect(() => {
    // Iniciar la animación después de un pequeño retraso
    const timer = setTimeout(() => {
      if (scope.current) {
        // Usar requestAnimationFrame para asegurar que el navegador esté listo
        requestAnimationFrame(() => {
          try {
            animate(
              "span",
              {
                opacity: 1,
                filter: filter ? "blur(0px)" : "none",
              },
              {
                duration: duration || 1,
                delay: stagger(0.1),
              }
            );
          } catch (error) {
            console.error('Error en la animación:', error);
          }
        });
      }
    }, 50); // Reducir el tiempo de espera inicial
    
    return () => clearTimeout(timer);
  }, [scope.current]);

  const renderWords = () => {
    if (!wordsArray || wordsArray.length === 0) return null;
    
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => (
          <motion.span
            key={`${word}-${idx}`}
            className="dark:text-gray-300 text-gray-700 opacity-0 inline-block"
            style={{
              filter: filter ? `blur(${filter ? '8px' : '0px'})` : 'none',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              display: 'inline',
              transition: 'all 0.5s ease-out',
              willChange: 'opacity, filter',
              backfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'subpixel-antialiased',
            }}
          >
            {word}{' '}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto", className)}>
      <div className="w-full">
        <div className="leading-relaxed tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
