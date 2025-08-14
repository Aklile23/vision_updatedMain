import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import Container from "../components/Container";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import HeroMediaGrid from "../components/HeroMediaGrid";

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

  return (
    <main className="bg-bg text-fg">
                           {/* HERO: Asymmetric, human-designed */}
         {/* HERO: Modern, dynamic design */}
         <section className="relative overflow-hidden py-20 md:py-32">
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
                {/* 3D-style cards stack using your color theme */}
                <div className="relative h-96 lg:h-[500px]">
                  {[
                    { opacity: "bg-fg/15", delay: 0.2, rotate: "-6deg" },
                    { opacity: "bg-fg/20", delay: 0.4, rotate: "3deg" },
                    { opacity: "bg-fg/25", delay: 0.6, rotate: "-2deg" }
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      className={`absolute inset-4 rounded-3xl ${card.opacity} backdrop-blur-sm border border-fg/20 shadow-2xl`}
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
                      {/* Card content */}
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
                  ))}
                  
                  {/* Floating elements using your color theme */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-16 h-16 bg-fg/20 rounded-full shadow-lg border border-fg/30"
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-4 -left-4 w-12 h-12 bg-fg/15 rounded-full shadow-lg border border-fg/25"
                    animate={{
                      y: [0, 15, 0],
                      x: [0, 10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>
              
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
 <section className="relative border-y border-fg/10 bg-muted-1/40 py-16">
   {/* faint background lines, not the hero grid */}
   <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 [background:repeating-linear-gradient(90deg,transparent,transparent_23px,color-mix(in_oklab,var(--color-fg)_7%,transparent)_24px)] opacity-[.25]" />

   <Container>
     <motion.div 
       className="grid gap-10 md:grid-cols-12"
       variants={staggerContainer}
       initial="hidden"
       whileInView="visible"
       viewport={{ once: true, margin: "-10%" }}
     >
       {/* LEFT: statement + pillars */}
       <div className="md:col-span-7 lg:col-span-6 space-y-6">
         <motion.h2 
           className="heading text-3xl md:text-4xl" 
           data-who="title"
           variants={fadeInUp}
         >
           Who We Are
         </motion.h2>
         <motion.p 
           className="max-w-xl text-fg/80" 
           data-who="lead"
           variants={fadeInUp}
         >
           VisionLab blends **creative 3D craft** with **practical engineering** and **applied AI**.
           We're a small, focused team in Addis Ababa working with partners worldwide to turn ideas
           into usable, high-quality digital products — from immersive visuals to intelligent systems.
         </motion.p>

         {/* value pillars */}
         <div className="grid gap-4 sm:grid-cols-3">
           {[
             {
               t: "Craft",
               d: "Attention to detail in models, visuals, and interactions.",
             },
             {
               t: "Precision",
               d: "Data-driven workflows and reliable delivery.",
             },
             {
               t: "Partnership",
               d: "We co-design solutions around your real constraints.",
             },
           ].map((item, i) => (
             <motion.div
               key={item.t}
               className="rounded-xl border border-fg/10 bg-bg p-5"
               data-who={`pillar-${i}`}
               variants={fadeInUp}
             >
               <div className="heading text-base">{item.t}</div>
               <div className="mt-2 text-sm text-fg/70">{item.d}</div>
             </motion.div>
           ))}
         </div>

         {/* micro-cta row */}
         <motion.div 
           className="flex flex-wrap gap-3 pt-2" 
           data-who="cta"
           variants={fadeInUp}
         >
           <NavLink to="/about" className="rounded-full border border-fg px-4 py-2 text-sm hover:bg-fg hover:text-bg">
             More about VisionLab
           </NavLink>
           <NavLink to="/solutions" className="rounded-full border border-fg/20 px-4 py-2 text-sm hover:border-fg">
             Explore our solutions
           </NavLink>
         </motion.div>
       </div>

       {/* RIGHT: photo collage (swap images later) */}
       <motion.div 
         className="md:col-span-5 lg:col-span-6"
         variants={fadeInUp}
       >
         <div className="grid grid-cols-3 gap-3" data-who="collage">
           <div className="col-span-2 aspect-[4/3] overflow-hidden rounded-2xl border border-fg/10 bg-muted-2">
             {/* replace with <img src="/images/team-1.jpg" .../> */}
           </div>
           <div className="aspect-square overflow-hidden rounded-2xl border border-fg/10 bg-muted-2" />
           <div className="aspect-square overflow-hidden rounded-2xl border border-fg/10 bg-muted-2" />
           <div className="col-span-2 aspect-[4/3] overflow-hidden rounded-2xl border border-fg/10 bg-muted-2" />
         </div>
         <p className="mt-3 text-xs text-fg/60">
           Real photos or short loops go here — team at work, a model preview, a device shot, etc.
         </p>
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
