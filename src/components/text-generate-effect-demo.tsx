"use client";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const words = `I'm a passionate Web Developer with expertise in modern web technologies. With a keen eye for design and a love for clean code, I create engaging digital experiences that solve real-world problems. My approach combines technical excellence with creative problem-solving to deliver outstanding results.`;

export default function TextGenerateEffectDemo() {
  return (
    <div className="px-4 md:px-0">
      <TextGenerateEffect 
        words={words} 
        className="font-sans font-bold tracking-wide text-black dark:text-white text-base md:text-lg lg:text-xl" 
        filter={false}
        duration={1.5}
      />
    </div>
  );
}
