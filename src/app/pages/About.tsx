import { useRef } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

const beliefs = [
  { n: "01", belief: "Design is a business function.", support: "Not a finishing layer. Organisations that embed design into strategic decisions outperform those that apply it after the fact." },
  { n: "02", belief: "Momentum compounds.", support: "A well-structured engagement leaves a client with more forward motion than they arrived with — not just a deliverable, but visible progress." },
  { n: "03", belief: "Sketches deserve rigour, not just enthusiasm.", support: "Early-stage ideas are not fragile — they are unproven. Rigorous thinking at the sketch stage prevents expensive rework at scale." },
  { n: "04", belief: "Strategy without execution is speculation.", support: "We refuse to hand over a strategy document and walk away. Transformation is only real when it is visible in the world." },
  { n: "05", belief: "The best partnership outlasts the project.", support: "We speak in terms of 'we scale with you,' not 'we deliver your project.' The relationship continues because the business continues to evolve." },
];

const procesStages = [
  { n: "01", name: "Discover", desc: "Understand the real problem, the opportunity, and the stakeholders responsible for both." },
  { n: "02", name: "Clarify", desc: "Validate the direction so nothing is built on a contested premise." },
  { n: "03", name: "Sketch", desc: "Produce the earliest tangible expression — rough, directional, and real." },
  { n: "04", name: "Strategize", desc: "Document the growth architecture the whole organisation can execute against." },
  { n: "05", name: "Design & Build", desc: "Realise the platform, brand system, or campaign — usable, scalable, and defensible." },
  { n: "06", name: "Launch & Scale", desc: "Create visible, compounding motion in the market — not just a launch moment." },
  { n: "07", name: "Evolve", desc: "Continue refining as the business grows, because a scaled business is never finished." },
];

export default function About() {
  return (
    <div className="bg-[#f5f0e8]">
      {/* Page Hero */}
      <section className="pt-40 pb-20 bg-[#0d0d0d]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-6" style={{ fontFamily: "var(--font-mono)" }}>
              About
            </p>
            <h1
              className="text-[clamp(44px,6.5vw,90px)] font-medium text-[#f5f0e8] leading-[1.05] max-w-4xl"
              style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}
            >
              The people who
              <br />
              <em className="italic text-[#b8914a]">design momentum.</em>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 7.1 Our Story */}
      <section className="py-24 lg:py-32 bg-[#f5f0e8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <FadeIn>
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                  Our Story
                </p>
                <h2
                  className="text-[clamp(28px,3.5vw,44px)] font-medium text-[#0d0d0d] leading-tight"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Why this company exists.
                </h2>
              </FadeIn>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <FadeIn delay={0.15}>
                <p className="text-[17px] text-[#2a2826] leading-relaxed mb-6">
                  Sketch2Scale began with a recognition that most organisations bringing in creative partners were getting deliverables when they needed transformation. A logo when they needed a brand strategy. A website when they needed a market position. A campaign when they needed a narrative architecture.
                </p>
                <p className="text-[17px] text-[#8a8070] leading-relaxed mb-6">
                  The founders had seen this pattern from both sides — as the consultants being asked to 'make it look good' after the strategy was decided, and as the business leaders watching design decisions made too late to change anything important.
                </p>
                <p className="text-[17px] text-[#8a8070] leading-relaxed">
                  Sketch2Scale exists because businesses deserve a partner who thinks in outcomes, not deliverables — one that treats design as a business function from the first conversation, not a service delivered at the end.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 7.2 Why We Exist — Statement */}
      <section className="py-20 lg:py-28 bg-[#0d0d0d]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-8" style={{ fontFamily: "var(--font-mono)" }}>
                The Gap We Saw
              </p>
              <blockquote
                className="text-[clamp(28px,4vw,52px)] font-medium text-[#f5f0e8] leading-[1.1]"
                style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.01em" }}
              >
                Design decided late is a cost.
                <br />
                <em className="italic text-[#b8914a]">Design decided early is an advantage.</em>
              </blockquote>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 7.3 What We Believe */}
      <section className="py-24 lg:py-32 bg-[#f5f0e8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
              What We Believe
            </p>
            <h2
              className="text-[clamp(28px,3.5vw,48px)] font-medium text-[#0d0d0d] leading-tight mb-16"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Five convictions
              <br />that guide every engagement.
            </h2>
          </FadeIn>

          <div className="space-y-px">
            {beliefs.map((b, i) => (
              <FadeIn key={b.n} delay={i * 0.08}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 border-b border-[rgba(13,13,13,0.1)] py-8">
                  <div className="lg:col-span-1">
                    <span className="text-[11px] tracking-[0.15em] text-[#b8914a]" style={{ fontFamily: "var(--font-mono)" }}>{b.n}</span>
                  </div>
                  <div className="lg:col-span-4">
                    <h3 className="text-[19px] font-medium text-[#0d0d0d]" style={{ fontFamily: "var(--font-serif)" }}>
                      {b.belief}
                    </h3>
                  </div>
                  <div className="lg:col-span-6 lg:col-start-7">
                    <p className="text-[15px] text-[#8a8070] leading-relaxed">{b.support}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 7.4 Philosophy */}
      <section className="py-24 lg:py-32 bg-[#ece6d8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeIn>
              <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-6" style={{ fontFamily: "var(--font-mono)" }}>
                Our Philosophy
              </p>
              <h2
                className="text-[clamp(28px,3.5vw,48px)] font-medium text-[#0d0d0d] leading-tight mb-8"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Business first.
                <br />
                Design as the superpower.
              </h2>
              <p className="text-[16px] text-[#2a2826] leading-relaxed mb-6">
                Strategy without design execution stalls. Design without business strategy decorates. We refuse to separate them — every engagement begins with business clarity and ends with market-visible evidence of that clarity.
              </p>
              <p className="text-[16px] text-[#8a8070] leading-relaxed">
                The practical implication: we never take a design brief without first understanding the business objective behind it. And we never hand over a strategy without ensuring the design system to execute it exists alongside.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="border border-[rgba(13,13,13,0.1)] p-10 bg-[#f5f0e8]">
                <p className="text-[12px] tracking-[0.15em] uppercase text-[#8a8070] mb-6" style={{ fontFamily: "var(--font-mono)" }}>
                  The operating logic
                </p>
                <div className="space-y-5">
                  {["Business strategy sets the destination", "Design is the fastest route to get there", "Technology makes the route durable", "Storytelling earns belief along the way", "Intelligence creates unfair advantage"].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="w-1 h-1 rounded-full bg-[#b8914a] mt-2.5 flex-shrink-0" />
                      <p className="text-[15px] text-[#2a2826]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 7.5 Our Process */}
      <section className="py-24 lg:py-32 bg-[#f5f0e8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
              Our Process
            </p>
            <h2
              className="text-[clamp(28px,3.5vw,48px)] font-medium text-[#0d0d0d] leading-tight mb-16"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              A transparent,
              <br />navigable path.
            </h2>
          </FadeIn>

          <div className="space-y-px">
            {procesStages.map((s, i) => (
              <FadeIn key={s.n} delay={i * 0.06}>
                <div className="flex gap-6 lg:gap-12 border-b border-[rgba(13,13,13,0.08)] py-7">
                  <span className="text-[11px] tracking-[0.15em] text-[#b8914a] pt-1 min-w-[2rem]" style={{ fontFamily: "var(--font-mono)" }}>{s.n}</span>
                  <div className="flex flex-col lg:flex-row gap-2 lg:gap-16 flex-1">
                    <h3 className="text-[18px] font-medium text-[#0d0d0d] min-w-[160px]" style={{ fontFamily: "var(--font-serif)" }}>{s.name}</h3>
                    <p className="text-[14px] text-[#8a8070] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 7.7 Future Vision */}
      <section className="py-24 lg:py-32 bg-[#2a2826]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <FadeIn>
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-6" style={{ fontFamily: "var(--font-mono)" }}>
                  Future Vision
                </p>
                <h2
                  className="text-[clamp(28px,3.5vw,48px)] font-medium text-[#f5f0e8] leading-tight mb-8"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  The beginning
                  <br />of something larger.
                </h2>
                <p className="text-[15px] text-[rgba(245,240,232,0.55)] leading-relaxed">
                  Sketch2Scale is designed to grow without a redesign. The architecture that serves clients today accommodates the expanded disciplines being built for tomorrow.
                </p>
              </FadeIn>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <FadeIn delay={0.15}>
                <div className="space-y-px">
                  {[
                    { name: "Sketch2Scale Strategy", desc: "A dedicated expression of the Business pillar for strategy-only engagements" },
                    { name: "Sketch2Scale Labs", desc: "Experimental R&D engagements at the frontier of Product and Intelligence" },
                    { name: "Sketch2Scale Academy", desc: "Teaching the Six-S Method and business design principles to organisations" },
                    { name: "Sketch2Scale Ventures", desc: "An incubation arm connecting the Business pillar to the Investors audience" },
                    { name: "Sketch2Scale Research", desc: "Original, citable studies elevating the Research content format" },
                  ].map((item) => (
                    <div key={item.name} className="border border-[rgba(245,240,232,0.06)] px-6 py-5 hover:bg-[rgba(245,240,232,0.03)] transition-colors">
                      <p className="text-[15px] font-medium text-[#f5f0e8] mb-1" style={{ fontFamily: "var(--font-serif)" }}>{item.name}</p>
                      <p className="text-[12px] text-[rgba(245,240,232,0.45)]">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#f5f0e8] border-t border-[rgba(13,13,13,0.08)]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <h2 className="text-[24px] font-medium text-[#0d0d0d] mb-2" style={{ fontFamily: "var(--font-serif)" }}>
              Ready to begin?
            </h2>
            <p className="text-[14px] text-[#8a8070]">A Discovery Workshop is the structured first step.</p>
          </div>
          <Link
            to="/discovery-workshop"
            className="inline-flex items-center gap-3 bg-[#0d0d0d] text-[#f5f0e8] text-[12px] tracking-[0.12em] uppercase font-medium px-7 py-4 hover:bg-[#b8914a] transition-colors group"
          >
            Book a Discovery Workshop
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
