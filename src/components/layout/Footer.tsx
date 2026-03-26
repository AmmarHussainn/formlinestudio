"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: "About", href: "/about" },
    { name: "Analytics", href: "/analytics" },
    { name: "ROI Calculator", href: "/roi-calculator" },
    // { name: "Pricing", href: "/pricing" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const connectLinks = [
    {
      name: "IG: @formlinestudio_",
      href: "https://instagram.com/formlinestudio_",
    },
    { name: "Email: info@formlinestuion.com", href: "mailto:gio@formlinestudio" },
  ];

 const socialLinks = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02"
          strokeWidth="0.5"
          stroke="currentColor"
        />
      </svg>
    ),
    href: "#",
  },

  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1s2.5 1.12 2.5 2.5zM.21 8h4.54V24H.21V8zm7.79 0h4.35v2.16h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.48 3.04 5.48 6.99V24h-4.54v-7.9c0-1.88-.03-4.3-2.62-4.3-2.62 0-3.02 2.05-3.02 4.17V24H8V8z"
        />
      </svg>
    ),
    href: "https://www.linkedin.com/company/formlinestudio/posts/?feedView=all",
  },

 {
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fill="currentColor"
        d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5C18.55 4 20 5.45 20 7.75v8.5c0 2.3-1.45 3.75-3.75 3.75h-8.5C5.45 20 4 18.55 4 16.25v-8.5C4 5.45 5.45 4 7.75 4zm8.75 1.5a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5zM12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6a3 3 0 0 1 0-6z"
      />
    </svg>
  ),
  href: "https://www.instagram.com/formlinestudio_/",
}
];

  return (
    <footer
      className="relative pt-16 pb-12 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #330701 31%, #390901 51%, #4C0D01 74%, #651401 100%)",
      }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 items-start">
          {/* Brand Column */}
          <div className="flex justify-between gap-3 items-start">
            <div className="flex flex-col">
              <h2 className="text-white font-orbitron font-black text-2xl mb-6">
                Formline
              </h2>
              <p className="text-white/80 text-sm leading-relaxed max-w-[280px]">
                An AI-powered lead generation agency helping entrepreneurs and
                businesses scale with intelligent.
              </p>
            </div>
            {/* Separator 1 (Hidden on Mobile) */}
            <div className="hidden lg:flex items-center justify-center">
              <div
                className="w-px h-32 opacity-50"
                style={{
                  background:
                    "radial-gradient(ellipse at center, #DF3B01 0%, rgba(222, 56, 0, 0) 84%)",
                }}
              />
            </div>
          </div>

          {/* Combined Columns for better responsiveness on smaller screens */}
          <div className="lg:contents grid grid-cols-2 md:grid-cols-3 gap-8 md:col-span-2 lg:col-span-3">
            <div className="flex justify-between gap-3 items-start">
              {/* Company Column */}
              <div>
                <h3 className="text-white font-orbitron font-bold text-lg mb-6">
                  Company
                </h3>
                <ul className="space-y-4">
                  {companyLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-white/70 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Separator 2 (Hidden on Mobile) */}
              <div className="hidden lg:flex justify-center">
                <div
                  className="w-px h-32 opacity-50"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, #DF3B01 0%, rgba(222, 56, 0, 0) 84%)",
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between gap-3 items-start">
              {/* Connect Column */}
              <div>
                <h3 className="text-white font-orbitron font-bold text-lg mb-6">
                  Connect
                </h3>
                <ul className="space-y-4">
                  {connectLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-white/70 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Separator 3 (Hidden on Mobile) */}
              <div className="hidden lg:flex items-center justify-center">
                <div
                  className="w-px h-32 opacity-50"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, #DF3B01 0%, rgba(222, 56, 0, 0) 84%)",
                  }}
                />
              </div>
            </div>

            {/* Community Column */}
            <div>
              <h3 className="text-white font-orbitron font-bold text-lg mb-6">
                Comunity
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="hover:scale-110 transition-transform"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-sm">
          <p>© {currentYear} Formline Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
