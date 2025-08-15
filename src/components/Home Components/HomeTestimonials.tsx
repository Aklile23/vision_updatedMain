// HomeTestimonials.tsx — upgraded to modern, interactive cards (keeps theme)
import Container from "../Container";
import { motion, type Variants } from "framer-motion";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

// hover tilt + spotlight — works for both <div> and <blockquote>
function onCardMove(e: React.MouseEvent<HTMLDivElement>): void;
function onCardMove(e: React.MouseEvent<HTMLQuoteElement>): void;
function onCardMove(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget as HTMLElement;
  const r = el.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  const midX = r.width / 2;
  const midY = r.height / 2;
  const rx = ((y - midY) / midY) * 6; // max ~6deg
  const ry = ((midX - x) / midX) * 8; // max ~8deg
  el.style.setProperty("--rx", `${rx}deg`);
  el.style.setProperty("--ry", `${ry}deg`);
  el.style.setProperty("--px", `${x}px`);
  el.style.setProperty("--py", `${y}px`);
}

function onCardLeave(e: React.MouseEvent<HTMLDivElement>): void;
function onCardLeave(e: React.MouseEvent<HTMLQuoteElement>): void;
function onCardLeave(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget as HTMLElement;
  el.style.setProperty("--rx", `0deg`);
  el.style.setProperty("--ry", `0deg`);
  el.style.setProperty("--px", `-9999px`);
  el.style.setProperty("--py", `-9999px`);
}


const HomeTestimonials = () => {
  const testimonialRefs = useRef<HTMLQuoteElement[]>([]);

  function setAt<T extends HTMLElement>(arr: React.MutableRefObject<T[]>, index: number) {
    return (el: T | null): void => {
      if (el) arr.current[index] = el;
    };
  }

  const items = [
    {
      q: "Their immersive solution changed how we present projects — polished and reliable.",
      a: "Industry Partner",
      role: "Real Estate",
    },
    {
      q: "They collaborate closely and deliver with precision. Strong technical depth.",
      a: "Technology Consultant",
      role: "Systems Integration",
    },
    {
      q: "Quality execution from concept to hand-off. Clear communication throughout.",
      a: "Project Coordinator",
      role: "Construction",
    },
  ];

  return (
    <section className="relative py-16 md:py-20">
      {/* subtle grid background to match theme */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(var(--color-fg)_1px,transparent_1px),linear-gradient(90deg,var(--color-fg)_1px,transparent_1px)] [background-size:72px_72px]" />

      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {/* Header */}
          <motion.div className="text-center mb-10" variants={fadeInUp}>
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-fg/40" />
              <span className="text-[13px] tracking-[0.25em] uppercase text-fg/70">What Clients Say</span>
              <span className="h-px w-10 bg-fg/40" />
            </div>
            <h2 className="heading text-3xl md:text-4xl">Testimonials</h2>
          </motion.div>

          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {items.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                className="group relative"
              >
                {/* glow halo on hover */}
                <div
                  className="pointer-events-none absolute -inset-0.5 rounded-3xl opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "conic-gradient(from 180deg at 50% 50%, rgba(var(--color-fg-rgb),0.35), transparent 55%, rgba(var(--color-fg-rgb),0.35))",
                  }}
                />

                {/* card */}
                <blockquote
                  ref={setAt<HTMLQuoteElement>(testimonialRefs, i)}
                  onMouseMove={onCardMove}
                  onMouseLeave={onCardLeave}
                  className={[
                    "relative h-full overflow-hidden rounded-3xl border border-fg/15 bg-bg/70 backdrop-blur-sm",
                    "transition-[transform,box-shadow,border-color] duration-300 will-change-transform",
                    "hover:shadow-2xl hover:shadow-fg/10 hover:border-fg/30",
                    "p-6",
                  ].join(" ")}
                  style={{
                    transform: "perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
                  }}
                >
                  {/* interactive spotlight */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(320px circle at var(--px,-9999px) var(--py,-9999px), rgba(255,255,255,0.06), transparent 40%)",
                    }}
                  />

                  {/* corner quote icon */}
                  <Quote className="absolute -top-3 -right-3 h-12 w-12 text-fg/10" />

                  {/* rating row */}
                  <div className="mb-3 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 text-fg/70 fill-current" />
                    ))}
                  </div>

                  {/* quote text */}
                  <p className="text-sm md:text-base leading-relaxed text-fg/90">“{t.q}”</p>

                  {/* divider */}
                  <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-fg/20 to-transparent" />

                  {/* author */}
                  <footer className="flex items-center justify-between">
                    <div className="min-w-0">
                      <div className="text-sm font-medium">{t.a}</div>
                      <div className="text-xs text-fg/60">{t.role}</div>
                    </div>

                    {/* micro-cta */}
                    <div className="inline-flex items-center gap-1.5 text-xs text-fg/70 opacity-80 transition group-hover:opacity-100">
                      <span className="hidden sm:inline">Case study</span>
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  </footer>
                </blockquote>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default HomeTestimonials;
