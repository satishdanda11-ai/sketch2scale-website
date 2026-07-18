import { useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </motion.div>
  );
}

const faqs = [
  {
    q: "What is the difference between Contact and the Discovery Workshop?",
    a: "Contact is for specific, time-sensitive inquiries — partnerships, press, or questions the rest of the site did not answer. The Discovery Workshop is a structured session with a written output, for people who are ready to begin a transformation conversation. If you are evaluating a partnership, start with the Workshop.",
  },
  {
    q: "How quickly do you respond?",
    a: "Within two business days for all Contact form submissions. Workshop requests also receive a response within two business days, plus a preparation guide before the session.",
  },
  {
    q: "Do you work with early-stage companies, or only established organisations?",
    a: "Both. The Business and Product pillars are particularly relevant for founders pre- and post-funding. The Industries page maps specific capabilities to specific situations — Startups are a named cluster, not an afterthought.",
  },
  {
    q: "Do you work globally, or only in specific geographies?",
    a: "Remotely with any organisation, in any geography. We are based in India (sketch2scale.in) but the Six-S Method is geography-independent. In-person Discovery Workshops can be arranged depending on location.",
  },
  {
    q: "What if our situation does not fit neatly into one of the six pillars?",
    a: "It rarely does — most meaningful transformations span two or three. The Discovery Workshop is designed specifically to map your situation to the most relevant pillar sequence, rather than asking you to self-select in advance.",
  },
  {
    q: "What happens if we complete a Discovery Workshop and decide not to proceed?",
    a: "You keep the written output — a summary of findings and a starting-point recommendation. It is yours regardless of what happens next. We position the Workshop as valuable on its own, not as a thinly disguised sales process.",
  },
];

type InquiryType = "" | "partnership" | "press" | "general" | "careers";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", org: "", email: "", type: "" as InquiryType, message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-[#f5f0e8]">
      {/* Hero */}
      <section className="pt-40 pb-20 bg-[#0d0d0d]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-6" style={{ fontFamily: "var(--font-mono)" }}>Contact</p>
            <h1 className="text-[clamp(40px,6vw,82px)] font-medium text-[#f5f0e8] leading-[1.05] max-w-3xl mb-8" style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}>
              A specific question
              <br />
              <em className="italic text-[#b8914a]">deserves a direct answer.</em>
            </h1>
            <p className="text-[17px] text-[rgba(245,240,232,0.55)] leading-relaxed max-w-xl">
              If you are evaluating a partnership, the Discovery Workshop is the better starting point. Contact is for everything else.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Office */}
      <section className="py-20 lg:py-28 bg-[#f5f0e8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <FadeIn>
                {submitted ? (
                  <div className="border border-[#b8914a] p-10">
                    <Check size={28} className="text-[#b8914a] mb-6" />
                    <h3 className="text-[22px] font-medium text-[#0d0d0d] mb-3" style={{ fontFamily: "var(--font-serif)" }}>Received.</h3>
                    <p className="text-[14px] text-[#8a8070] leading-relaxed">
                      We will respond within two business days. If your inquiry is time-sensitive, mention it in the message — we will prioritise accordingly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] tracking-[0.15em] uppercase text-[#8a8070] mb-2" style={{ fontFamily: "var(--font-mono)" }}>Name *</label>
                        <input
                          required
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full bg-transparent border border-[rgba(13,13,13,0.15)] px-4 py-3 text-[14px] text-[#0d0d0d] placeholder-[#c4bdb0] focus:outline-none focus:border-[#b8914a] transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] tracking-[0.15em] uppercase text-[#8a8070] mb-2" style={{ fontFamily: "var(--font-mono)" }}>Organisation</label>
                        <input
                          name="org"
                          value={form.org}
                          onChange={handleChange}
                          className="w-full bg-transparent border border-[rgba(13,13,13,0.15)] px-4 py-3 text-[14px] text-[#0d0d0d] placeholder-[#c4bdb0] focus:outline-none focus:border-[#b8914a] transition-colors"
                          placeholder="Company or organisation"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] tracking-[0.15em] uppercase text-[#8a8070] mb-2" style={{ fontFamily: "var(--font-mono)" }}>Email *</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-[rgba(13,13,13,0.15)] px-4 py-3 text-[14px] text-[#0d0d0d] placeholder-[#c4bdb0] focus:outline-none focus:border-[#b8914a] transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] tracking-[0.15em] uppercase text-[#8a8070] mb-2" style={{ fontFamily: "var(--font-mono)" }}>Nature of Inquiry *</label>
                      <select
                        required
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className="w-full bg-[#f5f0e8] border border-[rgba(13,13,13,0.15)] px-4 py-3 text-[14px] text-[#0d0d0d] focus:outline-none focus:border-[#b8914a] transition-colors"
                      >
                        <option value="">Select inquiry type</option>
                        <option value="partnership">Partnership inquiry</option>
                        <option value="press">Press or media inquiry</option>
                        <option value="general">General question</option>
                        <option value="careers">Careers or collaboration</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] tracking-[0.15em] uppercase text-[#8a8070] mb-2" style={{ fontFamily: "var(--font-mono)" }}>Message *</label>
                      <textarea
                        required
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full bg-transparent border border-[rgba(13,13,13,0.15)] px-4 py-3 text-[14px] text-[#0d0d0d] placeholder-[#c4bdb0] focus:outline-none focus:border-[#b8914a] transition-colors resize-none"
                        placeholder="What would you like to discuss?"
                      />
                    </div>
                    <button type="submit" className="flex items-center gap-3 bg-[#0d0d0d] text-[#f5f0e8] text-[12px] tracking-[0.12em] uppercase font-medium px-6 py-3.5 hover:bg-[#b8914a] transition-colors group">
                      Send Message
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                )}
              </FadeIn>
            </div>

            {/* Office + Workshop Link */}
            <div className="lg:col-span-4 lg:col-start-9">
              <FadeIn delay={0.15}>
                <div className="space-y-10">
                  <div>
                    <p className="text-[11px] tracking-[0.15em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>Office</p>
                    <p className="text-[15px] text-[#0d0d0d] mb-1" style={{ fontFamily: "var(--font-serif)" }}>Sketch2Scale</p>
                    <p className="text-[13px] text-[#8a8070]">India</p>
                    <a href="https://sketch2scale.in" className="text-[13px] text-[#b8914a] hover:text-[#d4a85a] transition-colors mt-1 block">sketch2scale.in</a>
                  </div>

                  <div>
                    <p className="text-[11px] tracking-[0.15em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>Response Time</p>
                    <p className="text-[14px] text-[#2a2826] leading-relaxed">
                      All inquiries receive a response within two business days. We do not use automated acknowledgement emails — you will hear from a person.
                    </p>
                  </div>

                  <div className="border border-[rgba(13,13,13,0.1)] p-6">
                    <p className="text-[12px] tracking-[0.1em] uppercase text-[#8a8070] mb-3" style={{ fontFamily: "var(--font-mono)" }}>Evaluating a partnership?</p>
                    <p className="text-[13px] text-[#2a2826] mb-4 leading-relaxed">
                      The Discovery Workshop is the better starting point — a structured session with a written output, not a sales conversation.
                    </p>
                    <Link to="/discovery-workshop" className="flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase text-[#b8914a] hover:text-[#d4a85a] transition-colors group">
                      Book a Discovery Workshop <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#ece6d8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>FAQ</p>
            <h2 className="text-[clamp(24px,3.5vw,44px)] font-medium text-[#0d0d0d] leading-tight mb-12" style={{ fontFamily: "var(--font-serif)" }}>
              Questions we are often asked.
            </h2>
          </FadeIn>

          <div className="space-y-px max-w-3xl">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="border-b border-[rgba(13,13,13,0.08)]">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-6 text-left gap-6"
                    aria-expanded={expandedFaq === i}
                  >
                    <span className="text-[16px] font-medium text-[#0d0d0d]" style={{ fontFamily: "var(--font-serif)" }}>{faq.q}</span>
                    <span className="text-[20px] text-[#8a8070] flex-shrink-0">{expandedFaq === i ? "−" : "+"}</span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: expandedFaq === i ? "auto" : 0, opacity: expandedFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-[14px] text-[#8a8070] leading-relaxed pb-6">{faq.a}</p>
                  </motion.div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
