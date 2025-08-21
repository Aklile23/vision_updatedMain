import { useRef } from "react";
import Container from "../Container";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const HomeHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroMedia = useRef<HTMLDivElement>(null);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative overflow-hidden py-30 md:py-42">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-fg/5 via-transparent to-fg/8" />

      {/* Animated geometric shapes (lighter/cheaper on mobile) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-72 h-72 md:w-96 md:h-96 bg-fg/10 rounded-full blur-xl md:blur-3xl"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-24 -left-24 w-64 h-64 md:w-80 md:h-80 bg-fg/8 rounded-full blur-lg md:blur-3xl"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating grid pattern (fainter on mobile) */}
      <div className="absolute inset-0 opacity-[0.02] md:opacity-[0.04] [background-image:linear-gradient(var(--color-fg)_1px,transparent_1px),linear-gradient(90deg,var(--color-fg)_1px,transparent_1px)] [background-size:64px_64px]" />

      <Container>
        <div className="relative grid items-center gap-12 lg:gap-16 lg:grid-cols-12">
          {/* Left: Content */}
          <motion.div
            ref={heroRef}
            className="lg:col-span-7 space-y-8 lg:space-y-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fg/5 border border-fg/20 backdrop-blur-0 md:backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-fg/80">Since 2019</span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="heading text-5xl md:text-6xl lg:text-7xl leading-[0.9]"
              variants={fadeInUp}
            >
              Elevating Digital
              <br />
              <span className="text-fg/80 italic">Dimensions</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-xl md:text-2xl text-fg/70 leading-relaxed max-w-2xl font-light"
              variants={fadeInUp}
            >
              We craft <span className="text-fg font-medium">immersive 3D experiences</span>, build{" "}
              <span className="text-fg font-medium">intelligent systems</span>, and deploy{" "}
              <span className="text-fg font-medium">custom AI solutions</span> that transform ideas
              into digital realities.
            </motion.p>

            {/* Actions */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              variants={fadeInUp}
            >
              <NavLink
                to="/contact"
                className="group relative px-8 py-4 bg-fg text-bg rounded-2xl font-semibold hover:bg-fg/90 hover:shadow-2xl hover:shadow-fg/25 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-fg/90 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  Start a Project
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </NavLink>
              <NavLink
                to="/projects"
                className="px-8 py-4 border-2 border-fg/20 text-fg rounded-2xl font-semibold hover:border-fg/40 hover:bg-fg/5 transition-all duration-300 backdrop-blur-0 md:backdrop-blur-sm"
              >
                Explore Our Work
              </NavLink>
            </motion.div>
          </motion.div>

          {/* Right: Interactive visual element */}
          <motion.div
            ref={heroMedia}
            className="lg:col-span-5 relative"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ willChange: "transform", transform: "translateZ(0)" }}
          >
            {/* 3D-style showcase cards */}
            <div className="relative h-80 md:h-96 lg:h-[500px]">
              {[
                {
                  opacity: "bg-fg/15",
                  delay: 0.2,
                  rotate: "-6deg",
                  content: "3d-model",
                },
                {
                  opacity: "bg-fg/20",
                  delay: 0.4,
                  rotate: "3deg",
                  content: "bim-view",
                },
                {
                  opacity: "bg-fg/25",
                  delay: 0.6,
                  rotate: "-2deg",
                  content: "ai-dashboard",
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  className={`absolute inset-4 rounded-3xl ${card.opacity} md:backdrop-blur-sm border border-fg/20 shadow-xl md:shadow-2xl overflow-hidden ${i > 0 ? "hidden md:block" : ""}`}
                  style={{
                    transform: `rotate(${card.rotate}) translateZ(${i * 20}px)`,
                    zIndex: 3 - i,
                    willChange: "transform",
                  }}
                  initial={{ opacity: 0, y: 50, rotate: 0 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotate: parseFloat(card.rotate),
                    transition: {
                      duration: 0.8,
                      delay: card.delay,
                      ease: "easeOut",
                    },
                  }}
                  whileHover={{
                    y: -10,
                    rotate: 0,
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                >
                  {/* Card content based on type */}
                  <div className="p-6 h-full flex flex-col bg-bg/10 md:bg-transparent">
                    {/* 3D Model Card */}
                    {card.content === "3d-model" && (
                      <>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-3 h-3 bg-fg/60 rounded-full" />
                          <span className="text-xs text-fg/80 font-medium">
                            3D VISUALIZATION
                          </span>
                        </div>

                        {/* 3D wireframe representation */}
                        <div className="flex-1 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                              className="w-24 h-24 text-fg/40"
                              viewBox="0 0 100 100"
                              fill="none"
                            >
                              {/* Wireframe cube */}
                              <path
                                d="M20 30 L50 15 L80 30 L80 60 L50 75 L20 60 Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                fill="none"
                              />
                              <path
                                d="M20 30 L20 60"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M50 15 L50 45"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M80 30 L80 60"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M20 45 L50 30 L80 45"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                opacity="0.6"
                              />
                              <path
                                d="M35 37.5 L35 52.5"
                                stroke="currentColor"
                                strokeWidth="1"
                                opacity="0.4"
                              />
                              <path
                                d="M65 37.5 L65 52.5"
                                stroke="currentColor"
                                strokeWidth="1"
                                opacity="0.4"
                              />
                            </svg>
                          </div>
                          <div className="absolute bottom-4 left-0 right-0">
                            <div className="flex gap-1 justify-center">
                              <div className="w-1 h-1 bg-fg/30 rounded-full" />
                              <div className="w-4 h-1 bg-fg/30 rounded-full" />
                              <div className="w-1 h-1 bg-fg/30 rounded-full" />
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* BIM View Card */}
                    {card.content === "bim-view" && (
                      <>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-3 h-3 bg-fg/60 rounded-full" />
                          <span className="text-xs text-fg/80 font-medium">
                            BIM SYSTEMS
                          </span>
                        </div>

                        {/* Building floor plan representation */}
                        <div className="flex-1 relative">
                          <div className="absolute inset-0 p-4">
                            <svg
                              className="w-full h-full text-fg/40"
                              viewBox="0 0 120 80"
                              fill="none"
                            >
                              {/* Floor plan outline */}
                              <rect
                                x="10"
                                y="15"
                                width="100"
                                height="50"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                              />

                              {/* Interior walls */}
                              <line
                                x1="45"
                                y1="15"
                                x2="45"
                                y2="65"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                              <line
                                x1="75"
                                y1="15"
                                x2="75"
                                y2="40"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                              <line
                                x1="10"
                                y1="40"
                                x2="110"
                                y2="40"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />

                              {/* Doors */}
                              <path
                                d="M30 15 A8 8 0 0 1 38 23"
                                stroke="currentColor"
                                strokeWidth="1"
                                fill="none"
                              />
                              <path
                                d="M60 40 A6 6 0 0 1 66 34"
                                stroke="currentColor"
                                strokeWidth="1"
                                fill="none"
                              />

                              {/* Dimensions */}
                              <text
                                x="52"
                                y="10"
                                className="text-[4px] fill-current opacity-60"
                              >
                                12.5m
                              </text>
                              <text
                                x="5"
                                y="42"
                                className="text-[4px] fill-current opacity-60"
                              >
                                8m
                              </text>
                            </svg>
                          </div>
                        </div>
                      </>
                    )}

                    {/* AI Dashboard Card */}
                    {card.content === "ai-dashboard" && (
                      <>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-3 h-3 bg-fg/60 rounded-full animate-pulse" />
                          <span className="text-xs text-fg/80 font-medium">
                            AI SYSTEMS
                          </span>
                        </div>

                        {/* AI dashboard representation */}
                        <div className="flex-1 space-y-3">
                          {/* Chart area */}
                          <div className="h-16 relative">
                            <svg
                              className="w-full h-full text-fg/40"
                              viewBox="0 0 100 40"
                              fill="none"
                            >
                              <path
                                d="M5 35 L25 25 L45 15 L65 20 L85 10"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                              />
                              <circle
                                cx="25"
                                cy="25"
                                r="2"
                                fill="currentColor"
                                opacity="0.6"
                              />
                              <circle
                                cx="45"
                                cy="15"
                                r="2"
                                fill="currentColor"
                                opacity="0.6"
                              />
                              <circle
                                cx="65"
                                cy="20"
                                r="2"
                                fill="currentColor"
                                opacity="0.6"
                              />
                            </svg>
                          </div>

                          {/* Data rows */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-fg/40 rounded-full" />
                              <div className="flex-1 h-1 bg-fg/30 rounded" />
                              <div className="w-6 h-1 bg-fg/40 rounded" />
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-fg/40 rounded-full" />
                              <div className="flex-1 h-1 bg-fg/30 rounded" />
                              <div className="w-4 h-1 bg-fg/40 rounded" />
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-fg/40 rounded-full" />
                              <div className="flex-1 h-1 bg-fg/30 rounded" />
                              <div className="w-8 h-1 bg-fg/40 rounded" />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Floating elements representing your tech stack (smaller/cheaper on mobile) */}
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 md:w-16 md:h-16 bg-fg/15 md:bg-fg/20 rounded-full shadow-md md:shadow-lg border border-fg/25 md:border-fg/30 flex items-center justify-center"
                style={{ willChange: "transform", transform: "translateZ(0)" }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  className="w-8 h-8 text-fg/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.78 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z"
                  />
                </svg>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-10 h-10 md:w-12 md:h-12 bg-fg/10 md:bg-fg/15 rounded-full shadow-md md:shadow-lg border border-fg/20 md:border-fg/25 flex items-center justify-center"
                style={{ willChange: "transform", transform: "translateZ(0)" }}
                animate={{
                  y: [0, 15, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  className="w-6 h-6 text-fg/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default HomeHero;
