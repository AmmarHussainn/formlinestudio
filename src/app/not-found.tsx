import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AnimatedGlow } from "@/components/ui/AnimatedGlow";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] bg-black text-white relative overflow-hidden">
      <AnimatedGlow intensity={0.15} size={500} x="50%" y="0%" />

      <div className="relative z-10 text-center px-4 py-40">
        <h1 className="text-9xl md:text-[12rem] font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-white/20 animate-pulse">
          404
        </h1>

        <div className="mt-4 space-y-4">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-widest uppercase text-red-500 shadow-red-500/50 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
            Coordinates Lost
          </h2>

          <p className="text-neutral-400 max-w-md mx-auto text-lg font-sans">
            The line has been breached. The data you are seeking does not exist
            in this sector.
          </p>
        </div>

        <div className="mt-12">
          <Link href="/">
            <Button variant="cta" size="lg">
              Return to Base
            </Button>
          </Link>
        </div>
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
    </div>
  );
}
