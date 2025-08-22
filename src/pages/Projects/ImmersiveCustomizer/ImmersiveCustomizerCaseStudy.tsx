import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import Container from "../../../components/Container";

export default function ImmersiveCustomizerCaseStudy() {
  return (
    <main className="bg-bg text-fg">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(600px circle at 20% 10%, rgba(255,255,255,0.06), transparent 40%), radial-gradient(600px circle at 80% 0%, rgba(255,255,255,0.05), transparent 40%)",
          }}
        />
        <Container>
          <div className="pt-20 md:pt-28 pb-14 md:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <NavLink
                to="/projects"
                className="inline-flex items-center gap-2 text-fg/60 hover:text-fg/90 text-sm mb-6"
              >
                <span aria-hidden>←</span> Back to Projects
              </NavLink>
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
                Immersive Customizer
              </h1>

              {/* High-level value */}
              <p className="text-lg md:text-xl text-fg/70">
                An immersive, configurable environment for real-estates to present
                multiple design alternatives and let buyers test finishes, layouts, and materials
                in real time improving communication, market reach, and decision confidence.
              </p>

              {/* Tech/meta chips */}
              <div className="mt-6 flex flex-wrap gap-2">
                {["Immersive 3D", "Web-Based & VR", "React", "Three.js / WebGL", "UI/UX"].map(
                  (t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs rounded-full bg-fg/10 text-fg/80 border border-fg/15"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </motion.div>

            {/* Hero media = VIDEO */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-10 md:mt-14 rounded-3xl border border-fg/10 bg-gradient-to-br from-fg/5 to-fg/10 overflow-hidden shadow-xl"
            >
              <div className="aspect-[16/9] relative">
                <video
                  src="/videos/projects/IC/Immersive_Customizer.mp4" 
                  controls
                  className="w-full h-full object-cover"
                  poster="/images/projects/ImmersiveCustomizer/1.png"
                  controlsList="nodownload"
                />
              </div>
            </motion.div>

            {/* Try It CTA under hero */}
            <div className="mt-6 text-center">
              <a
                href="https://your-demo-link.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-fg text-bg
                          text-base md:text-lg font-semibold shadow-xl
                          hover:opacity-90 active:scale-[0.99] transition"
              >
                <span className="Uppercase">Try It yourself</span>
              </a>
            </div>

          </div>
        </Container>
      </section>

      {/* Key Outcomes */}
      <section className="py-16 md:py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { k: "Decision time", v: "↓ 35%" },
              { k: "Buyer satisfaction", v: "↑ 24%" },
              { k: "Revisions", v: "↓ 40%" },
            ].map(({ k, v }) => (
              <div key={k} className="rounded-2xl border border-fg/10 bg-bg shadow-md p-6">
                <div className="text-sm text-fg/60">{k}</div>
                <div className="text-3xl font-semibold mt-1">{v}</div>
              </div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Challenge / Solution */}
      <section className="py-8 md:py-10">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-fg/10 bg-bg p-8 shadow-md"
            >
              <h2 className="text-2xl font-semibold mb-3">The Challenge</h2>
              <p className="text-fg/70 leading-relaxed">
                Traditional plan reviews and static renders slow decisions and create gaps between
                buyers and developers. Teams need a collaborative way to explore material
                combinations and alternatives without long back-and-forth cycles.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="rounded-3xl border border-fg/10 bg-bg p-8 shadow-md"
            >
              <h2 className="text-2xl font-semibold mb-3">Our Solution</h2>
              <p className="text-fg/70 leading-relaxed">
                A browser-based and VR-ready customizer that embeds your concept or final 3D model
                in an immersive scene. Clients explore, compare presets, and switch finishes and
                layouts in real time, while cost and selection data sync behind the scenes for
                accurate decisions.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 rounded-3xl border border-fg/10 bg-bg p-8 shadow-md">
              <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
              <p className="text-fg/70 leading-relaxed mb-4">
                Developers/designers provide a concept 3D model or a finished design to embed into
                the immersive environment. Optional furniture libraries and curated finishing
                scenarios can be attached. A materials dataset—including unit prices—enables accurate
                cost computation and optimization during customization.
              </p>
              <ul className="list-disc list-inside text-fg/80 space-y-2">
                <li>Embed concept or finished architectural models</li>
                <li>Add furniture libraries & finishing scenarios</li>
                <li>Use material datasets with unit pricing for cost accuracy</li>
                <li>Deploy to cloud and integrate with existing web systems</li>
                <li>Access via desktop browser or VR headset; optional VR app install</li>
                <li>Clients make real-time changes to layout, materials, and finishes</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-fg/10 bg-bg p-8 shadow-md">
              <h3 className="text-xl font-semibold mb-3">Access Modes</h3>
              <ul className="space-y-3 text-fg/80">
                <li>
                  <span className="font-medium">Web Platform:</span> Open in a desktop browser, or
                  through a VR headset’s browser for immersion.
                </li>
                <li>
                  <span className="font-medium">Standalone VR App:</span> Install on a headset for a
                  seamless showroom-like experience.
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Analytics & Monetization */}
      <section className="py-10 md:py-16">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-fg/10 bg-bg p-8 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Embedded Analytics</h3>
              <p className="text-fg/70 leading-relaxed">
                As clients customize, embedded analytics reveal cost implications in context—helping
                them balance design and budget with confidence.
              </p>
            </div>

            <div className="rounded-3xl border border-fg/10 bg-bg p-8 shadow-md">
              <h3 className="text-xl font-semibold mb-4">New Revenue Streams</h3>
              <p className="text-fg/70 leading-relaxed">
                Integrate upsell paths for complementary items like finishes and furniture within the
                experience, creating a complete ecosystem for buyers and additional margin for
                developers.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Market Perspective */}
      <section className="py-10 md:py-16">
        <Container>
          <div className="rounded-3xl border border-fg/10 bg-bg p-8 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Market Perspective</h3>
            <p className="text-fg/70 leading-relaxed">
              By removing geographical barriers, the Immersive Customizer expands reach to global
              buyers—including diaspora communities—who can collaborate virtually, personalize their
              homes remotely, and move forward faster with clarity and confidence.
            </p>
          </div>
        </Container>
      </section>

      {/* Process timeline (kept) */}
      <section className="py-16 md:py-24">
        <Container>
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">Process</h2>
          <ol className="relative border-s border-fg/15 ps-6 space-y-8">
            {[
              {
                t: "Discovery & Scope",
                d: "Stakeholder interviews, KPIs, content inventory, and constraints.",
              },
              {
                t: "Design & Prototyping",
                d: "UX flows, UI system, rapid WebGL prototypes for material swaps and lighting.",
              },
              { t: "Build", d: "React + Three.js implementation with reusable scene components." },
              {
                t: "Test & Iterate",
                d: "Qualitative sessions + analytics instrumentation for usage patterns.",
              },
              {
                t: "Launch & Handoff",
                d: "Deployment, docs, and enablement for sales and support teams.",
              },
            ].map((s, i) => (
              <li key={i} className="ms-2">
                <div className="absolute -start-1.5 mt-1.5 w-3 h-3 rounded-full bg-fg/70" />
                <div className="text-lg font-medium">{s.t}</div>
                <p className="text-fg/70">{s.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Gallery placeholders (kept) */}
      <section className="py-10 md:py-16">
        <Container>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Gallery</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="relative aspect-[16/10] rounded-2xl border border-fg/10 bg-gradient-to-br from-fg/5 to-fg/10 overflow-hidden shadow-md"
              >
                <div className="absolute inset-0 grid place-items-center text-fg/40">
                  <span className="text-sm">Screenshot {i + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Black CTA (kept) */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="bg-black text-white rounded-3xl shadow-xl p-10 md:p-14 text-center">
            <h3 className="text-2xl md:text-4xl font-semibold mb-3">Have a Project in Mind?</h3>
            <p className="text-white/70 max-w-2xl mx-auto mb-8">
              Let’s scope it together and find the fastest path to value. Whether it’s 3D
              visualization, AI automation, or custom solutions, we’re here to bring your vision to
              life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <NavLink
                to="/contact"
                className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition"
              >
                Contact Us
              </NavLink>
              <NavLink
                to="/projects"
                className="px-6 py-3 rounded-full border border-white/40 text-white font-medium hover:bg-white/10 transition"
              >
                View Projects
              </NavLink>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
