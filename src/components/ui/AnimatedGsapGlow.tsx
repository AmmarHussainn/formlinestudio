"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedGsapGlowProps {
  x?: string;
  y?: string;
  size?: number;
  intensity?: number;
  zIndex?: number;
}

export const AnimatedGsapGlow = ({
  x = "50%",
  y = "50%",
  size = 600,
  intensity = 0.5,
  zIndex = 0,
}: AnimatedGsapGlowProps) => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!glowRef.current) return;

    gsap.fromTo(
      glowRef.current,
      {
        scale: 1,
        opacity: intensity,
      },
      {
        scale: 1.3,
        opacity: intensity * 1.5,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      }
    );
  }, [intensity]);

  return (
    <div className="pointer-events-none absolute inset-0" style={{ zIndex }}>
      <div
        ref={glowRef}
        className="absolute"
        style={{
          left: x,
          top: y,
          width: size,
          height: size,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, #df3b01 0%, #de3800 60%, rgba(0,0,0,0) 100%)",
          filter: "blur(120px)",
        }}
      />
    </div>
  );
};
