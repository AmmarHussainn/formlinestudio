"use client";

import React, { useEffect, useState } from "react";
import { PhoneOff, User } from "lucide-react";
import { Button } from "./Button";
import { getGSAP } from "@/lib/gsap";

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentName: string;
  status: "idle" | "connecting" | "active" | "ended" | "error";
  error?: string | null;
}

export const CallModal: React.FC<CallModalProps> = ({
  isOpen,
  onClose,
  agentName,
  status,
  error,
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [micActivity, setMicActivity] = useState(0);

  useEffect(() => {
    const gsap = getGSAP();
    if (!gsap || !modalRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  // Simulate mic activity for visualization
  useEffect(() => {
    if (status === "active") {
      const interval = setInterval(() => {
        setMicActivity(Math.random());
      }, 100);
      return () => clearInterval(interval);
    } else {
      setMicActivity(0);
    }
  }, [status]);

  if (!isOpen) return null;

  const getStatusText = () => {
    switch (status) {
      case "connecting":
        return "Establishing secure connection...";
      case "active":
        return "AI agent is listening...";
      case "error":
        return error || "Connection failed";
      default:
        return "Call ended";
    }
  };

  const getBadgeStyles = () => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-500 border-green-500/50";
      case "connecting":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/50";
      default:
        return "bg-red-500/20 text-red-500 border-red-500/50";
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-[#220301] border border-[#3d0b01] rounded-[32px] p-8 overflow-hidden shadow-2xl"
        style={{
          boxShadow:
            "0 0 50px rgba(226, 62, 1, 0.2), inset 5px 5px 20px 0px rgba(169, 37, 1, 0.4)",
        }}
      >
        {/* Ambient Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-[80px]" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-[80px]" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Avatar / Visualizer Area */}
          <div className="relative mb-8">
            <div className="relative w-32 h-32 rounded-full bg-[#3d0b01] flex items-center justify-center border-2 border-primary/30 overflow-hidden">
              {/* Visualizer Rings */}
              {status === "active" && (
                <>
                  <div
                    className="absolute inset-0 border-2 border-primary rounded-full animate-ping opacity-20"
                    style={{ animationDuration: "2s" }}
                  />
                  <div
                    className="absolute inset-0 border-2 border-primary rounded-full animate-ping opacity-10"
                    style={{ animationDuration: "3s", animationDelay: "0.5s" }}
                  />
                </>
              )}
              <User className="w-16 h-16 text-white/50" />
            </div>

            {/* Status Badge */}
            <div
              className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-orbitron font-bold uppercase tracking-widest border transition-colors ${getBadgeStyles()}`}
            >
              {status}
            </div>
          </div>

          <h3 className="font-orbitron font-black text-white text-2xl mb-2 tracking-tight uppercase">
            {agentName}
          </h3>
          <p className="text-white/60 mb-8 font-medium">{getStatusText()}</p>

          {/* Mic Visualizer Bar */}
          {status === "active" && (
            <div className="flex items-center gap-1.5 h-8 mb-10">
              {new Array(12).fill(0).map((_, i) => (
                <div
                  key={`bar-${i}`}
                  className="w-1.5 bg-primary rounded-full transition-all duration-100"
                  style={{
                    height: `${20 + micActivity * (i % 2 === 0 ? 80 : 40)}%`,
                    opacity: 0.3 + micActivity * 0.7,
                  }}
                />
              ))}
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center gap-4 w-full">
            <Button
              className="flex-1 py-4! bg-red-600 hover:bg-red-700 border-red-500/50 group"
              onClick={onClose}
              disabled={status === "ended" && !error} // Optional: disable if auto-closing
            >
              <div className="flex items-center justify-center gap-3">
                <div className="bg-white/20 p-2 rounded-full transition-transform group-hover:scale-110">
                  <PhoneOff className="w-5 h-5 text-white fill-white" />
                </div>
                <span className="font-orbitron font-black text-xl text-white uppercase tracking-wider">
                  {status === "connecting"
                    ? "Cancel"
                    : status === "active"
                    ? "End Call"
                    : status === "ended"
                    ? "Call Ended"
                    : "Close"}
                </span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
