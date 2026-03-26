"use client";

import React, { useEffect, useRef } from "react";
import {
  Scale,
  Activity,
  Flower2,
  ShoppingCart,
  Stethoscope,
  Briefcase,
  Phone,
} from "lucide-react";
import { AnimatedGlow } from "../ui/AnimatedGlow";
import { Button } from "../ui/Button";
import { getGSAP } from "@/lib/gsap";
import { WaveformPlayer } from "../ui/WaveformPlayer";
import { useRetellCall } from "@/hooks/useRetellCall";
import { CallModal } from "../ui/CallModal";

const conversationData = [
  {
    title: "Spa",
    icon: Flower2,
    audioUrl: "/audios/spa.wav",
    agentId: "agent_65c740ef6c7a490dcc8298f1ec",
    items: [
      {
        heading: "Inbound Handling",
        para: "Manages booking requests and answers service-related questions.",
      },
      {
        heading: "Outbound Handling",
        para: "Confirms appointments and promotes available services.",
      },
      {
        heading: "Mislead Handling",
        para: "Filters non-service calls and off-topic inquiries.",
      },
    ],
  },

  {
    title: "Dental Practices",
    icon: Stethoscope,
    audioUrl: "/audios/Dental.wav",
    agentId: "agent_de3bb11af15cafcdbf2d7e5dc5",
    items: [
      {
        heading: "Inbound Handling",
        para: "Schedules appointments and answers patient care questions.",
      },
      {
        heading: "Outbound Handling",
        para: "Sends reminders, follow-ups, and treatment confirmations.",
      },
      {
        heading: "Mislead Handling",
        para: "Filters sales calls and non-patient inquiries.",
      },
    ],
  },
  {
    title: "Chiropractors",
    icon: Activity,
    audioUrl: "/audios/chiropractor.wav",
    agentId: "agent_18d1c1b9b3f2be916071c625e8",
    items: [
      {
        heading: "Inbound Handling",
        para: "Books appointments and answers common treatment questions.",
      },
      {
        heading: "Outbound Handling",
        para: "Sends follow-ups, reminders, and reactivation calls.",
      },
      {
        heading: "Mislead Handling",
        para: "Handles wrong numbers and non-patient inquiries smoothly.",
      },
    ],
  },
];

const RealConversation = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isCalling, callStatus, error, startCall, stopCall } = useRetellCall();
  const [activeAgent, setActiveAgent] = React.useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  useEffect(() => {
    // Only handle auto-close for ended status
    if (callStatus === "ended" || callStatus === "error") {
      if (callStatus === "ended") {
        const timer = setTimeout(() => setIsModalOpen(false), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [callStatus]);

  useEffect(() => {
    const gsap = getGSAP();
    if (!gsap || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-animate]", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative py-24 overflow-hidde">
      <AnimatedGlow x="50%" y="30%" size={400} intensity={0.1} zIndex={1} />

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Typography */}
        <h2
          data-animate
          className="font-orbitron font-black text-white mb-6 tracking-tight leading-tight text-[32px] md:text-[44px] lg:text-[56px]"
        >
          Real Conversations. <br />
          Smarter Intelligence.
        </h2>
        <p
          data-animate
          className="font-medium text-white/80 mb-16 max-w-3xl mx-auto leading-relaxed text-[16px] md:text-[18px] lg:text-[21px]"
        >
          See how a human and an AI assistant collaborate in real time. Natural
          dialogue, instant understanding, and intelligent responses that help
          teams move faster and make better decisions.
        </p>

        {/* Grid */}
        <div
          data-animate
          className="bg-[#220301] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 text-left rounded-4xl mt-16 p-9"
          style={{
            boxShadow: "inset 5px 5px 20px 0px rgba(169, 37, 1, 0.4)",
          }}
        >
          {conversationData.map((group) => (
            <div
              key={group.title}
              className="p-8 rounded-[32px] border border-[#3d0b01] bg-[#220301] flex flex-col h-full"
              style={{
                boxShadow: "inset 5px 5px 20px 0px rgba(169, 37, 1, 0.4)",
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#3d0b01] p-2 rounded-full">
                  <group.icon
                    className="w-5 h-5 text-primary"
                    strokeWidth={2.5}
                  />
                </div>
                <h3 className="font-orbitron font-black text-white text-[25px] uppercase tracking-wide">
                  {group.title}
                </h3>
              </div>

              {/* Audio Player */}
              <WaveformPlayer audioUrl={group.audioUrl} />

              {/* Listings */}
              <div className="space-y-6 flex-1">
                {group.items.map((item) => (
                  <div
                    key={item.heading}
                    className="border-b border-[#DB3201] pb-4"
                  >
                    <div className="flex items-start gap-2 mb-1">
                      <div className="w-2 h-2 bg-white mt-2 shrink-0" />
                      <h4 className="font-orbitron font-bold text-white text-xl leading-tight">
                        {item.heading}
                      </h4>
                    </div>
                    <p className="text-white text-sm pl-4 leading-relaxed">
                      {item.para}
                    </p>
                  </div>
                ))}
              </div>

              {/* Button */}
              <Button
                variant="primary"
                className={`py-1! justify-between! flex items-center! pr-2! pl-6! mt-3 ${
                  isCalling && activeAgent?.id === group.agentId
                    ? "animate-pulse"
                    : ""
                }`}
                onClick={() => {
                  if (isCalling && activeAgent?.id === group.agentId) {
                    stopCall();
                    setActiveAgent(null);
                  } else {
                    const agentId =
                      group.agentId || "oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD";
                    setActiveAgent({ id: agentId, name: group.title });
                    setIsModalOpen(true); // Open modal immediately
                    startCall(agentId);
                  }
                }}
              >
                <span className="font-orbitron font-black text-3xl capitalize">
                  {isCalling && activeAgent?.id === group.agentId
                    ? "Ending..."
                    : "Demo Call"}
                </span>
                <div className="bg-white rounded-full p-2.5 transition-transform group-hover:scale-110">
                  <Phone
                    className={`w-[30px] h-[30px] text-[#e23e01] fill-[#e23e01] ${
                      isCalling && activeAgent?.id === group.agentId
                        ? "animate-bounce"
                        : ""
                    }`}
                  />
                </div>
              </Button>
            </div>
          ))}
        </div>
      </div>

      <CallModal
        isOpen={isModalOpen}
        onClose={() => {
          if (callStatus === "connecting" || callStatus === "active") {
            stopCall();
            // Do not close immediately, wait for 'ended' status
          } else {
            setIsModalOpen(false);
          }
        }}
        agentName={activeAgent?.name || "AI Assistant"}
        status={callStatus}
        error={error}
      />
    </div>
  );
};

export default RealConversation;
