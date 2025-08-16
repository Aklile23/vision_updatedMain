import { useRef } from "react";
import Container from "../Container";
import { motion, useInView } from "framer-motion";
import { easeOut } from "framer-motion"

const ProjectsHero = () => {

    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });
      // Animation variants
      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
          }
        }
      };
      const itemVariants = {
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              ease: easeOut
            }
          }
        };
    return (
        <section ref={heroRef} className="relative min-h-screen flex items-center border-b border-fg/10">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-[0.02]">
            <motion.div 
                className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full border border-fg"
                animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 180],
                opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
                }}
            />
            <motion.div 
                className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full border border-fg"
                animate={{
                scale: [1.1, 0.9, 1.1],
                rotate: [180, 270, 360],
                opacity: [0.4, 0.2, 0.4],
                }}
                transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
                }}
            />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 [background-image:linear-gradient(var(--color-fg)_1px,transparent_1px),linear-gradient(90deg,var(--color-fg)_1px,transparent_1px)] [background-size:80px_80px] opacity-[0.015]" />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-fg/[0.01] via-transparent to-fg/[0.02]" />

            <Container>
            <motion.div 
                className="relative z-10 max-w-5xl"
                variants={containerVariants}
                initial="hidden"
                animate={isHeroInView ? "visible" : "hidden"}
            >
                <motion.div variants={itemVariants} className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                    <span className="h-px w-16 bg-gradient-to-r from-transparent to-fg/40" />
                    <span className="text-sm tracking-[0.3em] uppercase text-fg/60 font-medium">
                    Project Showcase
                    </span>
                    <span className="h-px w-16 bg-gradient-to-l from-transparent to-fg/40" />
                </div>
                </motion.div>

                <motion.h1 
                variants={itemVariants}
                className="heading text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight"
                >
                <span className="block">Our</span>
                <span className="block text-fg/70">Portfolio</span>
                </motion.h1>

                <motion.p 
                variants={itemVariants}
                className="text-xl md:text-2xl text-fg/70 max-w-4xl mb-12 leading-relaxed font-light"
                >
                A comprehensive showcase of innovative solutions across immersive 3D experiences, intelligent building systems, and cutting-edge AI implementations that drive real-world impact.
                </motion.p>

                <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-6 mb-16"
                >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a 
                    href="#featured" 
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-fg text-bg font-semibold text-lg hover:bg-fg/90 hover:shadow-2xl hover:shadow-fg/20 transition-all duration-300"
                    >
                    Featured Work
                    <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    </a>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a 
                    href="#all-projects" 
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-fg/20 text-fg hover:border-fg/40 hover:bg-fg/5 transition-all duration-300 font-semibold text-lg"
                    >
                    Browse All
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    </a>
                </motion.div>
                </motion.div>

                {/* Project Stats */}
                <motion.div 
                variants={itemVariants}
                className="grid grid-cols-3 gap-8 max-w-2xl"
                >
                <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-2">6+</div>
                    <div className="text-sm text-fg/60 uppercase tracking-wide">Projects</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-2">4</div>
                    <div className="text-sm text-fg/60 uppercase tracking-wide">Categories</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-2">100%</div>
                    <div className="text-sm text-fg/60 uppercase tracking-wide">Success Rate</div>
                </div>
                </motion.div>
            </motion.div>
            </Container>
        </section>
    );
    }

export default ProjectsHero;
