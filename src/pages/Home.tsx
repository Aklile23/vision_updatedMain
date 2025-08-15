import React, { useRef } from "react";
import Container from "../components/Container";
import { motion } from "framer-motion";
import HomeSolutions from "../components/Home Components/HomeSolutions";
import HomeProjects from "../components/Home Components/HomeProjects";
import HomeAbout from "../components/Home Components/HomeAbout";
import HomeHero from "../components/Home Components/HomeHero";
import HomeTestimonials from "../components/Home Components/HomeTestimonials";
import MiniContactForm from "../components/MiniContactForm";


export default function Home() {
  
  const kpiRefs = useRef<HTMLDivElement[]>([]);
  const logoRefs = useRef<HTMLDivElement[]>([]);

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

  return (
    <main className="bg-bg text-fg">
      {/* HERO: Modern, dynamic design */}
      <HomeHero />

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
      <HomeAbout />
      <HomeSolutions />
      <HomeProjects />

      {/* LOGOS: Partners */}
      {/* <section className="border-y border-fg/10 bg-muted-1 py-10">
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
      </section> */}

      <HomeTestimonials />
      <MiniContactForm />
    </main>
  );
}