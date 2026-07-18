import { useRef } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { industries, clusters } from "../data/industries";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </motion.div>
  );
}

const clusterDescriptions: Record<string, string> = {
  Commercial: "High-velocity organisations where design and strategy decisions have direct, measurable commercial consequence.",
  Frontier: "Organisations operating at the edge of what is technically or culturally possible, where narrative and intelligence matter as much as execution.",
  "Public & Human": "Sectors where trust, discretion, and public accountability shape every design and narrative decision.",
};

export default function Industries() {
  return (
    <div className="bg-[#f5f0e8]">
      {/* Hero */}
      <section className="pt-40 pb-20 bg-[#0d0d0d]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-6" style={{ fontFamily: "var(--font-mono)" }}>
              Industries
            </p>
            <h1 className="text-[clamp(40px,6vw,82px)] font-medium text-[#f5f0e8] leading-[1.05] max-w-4xl mb-8" style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}>
              Transformation looks
              <br />
              <em className="italic text-[#b8914a]">different in every industry.</em>
            </h1>
            <p className="text-[17px] text-[rgba(245,240,232,0.55)] leading-relaxed max-w-xl">
              We know the difference — between a startup's urgency and an enterprise's risk appetite, between a political campaign's reputation sensitivity and an AI company's credibility challenge. Select your industry below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky cluster nav */}
      <div className="sticky top-16 lg:top-20 z-30 bg-[#f5f0e8] border-b border-[rgba(13,13,13,0.1)]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-8 h-12 overflow-x-auto">
            {clusters.map((c) => (
              <a
                key={c.label}
                href={`#${c.label.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-")}`}
                className="text-[11px] tracking-[0.15em] uppercase text-[#8a8070] hover:text-[#b8914a] transition-colors whitespace-nowrap"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {c.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Clusters */}
      {clusters.map((cluster, ci) => {
        const clusterIndustries = industries.filter((i) => i.cluster === cluster.label);
        return (
          <section
            key={cluster.label}
            id={cluster.label.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-")}
            className={`py-20 lg:py-28 ${ci % 2 === 0 ? "bg-[#f5f0e8]" : "bg-[#ece6d8]"}`}
          >
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
              <FadeIn>
                <div className="mb-14">
                  <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                    Cluster
                  </p>
                  <h2 className="text-[clamp(28px,4vw,52px)] font-medium text-[#0d0d0d] leading-tight mb-4" style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.01em" }}>
                    {cluster.label}
                  </h2>
                  <p className="text-[15px] text-[#8a8070] max-w-xl">{clusterDescriptions[cluster.label]}</p>
                </div>
              </FadeIn>

              {/* Industry cards — click to go to individual page */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(13,13,13,0.08)]">
                {clusterIndustries.map((ind, i) => (
                  <FadeIn key={ind.id} delay={i * 0.08}>
                    <Link
                      to={`/industries/${ind.id}`}
                      className="block group bg-[#f5f0e8] hover:bg-[#0d0d0d] transition-all duration-300 overflow-hidden"
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden bg-[#2a2826]">
                        <img
                          src={ind.img}
                          alt={ind.label}
                          className="w-full h-48 object-cover opacity-60 group-hover:opacity-80 transition-all duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/50 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <span
                            className="text-[10px] tracking-[0.15em] uppercase bg-[#b8914a] text-[#f5f0e8] px-2 py-0.5"
                            style={{ fontFamily: "var(--font-mono)" }}
                          >
                            {cluster.label}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-7">
                        <h3 className="text-[22px] font-medium text-[#0d0d0d] group-hover:text-[#f5f0e8] transition-colors mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                          {ind.label}
                        </h3>
                        <p className="text-[13px] text-[#8a8070] group-hover:text-[rgba(245,240,232,0.5)] transition-colors leading-snug mb-5">
                          {ind.tagline}
                        </p>
                        <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-[#b8914a] group-hover:text-[#d4a85a] transition-colors">
                          Explore {ind.label} <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Full grid — all 12 at a glance */}
      <section className="py-16 bg-[#2a2826]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-8" style={{ fontFamily: "var(--font-mono)" }}>
              All 12 Industries
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-px bg-[rgba(245,240,232,0.06)]">
              {industries.map((ind) => (
                <Link
                  key={ind.id}
                  to={`/industries/${ind.id}`}
                  className="block bg-[#2a2826] px-5 py-5 hover:bg-[rgba(245,240,232,0.04)] group transition-colors"
                >
                  <p className="text-[10px] tracking-[0.1em] uppercase text-[#8a8070] group-hover:text-[#b8914a] mb-1 transition-colors" style={{ fontFamily: "var(--font-mono)" }}>
                    {ind.cluster.split(" ")[0]}
                  </p>
                  <p className="text-[14px] text-[rgba(245,240,232,0.7)] group-hover:text-[#f5f0e8] transition-colors" style={{ fontFamily: "var(--font-serif)" }}>
                    {ind.label}
                  </p>
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0d0d0d]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <h2 className="text-[24px] font-medium text-[#f5f0e8] mb-2" style={{ fontFamily: "var(--font-serif)" }}>
              Don't see your industry listed?
            </h2>
            <p className="text-[14px] text-[rgba(245,240,232,0.5)]">
              The six pillars apply wherever a business needs to transform. Let's find your starting point.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 border border-[#b8914a] text-[#b8914a] text-[12px] tracking-[0.12em] uppercase font-medium px-6 py-3.5 hover:bg-[#b8914a] hover:text-[#f5f0e8] transition-all group"
          >
            Get in touch <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
