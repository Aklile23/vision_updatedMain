import Container from "../Container";
import { motion } from "framer-motion";
import { useRef } from "react";
import { NavLink } from "react-router-dom";

const HomeProjects = () => {
    const projectRefs = useRef<HTMLDivElement[]>([]);
    
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
    
      function setAt<T extends HTMLElement>(arr: React.MutableRefObject<T[]>, index: number) {
        return (el: T | null): void => { if (el) arr.current[index] = el; };
      }
      
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

            {/* Projects Grid */}
            <motion.div
                variants={staggerContainer}
                className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
                {[
                {
                    title: "Immersive Customizer",
                    desc: "Interactive finishes for real estate & warehouses.",
                    tags: ["3D", "Configurator", "WebGL"],
                    span: "lg:col-span-2",
                    visual: "customizer",
                },
                {
                    title: "Aerial Photogrammetry",
                    desc: "Drone-to-3D for construction & heritage.",
                    tags: ["Photogrammetry", "Reality Capture"],
                    span: "",
                    visual: "photogrammetry",
                },
                {
                    title: "Interactive Visuals",
                    desc: "Motion replication with real-time viewer movement.",
                    tags: ["XR", "Realtime"],
                    span: "",
                    visual: "visuals",
                },
                {
                    title: "AR Scavenger Hunt Gadget",
                    desc: "Location-aware, gamified AR experiences.",
                    tags: ["AR", "Mobile"],
                    span: "",
                    visual: "ar",
                },
                {
                    title: "BIM Coordination Dashboard",
                    desc: "Clash detection, status, and AI-assisted insights.",
                    tags: ["BIM", "AI"],
                    span: "lg:col-span-2",
                    visual: "bim",
                },
                ].map((p, i) => (
                <motion.article
                    key={p.title}
                    ref={setAt<HTMLDivElement>(projectRefs, i)}
                    variants={fadeInUp}
                    transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.05 }}
                    className={[
                    "group relative overflow-hidden rounded-3xl border border-fg/10 bg-bg/70 backdrop-blur-sm",
                    "hover:border-fg/25 transition-all duration-500",
                    p.span,
                    ].join(" ")}
                    onMouseMove={onCardMove}
                    onMouseLeave={onCardLeave}
                    style={{
                    transform:
                        "perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
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

                    {/* Visual */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-fg/5 to-fg/10" />
                    {/* Minimal SVG mockups to represent each project */}
                    <div className="absolute inset-0 p-5">
                        {p.visual === "customizer" && (
                        <svg className="w-full h-full text-fg/30" viewBox="0 0 400 250" fill="none">
                            <rect x="20" y="20" width="360" height="160" rx="14" stroke="currentColor" strokeWidth="2" />
                            <rect x="20" y="20" width="360" height="26" rx="14" fill="currentColor" opacity="0.08" />
                            <rect x="35" y="60" width="160" height="100" rx="8" stroke="currentColor" opacity="0.8" />
                            <rect x="210" y="60" width="150" height="12" rx="6" fill="currentColor" opacity="0.2" />
                            <rect x="210" y="80" width="120" height="12" rx="6" fill="currentColor" opacity="0.2" />
                            <rect x="210" y="100" width="140" height="12" rx="6" fill="currentColor" opacity="0.2" />
                            <rect x="210" y="130" width="110" height="14" rx="7" fill="currentColor" opacity="0.25" />
                            <rect x="210" y="155" width="70" height="14" rx="7" fill="currentColor" opacity="0.25" />
                        </svg>
                        )}
                        {p.visual === "photogrammetry" && (
                        <svg className="w-full h-full text-fg/30" viewBox="0 0 400 250" fill="none">
                            <path d="M70 160 L200 90 L330 160 L330 200 L70 200 Z" stroke="currentColor" strokeWidth="2" opacity="0.9" />
                            <path d="M200 90 L200 150" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                            <circle cx="120" cy="70" r="6" fill="currentColor" opacity="0.35" />
                            <circle cx="260" cy="60" r="6" fill="currentColor" opacity="0.35" />
                            <circle cx="320" cy="90" r="6" fill="currentColor" opacity="0.35" />
                            <rect x="30" y="30" width="80" height="20" rx="10" fill="currentColor" opacity="0.15" />
                        </svg>
                        )}
                        {p.visual === "visuals" && (
                        <svg className="w-full h-full text-fg/30" viewBox="0 0 400 250" fill="none">
                            <polyline points="30,200 90,140 150,160 220,110 300,140 360,90" stroke="currentColor" strokeWidth="3" fill="none" />
                            <circle cx="90" cy="140" r="5" fill="currentColor" opacity="0.7" />
                            <circle cx="220" cy="110" r="5" fill="currentColor" opacity="0.7" />
                            <circle cx="300" cy="140" r="5" fill="currentColor" opacity="0.7" />
                        </svg>
                        )}
                        {p.visual === "ar" && (
                        <svg className="w-full h-full text-fg/30" viewBox="0 0 400 250" fill="none">
                            <rect x="130" y="40" width="140" height="170" rx="18" stroke="currentColor" strokeWidth="2" />
                            <circle cx="200" cy="125" r="45" stroke="currentColor" strokeWidth="2" opacity="0.7" />
                            <path d="M200 80 L210 95 L190 95 Z" fill="currentColor" opacity="0.6" />
                            <rect x="160" y="170" width="80" height="12" rx="6" fill="currentColor" opacity="0.25" />
                        </svg>
                        )}
                        {p.visual === "bim" && (
                        <svg className="w-full h-full text-fg/30" viewBox="0 0 400 250" fill="none">
                            <rect x="20" y="20" width="360" height="180" rx="14" stroke="currentColor" strokeWidth="2" />
                            <rect x="35" y="40" width="160" height="120" rx="8" stroke="currentColor" opacity="0.8" />
                            <rect x="220" y="50" width="140" height="10" rx="5" fill="currentColor" opacity="0.25" />
                            <rect x="220" y="70" width="110" height="10" rx="5" fill="currentColor" opacity="0.25" />
                            <rect x="220" y="90" width="130" height="10" rx="5" fill="currentColor" opacity="0.25" />
                            <circle cx="350" cy="170" r="10" stroke="currentColor" strokeWidth="2" />
                            <text x="350" y="174" textAnchor="middle" className="text-[8px] fill-current">AI</text>
                        </svg>
                        )}
                    </div>

                    {/* subtle sheen on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-6" />
                    </div>

                    {/* corner badge */}
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs rounded-full bg-fg/15 border border-fg/20">
                        Case Study
                        </span>
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
}

export default HomeProjects;
