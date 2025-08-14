import React from "react";
import { motion } from "framer-motion";

interface HeroMediaGridProps {
  className?: string;
}

export default function HeroMediaGrid({ className = "" }: HeroMediaGridProps) {

  return (
    <div className={`relative ${className}`}>
      {/* Irregular grid layout */}
      <div className="relative">
        {/* Main large tile - positioned irregularly */}
        <motion.figure
          className="absolute top-0 left-0 w-2/3 h-2/3 overflow-hidden rounded-2xl border border-fg/10 bg-muted-2 cursor-pointer z-10"
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
        >
          <img src="/images/hero-a.jpg" alt="3D visualization" className="absolute inset-0 h-full w-full object-cover" />
        </motion.figure>

        {/* Small tile - top right */}
        <motion.figure
          className="absolute top-2 right-0 w-1/3 h-1/3 overflow-hidden rounded-xl border border-fg/10 bg-muted-2 cursor-pointer z-20"
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
        >
          <img src="/images/hero-b.jpg" alt="VR experience" className="absolute inset-0 h-full w-full object-cover" />
        </motion.figure>

        {/* Medium tile - bottom left */}
        <motion.figure
          className="absolute bottom-0 left-0 w-1/2 h-1/3 overflow-hidden rounded-xl border border-fg/10 bg-muted-2 cursor-pointer z-20"
          whileHover={{ 
            scale: 1.03,
            transition: { duration: 0.3 }
          }}
        >
          <img src="/images/hero-c.jpg" alt="BIM modeling" className="absolute inset-0 h-full w-full object-cover" />
        </motion.figure>

        {/* Large tile - bottom right */}
        <motion.figure
          className="absolute bottom-0 right-0 w-2/3 h-1/2 overflow-hidden rounded-2xl border border-fg/10 bg-muted-2 cursor-pointer z-10"
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
        >
          <img src="/images/hero-d.jpg" alt="AI solutions" className="absolute inset-0 h-full w-full object-cover" />
        </motion.figure>

        {/* Spacer to maintain aspect ratio */}
        <div className="aspect-[4/3] invisible" />
      </div>

      {/* Floating elements overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating dots */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-fg/20 rounded-full"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-3/4 right-1/3 w-1 h-1 bg-fg/30 rounded-full"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-fg/25 rounded-full"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: 2 }}
        />
        
        {/* Floating lines */}
        <motion.div 
          className="absolute top-1/2 right-1/4 w-8 h-px bg-gradient-to-r from-transparent via-fg/20 to-transparent transform rotate-45"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-6 h-px bg-gradient-to-r from-transparent via-fg/15 to-transparent transform -rotate-12"
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>
    </div>
  );
}