import { useRef } from "react";
import { Link, useParams, Navigate } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { industries, getIndustry, clusters } from "../data/industries";
import { pillars } from "../data/pillars";

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

const clusterColors: Record<string, string> = {
  Commercial: "#b8914a",
  Frontier: "#8a8070",
  "Public & Human": "#2a2826",
};

export default function IndustryPage() {
  const { industry: industryId } = useParams<{ industry: string }>();
  const industry = getIndustry(industryId ?? "");

  if (!industry) return <Navigate to="/industries" replace />;

  const currentIndex = industries.findIndex((i) => i.id === industry.id);
  const clusterIndustries = industries.filter((i) => i.cluster === industry.cluster);
  const clusterIndex = clusterIndustries.findIndex((i) => i.id === industry.id);
  const prev = currentIndex > 0 ? industries[currentIndex - 1] : null;
  const next = currentIndex < industries.length - 1 ? industries[currentIndex + 1] : null;

  const accentColor = clusterColors[industry.cluster] ?? "#b8914a";

  return (
    <div className="bg-[#f5f0e8]">
      {/* Hero */}
      <section className="relative min-h-[65vh] flex flex-col justify-end bg-[#0d0d0d] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={industry.heroImg}
            alt={`${industry.label} industry`}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/30 via-[#0d0d0d]/65 to-[#0d0d0d]/96" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 pb-16 pt-36">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8 flex-wrap"
          >
            <Link
              to="/industries"
              className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[rgba(245,240,232,0.4)] hover:text-[#b8914a] transition-colors"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <ArrowLeft size={11} /> Industries
            </Link>
            <span className="text-[rgba(245,240,232,0.2)]">/</span>
            <span
              className="text-[11px] tracking-[0.15em] uppercase px-2.5 py-1"
              style={{ fontFamily: "var(--font-mono)", backgroundColor: `${accentColor}30`, color: accentColor }}
            >
              {industry.cluster}
            </span>
            <span className="text-[rgba(245,240,232,0.2)]">/</span>
            <span className="text-[11px] tracking-[0.15em] uppercase text-[#b8914a]" style={{ fontFamily: "var(--font-mono)" }}>
              {industry.label}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1
              className="text-[clamp(44px,7vw,96px)] font-medium text-[#f5f0e8] leading-[1.03] mb-6 max-w-4xl"
              style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}
            >
              {industry.label}
            </h1>
            <p
              className="text-[18px] text-[rgba(245,240,232,0.6)] max-w-2xl leading-relaxed italic"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {industry.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Challenges + Opportunity */}
      <section className="py-20 lg:py-28 bg-[#f5f0e8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <FadeIn>
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-6" style={{ fontFamily: "var(--font-mono)" }}>
                  Industry Context
                </p>
                <h2
                  className="text-[clamp(24px,3.5vw,44px)] font-medium text-[#0d0d0d] leading-tight mb-6"
                  style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.01em" }}
                >
                  The challenges that matter here.
                </h2>
                <p className="text-[16px] text-[#8a8070] leading-relaxed mb-10">
                  {industry.opportunity}
                </p>

                <div className="space-y-px">
                  {industry.challengesList.map((ch, i) => (
                    <div key={i} className="flex items-start gap-5 border-b border-[rgba(13,13,13,0.07)] py-5">
                      <span className="text-[11px] tracking-[0.15em] text-[#b8914a] pt-0.5 min-w-[2rem] flex-shrink-0" style={{ fontFamily: "var(--font-mono)" }}>
                        0{i + 1}
                      </span>
                      <p className="text-[15px] text-[#2a2826] leading-snug">{ch}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-4 lg:col-start-9 space-y-8">
              <FadeIn delay={0.15}>
                <div className="overflow-hidden bg-[#2a2826]">
                  <img
                    src={industry.img}
                    alt={industry.label}
                    className="w-full h-64 object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="bg-[#0d0d0d] p-7">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[#8a8070] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                    How we help
                  </p>
                  <p className="text-[14px] text-[rgba(245,240,232,0.7)] leading-relaxed">
                    {industry.how}
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 bg-[#ece6d8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-3">
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                  Relevant Capabilities
                </p>
              </div>
              <div className="lg:col-span-9">
                <div className="flex flex-wrap gap-3">
                  {industry.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="text-[12px] tracking-[0.08em] text-[#2a2826] border border-[rgba(13,13,13,0.15)] px-4 py-2"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Relevant Pillars */}
      <section className="py-20 bg-[#f5f0e8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
              Transformation Pillars
            </p>
            <h2
              className="text-[clamp(24px,3.5vw,44px)] font-medium text-[#0d0d0d] leading-tight mb-10"
              style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.01em" }}
            >
              The pillars most relevant
              <br />to {industry.label}.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(13,13,13,0.08)]">
            {industry.pillarSlugs.map((slug, i) => {
              const p = pillars.find((pl) => pl.id === slug);
              if (!p) return null;
              return (
                <FadeIn key={slug} delay={i * 0.1}>
                  <Link
                    to={`/what-we-scale/${slug}`}
                    className="block bg-[#f5f0e8] p-8 group hover:bg-[#0d0d0d] transition-all duration-300"
                  >
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#b8914a] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                      Pillar {p.n}
                    </p>
                    <h3
                      className="text-[24px] font-medium text-[#0d0d0d] group-hover:text-[#f5f0e8] transition-colors mb-3"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {p.label}
                    </h3>
                    <p className="text-[13px] text-[#8a8070] group-hover:text-[rgba(245,240,232,0.5)] transition-colors leading-relaxed mb-5">
                      {p.purpose}
                    </p>
                    <span className="text-[11px] tracking-[0.12em] uppercase text-[#b8914a] group-hover:text-[#d4a85a] transition-colors flex items-center gap-2">
                      Explore {p.label} <ArrowRight size={11} />
                    </span>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust signals + Case direction */}
      <section className="py-16 bg-[#2a2826]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <p className="text-[11px] tracking-[0.15em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                  Trust Signals We Bring
                </p>
                <p className="text-[16px] text-[rgba(245,240,232,0.7)] leading-relaxed italic" style={{ fontFamily: "var(--font-serif)" }}>
                  {industry.trustSignals}
                </p>
              </div>
              <div>
                <p className="text-[11px] tracking-[0.15em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                  Case Study Direction
                </p>
                <p className="text-[16px] text-[rgba(245,240,232,0.7)] leading-relaxed" style={{ fontFamily: "var(--font-serif)" }}>
                  {industry.caseDirection}
                </p>
                <Link
                  to="/work"
                  className="mt-5 inline-flex items-center gap-2 text-[12px] tracking-[0.12em] uppercase text-[#b8914a] hover:text-[#d4a85a] transition-colors group"
                >
                  See our work <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Industries in same cluster */}
      <section className="py-16 bg-[#ece6d8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-6" style={{ fontFamily: "var(--font-mono)" }}>
              Also in {industry.cluster}
            </p>
            <div className="flex flex-wrap gap-3">
              {clusterIndustries.map((ind) => (
                <Link
                  key={ind.id}
                  to={`/industries/${ind.id}`}
                  className={`text-[13px] px-5 py-2.5 border transition-all ${
                    ind.id === industry.id
                      ? "bg-[#0d0d0d] text-[#f5f0e8] border-[#0d0d0d]"
                      : "text-[#2a2826] border-[rgba(13,13,13,0.2)] hover:border-[#b8914a] hover:text-[#b8914a]"
                  }`}
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {ind.label}
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* All 12 industries */}
      <section className="py-14 bg-[#f5f0e8] border-t border-[rgba(13,13,13,0.06)]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-6" style={{ fontFamily: "var(--font-mono)" }}>
              All Industries
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-px bg-[rgba(13,13,13,0.08)]">
              {industries.map((ind) => (
                <Link
                  key={ind.id}
                  to={`/industries/${ind.id}`}
                  className={`block px-5 py-4 text-[13px] transition-colors ${
                    ind.id === industry.id
                      ? "bg-[#0d0d0d] text-[#f5f0e8]"
                      : "bg-[#f5f0e8] text-[#2a2826] hover:bg-[#0d0d0d] hover:text-[#f5f0e8]"
                  }`}
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {ind.label}
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Prev / Next + CTA */}
      <section className="py-14 bg-[#0d0d0d]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div>
              {prev && (
                <Link
                  to={`/industries/${prev.id}`}
                  className="flex items-center gap-3 text-[rgba(245,240,232,0.4)] hover:text-[#b8914a] transition-colors group"
                >
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <p className="text-[10px] tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>Previous</p>
                    <p className="text-[14px] font-medium text-[rgba(245,240,232,0.7)]" style={{ fontFamily: "var(--font-serif)" }}>{prev.label}</p>
                  </div>
                </Link>
              )}
            </div>

            <div className="text-center">
              <Link
                to="/discovery-workshop"
                className="inline-flex items-center gap-3 bg-[#b8914a] text-[#f5f0e8] text-[12px] tracking-[0.12em] uppercase font-medium px-7 py-4 hover:bg-[#d4a85a] transition-colors group"
              >
                Discuss Your Situation
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="text-right">
              {next && (
                <Link
                  to={`/industries/${next.id}`}
                  className="inline-flex items-center gap-3 text-[rgba(245,240,232,0.4)] hover:text-[#b8914a] transition-colors group"
                >
                  <div>
                    <p className="text-[10px] tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>Next</p>
                    <p className="text-[14px] font-medium text-[rgba(245,240,232,0.7)]" style={{ fontFamily: "var(--font-serif)" }}>{next.label}</p>
                  </div>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
