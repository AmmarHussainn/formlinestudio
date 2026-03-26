"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedGlow } from "../ui/AnimatedGlow";

export const OurStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(contentRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      gsap.utils.toArray(".story-card").forEach((card: any, i) => {
        gsap.from(card, {
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-24 bg-black relative overflow-hidden"
    >
      {/* Background Glows */}
      <AnimatedGlow x="50%" y="50%" size={500} intensity={0.15} zIndex={1} />
      <AnimatedGlow x="0%" y="20%" size={300} intensity={0.15} zIndex={1} />
      <AnimatedGlow x="100%" y="80%" size={300} intensity={0.15} zIndex={1} />
      <AnimatedGlow x="100%" y="0%" size={350} intensity={0.15} zIndex={1} />
      <AnimatedGlow x="0%" y="100%" size={350} intensity={0.15} zIndex={1} />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div
          ref={contentRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24"
        >
          <div>
            <h2 className="text-4xl font-bold mb-6 text-white uppercase border-l-4 border-primary pl-6">
              The Genesis
            </h2>
            <div className="space-y-6 text-lg text-white/70 leading-relaxed">
              <p>
                Formline wasn't born in a boardroom. It started with a
                frustration: AI was powerful, but inaccessible. Businesses knew
                they needed to evolve, but the path was cluttered with
                complexity and technical barriers.
              </p>
              <p>
                We saw a world where AI was reserved for tech giants. We decided
                to change that. Our mission became simple:{" "}
                <span className="text-white font-semibold">
                  Democratize Intelligence.
                </span>
              </p>
            </div>
          </div>
          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0f0f0f]">
            {/* Abstract tech visualization */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a0500] to-black" />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(#440C01 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/20 font-black text-9xl select-none">
              AI
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Our Vision",
              text: "To create a future where every business, regardless of size, can leverage the exponential power of AI.",
            },
            {
              title: "Our Approach",
              text: "We don't just deliver code. We deliver outcomes. We bridge the gap between technical possibility and business reality.",
            },
            {
              title: "Our Promise",
              text: "Transparency, Efficiency, and Results. No fluff. Just hard-hitting solutions that move the needle.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="story-card p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors duration-500 group"
              style={{
                background:
                  "linear-gradient(180deg, #5a1502 0%, #330802 50%, #1b0201 100%)",
              }}
            >
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-white/60 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
