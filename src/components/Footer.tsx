import { motion } from "framer-motion";
import Container from "./Container";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <footer className="relative bg-black text-white border-t border-white/10">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full border border-white/5"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/6 w-48 h-48 rounded-full border border-white/5"
          animate={{
            scale: [1.1, 0.9, 1.1],
            rotate: [180, 270, 360],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.015] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:80px_80px]" />

      <Container>
        <div className="relative py-24">
          {/* Main footer content */}
          <div className="grid gap-16 lg:grid-cols-12">
            
            {/* Brand section */}
            <motion.div 
              className="lg:col-span-5 space-y-6"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white/10 border border-white/20 flex items-center justify-center">
                  <img 
                    src="/images/logo_white.png" 
                    alt="VisionLab" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <div className="text-2xl font-bold tracking-tight">VisionLab</div>
                  <div className="text-xs tracking-[0.3em] uppercase text-white/50 font-medium">
                    Technologies
                  </div>
                </div>
              </div>
              
              <p className="text-lg text-white/60 leading-relaxed max-w-md font-light">
                Transforming ideas into exceptional digital experiences through innovative 3D solutions, 
                intelligent building systems, and cutting-edge AI integration.
              </p>

              {/* Location badge */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-sm text-white/70">Based in Addis Ababa</span>
                <span className="text-white/30">•</span>
                <span className="text-sm text-white/70">Serving Global</span>
              </div>
            </motion.div>

            {/* Navigation links */}
            <div className="lg:col-span-7 grid gap-12 md:grid-cols-3">
              
              {/* Quick links */}
              <motion.div 
                className="space-y-6"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-white/80">
                  Navigation
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Solutions', href: '/solutions' },
                    { name: 'Projects', href: '/projects' },
                    { name: 'About', href: '/about' },
                    { name: 'Contact', href: '/contact' }
                  ].map((item) => (
                    <li key={item.name}>
                      <NavLink 
                        to={item.href}
                        className="group text-white/60 hover:text-white transition-all duration-300 inline-flex items-center gap-3"
                      >
                        <span className="w-0 group-hover:w-3 h-px bg-gradient-to-r from-white to-transparent transition-all duration-300" />
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {item.name}
                        </span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact info */}
              <motion.div 
                className="space-y-6"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-white/80">
                  Contact
                </h3>
                <ul className="space-y-4 text-white/60">
                  <li className="group">
                    <span className="text-xs uppercase tracking-wider text-white/40 block mb-1">Email</span>
                    <a 
                      href="mailto:hello@visionlab.tech" 
                      className="hover:text-white transition-colors duration-300 group-hover:translate-x-1 inline-block transform"
                    >
                      contact@visionlab.ae
                    </a>
                  </li>
                  <li className="group">
                    <span className="text-xs uppercase tracking-wider text-white/40 block mb-1">Phone</span>
                    <a 
                      href="tel:+251944123456" 
                      className="hover:text-white transition-colors duration-300 group-hover:translate-x-1 inline-block transform"
                    >
                      +251 963 978 798
                    </a>
                  </li>
                  <li className="group">
                    <span className="text-xs uppercase tracking-wider text-white/40 block mb-1">Location</span>
                    <span className="text-sm leading-relaxed">
                      Lidiya Building, 4th Floor<br />
                      Addis Ababa, Ethiopia
                    </span>
                  </li>
                </ul>
              </motion.div>

              {/* Social & Legal */}
              <motion.div 
                className="space-y-6"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-white/80">
                  Connect
                </h3>
                
                {/* Social links */}
                <div className="flex gap-3">
                  {[
                    { 
                      name: 'LinkedIn', 
                      icon: 'M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z'
                    },
                    { 
                      name: 'Instagram', 
                      icon: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z'
                    },
                    { 
                      name: 'Twitter', 
                      icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'
                    }
                  ].map((social) => (
                    <motion.a
                      key={social.name}
                      href="#"
                      className="group w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-4 h-4 text-white/50 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24">
                        <path fill="currentColor" d={social.icon} />
                      </svg>
                    </motion.a>
                  ))}
                </div>

                {/* Legal links */}
                <div className="pt-4">
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="#" className="text-white/40 hover:text-white/70 transition-colors duration-300">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white/40 hover:text-white/70 transition-colors duration-300">
                        Terms of Service
                      </a>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom section with modern divider */}
          <motion.div 
            className="mt-20 pt-8 border-t border-white/10"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-6 text-sm text-white/40">
                <span>© {new Date().getFullYear()} VisionLab Technologies</span>
                <div className="hidden md:flex items-center gap-2">
                  <div className="w-1 h-1 bg-white/30 rounded-full" />
                  <span>Crafted with precision in Ethiopia</span>
                </div>
              </div>
              
              {/* Back to top button */}
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
                Back to top
              </motion.button>
            </div>
          </motion.div>
        </div>
      </Container>
    </footer>
  );
}