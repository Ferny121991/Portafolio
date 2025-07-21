"use client";
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
  const wordsArray = words.split(" ").filter(word => word.trim() !== '');

  return (
    <div className={cn("w-full max-w-3xl mx-auto", className)}>
      <div className="w-full">
        <div className="leading-relaxed tracking-wide">
          {wordsArray.map((word, idx) => (
            <span 
              key={`${word}-${idx}`}
              className="inline-block"
              style={{
                filter: filter ? 'blur(8px)' : 'none',
                color: 'inherit',
              }}
            >
              {word}{' '}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
