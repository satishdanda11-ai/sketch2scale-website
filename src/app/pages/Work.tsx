import { useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { caseStudies, pillarFilters, type PillarFilter } from "../data/work";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </motion.div>
  );
}

export default function Work() {
  const [activeFilter, setActiveFilter] = useState<PillarFilter>("All");
  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  const filtered = activeFilter === "All" ? caseStudies : caseStudies.filter((c) => c.pillar === activeFilter);
  const featured = caseStudies.filter((c) => c.featured);

  return (
    <div className="bg-[#f5f0e8]">
      {/* Hero */}
      <section className="pt-40 pb-20 bg-[#0d0d0d]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-6" style={{ fontFamily: "var(--font-mono)" }}>Work</p>
            <h1 className="text-[clamp(40px,6vw,82px)] font-medium text-[#f5f0e8] leading-[1.05] max-w-4xl mb-8" style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}>
              The philosophy,
              <br />
              <em className="italic text-[#b8914a]">held under scrutiny.</em>
            </h1>
            <p className="text-[17px] text-[rgba(245,240,232,0.55)] leading-relaxed max-w-xl">
              Every case study is structured the same way: Challenge, Approach, Transformation, Outcome. Business metrics first, design decisions in service of them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Transformations */}
      <section className="py-20 lg:py-28 bg-[#f5f0e8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-12" style={{ fontFamily: "var(--font-mono)" }}>
              Featured Transformations
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[rgba(13,13,13,0.1)]">
            {featured.map((cs, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-[#f5f0e8] group">
                  <div className="relative overflow-hidden bg-[#2a2826]">
                    <img src={cs.img} alt={cs.outcome} className="w-full h-60 object-cover opacity-75 group-hover:opacity-95 transition-all duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/60 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="text-[10px] tracking-[0.15em] uppercase bg-[#b8914a] text-[#f5f0e8] px-2.5 py-1" style={{ fontFamily: "var(--font-mono)" }}>{cs.pillar}</span>
                      <span className="text-[10px] tracking-[0.15em] uppercase bg-[rgba(13,13,13,0.7)] text-[#f5f0e8] px-2.5 py-1" style={{ fontFamily: "var(--font-mono)" }}>{cs.industry}</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="text-[16px] font-medium text-[#0d0d0d] leading-snug mb-6" style={{ fontFamily: "var(--font-serif)" }}>{cs.outcome}</p>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {cs.resultMetrics.map((m) => (
                        <div key={m.label}>
                          <p className="text-[22px] font-medium text-[#b8914a]" style={{ fontFamily: "var(--font-serif)" }}>{m.n}</p>
                          <p className="text-[11px] text-[#8a8070] leading-tight mt-1">{m.label}</p>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setExpandedCase(expandedCase === i ? null : i)}
                      className="text-[11px] tracking-[0.15em] uppercase text-[#b8914a] hover:text-[#d4a85a] transition-colors"
                    >
                      {expandedCase === i ? "Close" : "Read the transformation"}
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: expandedCase === i ? "auto" : 0, opacity: expandedCase === i ? 1 : 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 space-y-4">
                        {[
                          { label: "Challenge", text: cs.challenge },
                          { label: "Approach", text: cs.approach },
                          { label: "Transformation", text: cs.transformation },
                        ].map((section) => (
                          <div key={section.label}>
                            <p className="text-[10px] tracking-[0.15em] uppercase text-[#8a8070] mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>{section.label}</p>
                            <p className="text-[13px] text-[#2a2826] leading-relaxed">{section.text}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* All Work — Filterable */}
      <section className="py-20 bg-[#ece6d8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="flex flex-wrap items-center gap-3 mb-12">
              <span className="text-[11px] tracking-[0.15em] uppercase text-[#8a8070] mr-2" style={{ fontFamily: "var(--font-mono)" }}>Filter</span>
              {pillarFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`text-[11px] tracking-[0.12em] uppercase px-4 py-2 border transition-all ${activeFilter === f ? "bg-[#0d0d0d] text-[#f5f0e8] border-[#0d0d0d]" : "text-[#2a2826] border-[rgba(13,13,13,0.2)] hover:border-[#b8914a] hover:text-[#b8914a]"}`}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {f}
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="space-y-px">
            {filtered.map((cs, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="border border-[rgba(13,13,13,0.08)] p-8 bg-[#ece6d8] hover:bg-[#f5f0e8] transition-colors group">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-1">
                      <span className="text-[10px] tracking-[0.15em] uppercase text-[#b8914a]" style={{ fontFamily: "var(--font-mono)" }}>{cs.pillar}</span>
                    </div>
                    <div className="lg:col-span-6">
                      <p className="text-[18px] font-medium text-[#0d0d0d]" style={{ fontFamily: "var(--font-serif)" }}>{cs.outcome}</p>
                    </div>
                    <div className="lg:col-span-3">
                      <div className="flex flex-wrap gap-4">
                        {cs.resultMetrics.slice(0, 2).map((m) => (
                          <div key={m.label}>
                            <p className="text-[18px] font-medium text-[#b8914a]" style={{ fontFamily: "var(--font-serif)" }}>{m.n}</p>
                            <p className="text-[10px] text-[#8a8070] mt-0.5">{m.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="lg:col-span-2 text-right">
                      <span className="text-[10px] tracking-[0.1em] uppercase text-[#8a8070] px-2.5 py-1 border border-[rgba(13,13,13,0.1)]" style={{ fontFamily: "var(--font-mono)" }}>{cs.industry}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0d0d0d]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
          <FadeIn>
            <h2 className="text-[clamp(28px,4vw,52px)] font-medium text-[#f5f0e8] mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              Your transformation
              <br />
              <em className="italic text-[#b8914a]">could be next.</em>
            </h2>
            <Link to="/discovery-workshop" className="inline-flex items-center gap-3 bg-[#b8914a] text-[#f5f0e8] text-[12px] tracking-[0.12em] uppercase font-medium px-7 py-4 hover:bg-[#d4a85a] transition-colors group">
              Start a Discovery Workshop
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
