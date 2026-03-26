"use client";

import { IMAGES } from "@/assets";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface BotSliderProps {
  autoPlayInterval?: number;
}

export const BotSlider = ({ autoPlayInterval = 3000 }: BotSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bots = [
    { id: 1, src: IMAGES.bot1, alt: "AI Bot 1" },
    { id: 2, src: IMAGES.bot2, alt: "AI Bot 2" },
    { id: 3, src: IMAGES.bot3, alt: "AI Bot 3" },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % bots.length);
  }, [bots.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [nextSlide, autoPlayInterval]);

  // Calculate positions for left, center, and right bots
  const getSlidePosition = (index: number) => {
    const diff = (index - currentSlide + bots.length) % bots.length;

    if (diff === 0) return "center"; // Current slide
    if (diff === 1 || diff === -2) return "right"; // Next slide
    return "left"; // Previous slide
  };

  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] flex items-end justify-center overflow-hidden">
      {/* Bot Images Container */}
      <div className="relative w-full h-full flex items-end justify-center">
        {bots.map((bot, index) => {
          const position = getSlidePosition(index);
          const isCenter = position === "center";

          return (
            <div
              key={bot.id}
              className={`absolute transition-all duration-700 ease-in-out origin-bottom ${
                isCenter ? "z-30 bottom-0" : "z-20 bottom-4 md:bottom-0"
              }`}
              style={{
                transform:
                  position === "center"
                    ? "translateX(0) scale(1)"
                    : position === "left"
                    ? "translateX(-200px) scale(0.76)"
                    : "translateX(200px) scale(0.76)",
                opacity: position === "center" ? 1 : 0.7,
              }}
            >
              <Image
                src={bot.src}
                alt={bot.alt}
                width={isCenter ? 566 : 428}
                height={isCenter ? 447 : 308}
                className="object-contain"
                priority={index === 0}
              />
            </div>
          );
        })}
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {bots.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-primary w-6"
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="absolute bottom-0 w-full left-0 right-0 h-48 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-[49]" />
    </div>
  );
};
