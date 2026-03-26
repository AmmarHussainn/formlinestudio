"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export const MouseGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<"orange" | "black">("orange");

  useGSAP(
    () => {
      if (!glowRef.current) return;
      if (typeof window !== "undefined" && "ontouchstart" in window) return;

      const glow = glowRef.current;

      // Initial state
      gsap.set(glow, { xPercent: -50, yPercent: -50 });

      const toOrange = () => {
        if (stateRef.current === "orange") return;
        stateRef.current = "orange";
        gsap.to(glow, {
          background:
            "radial-gradient(circle, rgba(223,59,1,0.7) 0%, rgba(223,59,1,0.4) 35%, rgba(0,0,0,0) 65%)",
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const toBlack = () => {
        if (stateRef.current === "black") return;
        stateRef.current = "black";
        gsap.to(glow, {
          background:
            "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 35%, rgba(0,0,0,0) 65%)",
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const onMove = (e: MouseEvent) => {
        gsap.to(glow, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: "power3.out",
          overwrite: "auto",
        });

        const target = document.elementFromPoint(e.clientX, e.clientY);
        if (target && (target as HTMLElement).closest("[data-glow-area]")) {
          toBlack();
        } else {
          toOrange();
        }
      };

      window.addEventListener("mousemove", onMove);
      return () => {
        window.removeEventListener("mousemove", onMove);
      };
    },
    { scope: glowRef }
  );

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] w-[280px] h-[280px]"
      style={{
        background:
          "radial-gradient(circle, rgba(223,59,1,0.7) 0%, rgba(223,59,1,0.4) 35%, rgba(0,0,0,0) 65%)",
        filter: "blur(60px)",
        opacity: 0.6,
      }}
    />
  );
};
