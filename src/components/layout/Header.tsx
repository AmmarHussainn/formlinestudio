"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export const Header = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ===============================
     Animations
  =============================== */
  useGSAP(
    () => {
      // Entrance animation
      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });
    },
    { scope: headerRef }
  );

  useGSAP(
    () => {
      // Scroll Morph Animation
      if (isScrolled) {
        gsap.to(headerRef.current, {
          top: 0,
          maxWidth: "100%",
          borderRadius: "0px",
          padding: "0.75rem 0",
          duration: 0.6,
          ease: "power3.inOut",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        });
      } else {
        gsap.to(headerRef.current, {
          top: "2.5rem", // 10 * 0.25rem = top-10
          maxWidth: "80rem", // max-w-7xl
          borderRadius: "2rem", // rounded-4xl
          padding: "1rem 0",
          duration: 0.6,
          ease: "power3.inOut",
          boxShadow:
            "0 0 20px rgba(68, 12, 1, 0.9), 0 0 40px rgba(68, 12, 1, 0.6), 0 0 60px rgba(34, 3, 1, 0.4)",
        });
      }
    },
    { scope: headerRef, dependencies: [isScrolled] }
  );

  const navLinks = [
    { name: "Who It's For", href: "/" },

    // { name: "Pricing", href: "/pricing" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "About", href: "/about" },
    { name: "ROI Calculator", href: "/roi-calculator" },
    { name: "Analytics", href: "/analytics" },
  ];

  return (
    <header
      ref={headerRef}
      className="fixed left-0 right-0 z-50 transition-none mx-auto top-10 max-w-8xl rounded-4xl"
      style={{
        background:
          "linear-gradient(90deg, #440C01 0%, #220301 50%, #440C01 100%)",
        backdropFilter: "blur(12px)",
        padding: "1rem 0",
        boxShadow:
          "0 0 20px rgba(68, 12, 1, 0.9), 0 0 40px rgba(68, 12, 1, 0.6), 0 0 60px rgba(34, 3, 1, 0.4)",
      }}
    >
      <div className="xl:container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold xl:text-xl text-lg">F</span>
          </div>
          <span className="text-white font-bold xl:text-3xl text-xl tracking-tight uppercase">
            Formline
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-medium transition-colors hover:text-primary xl:text-base text-sm ${
                pathname === link.href ? "text-primary" : "text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Button
            onClick={() => router.push("/book-a-free-audit")}
            variant="cta"
            size="lg"
            className="hover:scale-105"
          >
            Book a Free AI Audit
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[calc(100%+1rem)] left-4 right-4 bg-black/95 backdrop-blur-xl border border-white/10 p-8 rounded-3xl flex flex-col gap-6 animate-in slide-in-from-top-4 duration-300 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-xl font-semibold transition-colors ${
                pathname === link.href
                  ? "text-primary"
                  : "text-white/70 hover:text-white"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-4 pt-6 border-t border-white/10 mt-2">
            <Button
              onClick={() => {
                router.push("/book-a-free-audit");
                setMobileMenuOpen(false);
              }}
              variant="cta"
              size="lg"
              className="w-full text-lg h-14"
            >
              Book a Free AI Audit
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
