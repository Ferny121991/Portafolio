"use client";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const words = `I'm a passionate Web Developer with expertise in modern web technologies. With a keen eye for design and a love for clean code, I create engaging digital experiences that solve real-world problems. My approach combines technical excellence with creative problem-solving to deliver outstanding results.`;

export default function TextGenerateEffectDemo() {
  return (
    <div className="px-4 md:px-0">
      <div className="text-black dark:text-white">
        <TextGenerateEffect 
          words={words} 
          className="font-sans font-bold tracking-wide text-lg md:text-xl lg:text-2xl" 
          filter={false}
          duration={1.5}
        />
      </div>
    </div>
  );
}
