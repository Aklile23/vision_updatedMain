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
    <footer className="relative mt-24 border-t border-fg/10 pt-16 pb-8">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(var(--color-fg)_1px,transparent_1px),linear-gradient(90deg,var(--color-fg)_1px,transparent_1px)] [background-size:48px_48px]" />

      <Container>
        <div className="relative">
          {/* Main footer content */}
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            
            {/* Brand section */}
            <motion.div 
              className="space-y-4"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden">
                  <img 
                    src="/images/logo_white.png" 
                    alt="VisionLab" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="font-bold tracking-tight">VisionLab</div>
                  <div className="text-xs tracking-wide text-fg/60">TECHNOLOGIES</div>
                </div>
              </div>
              <p className="text-sm text-fg/70 leading-relaxed">
                Elevating digital dimensions through innovative 3D, BIM, and AI solutions.
              </p>
            </motion.div>

            {/* Quick links */}
            <motion.div 
              className="space-y-4"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                {['Solutions', 'Projects', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <NavLink 
                      to={`/${item.toLowerCase()}`}
                      className="text-sm text-fg/60 hover:text-fg transition-colors duration-300 inline-flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-fg transition-all duration-300 mr-0 group-hover:mr-2" />
                      {item}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact info */}
            <motion.div 
              className="space-y-4"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-semibold">Contact</h3>
              <ul className="space-y-2 text-sm text-fg/60">
                <li>Addis Ababa, Ethiopia</li>
                <li>
                  <a href="mailto:hello@visionlab.tech" className="hover:text-fg transition-colors duration-300">
                    hello@visionlab.tech
                  </a>
                </li>
                <li>
                  <a href="tel:+251944123456" className="hover:text-fg transition-colors duration-300">
                    +251 944 123 456
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Social links */}
            <motion.div 
              className="space-y-4"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-semibold">Connect</h3>
              <div className="flex gap-4">
                {[
                  { name: 'LinkedIn', icon: 'M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z' },
                  { name: 'Instagram', icon: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z' },
                  { name: 'Twitter', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href="#"
                    className="group relative w-10 h-10 bg-fg/5 rounded-xl flex items-center justify-center border border-fg/10 transition-colors duration-300 hover:bg-fg/10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5 text-fg/60 group-hover:text-fg transition-colors duration-300" viewBox="0 0 24 24">
                      <path fill="currentColor" d={social.icon} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div 
            className="mt-16 pt-8 border-t border-fg/10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-fg/60"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4">
              <span>© {new Date().getFullYear()} VisionLab</span>
              <span className="w-1 h-1 bg-fg/30 rounded-full" />
              <span>All rights reserved</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-fg transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-fg transition-colors duration-300">Terms of Service</a>
            </div>
          </motion.div>
        </div>
      </Container>
    </footer>
  );
}
