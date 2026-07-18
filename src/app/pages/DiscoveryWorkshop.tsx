import { useRef, useState } from "react";
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

const objectives = [
  "Clarify your actual transformation need — not what you think you need, but what the evidence points to",
  "Identify which of the six pillars are relevant to your situation, and in what order",
  "Produce a shared point of view on what 'scaled' looks like for this specific business",
  "Define a recommended starting point within the Six-S Method",
];

const agenda = [
  { time: "0:00 — 0:30", label: "Current State", desc: "Where the business is now, objectively — not the elevator pitch version" },
  { time: "0:30 — 1:00", label: "Ambition", desc: "Where you want to be, and by what signals you'll know you've arrived" },
  { time: "1:00 — 1:30", label: "Constraints", desc: "What is genuinely fixed and what is assumed to be fixed but isn't" },
  { time: "1:30 — 2:00", label: "Transformation Mapping", desc: "First-pass articulation of the relevant pillars and their sequencing" },
  { time: "2:00 — 2:30", label: "Synthesis & Output", desc: "Live documentation of findings and a draft starting-point recommendation" },
];

const deliverables = [
  "A written summary of current state, ambition, and the constraints that matter",
  "A recommended starting point within the Six-S Method, with rationale",
  "An initial view on which pillars are most relevant, and which to sequence first",
  "This output is yours regardless of whether you proceed further with Sketch2Scale",
];

type Step = 1 | 2 | 3;

export default function DiscoveryWorkshop() {
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    org: "",
    role: "",
    situation: "",
    goal: "",
    timeline: "",
    email: "",
  });

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
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-6" style={{ fontFamily: "var(--font-mono)" }}>
              Discovery Workshop
            </p>
            <h1 className="text-[clamp(40px,6vw,82px)] font-medium text-[#f5f0e8] leading-[1.05] max-w-4xl mb-8" style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}>
              The first stage
              <br />
              <em className="italic text-[#b8914a]">of every transformation.</em>
            </h1>
            <p className="text-[17px] text-[rgba(245,240,232,0.55)] leading-relaxed max-w-2xl">
              Not a sales call. Not a pitch. A structured, two-and-a-half hour session designed to produce a clear output — a written starting point — regardless of what happens next.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Discovery First */}
      <section className="py-20 lg:py-28 bg-[#f5f0e8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <FadeIn>
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-6" style={{ fontFamily: "var(--font-mono)" }}>
                  Why Discovery First
                </p>
                <h2 className="text-[clamp(28px,3.5vw,48px)] font-medium text-[#0d0d0d] leading-tight mb-8" style={{ fontFamily: "var(--font-serif)" }}>
                  Committing before
                  understanding is how
                  misaligned outcomes happen.
                </h2>
                <p className="text-[16px] text-[#8a8070] leading-relaxed">
                  Deliverable-first agencies begin with a brief. We begin with a question: what does 'transformed' look like for this specific business? Discovery ensures both sides are solving the same problem before anything is built, designed, or produced.
                </p>
              </FadeIn>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <FadeIn delay={0.15}>
                <div className="bg-[#0d0d0d] p-10">
                  <p className="text-[11px] tracking-[0.15em] uppercase text-[rgba(245,240,232,0.5)] mb-6" style={{ fontFamily: "var(--font-mono)" }}>
                    Workshop Objectives
                  </p>
                  <ul className="space-y-5">
                    {objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="text-[#b8914a] mt-0.5 flex-shrink-0">→</span>
                        <p className="text-[14px] text-[rgba(245,240,232,0.75)] leading-relaxed">{obj}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section className="py-20 bg-[#ece6d8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
              Workshop Agenda
            </p>
            <h2 className="text-[clamp(24px,3.5vw,44px)] font-medium text-[#0d0d0d] leading-tight mb-14" style={{ fontFamily: "var(--font-serif)" }}>
              Two and a half hours.
              <br />One clear output.
            </h2>
          </FadeIn>

          <div className="space-y-px">
            {agenda.map((a, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 border-b border-[rgba(13,13,13,0.08)] py-6">
                  <div className="lg:col-span-3">
                    <span className="text-[11px] tracking-[0.1em] text-[#b8914a]" style={{ fontFamily: "var(--font-mono)" }}>{a.time}</span>
                  </div>
                  <div className="lg:col-span-3">
                    <p className="text-[17px] font-medium text-[#0d0d0d]" style={{ fontFamily: "var(--font-serif)" }}>{a.label}</p>
                  </div>
                  <div className="lg:col-span-6">
                    <p className="text-[14px] text-[#8a8070] leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-20 bg-[#f5f0e8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeIn>
              <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                Deliverables
              </p>
              <h2 className="text-[clamp(24px,3vw,40px)] font-medium text-[#0d0d0d] leading-tight mb-8" style={{ fontFamily: "var(--font-serif)" }}>
                You leave with something real.
              </h2>
              <ul className="space-y-4">
                {deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={14} className="text-[#b8914a] mt-1 flex-shrink-0" />
                    <p className="text-[15px] text-[#2a2826] leading-relaxed">{d}</p>
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="bg-[#ece6d8] p-8 border border-[rgba(13,13,13,0.08)]">
                <p className="text-[11px] tracking-[0.15em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                  Ideal Candidate
                </p>
                <p className="text-[16px] text-[#2a2826] leading-relaxed mb-6">
                  Anyone from our Audience Matrix who has moved past general interest and is ready to articulate a specific business situation. You do not need to have a clear brief — the Workshop is designed to produce one.
                </p>
                <div className="space-y-2">
                  {["Startup founders before or after funding", "CEOs facing strategic uncertainty", "Product and marketing leaders", "Enterprise innovation teams", "Political and government clients"].map((t) => (
                    <div key={t} className="flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-[#b8914a] flex-shrink-0" />
                      <p className="text-[13px] text-[#8a8070]">{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-[#0d0d0d]" id="book">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <FadeIn>
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-6" style={{ fontFamily: "var(--font-mono)" }}>
                  Book a Workshop
                </p>
                <h2 className="text-[clamp(28px,3.5vw,48px)] font-medium text-[#f5f0e8] leading-tight mb-6" style={{ fontFamily: "var(--font-serif)" }}>
                  Start your sketch.
                </h2>
                <p className="text-[14px] text-[rgba(245,240,232,0.5)] leading-relaxed">
                  A short qualifying form so the workshop is well-matched and well-prepared. We respond within two business days to confirm availability and share a preparation guide.
                </p>
              </FadeIn>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              {submitted ? (
                <FadeIn>
                  <div className="border border-[#b8914a] p-10 text-center">
                    <Check size={32} className="text-[#b8914a] mx-auto mb-6" />
                    <h3 className="text-[24px] font-medium text-[#f5f0e8] mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                      Your sketch is received.
                    </h3>
                    <p className="text-[14px] text-[rgba(245,240,232,0.55)] leading-relaxed">
                      We will respond within two business days with confirmation of availability and a preparation guide for the session.
                    </p>
                  </div>
                </FadeIn>
              ) : (
                <FadeIn delay={0.1}>
                  {/* Step indicator */}
                  <div className="flex items-center gap-4 mb-10">
                    {([1, 2, 3] as Step[]).map((s) => (
                      <div key={s} className="flex items-center gap-2">
                        <div className={`w-6 h-6 flex items-center justify-center text-[11px] font-medium transition-colors ${step === s ? "bg-[#b8914a] text-[#f5f0e8]" : step > s ? "bg-[rgba(245,240,232,0.2)] text-[rgba(245,240,232,0.5)]" : "border border-[rgba(245,240,232,0.2)] text-[rgba(245,240,232,0.3)]"}`} style={{ fontFamily: "var(--font-mono)" }}>
                          {step > s ? "✓" : s}
                        </div>
                        {s < 3 && <div className="w-8 h-px bg-[rgba(245,240,232,0.1)]" />}
                      </div>
                    ))}
                    <span className="text-[11px] text-[#8a8070] ml-2" style={{ fontFamily: "var(--font-mono)" }}>
                      {step === 1 ? "About you" : step === 2 ? "Your situation" : "Confirm"}
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {step === 1 && (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] tracking-[0.15em] uppercase text-[rgba(245,240,232,0.5)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>Name *</label>
                            <input
                              required
                              name="name"
                              value={form.name}
                              onChange={handleChange}
                              className="w-full bg-transparent border border-[rgba(245,240,232,0.12)] px-4 py-3 text-[14px] text-[#f5f0e8] placeholder-[#8a8070] focus:outline-none focus:border-[#b8914a] transition-colors"
                              placeholder="Your full name"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] tracking-[0.15em] uppercase text-[rgba(245,240,232,0.5)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>Organisation *</label>
                            <input
                              required
                              name="org"
                              value={form.org}
                              onChange={handleChange}
                              className="w-full bg-transparent border border-[rgba(245,240,232,0.12)] px-4 py-3 text-[14px] text-[#f5f0e8] placeholder-[#8a8070] focus:outline-none focus:border-[#b8914a] transition-colors"
                              placeholder="Company or organisation"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] tracking-[0.15em] uppercase text-[rgba(245,240,232,0.5)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>Your Role *</label>
                          <input
                            required
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-[rgba(245,240,232,0.12)] px-4 py-3 text-[14px] text-[#f5f0e8] placeholder-[#8a8070] focus:outline-none focus:border-[#b8914a] transition-colors"
                            placeholder="Founder, CEO, CMO, Product Leader..."
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] tracking-[0.15em] uppercase text-[rgba(245,240,232,0.5)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>Email *</label>
                          <input
                            required
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-[rgba(245,240,232,0.12)] px-4 py-3 text-[14px] text-[#f5f0e8] placeholder-[#8a8070] focus:outline-none focus:border-[#b8914a] transition-colors"
                            placeholder="your@email.com"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => form.name && form.org && form.role && form.email && setStep(2)}
                          className="flex items-center gap-3 bg-[#b8914a] text-[#f5f0e8] text-[12px] tracking-[0.12em] uppercase font-medium px-6 py-3.5 hover:bg-[#d4a85a] transition-colors group"
                        >
                          Continue
                          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <div>
                          <label className="block text-[11px] tracking-[0.15em] uppercase text-[rgba(245,240,232,0.5)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>Describe your business situation *</label>
                          <textarea
                            required
                            name="situation"
                            value={form.situation}
                            onChange={handleChange}
                            rows={4}
                            className="w-full bg-transparent border border-[rgba(245,240,232,0.12)] px-4 py-3 text-[14px] text-[#f5f0e8] placeholder-[#8a8070] focus:outline-none focus:border-[#b8914a] transition-colors resize-none"
                            placeholder="Where is the business now, and what has brought you to this point?"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] tracking-[0.15em] uppercase text-[rgba(245,240,232,0.5)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>Primary goal for the next 6–12 months *</label>
                          <textarea
                            required
                            name="goal"
                            value={form.goal}
                            onChange={handleChange}
                            rows={3}
                            className="w-full bg-transparent border border-[rgba(245,240,232,0.12)] px-4 py-3 text-[14px] text-[#f5f0e8] placeholder-[#8a8070] focus:outline-none focus:border-[#b8914a] transition-colors resize-none"
                            placeholder="What does success look like in a year?"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] tracking-[0.15em] uppercase text-[rgba(245,240,232,0.5)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>Timeline for beginning work</label>
                          <select
                            name="timeline"
                            value={form.timeline}
                            onChange={handleChange}
                            className="w-full bg-[#0d0d0d] border border-[rgba(245,240,232,0.12)] px-4 py-3 text-[14px] text-[#f5f0e8] focus:outline-none focus:border-[#b8914a] transition-colors"
                          >
                            <option value="">Select a timeline</option>
                            <option value="immediate">Immediately — within 2 weeks</option>
                            <option value="month">Within the next month</option>
                            <option value="quarter">This quarter</option>
                            <option value="exploring">Still exploring, no firm timeline</option>
                          </select>
                        </div>
                        <div className="flex gap-4">
                          <button type="button" onClick={() => setStep(1)} className="text-[12px] tracking-[0.1em] uppercase text-[rgba(245,240,232,0.4)] hover:text-[#f5f0e8] transition-colors">← Back</button>
                          <button
                            type="button"
                            onClick={() => form.situation && form.goal && setStep(3)}
                            className="flex items-center gap-3 bg-[#b8914a] text-[#f5f0e8] text-[12px] tracking-[0.12em] uppercase font-medium px-6 py-3.5 hover:bg-[#d4a85a] transition-colors group"
                          >
                            Continue
                            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <div className="bg-[rgba(245,240,232,0.04)] border border-[rgba(245,240,232,0.08)] p-6 space-y-3">
                          <p className="text-[11px] tracking-[0.15em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>Review your submission</p>
                          {[
                            { label: "Name", value: form.name },
                            { label: "Organisation", value: form.org },
                            { label: "Role", value: form.role },
                            { label: "Email", value: form.email },
                            { label: "Timeline", value: form.timeline || "Not specified" },
                          ].map((f) => (
                            <div key={f.label} className="flex gap-4">
                              <span className="text-[11px] text-[#8a8070] min-w-[100px]" style={{ fontFamily: "var(--font-mono)" }}>{f.label}</span>
                              <span className="text-[13px] text-[rgba(245,240,232,0.7)]">{f.value}</span>
                            </div>
                          ))}
                        </div>
                        <p className="text-[13px] text-[rgba(245,240,232,0.4)] leading-relaxed">
                          We will confirm availability and send a preparation guide within two business days. The workshop is conducted remotely or in person, depending on your location.
                        </p>
                        <div className="flex gap-4">
                          <button type="button" onClick={() => setStep(2)} className="text-[12px] tracking-[0.1em] uppercase text-[rgba(245,240,232,0.4)] hover:text-[#f5f0e8] transition-colors">← Back</button>
                          <button
                            type="submit"
                            className="flex items-center gap-3 bg-[#b8914a] text-[#f5f0e8] text-[12px] tracking-[0.12em] uppercase font-medium px-6 py-3.5 hover:bg-[#d4a85a] transition-colors group"
                          >
                            Submit Request
                            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </>
                    )}
                  </form>
                </FadeIn>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
