"use client";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const words = `I'm a passionate Web Developer and a devoted Christian. With expertise in modern web technologies and a keen eye for design, I create engaging digital experiences that solve real-world problems. My faith guides my work ethic—combining technical excellence with integrity and creative problem-solving to deliver outstanding results.`;

export default function TextGenerateEffectDemo() {
  return (
    <div className="px-4 md:px-0">
      <div className="text-black dark:text-white">
        <TextGenerateEffect
          words={words}
          className="font-sans font-bold tracking-wider text-lg md:text-xl lg:text-2xl leading-relaxed"
          filter={false}
        />
      </div>
    </div>
  );
}
