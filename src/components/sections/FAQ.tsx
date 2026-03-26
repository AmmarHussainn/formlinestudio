"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { getGSAP } from "@/lib/gsap";

const faqData = [
  {
    question: "Do I need any technical skills?",
    answer:
      "No. Our team handles the entire technical setup for you. You don't need any coding or technical knowledge to get started.",
  },
  {
    question: "How long does the setup process take?",
    answer:
      "Most systems are live in 7-14 days. We work quickly to ensure you can start seeing results as soon as possible.",
  },
  {
    question: "Is this a one-time setup or an ongoing service?",
    answer:
      "We offer both one-time implementation and ongoing AI management to ensure your systems stay up to date and performing at their best.",
  },
  {
    question: "What if I don't know what tools or automations I need?",
    answer:
      "That's what the Strategy Call is for! We'll map out your workflow and identify exactly where AI can save you the most time and money.",
  },
  {
    question: "What if I already have a CRM or other tools?",
    answer:
      "We integrate with 6,000+ apps, including most major CRMs. We build on top of your existing stack whenever possible.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative pb-24 bg-black"
      style={{
        background: "linear-gradient(180deg, #000000 70%, #651401 100%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Typography */}
        <h2
          data-animate
          className="font-orbitron font-black text-white mb-4 tracking-tight leading-tight text-[32px] md:text-[44px] lg:text-[56px] uppercase"
        >
          Frequently Asked Questions
        </h2>
        <p
          data-animate
          className="font-medium text-white/80 mb-16 max-w-3xl mx-auto leading-relaxed text-[16px] md:text-[18px] lg:text-[21px]"
        >
          Handling your top objections and questions
        </p>

        {/* Accordion */}
        <div data-animate className="space-y-4 mb-24">
          {faqData.map((item, index) => (
            <div
              key={item.question}
              className="bg-[#220301] rounded-2xl overflow-hidden border border-[#3d0b01]"
              style={{
                boxShadow: "inset 5px 5px 20px 0px rgba(169, 37, 1, 0.4)",
              }}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between py-3 px-5 text-left transition-colors hover:bg-white/5 group border-l-12 border-primary"
              >
                <div className="flex items-center gap-4">
                  {/* Left accent bar */}
                  {/* <div className="w-2 h-8 bg-[#DB3201] rounded-full" /> */}
                  <span className="font-orbitron font-bold text-white text-[18px] md:text-[20px]">
                    {item.question}
                  </span>
                </div>
                <div
                  className={`w-8 h-8 rounded-full bg-[#DB3201] flex items-center justify-center transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown className="w-5 h-5 text-white" />
                </div>
              </button>

              <div
                className={`border-l-12 border-primary text-left overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-40" : "max-h-0"
                }`}
              >
                <div className="p-5 pt-3 text-white/60 text-sm md:text-base leading-relaxed pl-5">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div
          data-animate
          className="container mx-auto p-12 md:p-20 rounded-[40px] border border-[#3d0b01] bg-[#220301] relative overflow-hidden"
          style={{
            boxShadow: "inset 5px 5px 20px 0px rgba(169, 37, 1, 0.4)",
          }}
        >
          <div className="relative z-10 flex flex-col items-center">
            <h3 className="font-orbitron font-black text-white text-[28px] md:text-[42px] lg:text-[52px] mb-12 tracking-tight leading-[1.1]">
              Ready to Let AI Agents Handle <br />
              the Busywork So You Can Grow?
            </h3>

            <Button
              onClick={() => router.push("/book-a-free-audit")}
              variant="primary"
              className="py-4 px-10 text-[18px] md:text-[22px] lg:text-[24px] rounded-full mb-8 font-orbitron"
            >
              Book Your Free AI Strategy Call {">>>"}
            </Button>

            <p className="text-white/70 text-sm md:text-base font-medium">
              Limited free calls available each week — reserve yours now.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
