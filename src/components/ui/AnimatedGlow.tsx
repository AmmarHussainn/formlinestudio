"use client";

import React from "react";

interface AnimatedGlowProps {
  x?: string;
  y?: string;
  size?: number;
  intensity?: number;
  zIndex?: number;
}

export const AnimatedGlow = ({
  x = "50%",
  y = "50%",
  size = 600,
  intensity = 0.1,
  zIndex = 0,
}: AnimatedGlowProps) => {
  return (
    <div data-glow-area="true" className="absolute inset-0" style={{ zIndex }}>
      {/* 🔗 INTERACTION LAYER (THIS IS WHAT MOUSEGLOW TARGETS) */}
      <div className="absolute inset-0 glow-hover-area pointer-events-auto" />

      {/* 🎨 VISUAL LAYER */}
      <div
        className="absolute inset-0 pointer-events-none animate-glow-move"
        style={
          {
            "--glow-x": x,
            "--glow-y": y,
            "--glow-size": `${size}px`,
            "--glow-intensity": intensity,
          } as React.CSSProperties
        }
      />
    </div>
  );
};
