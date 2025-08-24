import { useEffect, useRef, useState } from "react";
import Container from "../Container";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const HomeHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroMedia = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const [orbitalRotation, setOrbitalRotation] = useState(0);
  // add this state
  const [isMobile, setIsMobile] = useState(false);

  // detect on mount & on resize
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const id = setInterval(() => {
      if (window.innerWidth >= 768) {
        setActiveCard((prev) => (prev + 1) % 3);
        setOrbitalRotation((prev) => prev + 120);
      }
    }, 3000);
    return () => clearInterval(id);
  }, [isMobile]);
  

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

  const cards = isMobile
  ? [
      { opacity: "bg-fg/15", delay: 0.2, rotate: "0deg", content: "3d-model" },
    ]
  : [
      { opacity: "bg-fg/15", delay: 0.2, rotate: "-6deg", content: "3d-model" },
      { opacity: "bg-fg/20", delay: 0.4, rotate: "3deg", content: "bim-view" },
      { opacity: "bg-fg/25", delay: 0.6, rotate: "-2deg", content: "ai-dashboard" },
    ];

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
              {cards.map((card, i) => {
                  // orbital positions for desktop only
                  const angle = (orbitalRotation + i * 120) * (Math.PI / 180);
                  const radius = 8;
                  const x = !isMobile ? Math.sin(angle) * radius : 0;
                
                  return (
                    <motion.div
                      key={i}
                      className={`absolute inset-4 rounded-3xl ${card.opacity} md:backdrop-blur-sm border border-fg/20 shadow-xl md:shadow-2xl overflow-hidden cursor-pointer`}
                      style={{ zIndex: activeCard === i ? 30 : 10, willChange: "transform" }}
                      initial={
                        isMobile
                          ? false
                          : { opacity: 0, y: 50, rotateZ: parseFloat(card.rotate) }
                      }
                      animate={
                        isMobile
                          // ✅ mobile: gentle pulse
                          ? { opacity: 1, y: 0, x: 0, rotateZ: 0, scale: [1, 1.03, 1] }
                          // 💻 desktop: your existing orbit/scale logic
                          : {
                              opacity: 1,
                              y: 0,
                              x,
                              rotateZ: parseFloat(card.rotate),
                              scale: activeCard === i ? 1.05 : 1,
                            }
                      }
                      transition={
                        isMobile
                          // smooth, repeating pulse
                          ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                          : { duration: 0.8, ease: "easeInOut", delay: card.delay }
                      }
                      onMouseEnter={() => !isMobile && setActiveCard(i)}
                    >

                  {/* Card content based on type */}
                  <div className="p-6 h-full flex flex-col bg-bg/10 md:bg-transparent">
                    {/* 3D Model Card */}
                    {card.content === "3d-model" && (
                      <>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-fg/60 rounded-full animate-pulse" />
                            <span className="text-xs text-fg/80 font-medium">IMMERSIVE VISUALIZATION</span>
                          </div>
                          <div className="text-xs text-fg/60 font-mono">v2.1.4</div>
                        </div>

                        <div className="flex-1 relative bg-bg/90 rounded-xl overflow-hidden border border-fg/20 shadow-inner">
                          {/* Viewport header */}
                          <div className="absolute top-0 left-0 right-0 bg-bg/60 backdrop-blur-sm px-3 py-2 z-20 border-b border-fg/15">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="flex gap-1">
                                  <div className="w-2 h-2 bg-fg/40 rounded-full" />
                                  <div className="w-2 h-2 bg-fg/30 rounded-full" />
                                  <div className="w-2 h-2 bg-fg/20 rounded-full" />
                                </div>
                                <span className="text-xs text-fg/70 font-mono">Viewport_01.blend</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-fg/60 font-mono">
                                <span>Frame: 120</span>
                                <div className="w-1 h-1 bg-fg/30 rounded-full animate-pulse" />
                              </div>
                            </div>
                          </div>

                          {/* 3D viewport background with grid */}
                          <div className="absolute inset-0 mt-8 text-fg/60">
                            <svg className="w-full h-full opacity-20" viewBox="0 0 400 300">
                              <defs>
                                <pattern id="grid3D" width="20" height="20" patternUnits="userSpaceOnUse">
                                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.35"/>
                                </pattern>
                                <linearGradient id="floorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                  <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                                  <stop offset="100%" stopColor="currentColor" stopOpacity="0.08" />
                                </linearGradient>
                              </defs>
                              <rect width="100%" height="100%" fill="url(#grid3D)" />
                              <ellipse cx="200" cy="250" rx="150" ry="30" fill="url(#floorGradient)" />
                            </svg>
                          </div>

                          {/* Main 3D object - monochrome */}
                          <div className="absolute inset-0 flex items-center justify-center mt-4 text-fg/90">
                          <motion.div
                            className="relative w-32 h-32"
                            animate={
                              !isMobile
                                ? { rotateX: [0, 360], rotateY: [0, 360], rotateZ: [0, 180] }
                                : undefined
                            }
                            transition={
                              !isMobile
                                ? { duration: 12, repeat: Infinity, ease: "linear", times: [0, 0.33, 0.66, 1] }
                                : undefined
                            }
                            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                          >
                              <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 120 120">
                                {/* Base structure */}
                                <g opacity="0.9">
                                  {/* Faces (currentColor, varying opacity) */}
                                  <path d="M30 40 L90 40 L100 60 L80 80 L40 80 L20 60 Z"
                                    stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.18"/>
                                  <path d="M30 40 L40 25 L100 25 L90 40"
                                    stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.22"/>
                                  <path d="M90 40 L100 25 L110 45 L100 60"
                                    stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.25"/>

                                  <path d="M40 80 L50 95 L90 95 L80 80"
                                    stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.15"/>
                                  <path d="M80 80 L90 95 L105 75 L100 60"
                                    stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.18"/>

                                  {/* Inner details */}
                                  <circle cx="60" cy="50" r="8" stroke="currentColor" strokeWidth="2"
                                    fill="currentColor" opacity="0.3" />
                                  <rect x="55" y="45" width="10" height="10" rx="2"
                                    stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
                                </g>

                                {/* Wireframe overlay */}
                                <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.7">
                                  <line x1="30" y1="40" x2="40" y2="25" />
                                  <line x1="90" y1="40" x2="100" y2="25" />
                                  <line x1="20" y1="60" x2="30" y2="45" />
                                  <line x1="100" y1="60" x2="110" y2="45" />
                                  <line x1="40" y1="80" x2="50" y2="95" />
                                  <line x1="80" y1="80" x2="90" y2="95" />
                                  {/* Cross sections */}
                                  <line x1="30" y1="40" x2="80" y2="80" opacity="0.35" strokeDasharray="2,2" />
                                  <line x1="90" y1="40" x2="40" y2="80" opacity="0.35" strokeDasharray="2,2" />
                                </g>

                                {/* Vertex highlights */}
                                <g>
                                  <circle cx="40" cy="25" r="2.5" fill="currentColor" opacity="0.6">
                                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
                                  </circle>
                                  <circle cx="100" cy="25" r="2.5" fill="currentColor" opacity="0.6">
                                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="0.33s" repeatCount="indefinite"/>
                                  </circle>
                                  <circle cx="50" cy="95" r="2.5" fill="currentColor" opacity="0.6">
                                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="0.66s" repeatCount="indefinite"/>
                                  </circle>
                                  <circle cx="90" cy="95" r="2.5" fill="currentColor" opacity="0.6">
                                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="1s" repeatCount="indefinite"/>
                                  </circle>

                                  {/* Center point */}
                                  <circle cx="60" cy="50" r="1.5" fill="currentColor" opacity="0.8">
                                    <animate attributeName="r" values="1.5;3;1.5" dur="1.5s" repeatCount="indefinite"/>
                                  </circle>
                                </g>

                                {/* Surface normals */}
                                <g stroke="currentColor" strokeWidth="1" opacity="0.45">
                                  <line x1="60" y1="30" x2="65" y2="20">
                                    <animate attributeName="opacity" values="0.25;0.7;0.25" dur="3s" repeatCount="indefinite"/>
                                  </line>
                                  <line x1="85" y1="50" x2="95" y2="45">
                                    <animate attributeName="opacity" values="0.25;0.7;0.25" dur="3s" begin="1s" repeatCount="indefinite"/>
                                  </line>
                                  <line x1="60" y1="85" x2="65" y2="100">
                                    <animate attributeName="opacity" values="0.25;0.7;0.25" dur="3s" begin="2s" repeatCount="indefinite"/>
                                  </line>
                                </g>
                              </svg>
                            </motion.div>
                          </div>

                          {/* Tool palette */}
                          <div className="absolute top-12 left-3 space-y-1 z-10">
                            {['select', 'move', 'rotate', 'scale', 'extrude'].map((tool, i) => (
                              <motion.div
                                key={tool}
                                className={`w-8 h-8 bg-bg/60 rounded border ${i === 1 ? 'border-fg/40 bg-fg/10' : 'border-fg/20'} flex items-center justify-center cursor-pointer`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <div className="w-3 h-3 bg-fg/50 rounded-sm" />
                              </motion.div>
                            ))}
                          </div>

                          {/* Properties panel */}
                          <div className="absolute top-12 right-3 bg-bg/70 backdrop-blur-sm rounded-lg p-3 border border-fg/20 min-w-[100px] z-10">
                            <div className="text-xs text-fg/80 font-medium mb-2">Transform</div>
                            <div className="space-y-2 text-xs font-mono">
                              <div className="flex justify-between">
                                <span className="text-fg/60">X:</span>
                                <motion.span className="text-fg/80" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}>
                                  2.450
                                </motion.span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-fg/60">Y:</span>
                                <motion.span className="text-fg/80" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }}>
                                  1.200
                                </motion.span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-fg/60">Z:</span>
                                <motion.span className="text-fg/80" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, delay: 1, repeat: Infinity }}>
                                  0.850
                                </motion.span>
                              </div>
                            </div>

                            <div className="border-t border-fg/20 mt-3 pt-2">
                              <div className="text-xs text-fg/80 font-medium mb-1">Mesh</div>
                              <div className="text-xs font-mono text-fg/70">
                                <div>Verts: 2.4k</div>
                                <div>Faces: 1.8k</div>
                                <div>Tris: 3.6k</div>
                              </div>
                            </div>
                          </div>

                          {/* Coordinate system (neutral) */}
                          <div className="absolute bottom-4 left-4 z-10 text-fg/70">
                            <motion.svg className="w-12 h-12" viewBox="0 0 40 40" animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                              <line x1="20" y1="20" x2="32" y2="20" stroke="currentColor" strokeWidth="2"/>
                              <polygon points="32,20 28,18 28,22" fill="currentColor" opacity="0.8"/>
                              <text x="34" y="24" className="text-[6px] fill-current opacity-60 font-bold">X</text>

                              <line x1="20" y1="20" x2="20" y2="8" stroke="currentColor" strokeWidth="2"/>
                              <polygon points="20,8 18,12 22,12" fill="currentColor" opacity="0.8"/>
                              <text x="22" y="10" className="text-[6px] fill-current opacity-60 font-bold">Y</text>

                              <line x1="20" y1="20" x2="28" y2="28" stroke="currentColor" strokeWidth="2"/>
                              <polygon points="28,28 24,26 26,24" fill="currentColor" opacity="0.8"/>
                              <text x="30" y="32" className="text-[6px] fill-current opacity-60 font-bold">Z</text>

                              <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.8"/>
                            </motion.svg>
                          </div>

                          {/* Timeline scrubber */}
                          <div className="absolute bottom-4 left-20 right-4 bg-bg/60 backdrop-blur-sm rounded-full px-3 py-1 border border-fg/20 z-10">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-fg/20 rounded-full flex items-center justify-center cursor-pointer">
                                <div className="w-0 h-0 border-l-[4px] border-l-fg/70 border-t-[2px] border-b-[2px] border-t-transparent border-b-transparent ml-0.5" />
                              </div>
                              <div className="flex-1 relative">
                                <div className="h-1 bg-fg/20 rounded-full overflow-hidden">
                                  <motion.div
                                    className="h-full bg-fg/60 rounded-full"
                                    animate={{ width: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                  />
                                </div>
                                <motion.div
                                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-fg/60 rounded-full border border-fg/30"
                                  animate={{ left: ["0%", "100%", "0%"] }}
                                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                />
                              </div>
                              <div className="text-xs text-fg/60 font-mono min-w-[40px]">
                                <motion.span animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1, repeat: Infinity }}>
                                  120/240
                                </motion.span>
                              </div>
                            </div>
                          </div>

                          {/* Render progress indicator */}
                          <motion.div
                            className="absolute top-12 left-1/2 -translate-x-1/2 bg-bg/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-fg/30 z-20"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.8] }}
                            transition={{ duration: 4, repeat: Infinity, repeatDelay: 8 }}
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-fg/60 rounded-full animate-pulse" />
                              <span className="text-xs text-fg/80 font-medium">Rendering...</span>
                              <div className="w-16 h-1 bg-fg/20 rounded-full overflow-hidden ml-2">
                                <motion.div
                                  className="h-full bg-fg/60 rounded-full"
                                  animate={{ width: ["0%", "100%"] }}
                                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 9 }}
                                />
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </>
                    )}


                    {/* BIM View Card */}
                    {card.content === "bim-view" && (
                      <>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 bg-fg/60 rounded-full" />
                        <span className="text-xs text-fg/80 font-medium">BIM SYSTEMS</span>
                      </div>
                    
                      <div className="flex-1 relative bg-bg/90 rounded-xl overflow-hidden shadow-inner">
                        <div className="absolute inset-4">
                          <svg className="w-full h-full text-fg/70" viewBox="0 0 300 200">
                            <rect x="20" y="30" width="260" height="140" stroke="currentColor" strokeWidth="3" fill="none" />
                            <rect x="20" y="30" width="80" height="70" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1" />
                            <rect x="100" y="30" width="100" height="70" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.15" />
                            <rect x="200" y="30" width="80" height="70" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1" />
                            <rect x="20" y="100" width="130" height="70" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.12" />
                            <rect x="150" y="100" width="130" height="70" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.08" />
                    
                            <path d="M60 30 A15 15 0 0 1 75 45" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.8"/>
                            <path d="M160 100 A10 10 0 0 1 170 110" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.8"/>
                    
                            <line x1="20" y1="50" x2="20" y2="80" stroke="currentColor" strokeWidth="4" opacity="0.6"/>
                            <line x1="260" y1="50" x2="280" y2="50" stroke="currentColor" strokeWidth="4" opacity="0.6"/>
                    
                            <text x="150" y="20" textAnchor="middle" className="text-[8px] fill-current opacity-60" fontFamily="monospace">26.0m</text>
                            <text x="10" y="100" textAnchor="middle" className="text-[8px] fill-current opacity-60" fontFamily="monospace" transform="rotate(-90 10 100)">14.0m</text>
                    
                            <circle cx="60" cy="65" r="8" fill="currentColor" opacity="0.4" />
                            <circle cx="240" cy="65" r="8" fill="currentColor" opacity="0.4" />
                            <rect x="170" y="120" width="20" height="30" rx="2" fill="currentColor" opacity="0.4" />
                    
                            {/* blinking markers */}
                            <circle cx="140" cy="50" r="2" fill="currentColor" opacity="0.8">
                              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="180" cy="130" r="2" fill="currentColor" opacity="0.8">
                              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="0.5s" repeatCount="indefinite" />
                            </circle>
                          </svg>
                        </div>
                    
                        {/* mini sensor panel */}
                        <div className="absolute top-4 right-4">
                          <div className="bg-fg/10 backdrop-blur-sm rounded-lg p-2 border border-fg/20">
                            <div className="text-xs space-y-1">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-fg/60 rounded-full animate-pulse" />
                                <span className="font-mono text-fg/80">T: 22°C</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-fg/60 rounded-full animate-pulse" />
                                <span className="font-mono text-fg/80">H: 45%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                    
                    )}

                    {/* AI Dashboard Card */}
                    {card.content === "ai-dashboard" && (
                      <>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 bg-fg/60 rounded-full animate-pulse" />
                        <span className="text-xs text-fg/80 font-medium">AI SYSTEMS</span>
                      </div>
                    
                      <div className="flex-1 space-y-4">
                        {/* animated line chart with gradient fill */}
                        <div className="h-24 bg-fg/90 rounded-lg p-3 relative overflow-hidden">
                          <svg className="w-full h-full" viewBox="0 0 200 60">
                            <defs>
                              <linearGradient id="aiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="rgb(255 255 255)" stopOpacity="0.8"/>
                                <stop offset="100%" stopColor="rgb(255 255 255)" stopOpacity="0.1"/>
                              </linearGradient>
                            </defs>
                    
                            <path d="M10 45 Q30 35 50 25 T90 15 T130 20 T170 10 T190 15"
                              stroke="rgb(255 255 255)" strokeWidth="2" fill="none" opacity="0.8">
                              <animate attributeName="stroke-dasharray" values="0 400;200 200;400 0" dur="3s" repeatCount="indefinite"/>
                              <animate attributeName="stroke-dashoffset" values="0;-200;-400" dur="3s" repeatCount="indefinite"/>
                            </path>
                    
                            <path d="M10 45 Q30 35 50 25 T90 15 T130 20 T170 10 T190 15 L190 55 L10 55 Z"
                              fill="url(#aiGradient)" opacity="0.3"/>
                            <circle cx="50" cy="25" r="2" fill="white" opacity="0.8">
                              <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite"/>
                            </circle>
                            <circle cx="90" cy="15" r="2" fill="white" opacity="0.8">
                              <animate attributeName="r" values="2;4;2" dur="2s" begin="0.5s" repeatCount="indefinite"/>
                            </circle>
                            <circle cx="130" cy="20" r="2" fill="white" opacity="0.8">
                              <animate attributeName="r" values="2;4;2" dur="2s" begin="1s" repeatCount="indefinite"/>
                            </circle>
                          </svg>
                          <div className="absolute top-2 left-2 text-bg/80 text-xs font-mono">
                            Model Accuracy: 94.7%
                          </div>
                        </div>
                    
                        {/* KPI mini-cards */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-bg/10 rounded-lg p-3 border border-fg/10">
                            <div className="text-xs text-fg/70 mb-1">Processing</div>
                            <div className="text-lg font-bold text-fg">1.2k/s</div>
                            <div className="w-full bg-fg/20 rounded-full h-1 mt-2">
                              <div className="bg-fg/60 h-1 rounded-full" style={{ width: "78%" }}>
                                <div className="h-full bg-fg/80 rounded-full animate-pulse"></div>
                              </div>
                            </div>
                          </div>
                    
                          <div className="bg-bg/10 rounded-lg p-3 border border-fg/10">
                            <div className="text-xs text-fg/70 mb-1">Uptime</div>
                            <div className="text-lg font-bold text-fg">99.9%</div>
                            <div className="flex gap-1 mt-2">
                              {Array.from({ length: 8 }, (_, i) => (
                                <div
                                  key={i}
                                  className="flex-1 h-1 bg-fg/40 rounded-full animate-pulse"
                                  style={{ animationDelay: `${i * 0.1}s` }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                    
                        {/* neural network dots */}
                        <div className="bg-bg/10 rounded-lg p-3 border border-fg/10">
                          <div className="text-xs text-fg/70 mb-2">Neural Network</div>
                          <div className="flex justify-between items-center">
                            {Array.from({ length: 3 }, (_, layer) => (
                              <div key={layer} className="flex flex-col gap-1">
                                {Array.from({ length: layer === 1 ? 5 : 3 }, (_, node) => (
                                  <div
                                    key={node}
                                    className="w-2 h-2 bg-fg/40 rounded-full animate-pulse"
                                    style={{ animationDelay: `${(layer * 0.5) + (node * 0.1)}s` }}
                                  />
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                    
                    )}
                  </div>
                </motion.div>
              )})}

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
