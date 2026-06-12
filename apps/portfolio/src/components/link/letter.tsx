import { motion, Variants } from "motion/react"

interface AnimatedLetterProps {
  character: string
  animation: Variants
}

export default function AnimatedLetter({
  character,
  animation,
}: AnimatedLetterProps) {
  return (
    <motion.span
      variants={animation}
      className="relative inline-block whitespace-nowrap"
    >
      {character}
    </motion.span>
  )
}
