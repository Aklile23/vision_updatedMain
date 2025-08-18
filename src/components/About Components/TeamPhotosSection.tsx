import { motion } from "framer-motion";

// Drop your images in /public/team and update the paths below
const team = [
  {
    name: "Selam Dawit",
    role: "Creative Technologist, 3D/VR",
    img: "/team/selam.jpg",
    bio: "Leads immersive pipelines and real‑time rendering for VR/AR demos.",
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "Nahom Bekele",
    role: "AI & Computer Vision Engineer",
    img: "/team/nahom.jpg",
    bio: "Builds perception systems and ML‑powered visual tooling.",
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "Liya Abate",
    role: "BIM & Architecture Tech",
    img: "/team/liya.jpg",
    bio: "Integrates BIM data with interactive spatial experiences.",
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "Mikal Tadesse",
    role: "Design & Prototyping",
    img: "/team/mikal.jpg",
    bio: "Rapid UX prototyping with a love for motion and micro‑interactions.",
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "Yared Solomon",
    role: "Strategy & Partnerships",
    img: "/team/yared.jpg",
    bio: "Connects VisionLab with collaborators and global clients.",
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "Hanna Girma",
    role: "Full‑Stack / Realtime",
    img: "/team/hanna.jpg",
    bio: "Ships performant web and realtime tooling for showcases.",
    linkedin: "https://www.linkedin.com/"
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.06 }
  })
};

export default function TeamPhotosSection() {
  return (
    <section className="py-24 bg-black border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-white/40" />
          <span className="text-sm tracking-[0.3em] uppercase text-white/60 font-medium">
            Meet the People
          </span>
        </div>

        <h2 className="heading text-4xl md:text-5xl text-white leading-tight">
          Faces behind the Innovation
        </h2>
        <p className="mt-4 text-white/70 max-w-3xl">
          A small, multidisciplinary team in Addis Ababa building VR/AR, AI/CV, and BIM
          experiences for a global audience.
        </p>

        {/* Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <motion.article
              key={m.name}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
            >
              {/* Image wrapper */}
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={m.img}
                  alt={`${m.name} – ${m.role}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  style={{ filter: "grayscale(100%) contrast(1.1) brightness(0.95)" }}
                />
                {/* Duotone overlay that softens on hover to keep brand style */}
                <div className="absolute inset-0 transition-opacity duration-500"
                     style={{ background:
                        "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.25) 100%)" }}
                />

                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{ background:
                        "radial-gradient(240px circle at 70% 30%, rgba(255,255,255,0.10), transparent 40%)" }}
                />
              </div>

              {/* Text content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-white font-semibold text-lg leading-tight">{m.name}</h3>
                    <p className="text-white/60 text-sm mt-1">{m.role}</p>
                  </div>
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="shrink-0 rounded-full border border-white/15 px-3 py-1 text-xs text-white/70 hover:border-white/30 hover:text-white transition-colors"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{m.bio}</p>
              </div>

              {/* Bottom accent line */}
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
