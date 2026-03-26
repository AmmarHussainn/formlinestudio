"use client";

import React, { useEffect, useRef } from "react";
import { Clock, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { AnimatedGlow } from "../ui/AnimatedGlow";
import { getGSAP } from "@/lib/gsap";

const RealResults = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
      className="relative py-24 bg-black overflow-hidden"
    >
      <AnimatedGlow x="10%" y="20%" size={500} intensity={0.15} zIndex={1} />
      <AnimatedGlow x="90%" y="80%" size={500} intensity={0.15} zIndex={1} />

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Before/After Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Before Card */}
          <div
            data-animate
            className="p-8 rounded-[40px] text-left relative overflow-hidden group border border-white/5"
            // style={{
            //   background: "linear-gradient(135deg, #4d0d01 0%, #220301 100%)",
            //   boxShadow: "inset 5px 5px 20px 0px rgba(0, 0, 0, 0.5)",
            // }}
            style={{
              background:
                "linear-gradient(180deg, #330701 31%, #390901 51%, #4C0D01 74%, #651401 100%)",
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-black/40 p-3 rounded-full border border-white/5">
                <Clock className="w-6 h-6 text-white/60" />
              </div>
              <h3 className="font-orbitron font-black text-white text-xl uppercase tracking-tighter">
                Before Formline
              </h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Wasting time on repetitive tasks, missed leads, and endless manual
              follow-ups. Growth feels slow and inconsistent.
            </p>
          </div>

          {/* After Card */}
          <div
            data-animate
            className="p-8 rounded-[40px] text-left relative overflow-hidden group"
            // style={{
            //   background:
            //     "linear-gradient(180deg, #651401 0%, #4C0D01 28%, #390901 55%, #330701 74%) padding-box, linear-gradient(90deg, #541001 0%, #761801 74%) border-box",
            //   borderColor: "transparent",
            //   boxShadow: "inset 5px 5px 20px 0px rgba(0, 0, 0, 0.4)",
            // }}
            style={{
              background:
                "linear-gradient(180deg, #330701 31%, #390901 51%, #4C0D01 74%, #651401 100%)",
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/20 p-3 rounded-full border border-primary/20">
                <Zap className="w-6 h-6 text-primary fill-primary" />
              </div>
              <h3 className="font-orbitron font-black text-white text-xl uppercase tracking-tighter">
                After Formline
              </h3>
            </div>
            <p className="text-white font-medium text-sm leading-relaxed max-w-sm">
              AI agents qualify leads, book calls, and onboard clients 24/7.
              Your business grows predictably and automatically.
            </p>
          </div>
        </div>

        <div data-animate className="mb-24">
          <Button
            onClick={() => router.push("/contact-us")}
            variant="primary"
            size="lg"
            className="rounded-full px-12 py-4 text-sm font-orbitron font-black uppercase tracking-wider"
          >
            See What's Possible With AI In Your Business
          </Button>
        </div>

        {/* Results Heading */}
        <h2
          data-animate
          className="font-orbitron font-black text-white mb-6 tracking-tight leading-tight text-[32px] md:text-[44px] lg:text-[56px] uppercase"
        >
          Real Results, Not Just Promises
        </h2>
        <p
          data-animate
          className="font-medium text-white/80 mb-16 max-w-3xl mx-auto leading-relaxed text-[16px] md:text-[18px] lg:text-[19px]"
        >
          Our systems are designed to deliver measurable improvements to your
          bottom line.
        </p>

        {/* Results Metrics Card */}
        <div
          data-animate
          className="p-12 md:p-16 rounded-[40px] border relative overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, #651401 0%, #4C0D01 28%, #390901 55%, #330701 74%) padding-box, linear-gradient(90deg, #541001 0%, #761801 74%) border-box",
            borderColor: "transparent",
            boxShadow: "inset 5px 5px 20px 0px rgba(169, 37, 1, 0.4)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {/* Metric 1 */}
            <div className="flex flex-col items-center justify-center text-center px-4">
              <span className="font-orbitron font-black text-white text-[48px] lg:text-[64px] mb-2 leading-none">
                20+
              </span>
              <h4 className="text-white font-bold text-lg mb-2 uppercase tracking-tight">
                Hours Saved Weekly
              </h4>
              <p className="text-white/60 text-xs leading-relaxed max-w-[200px]">
                Automating repetitive tasks frees up your team to focus on
                growth.
              </p>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col items-center justify-center text-center px-4 relative">
              {/* Vertical Gaps/Separators using Glow */}
              <div className="hidden md:block absolute -left-6 top-1/4 bottom-1/4 w-px bg-linear-to-b from-transparent via-primary/40 to-transparent" />
              <div className="hidden md:block absolute -right-6 top-1/4 bottom-1/4 w-px bg-linear-to-b from-transparent via-primary/40 to-transparent" />

              <span className="font-orbitron font-black text-white text-[48px] lg:text-[64px] mb-2 leading-none">
                30%
              </span>
              <h4 className="text-white font-bold text-lg mb-2 uppercase tracking-tight">
                Increase In Leads Closed
              </h4>
              <p className="text-white/60 text-xs leading-relaxed max-w-[200px]">
                AI-powered follow-up and nurturing ensures no lead falls through
                the cracks.
              </p>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col items-center justify-center text-center px-4">
              <span className="font-orbitron font-black text-white text-[48px] lg:text-[64px] mb-2 leading-none">
                40+
              </span>
              <h4 className="text-white font-bold text-lg mb-2 uppercase tracking-tight">
                Reduction In Cost Per Lead
              </h4>
              <p className="text-white/60 text-xs leading-relaxed max-w-[200px]">
                Optimized systems and targeted outreach lower acquisition costs.
              </p>
            </div>
          </div>

          {/* Background Decorative Glow */}
          <div className="absolute top-1/2 left-[33%] -translate-y-1/2 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
          <div className="absolute top-1/2 left-[66%] -translate-y-1/2 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default RealResults;
