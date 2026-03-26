"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatedGlow } from "../ui/AnimatedGlow";

const workData = [
  {
    id: "01",
    title: "AI-Powered SaaS Platform",
    description:
      "We design and deploy intelligent voice agents that handle inbound and outbound calls, qualify leads, book appointments, and manage conversations in real-time. Built to sound natural and respond accurately, our voice agents reduce human workload, improve response speed, and scale effortlessly with your operations, all while delivering a smooth, human-like calling experience.",
  },
  {
    id: "02",
    title: "Social Media Marketing",
    description:
      "Our AI-driven social media strategies help you dominate your niche. We automate content creation, scheduling, and engagement, ensuring your brand stays top-of-mind for your audience while you focus on high-level business growth.",
  },
  {
    id: "03",
    title: "Product Branding Development",
    description:
      "We build visual identities that resonate. From logo design to comprehensive brand guidelines, our team ensures your business stands out with a cohesive and professional look that builds trust and authority in your market.",
  },
  {
    id: "04",
    title: "AI App Development",
    description:
      "Specialized AI application builds tailored to your specific business needs. Whether it's a custom chatbot or a complex data analysis tool, we deliver cutting-edge solutions that give you a competitive advantage.",
  },
];

const OurWork = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      <AnimatedGlow x="50%" y="0%" size={600} intensity={0.1} zIndex={1} />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="font-orbitron font-black text-white mb-4 tracking-tight leading-tight text-[32px] md:text-[44px] lg:text-[56px] uppercase">
          Our Work
        </h2>
        <p className="font-medium text-white/80 mb-16 max-w-3xl mx-auto leading-relaxed text-[16px] md:text-[18px] lg:text-[21px]">
          A glimpse into the brands we've helped build and scale.
        </p>

        <div className="rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
          {workData.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={item.id}
                className={`w-full block transition-all duration-700 ease-in-out border-b border-white/10 last:border-b-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/20 text-left overflow-hidden ${
                  isActive
                    ? "bg-[#DF3B01] h-full md:h-[450px] lg:h-[550px]"
                    : "bg-[#220301] h-[140px] md:h-[150px] lg:h-[180px]"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="flex w-full flex-col md:flex-row sm:items-center md:items-start justify-between p-8 md:px-12 md:py-0 relative h-full">
                  {/* Left Number Index */}
                  <div
                    className={`lg:w-[50%] md:w-[40%] font-orbitron font-black leading-none transition-all duration-500 select-none text-white ${
                      isActive ? "opacity-100" : "opacity-20"
                    } sm:text-[160px] lg:text-[270px] xl:text-[360px] lg:absolute top-0 left-4`}
                  >
                    {item.id}
                  </div>

                  {/* Right Side Content */}
                  <div className="xl:w-[40%] lg:w-[50%] md:w-[60%] text-left md:pt-12 lg:pt-20 z-10 md:pl-12">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-orbitron font-black text-white text-2xl md:text-[32px] lg:text-[40px] leading-tight max-w-[500px]">
                        {item.title}
                      </h3>
                      <div
                        className={`min-w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          isActive
                            ? "bg-white text-primary"
                            : "bg-primary text-white"
                        }`}
                      >
                        {isActive ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </div>

                    <div
                      className={`transition-all duration-500 ${
                        isActive ? "opacity-100" : "opacity-0 invisible"
                      }`}
                    >
                      <p className="text-white font-medium text-sm md:text-base lg:text-[16px] leading-[1.6]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurWork;
