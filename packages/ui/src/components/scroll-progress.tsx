"use client"

import { motion, useScroll, type MotionProps } from "motion/react"

import { cn } from "@workspace/ui/lib/utils"

interface ScrollProgressProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  keyof MotionProps
> {
  ref?: React.Ref<HTMLDivElement>
}

export function ScrollProgress({
  className,
  ref,
  ...props
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-linear-to-r from-[#8B5CF6] via-[#EC4899] to-[#F97316] dark:from-[#A97CF8] dark:via-[#F38CB8] dark:to-[#FDCC92]",
        className
      )}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props}
    />
  )
}
