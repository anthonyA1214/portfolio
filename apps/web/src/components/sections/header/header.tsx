"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { background, menuIcon, opacity, xIcon } from "./anim"
import Nav from "./nav/nav"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <motion.header className="fixed top-0 right-0 left-0 z-20 bg-background/80 px-4 backdrop-blur-lg md:px-6">
      <div className="relative z-50 flex h-16 items-center justify-between">
        {/**/}
        <span className="font-satisfy text-lg">anthony amiluddin</span>

        {/*hamburger*/}
        <div
          className="flex cursor-pointer items-center justify-center gap-2"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className="relative flex items-center lowercase">
            <motion.p variants={opacity} animate={!isOpen ? "open" : "closed"}>
              Menu
            </motion.p>
            <motion.p
              className="absolute opacity-0"
              variants={opacity}
              animate={isOpen ? "open" : "closed"}
            >
              Close
            </motion.p>
          </div>

          <div className="relative flex items-center">
            <motion.div
              variants={menuIcon}
              initial="open"
              animate={isOpen ? "closed" : "open"}
            >
              <Menu />
            </motion.div>

            <motion.div
              className="absolute"
              variants={xIcon}
              initial="closed"
              animate={isOpen ? "open" : "closed"}
            >
              <X />
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isOpen && <Nav setIsOpen={setIsOpen} />}
      </AnimatePresence>

      <motion.div
        variants={background}
        initial="initial"
        animate={isOpen ? "open" : "closed"}
        className="absolute top-full left-0 z-10 h-full w-full bg-background/50"
        onClick={() => setIsOpen(false)}
      />
    </motion.header>
  )
}
