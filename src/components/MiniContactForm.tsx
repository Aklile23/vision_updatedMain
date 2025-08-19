import React, { useState } from "react";
import Container from "../components/Container";
import { motion, type Variants } from "framer-motion";
import emailjs from '@emailjs/browser';
import {
  Mail,
  User,
  MessageSquareText,
  Send,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

/** --- Motion variants (typed) --- */
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }, // typed as Easing
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

type Topic =
  | "Immersive 3D"
  | "Intelligent Building Systems"
  | "Photogrammetry"
  | "Custom AI / Automation"
  | "BIM Outsourcing"
  | "Other";

interface MiniFormData {
  name: string;
  email: string;
  topic: Topic | "";
  message: string;
}

export default function MiniContactForm() {
  const [form, setForm] = useState<MiniFormData>({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [focused, setFocused] = useState<keyof MiniFormData | null>(null);

  const handle = <K extends keyof MiniFormData>(k: K, v: MiniFormData[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    setStatus("loading");
    
    try {
      const serviceId = import.meta.env?.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env?.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env?.VITE_EMAILJS_PUBLIC_KEY 

      // Template parameters that will be sent to EmailJS
      const templateParams = {
        name: form.name,
        email: form.email,
        topic: form.topic || 'Not specified',
        message: form.message,
        to_name: 'Development Team', 
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setStatus("success");
      setForm({ name: "", email: "", topic: "", message: "" });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section className="relative border-t border-fg/10 bg-muted-1/40 py-16 md:py-20 overflow-hidden"> 
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-12"
        >
          {/* Left: Intro */}
          <motion.aside
            variants={fadeInUp}
            className="lg:col-span-5 rounded-3xl border border-fg/10 bg-bg/60 backdrop-blur-sm p-7 md:p-9 relative overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-fg/[0.04] via-transparent to-fg/[0.06]" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-fg/10 px-3 py-1.5 text-[11px] tracking-widest uppercase border border-fg/15">
                <Sparkles className="h-3.5 w-3.5" />
                Collaborate with us
              </div>
              <h3 className="heading text-2xl md:text-3xl mt-4">
                Let's make something brilliant together.
              </h3>
              <p className="mt-3 text-fg/70">
                Share a few details about your goals. We'll reply with next
                steps and a practical path forward.
              </p>

              <ul className="mt-6 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 opacity-70" />
                  We usually respond within one business day.
                </li>
              </ul>
            </div>
          </motion.aside>

          {/* Right: Form */}
          <motion.div variants={fadeInUp} className="lg:col-span-7 group relative">
            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-fg/40 via-transparent to-fg/40 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-30" />
            <div className="relative overflow-hidden rounded-3xl border border-fg/10 bg-bg/70 backdrop-blur-sm">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-fg/[0.03] via-transparent to-fg/[0.05]" />
              <form onSubmit={submit} className="relative p-7 md:p-9 grid gap-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Field
                    label="Full name"
                    icon={<User className="h-4 w-4" />}
                    focused={focused === "name"}
                  >
                    <FloatingInput
                      name="name"
                      value={form.name}
                      placeholder="Jane Doe"
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      onChange={(v) => handle("name", v)}
                    />
                  </Field>

                  <Field
                    label="Email"
                    icon={<Mail className="h-4 w-4" />}
                    focused={focused === "email"}
                  >
                    <FloatingInput
                      name="email"
                      type="email"
                      value={form.email}
                      placeholder="jane@company.com"
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      onChange={(v) => handle("email", v)}
                    />
                  </Field>
                </div>

                <Field
                  label="Message"
                  icon={<MessageSquareText className="h-4 w-4" />}
                  focused={focused === "message"}
                >
                  <FloatingTextarea
                    name="message"
                    value={form.message}
                    placeholder="Briefly describe your goals, timeline, and constraints."
                    rows={5}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    onChange={(v) => handle("message", v)}
                  />
                  <div className="mt-2 flex items-center justify-between text-xs text-fg/60">
                    <span>{form.message.length}/600</span>
                    <span className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const on = form.message.length > (600 / 5) * (i + 1);
                        return (
                          <span
                            key={i}
                            className={`w-1 h-1 rounded-full ${
                              on ? "bg-fg/70" : "bg-fg/20"
                            }`}
                          />
                        );
                      })}
                    </span>
                  </div>
                </Field>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={
                      status === "loading" ||
                      !form.name ||
                      !form.email ||
                      !form.message
                    }
                    className="group/btn relative inline-flex items-center gap-3 rounded-full bg-fg px-7 py-3 text-bg font-medium transition-all duration-300 hover:bg-fg/90 hover:shadow-2xl hover:shadow-fg/20 disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <>
                        <span className="inline-block h-4 w-4 rounded-full border-2 border-bg border-t-transparent animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                        Send message
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover/btn:opacity-100 group-hover/btn:translate-x-0" />
                      </>
                    )}
                  </button>
                </div>

                {status === "success" && (
                  <div className="flex items-center gap-3 rounded-2xl border border-fg/15 bg-fg/5 p-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    Message sent — we'll be in touch shortly.
                  </div>
                )}
                {status === "error" && (
                  <div className="text-sm rounded-2xl border border-red-300/50 bg-red-50/60 text-red-700 p-3">
                    Something went wrong. Please try again.
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ---------- Subcomponents ---------- */

function Field({
  label,
  icon,
  focused,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  focused: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        className={`flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider transition-colors ${
          focused ? "text-fg" : "text-fg/70"
        }`}
      >
        <span className={`transition-transform ${focused ? "scale-110" : ""}`}>
          {icon}
        </span>
        {label}
      </label>
      <div className="relative">{children}</div>
    </div>
  );
}

function FloatingInput({
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  type = "text",
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  placeholder: string;
  type?: string;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || !!value;
  
  const handleFocus = () => {
    setIsFocused(true);
    onFocus();
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    onBlur();
  };

  return (
    <div className="relative">
      <input
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required
        className="peer w-full rounded-xl border-2 border-fg/15 bg-bg/60 px-4 pt-6 pb-2 backdrop-blur-sm outline-none transition-all focus:border-fg focus:bg-bg"
      />
      <span
        className={`pointer-events-none absolute left-4 text-fg/50 transition-all duration-200 ease-out ${
          isActive
            ? "top-1.5 text-[11px] text-fg/80"
            : "top-3.5 text-sm"
        }`}
      >
        {placeholder}
      </span>
    </div>
  );
}

function FloatingTextarea({
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  rows = 5,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  placeholder: string;
  rows?: number;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || !!value;
  
  const handleFocus = () => {
    setIsFocused(true);
    onFocus();
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    onBlur();
  };

  return (
    <div className="relative">
      <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, 600))}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required
        className="peer w-full resize-none rounded-xl border-2 border-fg/15 bg-bg/60 px-4 pt-6 pb-3 backdrop-blur-sm outline-none transition-all focus:border-fg focus:bg-bg"
      />
      <span
        className={`pointer-events-none absolute left-4 text-fg/50 transition-all duration-200 ease-out ${
          isActive
            ? "top-1.5 text-[11px] text-fg/80"
            : "top-3.5 text-sm"
        }`}
      >
        {placeholder}
      </span>
    </div>
  );
}