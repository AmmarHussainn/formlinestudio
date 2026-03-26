"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Phone, TrendingUp, Zap } from "lucide-react";
import { AnimatedGlow } from "@/components/ui/AnimatedGlow";
import { getGSAP } from "@/lib/gsap";

export default function ROICalculatorPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [callsPerDay, setCallsPerDay] = useState(14);
  const [missedCallRate, setMissedCallRate] = useState(40);
  const [conversionRate, setConversionRate] = useState(20);
  const [customerValue, setCustomerValue] = useState(500);
  const [aiRecoveryRate, setAiRecoveryRate] = useState(60);

  const [results, setResults] = useState({
    monthlyRecovered: 0,
    monthlyLost: 0,
    yearlyRecovered: 0,
    customersSaved: 0,
  });

  useEffect(() => {
    const monthlyCalls = callsPerDay * 30;
    const missedCalls = monthlyCalls * (missedCallRate / 100);
    const monthlyLostRevenue =
      missedCalls * (conversionRate / 100) * customerValue;
    const recoveredRevenue = monthlyLostRevenue * (aiRecoveryRate / 100);
    const yearlyRecovered = recoveredRevenue * 12;
    const customersSaved =
      missedCalls * (conversionRate / 100) * (aiRecoveryRate / 100);

    setResults({
      monthlyRecovered: Math.round(recoveredRevenue),
      monthlyLost: Math.round(monthlyLostRevenue),
      yearlyRecovered: Math.round(yearlyRecovered),
      customersSaved: Number(customersSaved.toFixed(1)),
    });
  }, [
    callsPerDay,
    missedCallRate,
    conversionRate,
    customerValue,
    aiRecoveryRate,
  ]);

  useEffect(() => {
    const gsap = getGSAP();
    if (!gsap || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from("[data-animate='header']", {
        scrollTrigger: {
          trigger: "[data-animate='header']",
          start: "top 90%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
      });

      // Controls column (Left)
      gsap.from("[data-animate='controls']", {
        scrollTrigger: {
          trigger: "[data-animate='main-grid']",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        x: -40,
        duration: 1,
        ease: "power3.out",
      });

      // Results column (Right)
      gsap.from("[data-animate='results']", {
        scrollTrigger: {
          trigger: "[data-animate='main-grid']",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        x: 40,
        duration: 1,
        ease: "power3.out",
      });

      // Staggered results cards
      gsap.from("[data-animate='result-card']", {
        scrollTrigger: {
          trigger: "[data-animate='results-grid']",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 20,
        scale: 0.98,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black relative flex flex-col items-center pt-32 pb-20 px-6 overflow-hidden font-orbitron"
    >
      {/* Background Grid - primary color low opacity */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in srgb, var(--primary), transparent 90%) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, var(--primary), transparent 90%) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Ambient Glows */}
      <AnimatedGlow x="0%" y="20%" size={300} intensity={0.2} zIndex={1} />
      <AnimatedGlow x="0%" y="90%" size={300} intensity={0.2} zIndex={1} />
      <AnimatedGlow x="100%" y="20%" size={300} intensity={0.2} zIndex={1} />
      <AnimatedGlow x="50%" y="50%" size={300} intensity={0.2} zIndex={1} />
      <AnimatedGlow x="100%" y="100%" size={300} intensity={0.2} zIndex={1} />

      <div className="container relative z-10">
        <div className="text-center my-16 relative" data-animate="header">
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight uppercase leading-none">
            AI Revenue <br className="hidden md:block" />
            <span className="text-primary italic">Recovery</span> Calculator
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Discover how much revenue you're losing from missed calls and what
            you can recover with an AI agent.
          </p>
        </div>

        <div
          className="grid lg:grid-cols-2 gap-12 items-start"
          data-animate="main-grid"
        >
          {/* Controls */}
          <div
            className="bg-[#111] border border-white/5 p-8 rounded-3xl backdrop-blur-sm"
            data-animate="controls"
          >
            <h2 className="text-2xl font-bold mb-8">Adjust Your Metrics</h2>

            <div className="space-y-8">
              {/* Calls per day */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <label
                    htmlFor="callsPerDay"
                    className="text-white/60 font-medium"
                  >
                    Calls per Day
                  </label>
                </div>
                <input
                  id="callsPerDay"
                  type="number"
                  value={callsPerDay}
                  onChange={(e) => setCallsPerDay(Number(e.target.value))}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              {/* Missed Call Rate */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <label
                    htmlFor="missedCallRate"
                    className="text-white/60 font-medium"
                  >
                    Missed Call Rate
                  </label>
                  <span className="text-xl font-bold">{missedCallRate}%</span>
                </div>
                <input
                  id="missedCallRate"
                  type="range"
                  min="0"
                  max="100"
                  value={missedCallRate}
                  onChange={(e) => setMissedCallRate(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                />
              </div>

              {/* Lead Conversion Rate */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <label
                    htmlFor="conversionRate"
                    className="text-white/60 font-medium"
                  >
                    Lead Conversion Rate
                  </label>
                  <span className="text-xl font-bold">{conversionRate}%</span>
                </div>
                <input
                  id="conversionRate"
                  type="range"
                  min="0"
                  max="100"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                />
              </div>

              {/* Average Customer Value */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <label
                    htmlFor="customerValue"
                    className="text-white/60 font-medium"
                  >
                    Average Customer Value ($)
                  </label>
                </div>
                <input
                  id="customerValue"
                  type="number"
                  value={customerValue}
                  onChange={(e) => setCustomerValue(Number(e.target.value))}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              {/* AI Recovery Rate */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <label
                    htmlFor="aiRecoveryRate"
                    className="text-white/60 font-medium"
                  >
                    AI Recovery Rate
                  </label>
                  <span className="text-xl font-bold italic text-primary">
                    {aiRecoveryRate}%
                  </span>
                </div>
                <input
                  id="aiRecoveryRate"
                  type="range"
                  min="0"
                  max="100"
                  value={aiRecoveryRate}
                  onChange={(e) => setAiRecoveryRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div
            className="flex flex-col items-center lg:sticky lg:top-32"
            data-animate="results"
          >
            <div className="text-center mb-12 relative">
              <div className="absolute -inset-4 bg-primary/5 blur-2xl rounded-full" />
              <p className="text-white/60 mb-2 font-bold uppercase tracking-widest text-sm relative">
                With AI, You Could Recover
              </p>
              <h3 className="text-7xl md:text-9xl font-black text-primary tracking-tighter mb-2 relative drop-shadow-[0_0_15px_rgba(80,227,194,0.3)]">
                ${results.monthlyRecovered.toLocaleString()}
              </h3>
              <p className="text-white/60 text-xl font-bold uppercase tracking-widest relative">
                per month
              </p>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-12"
              data-animate="results-grid"
            >
              <div
                className="bg-[#111] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center"
                data-animate="result-card"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <Phone size={18} className="text-white/60" />
                </div>
                <p className="text-white/40 text-sm mb-1 uppercase tracking-wider font-bold">
                  Monthly Lost Revenue
                </p>
                <p className="text-2xl font-black">
                  ${results.monthlyLost.toLocaleString()}
                </p>
              </div>

              <div
                className="bg-[#111] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center"
                data-animate="result-card"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <TrendingUp size={18} className="text-green-500" />
                </div>
                <p className="text-white/40 text-sm mb-1 uppercase tracking-wider font-bold">
                  Yearly Recovered
                </p>
                <p className="text-2xl font-black">
                  ${results.yearlyRecovered.toLocaleString()}
                </p>
              </div>

              <div
                className="bg-[#111] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center"
                data-animate="result-card"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <Zap size={18} className="text-yellow-500" />
                </div>
                <p className="text-white/40 text-sm mb-1 uppercase tracking-wider font-bold">
                  Customers Saved/Mo
                </p>
                <p className="text-2xl font-black">{results.customersSaved}</p>
              </div>
            </div>

            <Button
              variant="cta"
              size="lg"
              className="h-16 px-12 text-lg font-bold group bg-white text-black hover:bg-white/90"
            >
              Start Recovering Revenue
              <Zap
                className="ml-2 group-hover:scale-110 transition-transform"
                size={20}
                fill="currentColor"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
