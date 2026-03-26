"use client";

import { BotSlider } from "@/components/ui/BotSlider";
import { Button } from "@/components/ui/Button";
import { gsap } from "gsap";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { AnimatedGsapGlow } from "../ui/AnimatedGsapGlow";

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Left content animation
      gsap.from("[data-hero]", {
        opacity: 0,
        y: 40,
        duration: 2,
        ease: "power3.out",
        stagger: 0.5,
      });

      // Bot slider animation (desktop only)
      gsap.from("[data-bot]", {
        opacity: 0,
        scale: 0.96,
        duration: 2,
        ease: "power3.out",
        delay: 0.5,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex items-center pt-28 lg:pt-32 overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute inset-0 bg-black z-9">
        <AnimatedGsapGlow
          x="0%"
          y="45%"
          size={300}
          intensity={0.8}
          zIndex={9}
        />
        <AnimatedGsapGlow
          x="97%"
          y="45%"
          size={250}
          intensity={0.8}
          zIndex={9}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 pb-20 lg:pb-0 lg:pt-0 pt-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="pt-10 lg:py-20 lg:text-left text-center">
            <h1
              data-hero
              className="font-black mb-6 leading-[1.1] tracking-tight text-4xl xl:text-6xl"
            >
              We Form the Line
              <br />
              Between AI and
              <br />
              Your Business
            </h1>

            <p
              data-hero
              className="font-medium text-white/90 mb-10 max-w-xl lg:mx-0 mx-auto text-lg md:text-xl xl:text-2xl leading-relaxed lg:text-left text-center"
            >
              Done-for-you AI agents, automation, and tools — launch in days,
              not months.
            </p>

            <div
              data-hero
              className="flex flex-col sm:flex-row gap-4 lg:justify-start justify-center"
            >
              <Button
                onClick={() => router.push("/book-a-free-audit")}
                variant="primary"
                size="lg"
                className="h-14 px-8 text-base font-semibold group"
              >
                Book a Free AI Audit
                <ChevronRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </Button>

              <Button
                onClick={() => router.push("#how-it-works")}
                variant="cta"
                size="lg"
                className="h-14 px-8 text-base font-medium border-0 hover:bg-white/10"
              >
                See How It Works
              </Button>
            </div>
          </div>

          {/* Right Content - Bot Slider */}
          <div
            data-bot
            className="relative w-full max-w-[600px] mx-auto lg:max-w-none lg:block hidden"
          >
            <BotSlider />
          </div>
        </div>
      </div>
    </section>
  );
};
