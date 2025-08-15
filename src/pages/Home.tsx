import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import Container from "../components/Container";
import { motion, useScroll, useTransform } from "framer-motion";


export default function Home() {
  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null);
  const kpiRefs = useRef<HTMLDivElement[]>([]);
  const solutionRefs = useRef<HTMLDivElement[]>([]);
  const projectRefs = useRef<HTMLDivElement[]>([]);
  const logoRefs = useRef<HTMLDivElement[]>([]);
  const testimonialRefs = useRef<HTMLQuoteElement[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const heroMedia = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<HTMLSpanElement[]>([]);
  const setChip = (i: number) => (el: HTMLSpanElement | null) => { if (el) chipRefs.current[i] = el; };

  // helper for array refs
  function setAt<T extends HTMLElement>(arr: React.MutableRefObject<T[]>, index: number) {
    return (el: T | null): void => { if (el) arr.current[index] = el; };
  }
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  // -- Interactive card helpers --
  const onCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const midX = r.width / 2;
    const midY = r.height / 2;

    // 3D tilt (keep subtle)
    const rx = ((y - midY) / midY) * 6;   // max ~6deg
    const ry = ((midX - x) / midX) * 8;   // max ~8deg
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);

    // spotlight position
    el.style.setProperty("--px", `${x}px`);
    el.style.setProperty("--py", `${y}px`);
  };

  const onCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
    el.style.setProperty("--px", `-9999px`);
    el.style.setProperty("--py", `-9999px`);
  };

  return (
    <main className="bg-bg text-fg">
         {/* HERO: Modern, dynamic design */}
      <section className="relative overflow-hidden py-30 md:py-42">
        {/* Dynamic gradient background using your color theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-fg/5 via-transparent to-fg/8" />

        {/* Animated geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-40 -right-40 w-96 h-96 bg-fg/10 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute -bottom-32 -left-32 w-80 h-80 bg-fg/8 rounded-full blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 40, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Floating grid pattern */}
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(var(--color-fg)_1px,transparent_1px),linear-gradient(90deg,var(--color-fg)_1px,transparent_1px)] [background-size:64px_64px]" />
        
        <Container>
          <div className="relative grid items-center gap-12 lg:gap-16 lg:grid-cols-12">
            {/* Left: Content */}
            <motion.div 
              ref={heroRef} 
              className="lg:col-span-7 space-y-8 lg:space-y-10"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Badge with glassmorphism */}
              <motion.div variants={fadeInUp}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fg/5 border border-fg/20 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-fg/60 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-fg/80">
                    Since 2019 • Addis Ababa
                  </span>
                </div>
              </motion.div>

              {/* Main heading with subtle emphasis */}
              <motion.h1 
                className="heading text-5xl md:text-6xl lg:text-7xl leading-[0.9]"
                variants={fadeInUp}
              >
                Elevating Digital
                <br />
                <span className="text-fg/80 italic">
                  Dimensions
                </span>
              </motion.h1>

              {/* Description with better typography */}
              <motion.p 
                className="text-xl md:text-2xl text-fg/70 leading-relaxed max-w-2xl font-light"
                variants={fadeInUp}
              >
                We craft <span className="text-fg font-medium">immersive 3D experiences</span>, 
                build <span className="text-fg font-medium">intelligent systems</span>, 
                and deploy <span className="text-fg font-medium">custom AI solutions</span> that transform ideas into extraordinary digital realities.
              </motion.p>

              {/* Enhanced action buttons */}
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
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </NavLink>
                <NavLink 
                  to="/projects" 
                  className="px-8 py-4 border-2 border-fg/20 text-fg rounded-2xl font-semibold hover:border-fg/40 hover:bg-fg/5 transition-all duration-300 backdrop-blur-sm"
                >
                  Explore Our Work
                </NavLink>
              </motion.div>

              {/* Tech stack with modern design */}
              <motion.div 
                className="pt-8"
                variants={fadeInUp}
              >
                <p className="text-sm text-fg/60 mb-4 font-medium tracking-wide">
                  CORE TECHNOLOGIES
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: "3D & VR" },
                    { name: "BIM" },
                    { name: "AI" },
                    { name: "Photogrammetry" }
                  ].map((tech, i)=>(
                    <motion.span 
                      key={tech.name} 
                      ref={setChip(i)} 
                      className="relative px-6 py-3 text-sm font-medium bg-fg/10 text-fg rounded-xl border border-fg/20 hover:bg-fg/15 hover:shadow-lg hover:shadow-fg/10 transition-all duration-300"
                      animate={{
                        y: [0, i % 2 ? -4 : 4, 0],
                        transition: {
                          duration: 3 + i * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: 0,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Interactive visual element */}
            <motion.div 
              ref={heroMedia}
              className="lg:col-span-5 relative"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* 3D-style showcase cards */}
              <div className="relative h-96 lg:h-[500px]">
                {[
                  { 
                    opacity: "bg-fg/15", 
                    delay: 0.2, 
                    rotate: "-6deg",
                    content: "3d-model"
                  },
                  { 
                    opacity: "bg-fg/20", 
                    delay: 0.4, 
                    rotate: "3deg",
                    content: "bim-view" 
                  },
                  { 
                    opacity: "bg-fg/25", 
                    delay: 0.6, 
                    rotate: "-2deg",
                    content: "ai-dashboard"
                  }
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    className={`absolute inset-4 rounded-3xl ${card.opacity} backdrop-blur-sm border border-fg/20 shadow-2xl overflow-hidden`}
                    style={{ 
                      transform: `rotate(${card.rotate}) translateZ(${i * 20}px)`,
                      zIndex: 3 - i
                    }}
                    initial={{ opacity: 0, y: 50, rotate: 0 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      rotate: parseFloat(card.rotate),
                      transition: {
                        duration: 0.8,
                        delay: card.delay,
                        ease: "easeOut"
                      }
                    }}
                    whileHover={{
                      y: -10,
                      rotate: 0,
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Card content based on type */}
                    <div className="p-6 h-full flex flex-col">
                      
                      {/* 3D Model Card */}
                      {card.content === "3d-model" && (
                        <>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-3 h-3 bg-fg/60 rounded-full" />
                            <span className="text-xs text-fg/80 font-medium">3D VISUALIZATION</span>
                          </div>
                          
                          {/* 3D wireframe representation */}
                          <div className="flex-1 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg className="w-24 h-24 text-fg/40" viewBox="0 0 100 100" fill="none">
                                {/* Wireframe cube */}
                                <path d="M20 30 L50 15 L80 30 L80 60 L50 75 L20 60 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                <path d="M20 30 L20 60" stroke="currentColor" strokeWidth="1.5"/>
                                <path d="M50 15 L50 45" stroke="currentColor" strokeWidth="1.5"/>
                                <path d="M80 30 L80 60" stroke="currentColor" strokeWidth="1.5"/>
                                <path d="M20 45 L50 30 L80 45" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
                                <path d="M35 37.5 L35 52.5" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                                <path d="M65 37.5 L65 52.5" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
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
                            <span className="text-xs text-fg/80 font-medium">BIM SYSTEMS</span>
                          </div>
                          
                          {/* Building floor plan representation */}
                          <div className="flex-1 relative">
                            <div className="absolute inset-0 p-4">
                              <svg className="w-full h-full text-fg/40" viewBox="0 0 120 80" fill="none">
                                {/* Floor plan outline */}
                                <rect x="10" y="15" width="100" height="50" stroke="currentColor" strokeWidth="2" fill="none"/>
                                
                                {/* Interior walls */}
                                <line x1="45" y1="15" x2="45" y2="65" stroke="currentColor" strokeWidth="1.5"/>
                                <line x1="75" y1="15" x2="75" y2="40" stroke="currentColor" strokeWidth="1.5"/>
                                <line x1="10" y1="40" x2="110" y2="40" stroke="currentColor" strokeWidth="1.5"/>
                                
                                {/* Doors */}
                                <path d="M30 15 A8 8 0 0 1 38 23" stroke="currentColor" strokeWidth="1" fill="none"/>
                                <path d="M60 40 A6 6 0 0 1 66 34" stroke="currentColor" strokeWidth="1" fill="none"/>
                                
                                {/* Dimensions */}
                                <text x="52" y="10" className="text-[4px] fill-current opacity-60">12.5m</text>
                                <text x="5" y="42" className="text-[4px] fill-current opacity-60">8m</text>
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
                            <span className="text-xs text-fg/80 font-medium">AI SYSTEMS</span>
                          </div>
                          
                          {/* AI dashboard representation */}
                          <div className="flex-1 space-y-3">
                            {/* Chart area */}
                            <div className="h-16 relative">
                              <svg className="w-full h-full text-fg/40" viewBox="0 0 100 40" fill="none">
                                <path d="M5 35 L25 25 L45 15 L65 20 L85 10" stroke="currentColor" strokeWidth="2" fill="none"/>
                                <circle cx="25" cy="25" r="2" fill="currentColor" opacity="0.6"/>
                                <circle cx="45" cy="15" r="2" fill="currentColor" opacity="0.6"/>
                                <circle cx="65" cy="20" r="2" fill="currentColor" opacity="0.6"/>
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

                {/* Floating elements representing your tech stack */}
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 bg-fg/20 rounded-full shadow-lg border border-fg/30 flex items-center justify-center"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg className="w-8 h-8 text-fg/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.78 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z" />
                  </svg>
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-fg/15 rounded-full shadow-lg border border-fg/25 flex items-center justify-center"
                  animate={{
                    y: [0, 15, 0],
                    x: [0, 10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg className="w-6 h-6 text-fg/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </motion.div>
              </div> {/* closes .relative h-96 */}
            </motion.div> {/* closes heroMedia */}
            
          </div>
        </Container>
      </section>

      {/* KPI STRIP: denser, in a band */}
      <section className="py-10">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {[
              { k: "100+", v: "3D assets delivered" },
              { k: "5+ yrs", v: "combined team experience" },
              { k: "Multi-sector", v: "real estate → heritage" },
              { k: "Global", v: "HQ Addis Ababa" },
            ].map((m, i) => (
              <motion.div 
                key={m.v} 
                ref={setAt<HTMLDivElement>(kpiRefs, i)} 
                className="rounded-xl border border-fg/10 p-5"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="text-2xl font-semibold">{m.k}</div>
                <div className="mt-1 text-sm text-fg/70">{m.v}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <div className="divider" />
      {/* WHO WE ARE — distinct from hero */}
      <section className="relative border-y border-fg/10 bg-muted-1/30 py-20 overflow-hidden">
        {/* Dynamic background elements */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full border border-fg animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full border border-fg animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-fg/[0.015] to-transparent" />
        
        <Container>
          <motion.div 
            className="max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
{/* Header — simple, engineering-forward */}
<motion.div className="text-center mb-16" variants={fadeInUp}>
  {/* Eyebrow (keep) */}
  <div className="mb-4 flex items-center justify-center gap-3">
    <span className="h-px w-8 bg-fg/40" />
    <span className="text-[13px] tracking-[0.22em] uppercase text-fg/70">Who We Are</span>
    <span className="h-px w-8 bg-fg/40" />
  </div>

  <h2 className="heading text-4xl md:text-5xl mb-6">
    Engineers shaping digital transformation
  </h2>
  <p className="text-xl md:text-2xl text-fg/70 max-w-3xl mx-auto leading-relaxed font-light">
  Based in Addis Ababa and serving a global clientele, we combine engineering precision
  with innovative thinking to deliver BIM, AI, and intelligent system solutions that
  stand the test of time.
  </p>
</motion.div>

{/* INTERACTIVE IDENTITY CARDS */}
<motion.div
  className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16"
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-10%" }}
>
  {[
    {
      title: "Engineering Precision",
      description: "Accuracy, reliability, and maintainability guide every decision."
    },
    {
      title: "Practical Innovation",
      description: "We apply BIM, AI, and automation where they deliver measurable value."
    },
    {
      title: "Collaborative by Default",
      description: "Rooted in Ethiopia, working globally with transparent delivery."
    }
  ].map((card) => (
    <motion.div
      key={card.title}
      variants={fadeInUp}
      transition={{ duration: 0.35 }}
      className="group relative"
    >
      {/* card shell */}
      <div
        onMouseMove={onCardMove}
        onMouseLeave={onCardLeave}
        className={[
          "relative rounded-2xl border border-fg/15 bg-bg/70 backdrop-blur-sm shadow-sm",
          "transition-[transform,box-shadow,border-color] duration-300 will-change-transform",
          "hover:shadow-lg hover:border-fg/30",
        ].join(" ")}
        style={{
          transform: "perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
        }}
      >
        {/* subtle spotlight that follows cursor */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background:
              "radial-gradient(240px circle at var(--px,-9999px) var(--py,-9999px), rgba(255,255,255,0.06), transparent 40%)",
          }}
        />

        {/* animated accent line at the top */}
        <span
          aria-hidden
          className="absolute left-0 right-0 top-0 h-px overflow-hidden rounded-t-2xl"
        >
          <span className="absolute inset-0 w-[140%] -left-1/5 h-px opacity-60"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, currentColor, transparent)",
                  transform: "translateX(0)",
                  animation: "slide-accent 3.2s linear infinite",
                }}
          />
        </span>

        {/* content */}
        <div className="relative p-6">
          <h3 className="text-base font-semibold mb-2 tracking-tight">
            {card.title}
          </h3>
          <p className="text-sm text-fg/80 leading-relaxed">
            {card.description}
          </p>
        </div>
      </div>
    </motion.div>
  ))}
</motion.div>




            {/* Scroll-Interactive Timeline */}
            <motion.div 
              className="relative mb-16"
              variants={fadeInUp}
            >
              <div className="text-center mb-10">
                <h3 className="text-2xl font-semibold mb-3">Our Evolution</h3>
                <p className="text-fg/70">From immersive experiences to intelligent automation</p>
              </div>

              <div className="relative min-h-[600px]" ref={heroRef}>
                {/* Scroll-reactive timeline line */}
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-px top-0 w-px bg-gradient-to-b from-fg/10 via-fg/40 to-fg/10"
                  style={{
                    height: useTransform(
                      useScroll({ target: heroRef, offset: ["start end", "end start"] }).scrollYProgress,
                      [0, 1],
                      ["20%", "100%"]
                    )
                  }}
                />
                
                <div className="space-y-12">
                  {[
                    {
                      period: "2019 - Foundation",
                      title: "VR/AR Innovation Begins",
                      content: "Started with cutting-edge VR and AR solutions, establishing our foundation in immersive digital experiences and interactive content creation.",
                      side: "left",
                      highlight: "VR/AR Focus",
                      progress: 0.2
                    },
                    {
                      period: "2020-2022 - Expansion",
                      title: "BIM Integration", 
                      content: "Expanded into Building Information Modeling, combining our visual expertise with precise construction workflows and data-rich modeling.",
                      side: "right",
                      highlight: "BIM Systems",
                      progress: 0.5
                    },
                    {
                      period: "2023-Present - Intelligence",
                      title: "AI & Automation Era",
                      content: "Leading with AI-driven automation, predictive analytics, and intelligent systems while offering specialized outsourcing services to global clients.",
                      side: "left",
                      highlight: "AI-Powered",
                      progress: 0.8
                    }
                  ].map((item, i) => {
                    const timelineRef = useRef<HTMLDivElement>(null);
                    const { scrollYProgress } = useScroll({
                      target: timelineRef,
                      offset: ["start 80%", "end 20%"]
                    });
                    
                    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.05, 0.95]);
                    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.6]);
                    const nodeScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.2, 0.8]);
                    
                    return (
                      <motion.div 
                        key={item.period}
                        ref={timelineRef}
                        className={`relative flex items-center ${item.side === 'right' ? 'flex-row-reverse' : ''}`}
                        style={{ scale, opacity }}
                      >
                        {/* Interactive timeline node */}
                        <motion.div 
                          className="absolute left-1/2 transform -translate-x-1/2 z-10"
                          style={{ scale: nodeScale }}
                        >
                          <div className="w-6 h-6 rounded-full border-2 border-fg/30 bg-bg relative">
                            <motion.div 
                              className="absolute inset-1 rounded-full bg-fg"
                              style={{
                                opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.6])
                              }}
                            />
                            {/* Pulse effect */}
                            <motion.div 
                              className="absolute -inset-2 rounded-full border border-fg/20"
                              style={{
                                scale: useTransform(scrollYProgress, [0.4, 0.6], [1, 1.5]),
                                opacity: useTransform(scrollYProgress, [0.4, 0.6], [0.5, 0])
                              }}
                            />
                          </div>
                        </motion.div>

                        {/* Content card with scroll interactions */}
                        <motion.div 
                          className={`w-5/12 p-6 rounded-2xl border border-fg/10 bg-bg/60 backdrop-blur-sm group hover:border-fg/30 hover:bg-bg/80 transition-all duration-300 ${item.side === 'right' ? 'ml-auto' : 'mr-auto'}`}
                          whileHover={{ 
                            y: -5,
                            transition: { duration: 0.2 } 
                          }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-medium text-fg/60 tracking-wide">{item.period}</span>
                            <motion.span 
                              className="text-xs px-2 py-1 rounded-full bg-fg/10 text-fg/70"
                              style={{
                                backgroundColor: useTransform(scrollYProgress, [0.3, 0.7], ["rgba(var(--color-fg-rgb), 0.1)", "rgba(var(--color-fg-rgb), 0.2)"])
                              }}
                            >
                              {item.highlight}
                            </motion.span>
                          </div>
                          <h4 className="text-lg font-semibold mb-2 group-hover:text-fg transition-colors">{item.title}</h4>
                          <p className="text-sm text-fg/70 leading-relaxed group-hover:text-fg/90 transition-colors">{item.content}</p>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Mission statement */}
            <motion.div 
              className="relative p-8 rounded-3xl border border-fg/10 bg-gradient-to-br from-fg/5 to-transparent backdrop-blur-sm text-center"
              variants={fadeInUp}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-fg/5 to-transparent opacity-50" />
              <div className="relative">
                <blockquote className="text-lg md:text-xl font-light text-fg/90 leading-relaxed italic mb-6">
                  "We don't just deliver services—we forge partnerships to create intelligent solutions that transform how you work, 
                  build, and innovate in the digital landscape."
                </blockquote>
                <div className="flex justify-center gap-4">
                  <NavLink 
                    to="/about" 
                    className="px-6 py-3 rounded-full border border-fg/20 text-sm hover:border-fg hover:bg-fg/5 transition-all duration-300"
                  >
                    Learn More About Us
                  </NavLink>
                  <NavLink 
                    to="/contact" 
                    className="px-6 py-3 rounded-full bg-fg text-bg text-sm hover:bg-fg/90 hover:shadow-lg transition-all duration-300"
                  >
                    Start Your Journey
                  </NavLink>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>


             {/* SOLUTIONS: alternating bg, more visual cards */}
       <section className="border-b border-fg/10 bg-muted-1/50 py-14">
         <Container>
           <motion.div 
             className="mb-6 flex items-end justify-between gap-4"
             variants={fadeInUp}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-10%" }}
           >
             <h2 className="heading text-2xl">Solutions Overview</h2>
             <NavLink to="/solutions" className="text-sm underline">View All</NavLink>
           </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Immersive 3D", desc: "Custom 3D models, interactive VR/AR, photogrammetry." },
              { title: "Intelligent Building Systems", desc: "BIM authoring, AI-powered automation, facility tools." },
              { title: "Outsourcing & Custom AI", desc: "BIM outsourcing, dedicated teams, bespoke AI." },
            ].map((c, i) => (
              <motion.div 
                key={c.title} 
                ref={setAt<HTMLDivElement>(solutionRefs, i)} 
                className="card overflow-hidden rounded-2xl border border-fg/10 bg-bg"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="aspect-[16/10] bg-muted-2" />
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm text-fg/70">{c.desc}</p>
                  <NavLink to="/solutions" className="mt-4 inline-block text-sm underline">Learn more</NavLink>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

             {/* PROJECTS: tighter grid, visual-first */}
       <section className="py-14">
         <Container>
           <motion.h2 
             className="heading mb-6 text-2xl"
             variants={fadeInUp}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-10%" }}
           >
             Featured Projects
           </motion.h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { title: "Immersive Customizer", desc: "Interactive finishes for real estate & warehouses." },
              { title: "Aerial Photogrammetry", desc: "Drone-to-3D for construction & heritage." },
              { title: "Interactive Visuals", desc: "Motion replication with real-time viewer movement." },
              { title: "AR Scavenger Hunt Gadget", desc: "Location-aware, gamified AR experiences." },
            ].map((p, i) => (
              <motion.article 
                key={p.title} 
                ref={setAt<HTMLDivElement>(projectRefs, i)} 
                className="card overflow-hidden rounded-2xl border border-fg/10"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="aspect-[16/9] bg-muted-2" />
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-fg/70">{p.desc}</p>
                  <NavLink to="/projects" className="mt-4 inline-block text-sm underline">View details</NavLink>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

             {/* LOGOS: marquee-style to remove dead space */}
       <section className="border-y border-fg/10 bg-muted-1 py-10">
         <Container>
           <motion.h2 
             className="mb-4 text-center text-xs uppercase tracking-widest text-fg/60"
             variants={fadeInUp}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-10%" }}
           >
             Partners & collaborators
           </motion.h2>
          <div className="overflow-hidden">
            <div className="flex animate-[marquee_24s_linear_infinite] gap-10">
              {Array.from({ length: 14 }).map((_, i) => (
                <motion.div 
                  key={i} 
                  ref={setAt<HTMLDivElement>(logoRefs, i)} 
                  className="h-10 w-28 shrink-0 rounded bg-muted-2"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.5, delay: i * 0.02 }}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

             {/* TESTIMONIALS: compact three-up */}
       <section className="py-14">
         <Container>
           <motion.h2 
             className="heading mb-6 text-2xl"
             variants={fadeInUp}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-10%" }}
           >
             Testimonials
           </motion.h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { q: "Their immersive solution changed how we present projects — polished and reliable.", a: "Industry Partner" },
              { q: "They collaborate closely and deliver with precision. Strong technical depth.", a: "Technology Consultant" },
              { q: "Quality execution from concept to hand-off. Clear communication throughout.", a: "Project Coordinator" },
            ].map((t, i) => (
              <motion.blockquote 
                key={i} 
                ref={setAt<HTMLQuoteElement>(testimonialRefs, i)} 
                className="rounded-2xl border border-fg/10 bg-bg p-6"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <p className="text-sm leading-relaxed">"{t.q}"</p>
                <footer className="mt-4 text-xs text-fg/60">— {t.a}</footer>
              </motion.blockquote>
            ))}
          </div>
        </Container>
      </section>

      {/* FINAL CTA: denser and centered */}
      <section className="pb-16 pt-4">
        <Container>
          <motion.div 
            ref={ctaRef} 
            className="rounded-2xl border border-fg/10 p-8 text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h3 className="heading text-xl">Ready to build the future together?</h3>
            <p className="mt-2 text-fg/70">Start a conversation and explore what's possible with VisionLab.</p>
            <NavLink to="/contact" className="mt-5 inline-block rounded-full bg-fg px-5 py-3 text-sm text-bg hover:opacity-90">
              Schedule a Consultation
            </NavLink>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}

/* CSS for marquee animation (add to index.css if you like it)
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
*/
