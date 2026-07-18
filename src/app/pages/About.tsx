import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { FadeInSection, SplitReveal, SketchLine, ScrollProgressLine } from "../components/motion";

const beliefs = [
  { n: "01", belief: "Design is a business function.", support: "Not a finishing layer. Organisations that embed design into strategic decisions outperform those that apply it after the fact." },
  { n: "02", belief: "Momentum compounds.", support: "A well-structured engagement leaves a client with more forward motion than they arrived with — not just a deliverable, but visible progress." },
  { n: "03", belief: "Sketches deserve rigour, not just enthusiasm.", support: "Early-stage ideas are not fragile — they are unproven. Rigorous thinking at the sketch stage prevents expensive rework at scale." },
  { n: "04", belief: "Strategy without execution is speculation.", support: "We refuse to hand over a strategy document and walk away. Transformation is only real when it is visible in the world." },
  { n: "05", belief: "The best partnership outlasts the project.", support: "We speak in terms of 'we scale with you,' not 'we deliver your project.' The relationship continues because the business continues to evolve." },
];

const processStages = [
  { n: "01", name: "Discover", desc: "Understand the real problem, the opportunity, and the stakeholders responsible for both." },
  { n: "02", name: "Clarify", desc: "Validate the direction so nothing is built on a contested premise." },
  { n: "03", name: "Sketch", desc: "Produce the earliest tangible expression — rough, directional, and real." },
  { n: "04", name: "Strategize", desc: "Document the growth architecture the whole organisation can execute against." },
  { n: "05", name: "Design & Build", desc: "Realise the platform, brand system, or campaign — usable, scalable, and defensible." },
  { n: "06", name: "Launch & Scale", desc: "Create visible, compounding motion in the market — not just a launch moment." },
  { n: "07", name: "Evolve", desc: "Continue refining as the business grows, because a scaled business is never finished." },
];

const operatingLogic = [
  "Business strategy sets the destination",
  "Design is the fastest route to get there",
  "Technology makes the route durable",
  "Storytelling earns belief along the way",
  "Intelligence creates unfair advantage",
];

const futureVision = [
  { name: "Sketch2Scale Strategy", desc: "A dedicated expression of the Business pillar for strategy-only engagements" },
  { name: "Sketch2Scale Labs", desc: "Experimental R&D engagements at the frontier of Product and Intelligence" },
  { name: "Sketch2Scale Academy", desc: "Teaching the Six-S Method and business design principles to organisations" },
  { name: "Sketch2Scale Ventures", desc: "An incubation arm connecting the Business pillar to the Investors audience" },
  { name: "Sketch2Scale Research", desc: "Original, citable studies elevating the Research content format" },
];

export default function About() {
  return (
    <div className="bg-[#f5f0e8]">
      {/* TODO: once a root layout exists, move ScrollProgressLine there so
          it persists across route changes instead of remounting per page. */}
      <ScrollProgressLine />

      {/* Page Hero */}
      <section className="pt-40 pb-20 bg-[#0d0d0d]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-6" style={{ fontFamily: "var(--font-mono)" }}>
            About
          </p>
          <h1
            className="text-[clamp(44px,6.5vw,90px)] font-medium text-[#f5f0e8] leading-[1.05] max-w-4xl"
            style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}
          >
            <SplitReveal text="The people who" /> <br />
            <span className="italic text-[#b8914a]">
              <SplitReveal text="design momentum." delay={0.3} />
            </span>
          </h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 lg:py-32 bg-[#f5f0e8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <FadeInSection>
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                  Our Story
                </p>
                <h2
                  className="text-[clamp(28px,3.5vw,44px)] font-medium text-[#0d0d0d] leading-tight"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  <SplitReveal text="Why this company exists." />
                </h2>
              </FadeInSection>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <FadeInSection delay={0.15}>
                <p className="text-[17px] text-[#2a2826] leading-relaxed mb-6">
                  Sketch2Scale began with a recognition that most organisations bringing in creative partners were getting deliverables when they needed transformation. A logo when they needed a brand strategy. A website when they needed a market position. A campaign when they needed a narrative architecture.
                </p>
                <p className="text-[17px] text-[#8a8070] leading-relaxed mb-6">
                  The founders had seen this pattern from both sides — as the consultants being asked to 'make it look good' after the strategy was decided, and as the business leaders watching design decisions made too late to change anything important.
                </p>
                <p className="text-[17px] text-[#8a8070] leading-relaxed">
                  Sketch2Scale exists because businesses deserve a partner who thinks in outcomes, not deliverables — one that treats design as a business function from the first conversation, not a service delivered at the end.
                </p>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* The Gap We Saw — statement */}
      <section className="py-20 lg:py-28 bg-[#0d0d0d]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeInSection>
            <div className="max-w-3xl">
              <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-8" style={{ fontFamily: "var(--font-mono)" }}>
                The Gap We Saw
              </p>
              <blockquote
                className="text-[clamp(28px,4vw,52px)] font-medium text-[#f5f0e8] leading-[1.1]"
                style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.01em" }}
              >
                <SplitReveal text="Design decided late is a cost." /> <br />
                <span className="italic text-[#b8914a]">
                  <SplitReveal text="Design decided early is an advantage." delay={0.35} />
                </span>
              </blockquote>
              <SketchLine className="w-24 h-[2px] mt-8" delay={0.9} duration={0.7} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-24 lg:py-32 bg-[#f5f0e8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeInSection>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
              What We Believe
            </p>
            <h2
              className="text-[clamp(28px,3.5vw,48px)] font-medium text-[#0d0d0d] leading-tight mb-16"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              <SplitReveal text="Five convictions" /> <br />
              <SplitReveal text="that guide every engagement." delay={0.25} />
            </h2>
          </FadeInSection>

          <div className="relative">
            <SketchLine vertical className="absolute left-[3px] top-2 bottom-2 w-[1px] hidden lg:block" delay={0.1} duration={1.8} />
            <div className="space-y-px">
              {beliefs.map((b, i) => (
                <FadeInSection key={b.n} delay={i * 0.08}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 border-b border-[rgba(13,13,13,0.1)] py-8">
                    <div className="lg:col-span-1">
                      <span className="text-[11px] tracking-[0.15em] text-[#b8914a]" style={{ fontFamily: "var(--font-mono)" }}>
                        {b.n}
                      </span>
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
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 lg:py-32 bg-[#ece6d8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeInSection>
              <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-6" style={{ fontFamily: "var(--font-mono)" }}>
                Our Philosophy
              </p>
              <h2
                className="text-[clamp(28px,3.5vw,48px)] font-medium text-[#0d0d0d] leading-tight mb-8"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                <SplitReveal text="Business first." /> <br />
                <SplitReveal text="Design as the superpower." delay={0.25} />
              </h2>
              <p className="text-[16px] text-[#2a2826] leading-relaxed mb-6">
                Strategy without design execution stalls. Design without business strategy decorates. We refuse to separate them — every engagement begins with business clarity and ends with market-visible evidence of that clarity.
              </p>
              <p className="text-[16px] text-[#8a8070] leading-relaxed">
                The practical implication: we never take a design brief without first understanding the business objective behind it. And we never hand over a strategy without ensuring the design system to execute it exists alongside.
              </p>
            </FadeInSection>
            <FadeInSection delay={0.15}>
              <div className="border border-[rgba(13,13,13,0.1)] p-10 bg-[#f5f0e8] relative">
                <SketchLine className="absolute top-0 left-10 w-16 h-[2px] -translate-y-1/2" delay={0.5} duration={0.7} />
                <p className="text-[12px] tracking-[0.15em] uppercase text-[#8a8070] mb-6" style={{ fontFamily: "var(--font-mono)" }}>
                  The operating logic
                </p>
                <div className="space-y-5">
                  {operatingLogic.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="w-1 h-1 rounded-full bg-[#b8914a] mt-2.5 flex-shrink-0" />
                      <p className="text-[15px] text-[#2a2826]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 lg:py-32 bg-[#f5f0e8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeInSection>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
              Our Process
            </p>
            <h2
              className="text-[clamp(28px,3.5vw,48px)] font-medium text-[#0d0d0d] leading-tight mb-16"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              <SplitReveal text="A transparent," /> <br />
              <SplitReveal text="navigable path." delay={0.25} />
            </h2>
          </FadeInSection>

          <div className="relative">
            <SketchLine vertical className="absolute left-[19px] top-2 bottom-2 w-[1px] hidden lg:block" delay={0.1} duration={2} />
            <div className="space-y-px">
              {processStages.map((s, i) => (
                <FadeInSection key={s.n} delay={i * 0.06}>
                  <div className="relative z-10 flex gap-6 lg:gap-12 border-b border-[rgba(13,13,13,0.08)] py-7 bg-[#f5f0e8]">
                    <span className="text-[11px] tracking-[0.15em] text-[#b8914a] pt-1 min-w-[2rem]" style={{ fontFamily: "var(--font-mono)" }}>
                      {s.n}
                    </span>
                    <div className="flex flex-col lg:flex-row gap-2 lg:gap-16 flex-1">
                      <h3 className="text-[18px] font-medium text-[#0d0d0d] min-w-[160px]" style={{ fontFamily: "var(--font-serif)" }}>
                        {s.name}
                      </h3>
                      <p className="text-[14px] text-[#8a8070] leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-24 lg:py-32 bg-[#2a2826]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <FadeInSection>
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-6" style={{ fontFamily: "var(--font-mono)" }}>
                  Future Vision
                </p>
                <h2
                  className="text-[clamp(28px,3.5vw,48px)] font-medium text-[#f5f0e8] leading-tight mb-8"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  <SplitReveal text="The beginning" /> <br />
                  <SplitReveal text="of something larger." delay={0.25} />
                </h2>
                <p className="text-[15px] text-[rgba(245,240,232,0.55)] leading-relaxed">
                  Sketch2Scale is designed to grow without a redesign. The architecture that serves clients today accommodates the expanded disciplines being built for tomorrow.
                </p>
              </FadeInSection>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <FadeInSection delay={0.15}>
                <div className="space-y-px">
                  {futureVision.map((item, i) => (
                    <FadeInSection key={item.name} delay={0.06 * i}>
                      <div className="relative overflow-hidden border border-[rgba(245,240,232,0.06)] px-6 py-5 group transition-colors hover:bg-[rgba(245,240,232,0.03)]">
                        <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#b8914a] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                        <p className="text-[15px] font-medium text-[#f5f0e8] mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                          {item.name}
                        </p>
                        <p className="text-[12px] text-[rgba(245,240,232,0.45)]">{item.desc}</p>
                      </div>
                    </FadeInSection>
                  ))}
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#f5f0e8] border-t border-[rgba(13,13,13,0.08)]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <FadeInSection>
            <div>
              <h2 className="text-[24px] font-medium text-[#0d0d0d] mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                Ready to begin?
              </h2>
              <p className="text-[14px] text-[#8a8070]">A Discovery Workshop is the structured first step.</p>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <Link
              to="/discovery-workshop"
              className="inline-flex items-center gap-3 bg-[#0d0d0d] text-[#f5f0e8] text-[12px] tracking-[0.12em] uppercase font-medium px-7 py-4 hover:bg-[#b8914a] transition-colors group"
            >
              Book a Discovery Workshop
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}