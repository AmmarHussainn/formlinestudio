"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const gradient =
  "linear-gradient(180deg, #5a1502 0%, #330802 50%, #1b0201 100%)";

const pricingData = [
  {
    title: "Hire Developer",
    price: "$5K-$15K",
    subCost: "Ideal for small teams.",
    deliveryTime: "2-4 months",
    maintenance: "Ongoing",
    gradient: gradient,
  },
  {
    title: "DIY with Tools",
    price: "~$300",
    subCost: "Premium Business",
    deliveryTime: "30+ hours setup",
    maintenance: "You do it",
    gradient: gradient,
    button: false,
  },
  {
    title: "Our DFY Setup",
    price: "From $1,500",
    subCost: "Best Choice for Enterprises, Agencies, and Studios.",
    deliveryTime: "5-10 days",
    maintenance: "Included",
    gradient: gradient,
    button: false,
  },
];

export const Pricing = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const router = useRouter();

  useGSAP(
    () => {
      const cards = cardsRef.current.filter(Boolean);

      gsap.from(cards, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      cards.forEach((card) => {
        if (!card) return;
        const originalY = 0;

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            boxShadow:
              "0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(255, 100, 50, 0.2)",
            borderColor: "rgba(255,100,50, 0.5)",
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: originalY,
            scale: 1,
            boxShadow: "none",
            borderColor: "transparent",
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 bg-black text-white relative overflow-hidden font-orbitron"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 mb-4">
            Transparent Pricing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {pricingData.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="rounded-3xl p-8 flex flex-col items-center text-center border border-white/5 relative group"
              style={{
                background: item.gradient,
              }}
            >
              {/* Title: 32px */}
              <h3 className="text-[32px] font-bold mb-2 leading-tight">
                {item.title}
              </h3>

              {/* Cost Label: 70px */}
              <div className="text-[70px] font-bold leading-none opacity-90 my-2">
                Cost
              </div>

              {/* Price: 50px */}
              <div className="text-[50px] font-bold leading-tight text-white mb-1">
                {item.price}
              </div>

              {/* /month: 24px */}
              <div className="text-[24px] text-white/80 font-medium uppercase tracking-wide mb-4">
                /month
              </div>

              {/* Sub-cost: 18px */}
              <p className="text-[18px] text-white/70 mb-8 h-12 flex items-center justify-center leading-snug px-4">
                {item.subCost}
              </p>

              {/* Divider */}
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

              <div className="w-full space-y-8">
                <div>
                  {/* Delivery Time Label: 30px */}
                  <div className="text-[30px] font-bold mb-2 text-white">
                    Delivery Time
                  </div>
                  {/* Value: 20px */}
                  <div className="text-[20px] text-white/80 font-medium">
                    {item.deliveryTime}
                  </div>
                </div>
                <div>
                  {/* Maintenance Label: 30px */}
                  <div className="text-[30px] font-bold mb-2 text-white">
                    Maintenance
                  </div>
                  {/* Value: 20px */}
                  <div className="text-[20px] text-white/80 font-medium">
                    {item.maintenance}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-12 w-full">
                <Button
                  onClick={() =>
                    router.push(
                      item.title === "Our DFY Setup"
                        ? "/book-a-free-audit"
                        : "/contact-us"
                    )
                  }
                  variant={index === 2 ? "primary" : "cta"}
                  className="w-full py-4 text-lg font-bold rounded-2xl"
                >
                  {item.title === "Our DFY Setup"
                    ? "Get Started"
                    : "Enquire Now"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
