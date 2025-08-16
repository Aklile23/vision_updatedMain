import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import Container from '../Container';

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-fg/[0.02] to-fg/[0.05] border-t border-fg/10">
        <Container>
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="mb-8"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-20 h-20 mx-auto rounded-full border-2 border-fg/20 flex items-center justify-center text-3xl">
                💡
              </div>
            </motion.div>

            <h2 className="heading text-4xl md:text-6xl mb-6">Have a Project in Mind?</h2>
            <p className="text-xl text-fg/70 mb-12 leading-relaxed">
              Let's scope it together and find the fastest path to value. 
              Whether it's 3D visualization, AI automation, or custom solutions, we're here to bring your vision to life.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <NavLink 
                  to="/contact" 
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-fg text-bg font-semibold text-lg hover:bg-fg/90 hover:shadow-2xl hover:shadow-fg/20 transition-all duration-300"
                >
                  Start a Conversation
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </NavLink>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <NavLink 
                  to="/solutions" 
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-fg/20 text-fg hover:border-fg/40 hover:bg-fg/10 transition-all duration-300 font-semibold text-lg"
                >
                  View Services
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </NavLink>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>
  );
}

export default CTA;
