import { AboutHero } from "@/components/sections/AboutHero";
import { OurStory } from "@/components/sections/OurStory";
import RealResults from "@/components/sections/RealResults";
import Testimonials from "@/components/sections/Testimonials";
import { Hero } from "@/components/sections/Hero";

export default function AboutPage() {
  return (
    <div className="bg-black min-h-screen">
      <AboutHero />
      <OurStory />
      <RealResults />
      <Testimonials />
    </div>
  );
}
