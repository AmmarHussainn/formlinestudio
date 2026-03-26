"use client";

import React, { useEffect, useRef } from "react";
import { Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { AnimatedGlow } from "@/components/ui/AnimatedGlow";
import { VIDEOS } from "@/assets";
import { getGSAP } from "@/lib/gsap";

const WatchVideo = () => {
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
        stagger: 0.2,
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
      className="relative py-24 overflow-hidden bg-black"
    >
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatedGlow x="50%" y="20%" size={800} intensity={0.15} zIndex={1} />
        <AnimatedGlow x="10%" y="60%" size={400} intensity={0.1} zIndex={1} />
        <AnimatedGlow x="90%" y="50%" size={350} intensity={0.12} zIndex={1} />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Typography */}
        <h2
          data-animate
          className="font-orbitron font-black text-white mb-6 tracking-tight leading-tight text-[32px] md:text-[44px] lg:text-[56px]"
        >
          See Automation in Action
        </h2>
        <p
          data-animate
          className="font-medium text-white/80 mb-16 max-w-3xl mx-auto leading-relaxed text-[16px] md:text-[18px] lg:text-[21px]"
        >
          Watch how our AI-powered solutions transform business
          <br className="hidden md:block" />
          operations in real-time.
        </p>

        {/* Emulated Video Screen */}
        <div data-animate className="relative max-w-5xl mx-auto mb-16 group">
          {/* Screen Outer Border/Glow */}
          <div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-primary/40 to-primary/20 rounded-[2.8rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

          <div className="relative rounded-[2.5rem] border-2 border-white/10 p-4 md:p-6 overflow-hidden shadow-2xl">
            {/* Screen Content */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-black">
              <video
                className="w-full h-full object-cover"
                controls={false}
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={VIDEOS.SaaSVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Mock Player Overlays (Optional, but adds to the "emulated" feel) */}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => router.push("/book-a-free-audit")}
            className="flex items-center gap-3 px-8 md:px-10 py-3 md:py-4 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(226,62,1,0.3)] hover:shadow-[0_0_40px_rgba(226,62,1,0.5)]"
            style={{
              background: "linear-gradient(180deg, #E23E01 0%, #B73200 100%)",
              fontSize: "clamp(18px, 2vw, 23px)",
              fontWeight: 600,
              color: "white",
            }}
          >
            <span>Demo Call</span>
            <div className="bg-white rounded-full p-1.5 flex items-center justify-center">
              <Phone size={18} className="text-[#E23E01] fill-[#E23E01]" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default WatchVideo;
