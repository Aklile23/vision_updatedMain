import React, { useEffect, useMemo, useState } from "react";
import {
  Mail, User, Building2, MessageSquareText, Phone, MapPin, Clock3,
  Send, CheckCircle2, Link2, ArrowRight, Sparkles,
  Copy, Check, ExternalLink
} from "lucide-react";
import emailjs from '@emailjs/browser';


// Mock Container component
const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Topics = [
  "Immersive 3D",
  "Intelligent Building Systems",
  "Photogrammetry",
  "Custom AI / Automation",
  "BIM Outsourcing",
  "Other",
] as const;

type Topic = typeof Topics[number];

interface FormData {
  name: string;
  email: string;
  company: string;
  topic: Topic | "";
  message: string;
  // agree: boolean;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

// Mock form validation
const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};
  if (!data.name || data.name.trim().length < 2) errors.name = "Please enter your full name";
  if (!data.email || !data.email.includes("@")) errors.email = "Enter a valid email address";
  // if (!data.topic) errors.topic = "Please select a topic";
  // if (!data.message || data.message.trim().length < 12) errors.message = "Tell us a little more (min 12 characters)";
  if (data.message && data.message.length > 1200) errors.message = "Please keep it under 1200 characters";
  // if (!data.agree) errors.agree = "Please agree to be contacted";
  return errors;
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    topic: "",
    message: "",
    // agree: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [focusedField, setFocusedField] = useState<keyof FormData | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Pre-generate floating particle positions to avoid hydration mismatches
  const floaters = useMemo(
    () =>
      Array.from({ length: 12 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
      })),
    []
  );

  // Mouse tracking for subtle interactions
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  const messageChars = formData.message.length;
  const messageLimit = 1200;

  const handleInputChange = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    try{
      const serviceId = import.meta.env?.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env?.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env?.VITE_EMAILJS_PUBLIC_KEY 

      const templateParams = {
        name: formData.name,
        email: formData.email,
        company: formData.company || 'Not specified',
        topic: formData.topic || 'Not specified',
        message: formData.message,
        to_name: 'Development Team', 
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setSubmitted(true);
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        topic: "",
        message: "",
        // agree: false,
    });
    }catch (error) {
      console.error('EmailJS Error:', error);
      // setStatus("error");
    } finally {
      // setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setErrors({});
  };

  // Small utility: build a maps link
  // function mapHref(address: string) {
  //   const q = encodeURIComponent(address);
  //   return `https://www.google.com/maps/search/?api=1&query=${q}`;
  // }

  // Copy button used in contact rows
  function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = React.useState(false);
    return (
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          } catch {}
        }}
        className="inline-flex items-center gap-1 text-xs rounded-full border border-black/10 px-2 py-1 hover:bg-black/[0.04]"
        aria-label="Copy"
      >
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        {copied ? "Copied" : "Copy"}
      </button>
    );
  }

  // Reusable contact row
  function ContactRow({
    icon, label, value, href, copy = true,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string | null;
    copy?: boolean;
  }) {
    return (
      <li className="group/item flex items-center justify-between gap-3 rounded-xl border border-black/10 px-3 py-2 hover:bg-black/[0.02] transition-colors">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-black/5 flex items-center justify-center">{icon}</div>
          <div className="leading-tight">
            <div className="text-[11px] uppercase tracking-widest text-gray-600">{label}</div>
            {href ? (
              <a href={href} className="text-sm hover:underline">{value}</a>
            ) : (
              <div className="text-sm">{value}</div>
            )}
          </div>
        </div>
        {copy && <CopyButton text={value} />}
      </li>
    );
  }

  // Simple map iframe embed (no API key required)
  // function MapEmbed({ address, zoom = 15 }: { address: string; zoom?: number }) {
  //   const src = `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=${zoom}&output=embed`;
  //   return (
  //     <div className="relative">
  //       <iframe
  //         title={`Map to ${address}`}
  //         src={src}
  //         className="w-full aspect-[16/10]"
  //         loading="lazy"
  //         referrerPolicy="no-referrer-when-downgrade"
  //       />
  //     </div>
  //   );
  // }

  return (
    <main className="min-h-screen bg-white text-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full opacity-[0.02] bg-black transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            left: "10%",
            top: "20%",
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full opacity-[0.03] bg-black transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
            right: "15%",
            bottom: "30%",
          }}
        />
      </div>

      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {floaters.map((f, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-black/10 rounded-full animate-float"
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              animationDelay: `${f.delay}s`,
              animationDuration: `${f.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Hero section */}
      <section className="relative border-b border-black/5 bg-gradient-to-br from-white via-gray-50/30 to-white">
        <Container>
          {/* Floating grid pattern */}
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(var(--color-fg)_1px,transparent_1px),linear-gradient(90deg,var(--color-fg)_1px,transparent_1px)] [background-size:64px_64px]" />
          <div className="py-40 relative">
            <div className="animate-slideInUp">
              <div className="inline-flex items-center gap-2 rounded-full bg-black/5 px-4 py-2 text-xs tracking-wide backdrop-blur-sm border border-black/10">
                <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
                VisionLab — Addis Ababa • Global
              </div>
              <h1 className="font-bold mt-6 text-4xl md:text-6xl lg:text-7xl tracking-tight">
                {"Let's"} 
                <span className="inline-block ml-3 relative">
                  <span className="bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
                    talk
                  </span>
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black to-transparent opacity-20 animate-expand" />
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-gray-600 leading-relaxed">
                Tell us about your idea, brief, or challenge. We'll reply with next steps and
                a practical path forward.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Main content */}
      <section className="relative">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Form section */}
            <div className="lg:col-span-7">
              <div className="relative group">
                {/* Animated border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-black via-gray-400 to-black rounded-3xl opacity-0 group-hover:opacity-20 transition duration-500 blur-sm" />

                <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white/80 backdrop-blur-sm shadow-xl">
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br from-black via-transparent to-gray-900 pointer-events-none" />

                  <div className="p-8 lg:p-10 relative">
                    {!submitted ? (
                      <div className="animate-fadeIn">
                        <div className="flex items-center gap-3 mb-6 bg-b">
                          <Sparkles className="h-6 w-6 animate-pulse" />
                          <h2 className="font-bold text-2xl">Start a conversation</h2>
                        </div>
                        <p className="text-gray-600 mb-8 flex items-center gap-2">
                          <Clock3 className="h-4 w-4" />
                          We typically respond within one business day.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                          {/* Name + Email row */}
                          <div className="grid gap-6 sm:grid-cols-2">
                            <AnimatedField
                              label="Full name"
                              icon={<User className="h-4 w-4" />}
                              error={errors.name}
                              focused={focusedField === "name"}
                            >
                              <input
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                onFocus={() => setFocusedField("name")}
                                onBlur={() => setFocusedField(null)}
                                className="w-full rounded-xl border-2 border-black/10 bg-white/50 px-4 py-3 backdrop-blur-sm transition-all duration-300 focus:border-black focus:bg-white focus:shadow-lg focus:outline-none"
                                placeholder="Jane Doe"
                                autoComplete="name"
                              />
                            </AnimatedField>

                            <AnimatedField
                              label="Email"
                              icon={<Mail className="h-4 w-4" />}
                              error={errors.email}
                              focused={focusedField === "email"}
                            >
                              <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                onFocus={() => setFocusedField("email")}
                                onBlur={() => setFocusedField(null)}
                                className="w-full rounded-xl border-2 border-black/10 bg-white/50 px-4 py-3 backdrop-blur-sm transition-all duration-300 focus:border-black focus:bg-white focus:shadow-lg focus:outline-none"
                                placeholder="jane@company.com"
                                autoComplete="email"
                              />
                            </AnimatedField>
                          </div>

                          {/* Company + Topic row */}
                          <div className="grid gap-6 sm:grid-cols-2">
                            <AnimatedField
                              label="Company (optional)"
                              icon={<Building2 className="h-4 w-4" />}
                              error={errors.company}
                              focused={focusedField === "company"}
                            >
                              <input
                                value={formData.company}
                                onChange={(e) => handleInputChange("company", e.target.value)}
                                onFocus={() => setFocusedField("company")}
                                onBlur={() => setFocusedField(null)}
                                className="w-full rounded-xl border-2 border-black/10 bg-white/50 px-4 py-3 backdrop-blur-sm transition-all duration-300 focus:border-black focus:bg-white focus:shadow-lg focus:outline-none"
                                placeholder="Your organization"
                                autoComplete="organization"
                              />
                            </AnimatedField>

                            <AnimatedField
                              label="Topic (optional)"
                              icon={<Link2 className="h-4 w-4" />}
                              error={errors.topic}
                              focused={focusedField === "topic"}
                            >
                              <select
                                value={formData.topic}
                                onChange={(e) => handleInputChange("topic", e.target.value as Topic | "")}
                                onFocus={() => setFocusedField("topic")}
                                onBlur={() => setFocusedField(null)}
                                className="w-full rounded-xl border-2 border-black/10 bg-white/50 px-4 py-3 backdrop-blur-sm transition-all duration-300 focus:border-black focus:bg-white focus:shadow-lg focus:outline-none"
                              >
                                <option value="">Select a topic…</option>
                                {Topics.map((topic) => (
                                  <option key={topic} value={topic}>
                                    {topic}
                                  </option>
                                ))}
                              </select>
                            </AnimatedField>
                          </div>

                          {/* Message */}
                          <AnimatedField
                            label="Message"
                            icon={<MessageSquareText className="h-4 w-4" />}
                            error={errors.message}
                            focused={focusedField === "message"}
                          >
                            <textarea
                              rows={6}
                              value={formData.message}
                              onChange={(e) => handleInputChange("message", e.target.value)}
                              onFocus={() => setFocusedField("message")}
                              onBlur={() => setFocusedField(null)}
                              className="w-full resize-none rounded-xl border-2 border-black/10 bg-white/50 px-4 py-3 backdrop-blur-sm transition-all duration-300 focus:border-black focus:bg-white focus:shadow-lg focus:outline-none"
                              placeholder="How can we help?"
                            />
                            <div className="mt-2 flex justify-between items-center text-xs">
                              <div className={`transition-colors ${messageChars > messageLimit * 0.8 ? "text-red-500" : "text-gray-500"}`}>
                                {messageChars}/{messageLimit}
                              </div>
                              <div className="flex gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-1 h-1 rounded-full transition-colors duration-200 ${
                                      messageChars > (messageLimit / 5) * (i + 1) ? "bg-black" : "bg-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </AnimatedField>

                          {/* Consent checkbox */}
                          {/* <div className="flex items-start gap-4 p-4 rounded-xl bg-black/[0.02] border border-black/5">
                            <input
                              type="checkbox"
                              checked={formData.agree}
                              onChange={(e) => handleInputChange("agree", e.target.checked)}
                              className="mt-1 h-4 w-4 rounded border-2 border-black/20 text-black focus:ring-black/20"
                            />
                            <label className="text-sm leading-relaxed">
                              I agree to be contacted about my inquiry.{" "}
                              <span className="inline-flex items-center gap-1.5 text-gray-600">
                                <Shield className="h-3 w-3" />
                                We never share your info.
                              </span>
                            </label>
                          </div>
                          {errors.agree && (
                            <div className="text-sm text-red-600 animate-shake flex items-center gap-2">
                              <span className="w-1 h-1 bg-red-600 rounded-full" />
                              {errors.agree}
                            </div>
                          )} */}

                          {/* Submit button */}
                          <div className="pt-4">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="group relative overflow-hidden rounded-full bg-black px-8 py-4 text-white font-medium transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="relative flex items-center gap-3">
                                {isSubmitting ? (
                                  <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Sending…</span>
                                  </>
                                ) : (
                                  <>
                                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    <span>Send message</span>
                                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
                                  </>
                                )}
                              </div>
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <SuccessState onReset={resetForm} />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-5">
              <div className="sticky top-8 space-y-6">
                {/* Contact card - upgraded visuals */}
                <div className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white/80 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-2xl">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-black/10 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-xl flex items-center gap-2">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black text-white">
                          <Mail className="h-3 w-3"/>
                        </span>
                        Contact
                      </h3>
                      <span className="text-[10px] uppercase tracking-widest bg-black text-white px-2 py-1 rounded-full">
                        We reply fast
                      </span>
                    </div>

                    <ul className="space-y-3">
                      <ContactRow
                        icon={<Mail className="h-4 w-4" />}
                        label="Email"
                        value="contact@visionlab.ae"
                        href="mailto:contact@visionlab.ae"
                      />
                      <ContactRow
                        icon={<Phone className="h-4 w-4" />}
                        label="Phone"
                        value="+251963978798"
                        href="tel:+251963978798"
                      />
                      <ContactRow
                        icon={<Clock3 className="h-4 w-4" />}
                        label="Hours"
                        value="Mon—Sat · 9:00—18:00 EAT"
                        copy={false}
                      />
                    </ul>
                  </div>
                </div>

                {/* Map card with real address */}
                <div className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white/80 backdrop-blur-sm transition-shadow duration-300 hover:shadow-2xl">
              {/* Decorative hover wash — non-interactive + behind content */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/[0.03] via-transparent to-black/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

              <div className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-xl flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black text-white">
                      <MapPin className="h-3 w-3" />
                    </span>
                    Visit us
                  </h3>

                  {/* Use your exact link here */}
                  <a
                    className="inline-flex items-center gap-1 text-xs underline hover:no-underline relative z-20"
                    href="https://maps.app.goo.gl/h99yf6Dnja4sQSNN9"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Maps <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-black" />
                    <div className="text-sm">
                      <div className="font-medium">VisionLab HQ</div>
                      <div className="text-gray-600">Lidiya Building 4th floor, Addis Ababa, Ethiopia</div>
                    </div>
                  </div>

                  {/* Iframe wrapper: sits above overlays, isolates paints */}
                  <div className="overflow-hidden rounded-2xl border border-black/10 relative z-10 pointer-events-auto will-change-transform [transform:translateZ(0)]">
                    <iframe
                      title="VisionLab HQ Map"
                      // Embedding via query; using your short link as the query string works in practice.
                      // If your setup blocks it, replace the query with a plain address string.
                      src={`https://www.google.com/maps?q=${encodeURIComponent('Lidiya Building')}&output=embed`}

                      className="w-full aspect-[16/10]"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
                {/* Quick links - elevated */}
                <div className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white/80 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <h3 className="font-bold text-xl mb-4">Quick links</h3>
                    <ul className="space-y-2">
                      {[
                        { text: "Solutions overview", href: "/solutions" },
                        { text: "Featured projects", href: "/projects" },
                        { text: "About VisionLab", href: "/about" },
                      ].map((link, index) => (
                        <li key={index}>
                          <a
                            href={link.href}
                            className="group/link flex items-center justify-between text-sm rounded-xl border border-transparent px-3 py-2 hover:border-black/10 hover:bg-black/[0.02] transition-all duration-200"
                          >
                            <span className="flex items-center gap-2">
                              <ArrowRight className="h-3 w-3 opacity-60 group-hover/link:translate-x-1 transition-transform" />
                              {link.text}
                            </span>
                            <span className="text-[10px] uppercase tracking-widest opacity-60">Explore</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Converted from <style jsx> to a plain <style> tag so it works outside Next.js too */}
      <style>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes expand { from { width: 0; } to { width: 100%; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-2px); } 75% { transform: translateX(2px); } }
        .animate-slideInUp { animation: slideInUp 0.8s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-expand { animation: expand 1.5s ease-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-shake { animation: shake 0.3s ease-in-out; }
      `}</style>
    </main>
  );
}

// Animated field component
function AnimatedField({ label, icon, error, focused, children }: {
  label: string;
  icon: React.ReactNode;
  error?: string;
  focused: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        className={`flex items-center gap-2 text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${focused ? "text-black" : "text-gray-600"}`}
      >
        <span className={`transition-transform duration-200 ${focused ? "scale-110" : ""}`}>{icon}</span>
        {label}
      </label>
      <div className="relative">{children}</div>
      {error && (
        <div className="text-sm text-red-600 animate-shake flex items-center gap-2">
          <span className="w-1 h-1 bg-red-600 rounded-full" />
          {error}
        </div>
      )}
    </div>
  );
}

// Success state component
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center animate-fadeIn">
      <div className="relative">
        <CheckCircle2 className="h-16 w-16 text-green-500 animate-pulse" />
        <div className="absolute inset-0 bg-black rounded-full animate-ping opacity-20" />
      </div>
      <div>
        <h3 className="font-bold text-2xl mb-3">Message sent </h3>
        <p className="max-w-md text-gray-600 leading-relaxed">
          Thanks for reaching out. We'll get back to you shortly.
        </p>
      </div>
      <button
        onClick={onReset}
        className="group inline-flex items-center gap-2 rounded-full border-2 border-black px-6 py-3 font-medium transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 active:scale-95"
      >
        <Send className="h-4 w-4 transition-transform group-hover:rotate-12" />
        Send another message
        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
      </button>
    </div>
  );
}
