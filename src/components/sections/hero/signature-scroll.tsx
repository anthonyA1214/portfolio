"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SignatureScroll() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (!svgRef.current) return;

      const tail = svgRef.current.querySelector<SVGPathElement>("#tailPath");

      if (!tail) return;

      const tailLength = tail.getTotalLength();

      gsap.set(tail, {
        strokeDasharray: tailLength,
        strokeDashoffset: tailLength,
      });

      gsap.to(tail, {
        strokeDashoffset: 0,
        duration: 3,
        ease: "none",
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 70%",
          end: "bottom 20%",
          scrub: 1.5,
        },
      });

      //
    },
    { scope: svgRef },
  );

  return (
    <svg
      viewBox="-14.8091 5 35.93 102"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full overflow-visible"
      ref={svgRef}
    >
      <path
        id="tailPath"
        d="M 10 5 C 20 16 -21 23 -14 44 C 0 71 50 65 -2 107"
        fill="transparent"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
