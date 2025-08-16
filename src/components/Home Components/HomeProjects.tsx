// HomeProjects.tsx (images version: uniform grid + interactive cards)
import Container from "../Container";
import { motion, type Variants } from "framer-motion";
import { useRef } from "react";
import { NavLink } from "react-router-dom";

const HomeProjects = () => {
  const projectRefs = useRef<HTMLDivElement[]>([]);

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const onCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
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
  };

  const onCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
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

  // Swap in your actual image paths/imports
  const projects = [
    {
      title: "Immersive Customizer",
      desc: "Interactive finishes for real estate & warehouses.",
      tags: ["3D", "Configurator", "WebGL"],
      image: "/images/projects/customizer.jpg",
    },
    {
      title: "Aerial Photogrammetry",
      desc: "Drone-to-3D for construction & heritage.",
      tags: ["Photogrammetry", "Reality Capture"],
      image: "/images/projects/photogrammetry.jpg",
    },
    {
      title: "Interactive Visuals",
      desc: "Motion replication with real-time viewer movement.",
      tags: ["XR", "Realtime"],
      image: "/images/projects/interactive-visuals.jpg",
    },
    {
      title: "AR Scavenger Hunt Gadget",
      desc: "Location-aware, gamified AR experiences.",
      tags: ["AR", "Mobile"],
      image: "/images/projects/ar-scavenger.jpg",
    },
    {
      title: "BIM Coordination Dashboard",
      desc: "Clash detection, status, and AI-assisted insights.",
      tags: ["BIM", "AI"],
      image: "/images/projects/bim-dashboard.jpg",
    },
  ];

  return (
    <section className="relative border-y border-fg/10 bg-muted-1/40 py-20 overflow-hidden">
      {/* soft grid + gradient background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute -top-32 -right-24 w-96 h-96 rounded-full border border-fg" />
        <div className="absolute -bottom-24 -left-32 w-[28rem] h-[28rem] rounded-full border border-fg" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fg/[0.02] to-transparent" />

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

          {/* Uniform Projects Grid (no mixed spans) */}
          <motion.div
            variants={staggerContainer}
            className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((p, i) => (
              <motion.article
                key={p.title}
                ref={setAt<HTMLDivElement>(projectRefs, i)}
                variants={fadeInUp}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                className={[
                  "group relative overflow-hidden rounded-3xl border border-fg/10 bg-bg/70 backdrop-blur-sm",
                  "hover:border-fg/25 transition-all duration-500",
                ].join(" ")}
                onMouseMove={onCardMove}
                onMouseLeave={onCardLeave}
                style={{
                  transform: "perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
                }}
              >
                {/* interactive spotlight */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(360px circle at var(--px,-9999px) var(--py,-9999px), rgba(255,255,255,0.06), transparent 40%)",
                  }}
                />

                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                  />
                  {/* gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-bg/10 to-transparent" />
                  {/* sheen on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-6" />
                  </div>
                  {/* corner badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-fg/15 border border-fg/20">Case Study</span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold tracking-tight">{p.title}</h3>
                      <p className="mt-2 text-sm text-fg/70">{p.desc}</p>
                    </div>
                    <NavLink
                      to="/projects"
                      className="shrink-0 inline-flex items-center justify-center rounded-full border border-fg/20 px-3 py-2 text-sm hover:border-fg/40 hover:bg-fg/5 transition"
                    >
                      View
                    </NavLink>
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-fg/10 text-fg/70 border border-fg/15"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div className="text-center mt-12" variants={fadeInUp}>
            <NavLink
              to="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-fg text-bg px-6 py-3 font-medium hover:bg-fg/90 hover:shadow-lg transition"
            >
              Explore All Projects
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
