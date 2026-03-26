import { Pricing } from "@/components/sections/Pricing";
import RealResults from "@/components/sections/RealResults";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";

export default function PricingPage() {
  return (
    <div className="bg-black min-h-screen pt-20">
      <Pricing />
      <RealResults />
      <Testimonials />
      <Faq />
    </div>
  );
}
