"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedGlow } from "../ui/AnimatedGlow";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const AboutHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      }).from(
        textRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      );

      gsap.to(".hero-glow", {
        scale: 1.2,
        opacity: 0.8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-black pt-20"
    >
      {/* Main central glow */}
      <AnimatedGlow x="50%" y="50%" size={300} intensity={0.15} zIndex={11} />

      {/* Secondary decorative glows */}
      <AnimatedGlow x="0%" y="20%" size={300} intensity={0.15} zIndex={11} />
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_90%)] z-10" />
      </div>

      <div className="container mx-auto px-6 relative z-20 text-center">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight uppercase"
        >
          <span className="block text-white">We Are</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-orange-500 to-primary/80 animate-gradient-x">
            Formline
          </span>
        </h1>

        <p
          ref={textRef}
          className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Bridging the gap between complex AI technology and practical business
          results. We are the architects of the new digital efficiency.
        </p>
      </div>

      {/* Decorative Grid or lines */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20" />
    </section>
  );
};
