"use client"

import { motion } from "motion/react"
import { blur, height, translate } from "../anim"
import { useState, type JSX } from "react"
import { links } from "../links"
import Link from "next/link"
import { AnimatedThemeToggler } from "@workspace/ui/components/animated-theme-toggler"
import { useTheme } from "next-themes"

interface NavProps {
  setIsOpen: (active: boolean) => void
}

interface SelectedLinkState {
  isActive: boolean
  index: number
}

export default function Nav({ setIsOpen }: NavProps) {
  const { resolvedTheme, setTheme } = useTheme()

  const getChars = (word: string) => {
    const chars: JSX.Element[] = []
    word.split("").forEach((char, i) => {
      chars.push(
        <motion.span
          custom={[i * 0.02, (word.length - i) * 0.01]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          key={char + i}
        >
          {char}
        </motion.span>
      )
    })
    return chars
  }

  const [selectedLink, setSelectedLink] = useState<SelectedLinkState>({
    isActive: false,
    index: -1,
  })

  return (
    <motion.nav
      className="overflow-hidden"
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <div className="relative mb-3 flex">
        <div className="flex flex-col">
          {links.map((link, i) => {
            const { title, href } = link
            return (
              <Link key={`${title}-${i}`} href={href}>
                <motion.p
                  className="m-0 flex overflow-hidden pt-2.5 pr-7.5 text-3xl font-normal tracking-tight uppercase md:pr-[2vw] md:text-[5vw]"
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={() =>
                    setSelectedLink({ isActive: true, index: i })
                  }
                  onMouseLeave={() =>
                    setSelectedLink({ isActive: false, index: -1 })
                  }
                  variants={blur}
                  animate={
                    selectedLink.isActive && selectedLink.index !== i
                      ? "open"
                      : "closed"
                  }
                >
                  {getChars(title)}
                </motion.p>
              </Link>
            )
          })}
        </div>

        <div className="mt-auto ml-auto flex items-center justify-end gap-2">
          <AnimatedThemeToggler
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            onThemeChange={setTheme}
          />
        </div>
      </div>
    </motion.nav>
  )
}
