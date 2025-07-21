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
        {wordsArray.map((word, idx) => {
          // Asegurarse de que no haya espacios vacíos al final
          if (word.trim() === '') return null;
          
          return (
            <motion.span
              key={`${word}-${idx}`}
              className="inline-block"
              style={{
                opacity: 0,
                filter: filter ? 'blur(8px)' : 'none',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                display: 'inline',
                transition: 'all 0.5s ease-out',
                willChange: 'opacity, filter',
                color: 'inherit',
                WebkitTextFillColor: 'currentColor',
                WebkitFontSmoothing: 'antialiased',
                WebkitTextSizeAdjust: '100%',
                textRendering: 'optimizeLegibility',
                backfaceVisibility: 'hidden',
              }}
            >
              {word}{' '}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto text-inherit", className)}>
      <div className="w-full">
        <div 
          className="leading-relaxed tracking-wide"
          style={{
            color: 'inherit',
            WebkitTextFillColor: 'currentColor',
          }}
        >
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
