"use client";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const words = `I'm a passionate Full Stack Developer with expertise in modern web technologies. With a keen eye for design and a love for clean code, I create engaging digital experiences that solve real-world problems. My approach combines technical excellence with creative problem-solving to deliver outstanding results.`;

export default function TextGenerateEffectDemo() {
  return (
    <div className="text-gray-600 leading-relaxed">
      <TextGenerateEffect words={words} className="font-normal text-base" filter={false} />
    </div>
  );
}
