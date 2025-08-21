import { useEffect, useRef, useState } from "react";
import Container from "../Container";
import { motion, useAnimation, useInView, useReducedMotion, MotionConfig } from "framer-motion";
import { NavLink } from "react-router-dom";

// Small utility: detect mobile by viewport width
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile('matches' in e ? e.matches : (e as MediaQueryList).matches);
    // init & subscribe
    onChange(mql);
    mql.addEventListener?.("change", onChange as (ev: Event) => void);
    return () => mql.removeEventListener?.("change", onChange as (ev: Event) => void);
  }, [breakpoint]);
  return isMobile;
}

const HomeSolutions = () => {
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();
  const reduceMotion = isMobile || prefersReduced; // keep desktop intact, but tame on mobile

  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { amount: 0.3, margin: "0px 0px -10% 0px" });
  const controls = useAnimation();

  // kick animations only when visible
  useEffect(() => {
    if (inView && !reduceMotion) controls.start("loop");
    else controls.stop();
  }, [inView, controls, reduceMotion]);

  // Variants tuned for mobile vs desktop
  const staggerContainer = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
          },
        },
      };

  const fadeInUp = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" as const },
        },
      };

  // pointer-based 3D tilt — disabled on mobile to avoid jank
  const onCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const midX = r.width / 2;
    const midY = r.height / 2;
    const rx = ((y - midY) / midY) * 6; // max ~6deg
    const ry = ((midX - x) / midX) * 8; // max ~8deg
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--px", `${x}px`);
    el.style.setProperty("--py", `${y}px`);
  };

  const onCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const el = e.currentTarget;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
    el.style.setProperty("--px", `-9999px`);
    el.style.setProperty("--py", `-9999px`);
  };

  function setAt<T extends HTMLElement>(arr: React.MutableRefObject<T[]>, index: number) {
    return (el: T | null): void => {
      if (el) arr.current[index] = el;
    };
  }

  const solutionRefs = useRef<HTMLDivElement[]>([]);

  return (
    // Smooth programmatic/anchor scrolling on mobile, keep desktop intact
    <MotionConfig reducedMotion={reduceMotion ? "always" : "never"}>
      <section
        className="relative border-b border-fg/10 bg-muted-1/50 py-20 overflow-hidden scroll-smooth md:scroll-auto"
      >
        {/* Dynamic background elements — disabled on mobile to prevent scroll jank */}
        {!reduceMotion && (
          <div className="absolute inset-0 opacity-[0.02] will-change-transform">
            <motion.div
              className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full border border-fg"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full border border-fg"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </div>
        )}

        {/* Lighter gradient/grid on mobile (filters like backdrop-blur can be heavy) */}
        <div className="absolute inset-0 bg-gradient-to-br from-fg/[0.015] via-transparent to-fg/[0.03]" />
        <div className="absolute inset-0 [background-image:linear-gradient(var(--color-fg)_1px,transparent_1px),linear-gradient(90deg,var(--color-fg)_1px,transparent_1px)] [background-size:96px_96px] opacity-[0.015]" />

        <Container>
          <motion.div
            className="max-w-7xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            {/* Header Section */}
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <div className="mb-6 flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-fg/40" />
                <span className="text-[13px] tracking-[0.25em] uppercase text-fg/70">what we do</span>
                <span className="h-px w-12 bg-fg/40" />
              </div>

              <h2 className="heading text-4xl md:text-5xl mb-6">Our Core Service Offerings</h2>
              <p className="text-xl md:text-2xl text-fg/70 max-w-4xl mx-auto leading-relaxed font-light">
                Immersive experiences, intelligent systems, and custom solutions each engineered to transform how you build, visualize, and automate.
              </p>
            </motion.div>

            {/* Main Solution Cards */}
            <motion.div className="grid gap-12 lg:gap-16 mb-16" variants={staggerContainer}>
              {[
                {
                  id: "immersive",
                  title: "Immersive 3D Experiences",
                  subtitle: "Visual Reality Engineering",
                  desc: "Transform static concepts into interactive experiences. From photorealistic architectural visualizations to hands-on VR training environments, we create immersive solutions that engage users and drive decision-making.",
                  highlights: ["Custom 3D Modeling", "VR/AR Applications", "Photogrammetry", "Interactive Configurators"],
                  visual: "3d-modeling",
                },
                {
                  id: "intelligent",
                  title: "Intelligent Building Systems",
                  subtitle: "Smart Infrastructure Solutions",
                  desc: "Beyond traditional BIM—we engineer intelligent systems that predict, optimize, and automate. AI-powered workflows that transform building data into operational intelligence, reducing costs and improving outcomes.",
                  highlights: ["Advanced BIM", "AI Automation", "Predictive Analytics", "Smart Facilities"],
                  visual: "bim-coordination",
                },
                {
                  id: "custom",
                  title: "Custom Solutions & Teams",
                  subtitle: "Tailored Partnership",
                  desc: "When standard solutions aren't enough, we build what you need. Dedicated teams, custom AI development, and specialized outsourcing services that seamlessly integrate with your workflow and scale with your business.",
                  highlights: ["Dedicated Teams", "Custom Development", "Technical Consulting", "Outsourcing Services"],
                  visual: "team-collaboration",
                },
              ].map((solution, i) => (
                <motion.div
                  key={solution.id}
                  ref={setAt<HTMLDivElement>(solutionRefs, i)}
                  className={`grid gap-8 lg:gap-12 lg:grid-cols-12 items-center ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
                  variants={fadeInUp}
                  transition={!reduceMotion ? { duration: 0.8, ease: "easeOut", delay: i * 0.15 } : undefined}
                >
                  {/* Content Side */}
                  <div className={`lg:col-span-7 space-y-6 ${i % 2 === 1 ? "lg:col-start-6" : ""}`}>
                    {/* Header */}
                    <div>
                      <motion.div
                        className="inline-block px-3 py-1 rounded-full bg-fg/10 text-xs font-medium text-fg/70 mb-4"
                        whileHover={!reduceMotion ? { scale: 1.05 } : undefined}
                      >
                        {solution.subtitle}
                      </motion.div>
                      <h3 className="heading text-3xl md:text-4xl mb-4 leading-tight">{solution.title}</h3>
                      <p className="text-lg text-fg/80 leading-relaxed">{solution.desc}</p>
                    </div>

                    {/* Key Highlights */}
                    <div className="flex flex-wrap gap-3">
                      {solution.highlights.map((highlight, idx) => (
                        <motion.span
                          key={highlight}
                          className="px-4 py-2 text-sm font-medium bg-fg/10 text-fg/70 rounded-full border border-fg/15 hover:bg-fg/15 hover:border-fg/25 transition-all duration-300"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ delay: i * 0.1 + idx * 0.05 }}
                          viewport={{ once: true }}
                        >
                          {highlight}
                        </motion.span>
                      ))}
                    </div>

                    {/* CTA */}
                    <motion.div className="flex gap-4 pt-4">
                      <NavLink
                        to="/solutions"
                        className="relative z-10 group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-fg text-bg font-medium hover:bg-fg/90 transition-all duration-300"
                      >
                        Learn More
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </NavLink>
                      <NavLink
                        to="/projects"
                        className="relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-fg/20 text-fg hover:border-fg/40 hover:bg-fg/5 transition-all duration-300"
                      >
                        See Examples
                      </NavLink>
                    </motion.div>
                  </div>

                  {/* Visual Side - Representing Actual Work */}
                  <motion.div
                    className={`lg:col-span-5 relative ${i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}
                    whileHover={!reduceMotion ? { scale: 1.02 } : undefined}
                    transition={!reduceMotion ? { duration: 0.3 } : undefined}
                  >
                    <div
                      onMouseMove={onCardMove}
                      onMouseLeave={onCardLeave}
                      className={`group relative aspect-square rounded-3xl border border-fg/15 bg-gradient-to-br from-fg/5 to-fg/10 overflow-hidden transition-all duration-500 ${
                        reduceMotion ? "" : "hover:shadow-2xl hover:shadow-fg/10"
                      }`}
                      style={{
                        transform: "perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
                        willChange: "transform",
                      }}
                    >
                      {/* Interactive spotlight (desktop only) */}
                      {!reduceMotion && (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background:
                              "radial-gradient(300px circle at var(--px,-9999px) var(--py,-9999px), rgba(255,255,255,0.06), transparent 40%)",
                          }}
                        />
                      )}

                      {/* Realistic Work Representations */}
                      <div className="absolute inset-0 flex items-center justify-center p-8">
                        {solution.visual === "3d-modeling" && (
                          <div className="relative w-full h-full">
                            {/* 3D Modeling Interface Mockup */}
                            <svg className="w-full h-full text-fg/30" viewBox="0 0 240 240" fill="none">
                              {/* Viewport frame */}
                              <rect x="20" y="30" width="200" height="150" stroke="currentColor" strokeWidth="2" rx="8" fill="none" />
                              {/* Toolbar */}
                              <rect x="20" y="30" width="200" height="20" fill="currentColor" opacity="0.1" />
                              <circle cx="35" cy="40" r="3" fill="currentColor" opacity="0.4" />
                              <circle cx="45" cy="40" r="3" fill="currentColor" opacity="0.4" />
                              <circle cx="55" cy="40" r="3" fill="currentColor" opacity="0.4" />
                              {/* 3D Model - Building */}
                              {!reduceMotion ? (
                                <motion.g
                                  animate={{ rotateY: [0, 15, 0, -15, 0] }}
                                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                  style={{ transformOrigin: "120px 105px" }}
                                >
                                  <path d="M80 120 L120 90 L160 120 L160 160 L80 160 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1" />
                                  <path d="M120 90 L120 130" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                                  <path d="M80 120 L160 120" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                                  <path d="M100 140 L140 140" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                                  <rect x="90" y="125" width="8" height="8" fill="currentColor" opacity="0.3" />
                                  <rect x="105" y="125" width="8" height="8" fill="currentColor" opacity="0.3" />
                                  <rect x="127" y="125" width="8" height="8" fill="currentColor" opacity="0.3" />
                                  <rect x="142" y="125" width="8" height="8" fill="currentColor" opacity="0.3" />
                                </motion.g>
                              ) : (
                                <g>
                                  <path d="M80 120 L120 90 L160 120 L160 160 L80 160 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1" />
                                  <path d="M120 90 L120 130" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                                  <path d="M80 120 L160 120" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                                  <path d="M100 140 L140 140" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                                  <rect x="90" y="125" width="8" height="8" fill="currentColor" opacity="0.3" />
                                  <rect x="105" y="125" width="8" height="8" fill="currentColor" opacity="0.3" />
                                  <rect x="127" y="125" width="8" height="8" fill="currentColor" opacity="0.3" />
                                  <rect x="142" y="125" width="8" height="8" fill="currentColor" opacity="0.3" />
                                </g>
                              )}
                              {/* Tool palette */}
                              <rect x="30" y="190" width="180" height="30" stroke="currentColor" strokeWidth="1" rx="4" fill="currentColor" opacity="0.05" />
                              <rect x="40" y="195" width="20" height="20" stroke="currentColor" strokeWidth="1" rx="2" fill="currentColor" opacity="0.15" />
                              <rect x="70" y="195" width="20" height="20" stroke="currentColor" strokeWidth="1" rx="2" fill="none" />
                              <rect x="100" y="195" width="20" height="20" stroke="currentColor" strokeWidth="1" rx="2" fill="none" />
                              {/* VR/AR indicator */}
                              {!reduceMotion && (
                                <motion.g animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}>
                                  <circle cx="200" cy="45" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                  <text x="200" y="49" textAnchor="middle" className="text-[8px] fill-current">VR</text>
                                </motion.g>
                              )}
                            </svg>
                          </div>
                        )}

                        {solution.visual === "bim-coordination" && (
                          <div className="relative w-full h-full">
                            <svg className="w-full h-full text-fg/30" viewBox="0 0 240 240" fill="none">
                              <rect x="20" y="20" width="200" height="200" stroke="currentColor" strokeWidth="2" rx="12" fill="none" />
                              <rect x="20" y="20" width="200" height="30" fill="currentColor" opacity="0.08" rx="12" />
                              <text x="30" y="38" className="text-[10px] fill-current opacity-60">BIM Coordination Dashboard</text>
                              <g transform="translate(40, 60)">
                                <rect x="0" y="0" width="80" height="60" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                <line x1="25" y1="0" x2="25" y2="60" stroke="currentColor" strokeWidth="1" />
                                <line x1="55" y1="0" x2="55" y2="35" stroke="currentColor" strokeWidth="1" />
                                <line x1="0" y1="35" x2="80" y2="35" stroke="currentColor" strokeWidth="1" />
                                {/* Minimal live indicators on desktop only */}
                                {!reduceMotion && (
                                  <>
                                    <motion.circle cx="12" cy="15" r="2" fill="currentColor" opacity="0.6" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }} />
                                    <motion.circle cx="42" cy="15" r="2" fill="currentColor" opacity="0.6" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
                                    <motion.circle cx="67" cy="15" r="2" fill="currentColor" opacity="0.6" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} />
                                    <motion.rect x="10" y="45" width="4" height="4" fill="currentColor" opacity="0.7" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }} />
                                    <motion.rect x="40" y="45" width="4" height="4" fill="currentColor" opacity="0.7" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} />
                                    <motion.circle cx="65" cy="45" r="3" stroke="currentColor" strokeWidth="1" fill="none" animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                                  </>
                                )}
                              </g>
                              <g transform="translate(140, 60)">
                                <rect x="0" y="0" width="60" height="8" stroke="currentColor" strokeWidth="1" rx="4" fill="none" />
                                {!reduceMotion && (
                                  <motion.rect x="2" y="2" width="30" height="4" rx="2" fill="currentColor" opacity="0.6" animate={{ width: [30, 45, 30] }} transition={{ duration: 4, repeat: Infinity }} />
                                )}
                                <rect x="0" y="15" width="60" height="8" stroke="currentColor" strokeWidth="1" rx="4" fill="none" />
                                {!reduceMotion && (
                                  <motion.rect x="2" y="17" width="40" height="4" rx="2" fill="currentColor" opacity="0.6" animate={{ width: [40, 52, 40] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
                                )}
                                <rect x="0" y="30" width="60" height="8" stroke="currentColor" strokeWidth="1" rx="4" fill="none" />
                                {!reduceMotion && (
                                  <motion.rect x="2" y="32" width="35" height="4" rx="2" fill="currentColor" opacity="0.6" animate={{ width: [35, 50, 35] }} transition={{ duration: 3.5, repeat: Infinity, delay: 2 }} />
                                )}
                                <text x="0" y="55" className="text-[8px] fill-current opacity-60">Model Status</text>
                                {!reduceMotion && (
                                  <motion.circle cx="50" cy="52" r="2" fill="currentColor" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                                )}
                              </g>
                              {!reduceMotion && (
                                <g transform="translate(190, 190)">
                                  <motion.circle cx="0" cy="0" r="12" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.1" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }} />
                                  <text x="0" y="2" textAnchor="middle" className="text-[8px] fill-current">AI</text>
                                </g>
                              )}
                            </svg>
                          </div>
                        )}

                        {solution.visual === "team-collaboration" && (
                          <div className="relative w-full h-full">
                            <svg className="w-full h-full text-fg/30" viewBox="0 0 240 240" fill="none">
                              <rect x="20" y="20" width="200" height="200" stroke="currentColor" strokeWidth="2" rx="12" fill="none" />
                              <rect x="20" y="20" width="200" height="25" fill="currentColor" opacity="0.08" rx="12" />
                              <text x="30" y="37" className="text-[9px] fill-current opacity-60">Collaborative Workspace</text>
                              <g transform="translate(40, 60)">
                                <line x1="0" y1="0" x2="160" y2="0" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                                {[{ x: 0, label: "Discovery", status: "complete" }, { x: 55, label: "Design", status: "active" }, { x: 110, label: "Development", status: "pending" }, { x: 160, label: "Delivery", status: "pending" }].map((milestone, idx) => (
                                  <g key={idx} transform={`translate(${milestone.x}, 0)`}>
                                    {!reduceMotion ? (
                                      <motion.circle cx="0" cy="0" r="4" fill="currentColor" opacity={milestone.status === "complete" ? 0.8 : milestone.status === "active" ? 0.9 : 0.3} animate={milestone.status === "active" ? { scale: [1, 1.2, 1], opacity: [0.9, 1, 0.9] } : {}} transition={{ duration: 2, repeat: Infinity }} />
                                    ) : (
                                      <circle cx="0" cy="0" r="4" fill="currentColor" opacity={milestone.status === "complete" ? 0.8 : milestone.status === "active" ? 0.9 : 0.3} />
                                    )}
                                    <text x="0" y="20" textAnchor="middle" className="text-[8px] fill-current opacity-60">{milestone.label}</text>
                                  </g>
                                ))}
                              </g>
                              <g transform="translate(30, 100)">
                                <rect x="0" y="0" width="80" height="50" stroke="currentColor" strokeWidth="1" rx="4" fill="currentColor" opacity="0.05" />
                                <text x="5" y="12" className="text-[8px] fill-current opacity-60">Development</text>
                                {!reduceMotion ? (
                                  <>
                                    <motion.rect x="5" y="18" width="35" height="2" fill="currentColor" opacity="0.4" animate={{ width: [35, 50, 35] }} transition={{ duration: 3, repeat: Infinity }} />
                                    <motion.rect x="5" y="25" width="25" height="2" fill="currentColor" opacity="0.4" animate={{ width: [25, 40, 25] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} />
                                    <motion.rect x="5" y="32" width="45" height="2" fill="currentColor" opacity="0.4" animate={{ width: [45, 60, 45] }} transition={{ duration: 3.5, repeat: Infinity, delay: 1 }} />
                                  </>
                                ) : (
                                  <>
                                    <rect x="5" y="18" width="50" height="2" fill="currentColor" opacity="0.25" />
                                    <rect x="5" y="25" width="40" height="2" fill="currentColor" opacity="0.25" />
                                    <rect x="5" y="32" width="60" height="2" fill="currentColor" opacity="0.25" />
                                  </>
                                )}
                                <rect x="100" y="0" width="80" height="50" stroke="currentColor" strokeWidth="1" rx="4" fill="currentColor" opacity="0.05" />
                                <text x="105" y="12" className="text-[8px] fill-current opacity-60">Design Review</text>
                                {!reduceMotion ? (
                                  <>
                                    <motion.rect x="110" y="20" width="15" height="10" stroke="currentColor" strokeWidth="1" fill="none" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2, repeat: Infinity }} />
                                    <motion.circle cx="145" cy="25" r="5" stroke="currentColor" strokeWidth="1" fill="none" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2.2, repeat: Infinity, delay: 0.3 }} />
                                    <motion.path d="M155 20 L165 25 L155 30" stroke="currentColor" strokeWidth="1" fill="none" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }} />
                                  </>
                                ) : (
                                  <>
                                    <rect x="110" y="20" width="15" height="10" stroke="currentColor" strokeWidth="1" fill="none" opacity={0.4} />
                                    <circle cx="145" cy="25" r="5" stroke="currentColor" strokeWidth="1" fill="none" opacity={0.4} />
                                    <path d="M155 20 L165 25 L155 30" stroke="currentColor" strokeWidth="1" fill="none" opacity={0.4} />
                                  </>
                                )}
                              </g>
                              <g transform="translate(40, 170)">
                                <text x="0" y="0" className="text-[8px] fill-current opacity-60">Live Collaboration</text>
                                {[0, 1, 2].map((i) => (
                                  !reduceMotion ? (
                                    <motion.circle key={i} cx={i * 15} cy={15} r="3" fill="currentColor" opacity="0.5" animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
                                  ) : (
                                    <circle key={i} cx={i * 15} cy={15} r="3" fill="currentColor" opacity="0.35" />
                                  )
                                ))}
                              </g>
                              {!reduceMotion && (
                                <g transform="translate(190, 190)">
                                  <motion.rect x="-10" y="-8" width="20" height="16" rx="8" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.1" animate={{ opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 3, repeat: Infinity }} />
                                  <text x="0" y="2" textAnchor="middle" className="text-[7px] fill-current">CUSTOM</text>
                                </g>
                              )}
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Solution number badge */}
                      <div className="absolute top-6 left-6">
                        {!reduceMotion ? (
                          <motion.div className="w-12 h-12 rounded-full bg-fg/10 border border-fg/20 flex items-center justify-center font-semibold text-lg" animate={{ rotate: [0, 5, 0, -5, 0] }} transition={{ duration: 6, repeat: Infinity }}>
                            {i + 1}
                          </motion.div>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-fg/10 border border-fg/20 flex items-center justify-center font-semibold text-lg">{i + 1}</div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Process Overview */}
            <motion.div className={`relative mb-3 p-8 rounded-3xl border border-fg/10 bg-gradient-to-br from-fg/[0.02] to-fg/[0.05] ${reduceMotion ? "" : "backdrop-blur-sm"}`} variants={fadeInUp}>
              <div className="text-center mb-12">
                <h3 className="heading text-3xl mb-4">Our Delivery Process</h3>
                <p className="text-fg/70 max-w-3xl mx-auto">From initial consultation to final deployment, our structured approach ensures predictable outcomes and exceptional quality at every stage.</p>
              </div>

              <div className="grid gap-6 md:grid-cols-4">
              {[
                  { phase: "Discovery", desc: "Deep-dive analysis of requirements, constraints, and success metrics" },
                  { phase: "Architecture", desc: "Technical design and solution blueprint with detailed specifications" },
                  { phase: "Development", desc: "Agile implementation with continuous testing and client feedback loops" },
                  { phase: "Delivery", desc: "Seamless deployment, training, and ongoing support for sustained success" }
                ].map((step, idx) => (
                  <motion.div
                    key={step.phase}
                    className="relative p-6 rounded-2xl bg-bg/50 border border-fg/10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-fg/15 flex items-center justify-center text-sm font-semibold">{idx + 1}</div>
                      <h4 className="font-semibold">{step.phase}</h4>
                    </div>
                    <p className="text-sm text-fg/70">{step.desc}</p>
                    {idx < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-fg/20" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </MotionConfig>
  );
};

export default HomeSolutions;
