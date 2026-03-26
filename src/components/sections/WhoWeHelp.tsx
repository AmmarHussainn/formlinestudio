"use client";

import React, { useEffect, useRef } from "react";
import {
  Users2,
  ShoppingCart,
  Briefcase,
  Building2,
  Scale,
  Flower2,
  Activity,
  Stethoscope,
} from "lucide-react";
import { AnimatedGlow } from "../ui/AnimatedGlow";
import { getGSAP } from "@/lib/gsap";

const helpData = [
  {
    title: "Coaches &\nConsultants",
    icon: Users2,
    description: "Automate lead gen, onboarding, and support.",
  },
  {
    title: "Ecom\nBrands",
    icon: ShoppingCart,
    description: "AI agents for abandoned carts, FAQs, and upsells.",
  },
  {
    title: "Agencies",
    icon: Briefcase,
    description: "Automate follow-ups, reporting, and client comms.",
  },
  {
    title: "Real Estate\n/ B2B",
    icon: Building2,
    description: "Intelligent lead handling & CRM workflows.",
  },
  {
    title: "Law\nFirms",
    icon: Scale,
    description:
      "Automate intake, lead qualification, appointment booking, and client follow ups.",
  },
  {
    title: "Spas &\nWellness Clinics",
    icon: Flower2,
    description:
      "Handle bookings, reminders, promotions, and passive client education automatically.",
  },
  {
    title: "Chiropractors",
    icon: Activity,
    description:
      "Automate patient intake, appointment scheduling, follow-ups, and billing ops.",
  },
  {
    title: "Dental\nPractices",
    icon: Stethoscope,
    description:
      "Streamline new patient inquiries, appointment booking, recalls, and PFIs.",
  },
];

const WhoWeHelp = () => {
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
    <div ref={sectionRef} className="relative py-24 overflow-hidden">
      <AnimatedGlow x="0%" y="20%" size={400} intensity={0.1} zIndex={1} />
      <AnimatedGlow x="100%" y="20%" size={400} intensity={0.1} zIndex={1} />

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Typography */}
        <h2
          data-animate
          className="font-orbitron font-black text-white mb-16 tracking-tight leading-tight text-[32px] md:text-[44px] lg:text-[56px]"
        >
          Who We Help (and How We Save
          <br />
          You Time + Money)
        </h2>

        {/* Grid Container */}
        <div
          data-animate
          className="bg-[#220301] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 text-left rounded-4xl p-9 mb-16"
          style={{
            boxShadow: "inset 5px 5px 20px 0px rgba(169, 37, 1, 0.4)",
          }}
        >
          {helpData.map((category) => (
            <div
              key={category.title}
              className="p-6 rounded-3xl bg-[#220301] flex flex-col gap-4"
              style={{
                boxShadow: "inset 5px 5px 20px 0px rgba(169, 37, 1, 0.4)",
              }}
            >
              {/* Icon */}
              <div className="flex items-start gap-4">
                <div className="bg-[#3d0b01] p-3 rounded-full shrink-0">
                  <category.icon
                    className="w-6 h-6 text-primary"
                    strokeWidth={2.5}
                  />
                </div>
                <div className="w-12 h-0.5 bg-primary mt-4" />
              </div>

              {/* Vertical Separator */}
              <div className="w-1 h-12 bg-primary ml-4" />

              {/* Title */}
              <h3 className="font-orbitron font-black text-white text-xl leading-snug whitespace-pre-line">
                {category.title}
              </h3>

              {/* Description */}
              <p className="text-white text-sm leading-relaxed">
                {category.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <p className="font-medium text-white text-[16px] md:text-[18px] lg:text-[21px] mb-12">
          No tech team? No problem. We handle the build + setup for you.
        </p>

        {/* Gradient Divider */}
        <div className="flex justify-center opacity-40">
          <div
            className="h-2 w-full max-w-4xl rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(223, 59, 1, 0.84) 0%, rgba(222, 56, 0, 0.3) 30%, rgba(222, 56, 0, 0) 84%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WhoWeHelp;
