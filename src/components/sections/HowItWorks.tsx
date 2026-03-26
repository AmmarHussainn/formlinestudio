"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { IMAGES } from "@/assets";
import { AnimatedGlow } from "../ui/AnimatedGlow";
import { getGSAP } from "@/lib/gsap";

const steps = [
  {
    title: "Free AI Audit Call",
    description:
      "We connect to understand your business and identify your biggest time and cost drains that can be automated.",
    icon: IMAGES.work1,
  },
  {
    title: "Customized AI Plan",
    description:
      "We map out the exact tools, agents, and automations tailored to your specific goals for maximum ROI.",
    icon: IMAGES.work2,
  },
  {
    title: "Launch in Days, Not Months",
    description:
      "Our expert team sets everything up. You get a fully operational AI system ready to scale your business effortlessly.",
    icon: IMAGES.work3,
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = getGSAP();
    if (!gsap || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-animate]", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pb-24 bg-black overflow-hidden"
    >
      <AnimatedGlow x="0%" y="96%" size={250} intensity={0.2} zIndex={1} />
      <AnimatedGlow x="33%" y="96%" size={250} intensity={0.2} zIndex={1} />
      <AnimatedGlow x="66%" y="96%" size={250} intensity={0.2} zIndex={1} />
      <AnimatedGlow x="99%" y="96%" size={250} intensity={0.2} zIndex={1} />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2
          data-animate
          className="font-orbitron font-black text-white mb-6 tracking-tight leading-tight text-[32px] md:text-[44px] lg:text-[56px] uppercase"
        >
          How It Works
        </h2>
        <p
          data-animate
          className="font-medium text-white/80 mb-16 mx-auto leading-relaxed text-[16px] md:text-[18px] lg:text-[21px]"
        >
          Our <span className="text-primary font-bold">3-step</span> process
          makes working with us simple and friction-free.
        </p>

        {/* Outer Container with specific border styling */}
        <div
          data-animate
          className="p-8 md:p-12 rounded-[50px] border border-white/10 relative"
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            boxShadow: "0 0 40px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.title}
                className="relative p-8 rounded-[40px] flex flex-col items-center text-center group"
                style={{
                  background: "#220301",
                  boxShadow: "inset 5px 5px 20px 0px rgba(169, 37, 1, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                {/* Icon Container */}
                <div className="relative w-52 h-52 mb-8 flex items-center justify-center">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Image
                    src={step.icon}
                    alt={step.title}
                    width={200}
                    height={200}
                    className="relative z-10 w-full h-full object-contain"
                    unoptimized
                  />
                </div>

                {/* Content */}
                <h3 className="font-orbitron font-bold text-white text-lg mb-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-white/70 text-xs leading-relaxed max-w-[280px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
