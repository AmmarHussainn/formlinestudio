"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "cta";
  size?: "sm" | "md" | "lg";
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-95";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-red-700 shadow-[0_0_20px_rgba(255,10,10,0.3)]",
    secondary: "bg-secondary text-white hover:bg-neutral-800",
    outline:
      "border border-white/20 bg-transparent text-white hover:bg-white/10",
    ghost: "bg-transparent text-white hover:bg-white/5",
    cta: "btn-cta active:scale-95 transition-all duration-300 hover:brightness-125",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
