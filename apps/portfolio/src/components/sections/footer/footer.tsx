"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { copyright, footerLinks } from "./config"
import { getYearDisplay } from "@/lib/utils"
import { metadata as meta } from "@/app/config"
import AnimatedLink from "@/components/link/animated-link"

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5])

  const { startYear } = copyright
  const yearDisplay = getYearDisplay(startYear)

  return (
    <footer>
      <div
        ref={containerRef}
        className="relative h-120 md:h-100 lg:h-125 xl:h-150 2xl:h-175"
        style={{
          clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
        }}
      >
        <motion.div
          className="fixed bottom-0 h-120 w-full md:h-100 lg:h-125 xl:h-150 2xl:h-175"
          style={{ opacity }}
        >
          <div className="flex h-full w-full flex-col justify-between gap-8 bg-muted/30 px-4 py-8 md:px-6">
            {/**/}
            <div className="flex shrink-0 flex-col gap-8 sm:flex-row sm:justify-between">
              {/*left side*/}
              <div className="grid grid-cols-2 gap-12 sm:gap-20">
                {/*site map or navigation*/}
                <div className="flex flex-col gap-2">
                  <h3 className="mb-2 text-zinc-500 uppercase dark:text-zinc-400">
                    SITEMAP
                  </h3>
                  {footerLinks.siteMap.map((link, i) => (
                    <AnimatedLink
                      className="underline-offset-4 hover:underline"
                      href={link.href}
                      key={`footer_sitemap_${i}`}
                      external={link.href.startsWith("http") ? true : false}
                    >
                      {link.label}
                    </AnimatedLink>
                  ))}
                </div>

                {/*socials*/}
                <div className="flex flex-col gap-2">
                  <h3 className="mb-2 text-zinc-500 uppercase dark:text-zinc-400">
                    SOCIALS
                  </h3>
                  {footerLinks.socials.map((link, i) => (
                    <AnimatedLink
                      className="underline-offset-4 hover:underline"
                      href={link.href}
                      target="_blank"
                      key={`footer_social_${i}`}
                      external
                    >
                      {link.label}
                    </AnimatedLink>
                  ))}
                </div>
              </div>

              {/*right side*/}
              <div className="flex flex-col gap-2">
                <h3 className="mb-2 text-zinc-500 uppercase dark:text-zinc-400">
                  CONTACT
                </h3>
                <a
                  className="underline-offset-4 hover:underline"
                  href="mailto:anthonyamiluddin652@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  anthonyamiluddin652@gmail.com
                </a>
              </div>
            </div>

            {/**/}
            <div className="flex flex-col items-center justify-between gap-x-4 sm:flex-row sm:items-end">
              <h1 className="mt-10 text-[10vw] leading-[0.8] md:text-[9vw] lg:text-[10vw] xl:text-[11vw] 2xl:text-[12vw]">
                {meta.author.username}
              </h1>
              <p className="mt-4 text-xs sm:mt-0 sm:ml-auto sm:text-right sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                © {yearDisplay} {meta.author.name}. All rights reserved.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
