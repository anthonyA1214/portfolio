"use client"

import { motion, Variants } from "motion/react"
import AnimatedLetter from "./letter"
import { titleAnimation } from "./anim"

interface AnimatedWordProps {
  title: string
  animation: Variants
  isHovered: boolean
}

export default function AnimatedWord({
  title,
  animation,
  isHovered,
}: AnimatedWordProps) {
  return (
    <motion.span
      variants={titleAnimation}
      initial="rest"
      animate={isHovered ? "hover" : "rest"}
      className="relative whitespace-nowrap"
    >
      {title
        .split("")
        .map((character, i) =>
          character === " " ? (
            <span key={i}>&nbsp;</span>
          ) : (
            <AnimatedLetter
              key={i}
              character={character}
              animation={animation}
            />
          )
        )}
    </motion.span>
  )
}
