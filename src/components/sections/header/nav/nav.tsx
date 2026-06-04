"use client";

import { motion } from "motion/react";
import { blur, height, translate } from "../anim";
import { useState, type JSX } from "react";
import { links } from "../links";
import Link from "next/link";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useTheme } from "next-themes";

interface NavProps {
  setIsOpen: (active: boolean) => void;
}

interface SelectedLinkState {
  isActive: boolean;
  index: number;
}

export default function Nav({ setIsOpen }: NavProps) {
  const { resolvedTheme, setTheme } = useTheme();

  const getChars = (word: string) => {
    const chars: JSX.Element[] = [];
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
        </motion.span>,
      );
    });
    return chars;
  };

  const [selectedLink, setSelectedLink] = useState<SelectedLinkState>({
    isActive: false,
    index: -1,
  });

  return (
    <motion.nav
      className="overflow-hidden"
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <div className="relative flex mb-3">
        <div className="flex flex-col">
          {links.map((link, i) => {
            const { title, href } = link;
            return (
              <Link key={`${title}-${i}`} href={href}>
                <motion.p
                  className="overflow-hidden text-3xl md:text-[5vw] pr-7.5 md:pr-[2vw] pt-2.5 flex m-0 uppercase tracking-tight font-normal"
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
            );
          })}
        </div>

        <div className="mt-auto flex items-center gap-2 justify-end ml-auto">
          <AnimatedThemeToggler
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            onThemeChange={setTheme}
          />
        </div>
      </div>
    </motion.nav>
  );
}
