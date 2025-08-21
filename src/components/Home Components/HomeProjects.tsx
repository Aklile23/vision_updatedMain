// HomeProjects.tsx — desktop unchanged; mobile optimized
import Container from "../Container";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const HomeProjects = () => {
  const projectRefs = useRef<HTMLDivElement[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [canHover, setCanHover] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Detect true hover devices (desktop, some tablets with trackpads)
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const set = () => setCanHover(mq.matches);
    set();
    // Safari < 17 doesn't support addEventListener on MediaQueryList
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);

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
        : { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const onCardMove = (e: React.MouseEvent<HTMLElement>, index: number) => {
    if (!canHover) return; // disable on mobile
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const midX = r.width / 2;
    const midY = r.height / 2;
    const rx = ((y - midY) / midY) * 6;
    const ry = ((midX - x) / midX) * 8;

    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--px", `${x}px`);
    el.style.setProperty("--py", `${y}px`);

    setHoveredIndex(index);
  };

  const onCardLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (!canHover) return; // disable on mobile
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
    el.style.setProperty("--px", `-9999px`);
    el.style.setProperty("--py", `-9999px`);
    setHoveredIndex(null);
  };

  function setAt<T extends HTMLElement>(arr: React.MutableRefObject<T[]>, index: number) {
    return (el: T | null): void => {
      if (el) arr.current[index] = el;
    };
  }

  const projects = [
    {
      title: "Immersive Customizer",
      desc: "An interactive solution for real estate marketing and communication between buyers and developers. It enables buyers to view and edit the interior finishes of their future homes.",
      tags: ["VR", "Immersive Content", "WebGL"],
      image: "/images/Home/projects/ImmersiveCustomizer.png",
    },
    {
      title: "Aerial Photogrammetry",
      desc: "Creation of 3D geospatial models of construction sites using drone photography. These reconstructed spaces facilitate the management of large-scale projects.",
      tags: ["Photogrammetry", "Reality Capture"],
      image: "/images/Home/projects/Aerial Photogrammetry.png",
    },
    {
      title: "Interactive Visuals",
      desc: "A motion replication tool, where a character mimics the real-time movements of a viewer. This technology adds an engaging, immersive layer to digital experiences.",
      tags: ["XR", "Realtime"],
      image: "/images/Home/projects/interactive-visuals.png",
    },
    {
      title: "Virtual Assistant",
      desc: "AI Virtual Assistant, an innovative solution that promises a multi-faceted engagement. It is equipped to converse in several languages: English, French, Arabic, Chinese and more.",
      tags: ["AI VirtualAssistant", "Conversational AI"],
      image: "/images/Home/projects/virtualAssistant.png",
    },
    {
      title: "3D Digital Billboard",
      desc: "This technology enables customers to view the ads without the use of special glasses, Creating a vibrant and lifelike experience that simply can't be replicated with traditional 2D billboards.",
      tags: ["NakedEye", "3D outdoor Ads"],
      image: "/images/Home/projects/3DBillboard.png",
    },
  ];

  return (
    <section className="relative border-y border-fg/10 bg-muted-1/40 py-20 overflow-hidden">
      {/* Background ornaments: desktop only for perf */}
      <div className="absolute inset-0 opacity-[0.02] hidden md:block">
        <div className="absolute -top-32 -right-24 w-96 h-96 rounded-full border border-fg" />
        <div className="absolute -bottom-24 -left-32 w-[28rem] h-[28rem] rounded-full border border-fg" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fg/[0.02] to-transparent hidden md:block" />

      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div className="text-center mb-14" variants={fadeInUp}>
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-fg/40" />
              <span className="text-[13px] tracking-[0.25em] uppercase text-fg/70">Selected Work</span>
              <span className="h-px w-10 bg-fg/40" />
            </div>
            <h2 className="heading text-4xl md:text-5xl mb-4">Featured Projects</h2>
            <p className="text-lg md:text-xl text-fg/70 max-w-3xl mx-auto">
              A snapshot of how we apply 3D, BIM, and AI to real problems — crafted with precision, built to scale.
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((p, i) => (
              <motion.article
                key={p.title}
                ref={setAt<HTMLDivElement>(projectRefs, i)}
                variants={fadeInUp}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.01 }
                    : { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }
                }
                // Desktop: keep spotlight effect (blur other cards).
                // Mobile: disable inter-card blur & opacity change.
                animate={
                  canHover
                    ? hoveredIndex !== null && hoveredIndex !== i
                      ? { opacity: 0.3, filter: "blur(3px)" }
                      : { opacity: 1, filter: "blur(0px)" }
                    : { opacity: 1, filter: "none" }
                }
                className={[
                  "group relative overflow-hidden rounded-3xl border border-fg/10",
                  // Lighter mobile styles (no backdrop blur on mobile)
                  "bg-bg/70 md:backdrop-blur-sm",
                  // Hover borders only on hover-capable devices
                  "transition-all duration-500 cursor-pointer",
                  canHover ? "md:hover:border-fg/25" : "",
                  // GPU hints only when used
                  canHover ? "transform-gpu will-change-transform" : "",
                ].join(" ")}
                onMouseMove={canHover ? (e) => onCardMove(e, i) : undefined}
                onMouseLeave={canHover ? onCardLeave : undefined}
                style={
                  canHover
                    ? {
                        transform:
                          "perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
                      }
                    : undefined
                }
              >
                {/* Interactive spotlight: desktop only */}
                {canHover && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(300px circle at var(--px,-9999px) var(--py,-9999px), rgba(255,255,255,0.06), transparent 40%)",
                    }}
                  />
                )}

                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className={[
                      "absolute inset-0 h-full w-full object-cover transition-transform ease-out",
                      // Scale-up only on hover-capable devices
                      canHover ? "duration-700 md:group-hover:scale-105" : "duration-300",
                    ].join(" ")}
                  />
                  {/* Sheen: desktop only */}
                  {canHover && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-50">
                      <div className="absolute -inset-1 bg-gradient-to-tr from-transparent via-white/8 to-transparent rotate-6" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="relative p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold tracking-tight">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-sm text-fg/70">
                        {p.desc}
                      </p>
                    </div>
                    <div>
                      <NavLink
                        to="/projects"
                        className="shrink-0 inline-flex items-center justify-center rounded-full border border-fg/20 px-3 py-2 text-sm md:hover:border-fg/40 md:hover:bg-fg/5 transition-all duration-300"
                      >
                        View
                      </NavLink>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-fg/10 text-fg/70 border border-fg/15 md:hover:bg-fg/15 md:hover:border-fg/25 transition-all duration-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-fg/20 md:group-hover:bg-fg/40 transition-colors duration-500" />
              </motion.article>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div className="text-center mt-12" variants={fadeInUp}>
            <NavLink
              to="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-fg text-bg px-6 py-3 font-medium md:hover:bg-fg/90 md:hover:shadow-lg transition-all duration-300 relative z-10"
            >
              Explore All Projects
              <svg
                className="w-4 h-4 md:group-hover:translate-x-1 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </NavLink>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default HomeProjects;
