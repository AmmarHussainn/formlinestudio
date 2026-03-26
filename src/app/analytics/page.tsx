"use client";

import { AnimatedGlow } from "@/components/ui/AnimatedGlow";
import {
  BarChart3,
  Phone,
  TrendingDown,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useRef } from "react";
import { getGSAP } from "@/lib/gsap";

export default function AnalyticsDashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stats = [
    {
      title: "Total Calls",
      value: "1345",
      trend: "+12.5% from last month",
      trendUp: true,
      icon: <Phone size={18} className="text-white/60" />,
    },
    {
      title: "Appointments Booked",
      value: "289",
      trend: "+21.3% from last month",
      trendUp: true,
      icon: <Users size={18} className="text-white/60" />,
    },
    {
      title: "Booking Rate",
      value: "31.0%",
      trend: "+5.1% from last month",
      trendUp: true,
      icon: <BarChart3 size={18} className="text-white/60" />,
      accent: "text-green-500",
    },
    {
      title: "Call Hangups (AI)",
      value: "412",
      trend: "-3.2% from last month",
      trendUp: false,
      icon: <XCircle size={18} className="text-white/60" />,
      accent: "text-red-500",
    },
  ];

  const appointmentTrend = [
    { month: "Jan", value: 35 },
    { month: "Feb", value: 52 },
    { month: "Mar", value: 45 },
    { month: "Apr", value: 62 },
    { month: "May", value: 68 },
    { month: "Jun", value: 82 },
    { month: "Jul", value: 88 },
  ];

  const callOutcomes = [
    { name: "Booked", value: 289, color: "#10b981" },
    { name: "User Ended", value: 644, color: "#eab308" },
    { name: "AI Hung Up", value: 412, color: "#ef4444" },
  ];

  useEffect(() => {
    const gsap = getGSAP();
    if (!gsap || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from("[data-animate='header']", {
        scrollTrigger: {
          trigger: "[data-animate='header']",
          start: "top 90%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: -30,
        duration: 1,
        ease: "power3.out",
      });

      // Stats cards staggered animation
      gsap.from("[data-animate='stat-card']", {
        scrollTrigger: {
          trigger: "[data-animate='stats-grid']",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Charts directional animation
      gsap.from("[data-animate='chart-left']", {
        scrollTrigger: {
          trigger: "[data-animate='charts-grid']",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from("[data-animate='chart-right']", {
        scrollTrigger: {
          trigger: "[data-animate='charts-grid']",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        x: 50,
        duration: 1,
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
      {/* Background Grid - primary color low opacity */}
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
      <AnimatedGlow x="0%" y="20%" size={300} intensity={0.2} zIndex={1} />
      <AnimatedGlow x="50%" y="50%" size={300} intensity={0.2} zIndex={1} />
      <AnimatedGlow x="100%" y="100%" size={300} intensity={0.2} zIndex={1} />
      <div className="container relative z-10">
        <div className="my-16 relative" data-animate="header">
          <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight uppercase">
            Analytics Dashboard
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-medium">
            An overview of your AI agent's performance.
          </p>
        </div>

        {/* Stats Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          data-animate="stats-grid"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#111] border border-white/5 p-6 rounded-2xl flex flex-col items-start"
              data-animate="stat-card"
            >
              <div className="flex justify-between w-full mb-4">
                <span className="text-white/60 text-sm font-bold uppercase tracking-wider">
                  {stat.title}
                </span>
                {stat.icon}
              </div>
              <div className={`text-4xl font-black mb-1 ${stat.accent || ""}`}>
                {stat.value}
              </div>
              <div
                className={`text-xs font-bold flex items-center ${
                  stat.trendUp ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.trendUp ? (
                  <TrendingUp size={12} className="mr-1" />
                ) : (
                  <TrendingDown size={12} className="mr-1" />
                )}
                {stat.trend}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6" data-animate="charts-grid">
          {/* Appointment Trend Chart */}
          <div
            className="bg-[#111] border border-white/5 p-8 rounded-3xl backdrop-blur-sm"
            data-animate="chart-left"
          >
            <h2 className="text-2xl font-bold mb-8">Appointment Trend</h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={appointmentTrend}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#ffffff10"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#ffffff40", fontSize: 10, fontWeight: 700 }}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip
                    cursor={{ fill: "#ffffff05" }}
                    contentStyle={{
                      backgroundColor: "#111",
                      border: "1px solid #ffffff10",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontFamily: "var(--font-orbitron)",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Bar
                    dataKey="value"
                    fill="#fff"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  >
                    {appointmentTrend.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        className="transition-all duration-300 hover:fill-primary"
                        style={{ cursor: "pointer" }}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Call Outcomes Pie Chart */}
          <div
            className="bg-[#111] border border-white/5 p-8 rounded-3xl backdrop-blur-sm"
            data-animate="chart-right"
          >
            <h2 className="text-2xl font-bold mb-8">Call Outcomes</h2>
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={callOutcomes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={1500}
                  >
                    {callOutcomes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111",
                      border: "1px solid #ffffff10",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontFamily: "var(--font-orbitron)",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-4 ml-4">
                {callOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: outcome.color }}
                    ></div>
                    <div className="flex flex-col">
                      <span className="text-white/60 text-[10px] font-bold uppercase">
                        {outcome.name}
                      </span>
                      <span className="text-white text-sm font-black">
                        {outcome.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
