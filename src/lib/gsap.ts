import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export const getGSAP = () => {
  if (typeof window === "undefined") return null;

  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }

  return gsap;
};
