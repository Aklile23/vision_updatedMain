// components/HeroCardDeck.tsx
import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function HeroCardDeck() {
  const [isSpread, setIsSpread] = useState(false);
  const hasMountedRef = useRef(false);
  useEffect(() => { hasMountedRef.current = true; }, []);

  const cards = [
    { bg: "bg-fg/15", delay: 0.2, angle: -6 },
    { bg: "bg-fg/20", delay: 0.4, angle: 3 },
    { bg: "bg-fg/25", delay: 0.6, angle: -2 },
  ] as const;

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") setIsSpread(false);
    if ((e.key === "Enter" || e.key === " ") && !isSpread) { e.preventDefault(); setIsSpread(true); }
  }, [isSpread]);

  return (
    <motion.div
      className="relative h-screen outline-none"
      onHoverStart={() => setIsSpread(true)}
      onHoverEnd={() => setIsSpread(false)}
      onFocus={() => setIsSpread(true)}
      onBlur={() => setIsSpread(false)}
      onKeyDown={onKeyDown}
      tabIndex={0}
      aria-expanded={isSpread}
      role="group"
    >
      <div className="relative h-full flex justify-center items-center">
        {cards.map((card, i) => {
          const stackedTarget = { x: 0, y: 0, rotate: card.angle, scale: 1 } as const;
          const gap = 350; // spacing between cards (no overlap)
          const totalWidth = (cards.length - 1) * gap;
          // Left-aligned spread: top card (index 0) goes far left, others line up to the right
          const spreadX = i * gap - totalWidth;
          const spreadTarget = { x: spreadX, y: 0, rotate: 0, scale: 1.02 } as const;

          const target = isSpread ? spreadTarget : stackedTarget;

          const transition = {
            type: "spring" as const,
            stiffness: isSpread ? 180 : 260,
            damping: isSpread ? 20 : 24,
            delay: !hasMountedRef.current && !isSpread ? card.delay : 0,
          } as const;

          return (
            <motion.div
              key={i}
              className={`absolute w-72 h-96 rounded-3xl ${card.bg} backdrop-blur-sm border border-fg/20 shadow-2xl will-change-transform`}
              style={{ zIndex: cards.length - i }}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              animate={{ opacity: 1, ...target, transition }}
              whileHover={{
                y: isSpread ? 0 : -10,
                rotate: 0,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <div className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-fg/30 rounded-xl mb-4" />
                  <div className="space-y-2">
                    <div className="h-3 bg-fg/40 rounded w-3/4" />
                    <div className="h-3 bg-fg/30 rounded w-1/2" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-2 bg-fg/30 rounded" />
                  <div className="h-2 bg-fg/20 rounded" />
                  <div className="h-2 bg-fg/25 rounded" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
