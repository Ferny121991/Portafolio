"use client";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = false,
}: {
  words: string;
  className?: string;
  filter?: boolean;
}) => {
  const [visibleWords, setVisibleWords] = useState<number[]>([]);
  const wordsArray = words.split(" ").filter(word => word.trim() !== '');

  useEffect(() => {
    // Mostrar palabras una por una con un pequeño retraso
    const timeouts: number[] = [];

    wordsArray.forEach((_, index) => {
      const timeout = window.setTimeout(() => {
        setVisibleWords(prev => [...prev, index]);
      }, 100 * index); // 100ms de retraso entre palabras

      timeouts.push(timeout);
    });

    return () => timeouts.forEach(id => window.clearTimeout(id));
  }, [words]);

  return (
    <div className={cn("w-full max-w-3xl mx-auto text-gray-700 dark:text-gray-200", className)}>
      <div className="w-full">
        <div className="leading-relaxed tracking-wider">
          {wordsArray.map((word, idx) => (
            <span
              key={`${word}-${idx}`}
              className={`inline-block transition-all duration-300 ease-out ${visibleWords.includes(idx) ? 'opacity-100' : 'opacity-0'
                }`}
              style={{
                filter: filter ? 'blur(8px)' : 'none',
                color: 'inherit',
                WebkitTextFillColor: 'currentColor',
                WebkitFontSmoothing: 'antialiased',
                marginRight: '0.25em', // Añade espacio entre palabras
                letterSpacing: '0.05em', // Aumenta el espacio entre letras
                wordSpacing: '0.1em', // Aumenta el espacio entre palabras
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
