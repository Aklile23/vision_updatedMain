import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import Container from "../../../components/Container";
import { useRef } from "react";
import { useScrollTop } from "../../../hooks/useScrollTop";

export default function ImmersiveCustomizerCaseStudy() {

  useScrollTop ();

  const tiltTickingRef = useRef(false);

  const handleMouseMove = (e: { currentTarget: any; clientX: number; clientY: number }) => {
    const card = e.currentTarget;
    if (tiltTickingRef.current) return;
    tiltTickingRef.current = true;

    requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      tiltTickingRef.current = false;
    });
  };

  const handleMouseLeave = (e: { currentTarget: any }) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <main className="bg-bg text-fg min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-fg/[0.02] rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-fg/[0.03] rounded-full blur-3xl" />
          <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:60px_60px]" />
        </div>

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            {/* Back Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <NavLink
                to="/projects"
                className="inline-flex items-center gap-3 text-fg/60 hover:text-fg transition-colors group"
              >
                <div className="w-8 h-8 rounded-full border border-fg/20 flex items-center justify-center group-hover:border-fg/40 transition-colors">
                  <span className="text-sm">←</span>
                </div>
                <span className="text-sm font-medium">Back to Projects</span>
              </NavLink>
            </motion.div>

            {/* Header Content */}
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="h-px w-12 bg-gradient-to-r from-transparent to-fg/40" />
                  <span className="text-sm tracking-[0.3em] uppercase text-fg/60 font-medium">
                    Case Study
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="heading text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight"
              >
                Immersive
                <span className="block text-fg/70">Customizer</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-xl text-fg/70 leading-relaxed mb-8 max-w-4xl"
              >
                An immersive, configurable environment for real-estates to present
                multiple design alternatives and let buyers test finishes, layouts, and materials
                in real time improving communication, market reach, and decision confidence.
              </motion.p>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                {["Immersive 3D", "Standalone VR", "Web-Based VR"].map(
                  (tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="px-4 py-2 text-sm rounded-full bg-fg/10 text-fg/80 border border-fg/15 hover:bg-fg/15 transition-colors"
                    >
                      {tech}
                    </motion.span>
                  )
                )}
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <a
                  href="/demo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-fg text-bg
                            font-semibold shadow-xl hover:bg-fg/90 hover:shadow-2xl
                            transition-all duration-300"
                >
                  <span>Try It Yourself</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </motion.div>
            </div>

            {/* Large Video Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              <div
                className="group relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-fg/10 bg-gradient-to-br from-fg/5 to-fg/10 shadow-2xl"
                style={{ transition: 'transform 0.3s ease' }}
              >
                {/* Interactive spotlight */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.08), transparent 40%)"
                  }}
                />

                {/* Video Content */}
                <div className="absolute inset-0">
                  <video
                    src="/videos/projects/IC/Immersive_Customizer.mp4"
                    controls
                    className="w-full h-full object-cover"
                    poster="/images/projects/ImmersiveCustomizer/1.png"
                    controlsList="nodownload"
                  />
                </div>

                {/* Play Indicator Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                  </div>
                </div>

                {/* Gradient overlays for better text contrast */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <div className="divider" />

      {/* Challenge & Solution */}
      <section id="challenge" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transition: 'transform 0.3s ease' }}
            >
              <div className="relative rounded-3xl border border-fg/10 bg-bg p-8 md:p-12 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Interactive spotlight */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)"
                  }}
                />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-fg/10 border border-fg/20 flex items-center justify-center mb-6">
                    <span className="text-xl">!</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-semibold mb-6">The Challenge</h3>
                  <div className="space-y-4 text-fg/80 leading-relaxed">
                    <p>
                      Traditional plan reviews and static renders slow decisions and create gaps between
                      buyers and developers. Teams need a collaborative way to explore material
                      combinations and alternatives without long back-and-forth cycles.
                    </p>
                    <div className="pt-4 border-t border-fg/10">
                      <h4 className="font-semibold mb-2 text-fg">Key Pain Points</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-fg/60 rounded-full"></span>
                          Long decision cycles
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-fg/60 rounded-full"></span>
                          Communication barriers
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-fg/60 rounded-full"></span>
                          Limited visualization options
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transition: 'transform 0.3s ease' }}
            >
              <div className="relative rounded-3xl border border-fg/10 bg-bg p-8 md:p-12 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Interactive spotlight */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)"
                  }}
                />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-fg/10 border border-fg/20 flex items-center justify-center mb-6">
                    <span className="text-xl">✓</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-semibold mb-6">Our Solution</h3>
                  <div className="space-y-4 text-fg/80 leading-relaxed">
                    <p>
                      A browser based and VR ready customizer that embeds your concept or final 3D model
                      in an immersive scene. Clients explore, compare presets, and switch finishes and
                      layouts in real time, while cost and selection data sync behind the scenes for
                      accurate decisions.
                    </p>
                    <div className="pt-4 border-t border-fg/10">
                      <h4 className="font-semibold mb-2 text-fg">Key Features</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-fg/60 rounded-full"></span>
                          Real-time 3D visualization
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-fg/60 rounded-full"></span>
                          VR & web accessibility
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-fg/60 rounded-full"></span>
                          Dynamic cost calculation
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* How It Works  */}
      <section id="solution" className="py-16 md:py-24 bg-black text-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white">How It Works</h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              A comprehensive workflow from concept to deployment
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transition: 'transform 0.3s ease' }}
              >
                <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 shadow-md overflow-hidden backdrop-blur-sm">
                  {/* Interactive spotlight */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.08), transparent 40%)"
                    }}
                  />

                  <div className="relative z-10">
                    <p className="text-lg text-white/80 leading-relaxed mb-8">
                      Developers/designers provide a concept 3D model or a finished design to embed into
                      the immersive environment. Optional furniture libraries and curated finishing
                      scenarios can be attached. A materials dataset including unit prices enables accurate
                      cost computation and optimization during customization.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        { title: "Model Integration", desc: "Embed concept or finished architectural models", icon: "◻", isSpecial: true },
                        { title: "Asset Libraries", desc: "Add furniture libraries & finishing scenarios", icon: "◧", isSpecial: false },
                        { title: "Cost Analytics", desc: "Use material datasets with unit pricing for accuracy", icon: "◨", isSpecial: false },
                        { title: "Cloud Deployment", desc: "Deploy to cloud and integrate with existing systems", icon: "◢", isSpecial: false },
                        { title: "Multi-Platform", desc: "Access via desktop browser or VR headset", icon: "◣", isSpecial: false },
                        { title: "Real-time Changes", desc: "Clients make live changes to layout and materials", icon: "◤", isSpecial: false }
                      ].map((feature, i) => (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/10 transition-colors"
                        >
                          <span 
                            className={`text-2xl ${
                              feature.isSpecial 
                                ? "text-white bg-black p-2 rounded-lg border border-white/20" 
                                : "text-white/60"
                            }`}
                          >
                            {feature.icon}
                          </span>
                          <div>
                            <h4 className="font-semibold mb-1 text-white">{feature.title}</h4>
                            <p className="text-sm text-white/70">{feature.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Access Modes */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transition: 'transform 0.3s ease' }}
            >
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-md h-full overflow-hidden backdrop-blur-sm">
                {/* Interactive spotlight */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(250px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.08), transparent 40%)"
                  }}
                />

                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-6">
                    <span className="text-lg text-white">◈</span>
                  </div>

                  <h3 className="text-xl font-semibold mb-6 text-white">Access Modes</h3>
                  <div className="space-y-6">
                    <div className="p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors bg-white/5">
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-white">
                        <span className="w-2 h-2 bg-white/60 rounded-full"></span>
                        Web Platform
                      </h4>
                      <p className="text-sm text-white/70 leading-relaxed">
                        Open in a desktop browser, or through a VR headset's browser for immersion.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors bg-white/5">
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-white">
                        <span className="w-2 h-2 bg-white/60 rounded-full"></span>
                        Standalone VR App
                      </h4>
                      <p className="text-sm text-white/70 leading-relaxed">
                        Install on a headset for a seamless showroom like experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Market Impact */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-fg/[0.02] to-transparent">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <span className="h-px w-12 bg-gradient-to-r from-transparent to-fg/40" />
                  <span className="text-sm tracking-[0.3em] uppercase text-fg/60 font-medium">
                    Market Impact
                  </span>
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-semibold mb-6 leading-tight">
                Global Reach &
                <span className="block text-fg/70">New Revenue Streams</span>
              </h2>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl border border-fg/10 hover:border-fg/20 transition-colors">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="text-xl">◎</span>
                    Expanded Market Reach
                  </h4>
                  <p className="text-fg/70 leading-relaxed">
                    By removing geographical barriers, the Immersive Customizer expands reach to global
                    buyers including diaspora communities who can collaborate virtually, personalize their
                    homes remotely, and move forward faster with clarity and confidence.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-fg/10 hover:border-fg/20 transition-colors">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="text-xl">◈</span>
                    Embedded Analytics
                  </h4>
                  <p className="text-fg/70 leading-relaxed">
                    As clients customize, embedded analytics reveal cost implications in context—helping
                    them balance design and budget with confidence.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-fg/10 hover:border-fg/20 transition-colors">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="text-xl">◉</span>
                    Revenue Opportunities
                  </h4>
                  <p className="text-fg/70 leading-relaxed">
                    Integrate upsell paths for complementary items like finishes and furniture within the
                    experience, creating a complete ecosystem for buyers and additional margin for
                    developers.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Interactive Data Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transition: 'transform 0.3s ease' }}
            >
              <div className="relative aspect-square rounded-3xl border border-fg/10 bg-gradient-to-br from-fg/5 to-fg/10 overflow-hidden shadow-xl">
                {/* Interactive spotlight */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.08), transparent 40%)"
                  }}
                />

                {/* Data Visualization */}
                <div className="absolute inset-0 p-8">
                  {/* Central hub */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-20 h-20 -mt-10 -ml-10 rounded-full bg-fg/20 border-2 border-fg/40 flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <span className="text-2xl">◈</span>
                  </motion.div>

                  {/* Orbiting elements representing global reach */}
                  {[
                    { angle: 0, delay: 0, icon: "◎", label: "Global" },
                    { angle: 60, delay: 1, icon: "◢", label: "Mobile" },
                    { angle: 120, delay: 2, icon: "◣", label: "VR" },
                    { angle: 180, delay: 3, icon: "◉", label: "Revenue" },
                    { angle: 240, delay: 4, icon: "◧", label: "Analytics" },
                    { angle: 300, delay: 5, icon: "◨", label: "Customize" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-12 h-12 rounded-full bg-fg/10 border border-fg/30 flex items-center justify-center text-lg text-fg/70"
                      style={{ top: '50%', left: '50%', marginTop: '-24px', marginLeft: '-24px' }}
                      animate={{
                        x: Math.cos((item.angle * Math.PI) / 180) * 100,
                        y: Math.sin((item.angle * Math.PI) / 180) * 100,
                        rotate: 360
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                        delay: item.delay
                      }}
                    >
                      {item.icon}
                    </motion.div>
                  ))}

                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full">
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="100"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      fill="none"
                      animate={{ strokeDashoffset: [0, -32] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div
              className="group relative rounded-3xl bg-black text-white p-12 md:p-20 shadow-2xl overflow-hidden"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transition: 'transform 0.3s ease' }}
            >
              {/* Interactive spotlight */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1), transparent 40%)"
                }}
              />

              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:40px_40px]" />
              </div>

              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full border border-white/20 flex items-center justify-center"
                animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <span className="text-2xl text-white/70">◈</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center"
                animate={{ rotate: [360, 0], scale: [1.1, 1, 1.1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <span className="text-xl text-white/70">◉</span>
              </motion.div>

              <div className="relative z-10 text-center">
                <h3 className="text-3xl md:text-5xl font-semibold mb-6 leading-tight">
                  Ready to Transform
                  <span className="block text-white/80">Your Vision?</span>
                </h3>
                
                <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                  Let's scope your project together and find the fastest path to value. Whether it's 3D
                  visualization, AI automation, or custom solutions, we're here to bring your ideas to life.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <NavLink
                      to="/contact"
                      className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:bg-white/90 hover:shadow-xl transition-all duration-300"
                    >
                      Request Demo
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </NavLink>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <NavLink
                      to="/projects"
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/30 text-white hover:border-white/50 hover:bg-white/10 transition-all duration-300 font-semibold text-lg"
                    >
                      View More Projects
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-4 4m4-4l-4-4" />
                      </svg>
                    </NavLink>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}