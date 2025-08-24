import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  type Variants,
  type Transition,
} from "framer-motion";

// tuple stays a tuple (not widened to number[])
const EASE: Transition["ease"] = [0.22, 1, 0.36, 1] as const;


const HomeProjects = () => {
  const projectRefs = useRef<HTMLDivElement[]>([]);
  const sizesRef = useRef<Array<{ w: number; h: number }>>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [canHover, setCanHover] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Auto-cycle through projects on desktop
  useEffect(() => {
    if (prefersReducedMotion || !canHover) return;
    const interval = setInterval(() => {
      setActiveProject(prev => (prev + 1) % projects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion, canHover]);

  // rAF throttle for pointer tracking
  const frameRef = useRef<number | null>(null);
  const lastEventRef = useRef<{ x: number; y: number; i: number } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const set = () => setCanHover(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);

  const schedule = () => {
    if (frameRef.current != null || !canHover) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      const evt = lastEventRef.current;
      if (!evt) return;
      const { x, y, i } = evt;
      const size = sizesRef.current[i];
      const el = projectRefs.current[i];
      if (!size || !el) return;
      const midX = size.w / 2;
      const midY = size.h / 2;
      const rx = ((y - midY) / midY) * 4;
      const ry = ((midX - x) / midX) * 6;
      el.style.setProperty("--rx", `${rx}deg`);
      el.style.setProperty("--ry", `${ry}deg`);
      el.style.setProperty("--px", `${x}px`);
      el.style.setProperty("--py", `${y}px`);
    });
  };

  const onCardEnter = (i: number) => {
    if (!canHover) return;
    const el = projectRefs.current[i];
    if (!el) return;
    const r = el.getBoundingClientRect();
    sizesRef.current[i] = { w: r.width, h: r.height };
    setHoveredIndex(i);
    setActiveProject(i);
  };

  const onCardMove = (e: React.MouseEvent<HTMLElement>, index: number) => {
    if (!canHover) return;
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    sizesRef.current[index] = { w: r.width, h: r.height };
    lastEventRef.current = { x, y, i: index };
    schedule();
  };

  const onCardLeave = (e: React.MouseEvent<HTMLElement>, index: number) => {
    if (!canHover) return;
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
    el.style.setProperty("--px", `-9999px`);
    el.style.setProperty("--py", `-9999px`);
    if (hoveredIndex === index) setHoveredIndex(null);
  };

  function setAt<T extends HTMLElement>(arr: React.MutableRefObject<T[]>, index: number) {
    return (el: T | null): void => {
      if (el) arr.current[index] = el;
    };
  }

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0.01 }
        : { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };
  
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0.01 }
        : { duration: 0.7, ease: EASE },
    },
  };
  

  const projects = [
    {
      title: "Immersive Customizer",
      desc: "An interactive solution for real estate marketing and communication between buyers and developers. It enables buyers to view and edit the interior finishes of their future homes.",
      tags: ["VR", "Immersive Content", "WebGL"],
      image: "/images/Home/projects/ImmersiveCustomizer.png",
      caseStudyLink: "/projects/IC-CaseStudy",
      category: "VR/AR",
      year: "2024",
      client: "Real Estate",
      complexity: 9,
      
    },
    {
      title: "Aerial Photogrammetry",
      desc: "Creation of 3D geospatial models of construction sites using drone photography. These reconstructed spaces facilitate the management of large-scale projects.",
      tags: ["Photogrammetry", "Reality Capture"],
      image: "/images/Home/projects/Aerial Photogrammetry.png",
      caseStudyLink: "",
      category: "3D Mapping",
      year: "2023",
      client: "Construction",
      complexity: 8,
      
    },
    {
      title: "Interactive Visuals",
      desc: "A motion replication tool, where a character mimics the real-time movements of a viewer. This technology adds an engaging, immersive layer to digital experiences.",
      tags: ["XR", "Realtime"],
      image: "/images/Home/projects/interactive-visuals.png",
      caseStudyLink: "",
      category: "Interactive",
      year: "2024",
      client: "Entertainment",
      complexity: 10,
      
    },
    {
      title: "Virtual Assistant",
      desc: "AI Virtual Assistant, an innovative solution that promises a multi-faceted engagement. It is equipped to converse in several languages: English, French, Arabic, Chinese and more.",
      tags: ["AI VirtualAssistant", "Conversational AI"],
      image: "/images/Home/projects/virtualAssistant.png",
      caseStudyLink: "",
      category: "AI Systems",
      year: "2024",
      client: "Enterprise",
      complexity: 9,
      
    },
    {
      title: "3D Digital Billboard",
      desc: "This technology enables customers to view the ads without the use of special glasses, Creating a vibrant and lifelike experience that simply can't be replicated with traditional 2D billboards.",
      tags: ["NakedEye", "3D outdoor Ads"],
      image: "/images/Home/projects/3DBillboard.png",
      caseStudyLink: "",
      category: "Display Tech",
      year: "2024",
      client: "Advertising",
      complexity: 10,
      
    },
  ];

  return (
    <section ref={sectionRef} className="relative border-y border-fg/10 bg-muted-1/40 py-20 overflow-hidden">
      

      {/* Dynamic gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-fg/[0.02] to-transparent"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Enhanced Header */}
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <div className="mb-6 flex items-center justify-center gap-3">
              <motion.span 
                className="h-px w-10 bg-fg/40"
                animate={{ width: [40, 60, 40] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <span className="text-[13px] tracking-[0.25em] uppercase text-fg/70 relative">
                Selected Work
              </span>
              <motion.span 
                className="h-px w-10 bg-fg/40"
                animate={{ width: [40, 60, 40] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              />
            </div>
            <h2 className="heading text-4xl md:text-5xl mb-6">Featured Projects</h2>
            <p className="text-xl md:text-2xl text-fg/70 max-w-3xl mx-auto leading-relaxed font-light">
              A snapshot of how we apply 3D, BIM, and AI to real problems, crafted with precision, built to scale.
            </p>
          </motion.div>

          {/* All Projects Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12"
          >
            {projects.map((p, i) => {
              const isHovered = canHover && hoveredIndex === i;
              const dimOthers = canHover && hoveredIndex !== null && hoveredIndex !== i;
              const isActive = i === activeProject;
              
              return (
                <motion.article
                  key={p.title}
                  ref={setAt<HTMLDivElement>(projectRefs, i)}
                  variants={fadeInUp}
                  className={[
                    "group relative overflow-hidden rounded-3xl border",
                    isActive ? "border-fg/30" : "border-fg/10",
                    "bg-bg/70 md:backdrop-blur-sm shadow-md md:shadow-lg md:hover:shadow-xl shadow-black/10",
                    "transition-all duration-500 cursor-pointer",
                    isHovered ? "will-change-transform" : "",
                  ].join(" ")}
                  animate={
                    dimOthers
                      ? { opacity: 0.38, scale: 0.98 }
                      : { opacity: 1, scale: 1 }
                  }
                  onMouseEnter={() => onCardEnter(i)}
                  onMouseMove={canHover ? (e) => onCardMove(e, i) : undefined}
                  onMouseLeave={(e) => onCardLeave(e, i)}
                  onClick={() => setActiveProject(i)}
                  style={{
                    contain: "layout paint",
                    transform: canHover
                      ? "perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))"
                      : undefined,
                  }}
                >
                  {/* Interactive spotlight */}
                  {canHover && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "radial-gradient(280px circle at var(--px,-9999px) var(--py,-9999px), rgba(255,255,255,0.06), transparent 40%)",
                      }}
                    />
                  )}  

                  {/* Image placeholder with enhanced visual */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-fg/10 to-fg/5">
                    {/* Image preview */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <motion.img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        initial={{ scale: 1.05 }}
                        animate={{ scale: isActive ? 1.1 : 1.05 }}
                        transition={{ duration: 1.2, ease: EASE }}
                      />

                      {/* Optional gradient overlay for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                    </div>

                    {/* Sheen effect */}
                    {canHover && (
                      <motion.div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{ 
                          background: [
                            "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                            "linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 60%, transparent 80%)"
                          ]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                      />
                    )}
                  </div>

                  {/* Enhanced Content */}
                  <div className="relative p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg md:text-xl font-semibold tracking-tight">{p.title}</h3>
                          {isActive && (
                            <motion.div
                              className="w-2 h-2 bg-fg/60 rounded-full"
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                          )}
                        </div>
                        <p className="text-sm text-fg/70 line-clamp-5">{p.desc}</p>
                      </div>
                      {p.caseStudyLink && (
                        <motion.a
                          href={p.caseStudyLink}
                          className="shrink-0 inline-flex items-center justify-center rounded-full border border-fg/20 w-10 h-10 text-sm md:hover:border-fg/40 md:hover:bg-fg/5 transition-all duration-300"
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </motion.a>
                      )}
                    </div>

                    {/* Enhanced Tags */}
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t, idx) => (
                        <motion.span
                          key={t}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-fg/10 text-fg/70 border border-fg/15 md:hover:bg-fg/15 md:hover:border-fg/25 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 + idx * 0.05 }}
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced corner accent */}
                  <motion.div 
                    className="absolute top-4 right-4 w-2 h-2 rounded-full bg-fg/20 md:group-hover:bg-fg/40 transition-colors duration-500"
                    animate={isActive ? { scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Project number */}
                  <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-fg/10 border border-fg/20 flex items-center justify-center text-xs font-semibold">
                    {i + 1}
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          {/* Enhanced CTA with floating elements */}
          <motion.div className="text-center relative" variants={fadeInUp}>
            {/* Floating accent elements */}
            {!prefersReducedMotion && (
              <>
                <motion.div
                  className="absolute -top-4 left-1/4 w-3 h-3 bg-fg/20 rounded-full"
                  animate={{ 
                    y: [-10, 10, -10],
                    opacity: [0.2, 0.6, 0.2]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -top-6 right-1/4 w-2 h-2 bg-fg/30 rounded-full"
                  animate={{ 
                    y: [10, -10, 10],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />
              </>
            )}

            <motion.div
              className="inline-flex items-center gap-4 mt-10"
              whileHover={{ scale: 1.02 }}
            >
              <motion.a
                href="/projects"
                className="group relative px-8 py-4 bg-fg text-bg rounded-full font-semibold overflow-hidden transition-all duration-300"
                whileHover={{ 
                  boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-fg via-fg/90 to-fg"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                <span className="relative flex items-center gap-2">
                  Explore All Projects
                  <motion.svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                  animate={{ x: ["0%", "200%"] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatDelay: 3,
                    ease: "easeInOut"
                  }}
                />
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeProjects;