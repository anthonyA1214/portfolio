"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  return (
    <footer>
      <div
        ref={containerRef}
        className="relative h-100 md:h-125 lg:h-150 xl:h-175 2xl:h-200"
        style={{
          clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
        }}
      >
        <motion.div
          className="fixed bottom-0 h-100 w-full md:h-125 lg:h-150 xl:h-175 2xl:h-200"
          style={{ opacity }}
        >
          <div className="bg-muted/30 flex h-full w-full flex-col justify-between px-12 py-8">
            <div>test</div>
            <div className="flex flex-col items-start justify-between sm:flex-row sm:items-end">
              <h1 className="mt-10 text-[18vw] leading-[0.8] md:text-[16vw] lg:text-[18vw] xl:text-[20vw] 2xl:text-[22vw]">
                Anthony
              </h1>
              <p className="mt-4 text-xs sm:mt-0 sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                © asd
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
