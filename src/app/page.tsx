import { Hero } from "@/components/sections/Hero";
import RealConversation from "@/components/sections/RealConversation";
import WatchVideo from "@/components/sections/WatchVideo";
import WhoWeHelp from "@/components/sections/WhoWeHelp";
import OurWork from "@/components/sections/OurWork";
import RealResults from "@/components/sections/RealResults";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/FAQ";

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Hero />
      <div id="watch-video">
        <WatchVideo />
      </div>
      <RealConversation />
      <WhoWeHelp />
      <div id="our-work">
        <OurWork />
      </div>
      <RealResults />
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <Testimonials />
      <div id="faq">
        <Faq />
      </div>
    </div>
  );
}
