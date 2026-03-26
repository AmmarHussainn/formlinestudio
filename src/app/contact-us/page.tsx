"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  Mail,
  ArrowRight,
  MessageSquare,
  Calendar,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { AnimatedGlow } from "@/components/ui/AnimatedGlow";
import { Button } from "@/components/ui/Button";
import { getGSAP } from "@/lib/gsap";
import { sendContactEmail } from "@/app/actions/send-email";

function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const result = await sendContactEmail(formData);

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-12 animate-in fade-in zoom-in duration-500">
        <CheckCircle2 className="w-16 h-16 text-primary mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-white/60">We'll get back to you shortly.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-primary hover:text-primary/80 font-bold"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="space-y-1">
        <label
          htmlFor="name"
          className="text-xs font-bold uppercase tracking-wider text-white/40 ml-1"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="John Doe"
          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="email"
          className="text-xs font-bold uppercase tracking-wider text-white/40 ml-1"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="john@example.com"
          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="message"
          className="text-xs font-bold uppercase tracking-wider text-white/40 ml-1"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="How can we help you?"
          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="cursor-pointer mt-2 w-full bg-white text-black font-bold h-12 rounded-xl flex items-center justify-center gap-2 hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      {status === "error" && (
        <p className="text-red-500 text-sm text-center mt-2">
          Failed to send message. Please try again.
        </p>
      )}
    </form>
  );
}

export default function ContactUsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = getGSAP();
    if (!gsap || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from("[data-animate='header']", {
        scrollTrigger: {
          trigger: "[data-animate='header']",
          start: "top 90%",
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
      });

      // Cards stagger
      gsap.from("[data-animate='card']", {
        scrollTrigger: {
          trigger: "[data-animate='grid']",
          start: "top 85%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
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
      <AnimatedGlow x="80%" y="20%" size={400} intensity={0.15} zIndex={1} />
      <AnimatedGlow x="20%" y="80%" size={350} intensity={0.12} zIndex={1} />

      <div className="container relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div
          className="text-center md:pt-10 mb-20 relative"
          data-animate="header"
        >
          <div className="inline-block mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 backdrop-blur-sm mx-auto">
              <MessageSquare className="text-primary" size={36} />
            </div>
          </div>

          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight uppercase leading-none">
            Get in <span className="text-primary italic">Touch</span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Have questions or ready to transform your business? We're here to
            help you every step of the way.
          </p>
        </div>

        {/* Options Grid */}
        <div
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          data-animate="grid"
        >
          {/* Audit CTA Card */}
          <div
            className="group relative bg-[#111] border border-primary/20 p-8 rounded-3xl backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-colors"
            data-animate="card"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Calendar className="text-primary" size={28} />
              </div>

              <h2 className="text-2xl font-black uppercase mb-4">
                Book a Free <span className="text-primary">Audit</span>
              </h2>

              <p className="text-white/60 mb-8 flex-grow">
                Ready to see exactly how much revenue you're missing? Schedule a
                deep dive with our team to analyze your potential.
              </p>

              <Link href="/book-a-free-audit" className="w-full">
                <Button
                  variant="cta"
                  className="w-full group-hover:scale-[1.02] transition-transform"
                >
                  Book Your Audit
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Contact Form Card */}
          <div
            className="group relative bg-[#111] border border-white/10 p-8 rounded-3xl backdrop-blur-sm overflow-hidden hover:border-white/20 transition-colors"
            data-animate="card"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Mail className="text-white" size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase">
                    General <span className="text-white/70">Inquiries</span>
                  </h2>
                  <p className="text-white/40 text-sm">Send us a message</p>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
