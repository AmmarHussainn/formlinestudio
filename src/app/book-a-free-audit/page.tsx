"use client";

import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Mail,
  MessageSquare,
  Zap,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { AnimatedGlow } from "@/components/ui/AnimatedGlow";

export default function ContactPage() {
  const containerRef = useRef(null);
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => setIsCalendlyLoaded(true);
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black relative flex flex-col items-center pt-32 pb-20 px-6 overflow-hidden font-orbitron"
    >
      {/* Background Grid */}
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
      <AnimatedGlow x="10%" y="20%" size={400} intensity={0.15} zIndex={1} />
      <AnimatedGlow x="90%" y="30%" size={350} intensity={0.12} zIndex={1} />
      <AnimatedGlow x="50%" y="70%" size={250} intensity={0.18} zIndex={1} />
      <AnimatedGlow x="20%" y="90%" size={200} intensity={0.1} zIndex={1} />

      <div className="container relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center md:pt-10 mb-16 relative">
          <div className="inline-block mb-6">
            <div className="w-20  h-20 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 backdrop-blur-sm">
              <MessageSquare className="text-primary" size={36} />
            </div>
          </div>

          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight uppercase leading-none">
            Let's <span className="text-primary italic">Connect</span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Ready to recover lost revenue and transform your business with AI?
            Schedule a call to see how we can help.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-8 items-start mb-16">
          {/* Info Cards - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Why Book a Call Card */}
            <div className="bg-[#111] border border-white/5 p-8 rounded-3xl backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Zap className="text-primary" size={28} fill="primary" />
                Why Book a Call?
              </h2>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <ArrowRight className="text-primary" size={14} />
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    Discover your exact revenue recovery potential
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <ArrowRight className="text-primary" size={14} />
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    See a live demo of AI handling your calls
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <ArrowRight className="text-primary" size={14} />
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    Get a custom solution tailored to your business
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <ArrowRight className="text-primary" size={14} />
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    No commitment required - just insights
                  </p>
                </li>
              </ul>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 p-8 rounded-3xl backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-6 text-primary">
                Average Results
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-black text-white">60%</span>
                    <span className="text-white/60 text-sm uppercase tracking-wider">
                      Recovery Rate
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[60%] rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-black text-white">24/7</span>
                    <span className="text-white/60 text-sm uppercase tracking-wider">
                      Availability
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-full rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-black text-white">
                      &lt;2s
                    </span>
                    <span className="text-white/60 text-sm uppercase tracking-wider">
                      Response Time
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[95%] rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Alternative Contact */}
            <div className="bg-[#111] border border-white/5 p-6 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="text-primary" size={20} />
                <h3 className="text-lg font-bold">Prefer Email?</h3>
              </div>
              <p className="text-white/60 text-sm mb-3">
                Send us a message and we'll get back to you within 24 hours.
              </p>
              <a
                href="mailto:giocreates-23@example.com"
                className="text-primary hover:text-primary/80 transition-colors font-bold text-sm"
              >
                giocreates-23@example.com
              </a>
            </div>
          </div>

          {/* Calendly Widget - Right Side */}
          <div className="lg:col-span-3">
            <div className="bg-[#111] border border-white/5 rounded-3xl backdrop-blur-sm overflow-hidden">
              <div className="bg-gradient-to-r from-primary/10 to-transparent border-b border-white/5 p-6">
                <div className="flex items-center gap-3">
                  <Calendar className="text-primary" size={24} />
                  <h2 className="text-2xl font-bold">Schedule Your Call</h2>
                </div>
                <p className="text-white/60 mt-2">
                  Pick a time that works best for you
                </p>
              </div>

              <div className="p-2 relative min-h-[700px]">
                {!isCalendlyLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#111] z-10">
                    <div className="text-center">
                      <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                      <p className="text-white/60">Loading calendar...</p>
                    </div>
                  </div>
                )}
                <div
                  className="calendly-inline-widget"
                  data-url="https://calendly.com/giocreates-23/30min?hide_gdpr_banner=1&primary_color=50e3c2"
                  style={{ minWidth: "320px", height: "700px" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-block bg-[#111] border border-white/5 px-8 py-4 rounded-2xl backdrop-blur-sm">
            <p className="text-white/60 text-sm">
              Questions before booking?{" "}
              <a
                href="#"
                className="text-primary hover:text-primary/80 transition-colors font-bold"
              >
                Check our FAQ
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
