"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { IMAGES } from "@/assets";
import { AnimatedGlow } from "../ui/AnimatedGlow";
import { getGSAP } from "@/lib/gsap";

const testimonials = [
  {
    name: "Kemy Saint",
    role: "Financing Entrepreneur",
    image: IMAGES.user1,
    quote:
      "“The AI lead generation system Formline built for us was a total game-changer. Our pipeline has never been fuller, and our ROI is through the roof.”",
  },
  {
    name: "Luis Ojeda",
    role: "Online Coach & Business Owner",
    image: IMAGES.user2,
    quote:
      "“Formline handled everything from our backend CRM and lead gen to our complete branding strategy. Their all-in-one system is the backbone of our client acquisition.”",
  },
  {
    name: "David Chen",
    role: "CEO, NextGen E-commerce",
    image: IMAGES.user3,
    quote:
      "“Their blend of creative and analytics is unparalleled. Our new AI-driven funnels are converting leads like we've never seen before.”",
  },
];

const Testimonials = () => {
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
      className="relative py-24 bg-black overflow-hidden"
    >
      <AnimatedGlow x="0%" y="60%" size={300} intensity={0.3} zIndex={1} />
      <AnimatedGlow x="50%" y="0%" size={300} intensity={0.3} zIndex={1} />
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2
          data-animate
          className="font-orbitron font-black text-white mb-6 tracking-tight leading-tight text-[32px] md:text-[44px] lg:text-[56px] uppercase"
        >
          Generating results for <br />
          modern brands.
        </h2>
        <p
          data-animate
          className="font-medium text-white/80 mb-16 max-w-2xl mx-auto leading-relaxed text-[16px] md:text-[18px] lg:text-[21px]"
        >
          Hear what our clients have to say about growing their business with
          our AI lead systems.
        </p>

        <div
          data-animate
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative p-8 rounded-[40px] text-left transition-transform hover:scale-[1.02] duration-300"
              style={{
                background:
                  "linear-gradient(30deg, #761801 15%, #5D1201 20%, #470C01 26%, #360801 33%, #2B0501 42%, #240301 54%, #220301 88%)",
                border: "1px solid transparent",
                backgroundImage: `linear-gradient(40deg, #761801 15%, #5D1201 20%, #470C01 26%, #360801 33%, #2B0501 42%, #240301 54%, #220301 88%), linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(0, 0, 0, 0))`,
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/10 shrink-0">
                  <Image
                    src={t.image}
                    alt={t.name}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>
                <div>
                  <h3 className="font-orbitron font-bold text-primary text-[19px] leading-tight">
                    {t.name}
                  </h3>
                  <p className="text-white font-medium text-sm">{t.role}</p>
                </div>
              </div>

              <p className="text-white/70 text-xs leading-relaxed font-medium">
                {t.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
