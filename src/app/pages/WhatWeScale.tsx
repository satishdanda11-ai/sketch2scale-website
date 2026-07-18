import { useRef } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { pillars } from "../data/pillars";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </motion.div>
  );
}

export default function WhatWeScale() {
  return (
    <div className="bg-[#f5f0e8]">
      {/* Hero */}
      <section className="pt-40 pb-20 bg-[#0d0d0d]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-6" style={{ fontFamily: "var(--font-mono)" }}>
              What We Scale
            </p>
            <h1
              className="text-[clamp(40px,6vw,82px)] font-medium text-[#f5f0e8] leading-[1.05] max-w-4xl mb-8"
              style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}
            >
              Not services.
              <br />
              <em className="italic text-[#b8914a]">Transformations.</em>
            </h1>
            <p className="text-[17px] text-[rgba(245,240,232,0.55)] leading-relaxed max-w-2xl">
              "Services" frames the relationship as procurement — a menu of deliverables to be selected and executed. We think in transformations: measurable changes in how a business operates, communicates, and grows. Each pillar is a lens on what we help change, not a task we complete.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pillars overview grid */}
      <section className="py-20 lg:py-28 bg-[#f5f0e8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-12" style={{ fontFamily: "var(--font-mono)" }}>
              Six Transformation Pillars
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(13,13,13,0.1)]">
            {pillars.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.08}>
                <Link
                  to={`/what-we-scale/${p.id}`}
                  className="block bg-[#f5f0e8] p-8 lg:p-10 group hover:bg-[#0d0d0d] transition-all duration-300"
                >
                  <div className="mb-6 overflow-hidden bg-[#2a2826]">
                    <img
                      src={p.img}
                      alt={p.label}
                      className="w-full h-40 object-cover opacity-60 group-hover:opacity-80 transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#b8914a] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    Pillar {p.n}
                  </p>
                  <h2
                    className="text-[26px] font-medium text-[#0d0d0d] group-hover:text-[#f5f0e8] transition-colors mb-3"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {p.label}
                  </h2>
                  <p className="text-[13px] text-[#8a8070] group-hover:text-[rgba(245,240,232,0.5)] transition-colors leading-relaxed mb-6">
                    {p.tagline}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-[#b8914a] group-hover:text-[#d4a85a] transition-colors">
                    Explore {p.label} <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* List view with details */}
      <section className="py-20 bg-[#ece6d8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-12" style={{ fontFamily: "var(--font-mono)" }}>
              At a glance
            </p>
          </FadeIn>

          <div className="space-y-px">
            {pillars.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.06}>
                <Link
                  to={`/what-we-scale/${p.id}`}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center border border-[rgba(13,13,13,0.08)] px-8 py-7 bg-[#ece6d8] hover:bg-[#0d0d0d] group transition-all duration-300"
                >
                  <div className="lg:col-span-1">
                    <span className="text-[11px] tracking-[0.15em] text-[#b8914a]" style={{ fontFamily: "var(--font-mono)" }}>{p.n}</span>
                  </div>
                  <div className="lg:col-span-2">
                    <h3 className="text-[20px] font-medium text-[#0d0d0d] group-hover:text-[#f5f0e8] transition-colors" style={{ fontFamily: "var(--font-serif)" }}>
                      {p.label}
                    </h3>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="text-[14px] text-[#8a8070] group-hover:text-[rgba(245,240,232,0.5)] transition-colors leading-relaxed">
                      {p.purpose}
                    </p>
                  </div>
                  <div className="lg:col-span-2 text-right">
                    <span className="text-[#b8914a] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end gap-1 text-[12px]">
                      Explore <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy note */}
      <section className="py-20 bg-[#0d0d0d]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7">
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-6" style={{ fontFamily: "var(--font-mono)" }}>
                  Why these six, and not a longer list
                </p>
                <p
                  className="text-[clamp(20px,2.5vw,32px)] font-medium text-[#f5f0e8] leading-[1.3] mb-6"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Each pillar connects to every other. A Brand engagement surfaces a Product opportunity; an Intelligence engagement reshapes Influence.
                </p>
                <p className="text-[15px] text-[rgba(245,240,232,0.5)] leading-relaxed">
                  Most meaningful transformations engage two or three pillars in sequence, not one in isolation. The Discovery Workshop identifies which, and in what order, for your specific situation.
                </p>
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <Link
                  to="/discovery-workshop"
                  className="block border border-[rgba(245,240,232,0.1)] p-8 hover:border-[#b8914a] transition-colors group"
                >
                  <p className="text-[11px] tracking-[0.15em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                    Not sure which pillar?
                  </p>
                  <p className="text-[15px] text-[rgba(245,240,232,0.7)] mb-5 leading-relaxed">
                    The Discovery Workshop maps your situation to the most relevant pillar sequence.
                  </p>
                  <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase text-[#b8914a] group-hover:text-[#d4a85a] transition-colors">
                    Book a Workshop <ArrowRight size={11} />
                  </span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
