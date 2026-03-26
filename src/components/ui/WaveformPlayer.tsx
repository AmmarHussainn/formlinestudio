"use client";

import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Play, Pause } from "lucide-react";

interface WaveformPlayerProps {
  audioUrl: string;
}

export const WaveformPlayer: React.FC<WaveformPlayerProps> = ({ audioUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");

  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#3d0b01", // Dark red/brown (unplayed)
      progressColor: "#DB3201", // Sharp primary red (played)
      cursorColor: "transparent",
      barWidth: 2,
      barGap: 3,
      barRadius: 4,
      height: 40,
      normalize: true,
      minPxPerSec: 0, // Fill the width
      hideScrollbar: true,
      fillParent: true,
    });

    ws.load(audioUrl).catch((err) => {
      // Ignore errors that occur due to component unmounting/aborting
      console.debug("Audio load skipped/aborted:", err);
    });

    ws.on("play", () => setIsPlaying(true));
    ws.on("pause", () => setIsPlaying(false));
    ws.on("finish", () => {
      setIsPlaying(false);
      ws.seekTo(0);
    });

    ws.on("timeupdate", (currentTime) => {
      const minutes = Math.floor(currentTime / 60);
      const seconds = Math.floor(currentTime % 60);
      setCurrentTime(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    });

    wavesurferRef.current = ws;

    return () => {
      try {
        ws.destroy();
      } catch (error) {
        console.debug("Error destroying wavesurfer instance:", error);
      }
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  };

  return (
    <div className="flex items-center gap-4 w-full mb-8 group">
      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full border border-[#DB3201] flex items-center justify-center transition-all hover:bg-[#DB3201]/10 group-active:scale-95 shrink-0"
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 text-[#DB3201] fill-[#DB3201]" />
        ) : (
          <Play className="w-4 h-4 text-[#DB3201] fill-[#DB3201] ml-0.5" />
        )}
      </button>
      <div className="flex-1 relative">
        <div
          ref={containerRef}
          className="w-full cursor-pointer relative z-10"
        />
      </div>
      <span className="text-[10px] text-white/50 font-mono min-w-[30px] shrink-0">
        {currentTime}
      </span>
    </div>
  );
};
