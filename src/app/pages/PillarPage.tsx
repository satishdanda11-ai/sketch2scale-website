import { useRef } from "react";
import { Link, useParams, Navigate } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { pillars, getPillar } from "../data/pillars";

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

export default function PillarPage() {
  const { pillar: pillarId } = useParams<{ pillar: string }>();
  const pillar = getPillar(pillarId ?? "");

  if (!pillar) return <Navigate to="/what-we-scale" replace />;

  const currentIndex = pillars.findIndex((p) => p.id === pillar.id);
  const prev = currentIndex > 0 ? pillars[currentIndex - 1] : null;
  const next = currentIndex < pillars.length - 1 ? pillars[currentIndex + 1] : null;

  return (
    <div className="bg-[#f5f0e8]">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-end bg-[#0d0d0d] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={pillar.heroImg}
            alt={`${pillar.label} transformation`}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/30 via-[#0d0d0d]/60 to-[#0d0d0d]/95" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 pb-16 pt-36">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <Link
              to="/what-we-scale"
              className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[rgba(245,240,232,0.45)] hover:text-[#b8914a] transition-colors"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <ArrowLeft size={11} /> What We Scale
            </Link>
            <span className="text-[rgba(245,240,232,0.2)]">/</span>
            <span className="text-[11px] tracking-[0.15em] uppercase text-[#b8914a]" style={{ fontFamily: "var(--font-mono)" }}>
              {pillar.label}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#b8914a] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
              Pillar {pillar.n} of 06
            </p>
            <h1
              className="text-[clamp(44px,7vw,96px)] font-medium text-[#f5f0e8] leading-[1.03] mb-6 max-w-4xl"
              style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}
            >
              {pillar.label}
            </h1>
            <p
              className="text-[18px] text-[rgba(245,240,232,0.6)] max-w-2xl leading-relaxed italic"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {pillar.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Purpose & Overview */}
      <section className="py-20 lg:py-28 bg-[#f5f0e8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <FadeIn>
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-6" style={{ fontFamily: "var(--font-mono)" }}>
                  What this pillar transforms
                </p>
                <p
                  className="text-[clamp(20px,2.5vw,30px)] text-[#0d0d0d] leading-[1.4] font-medium mb-8"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {pillar.purpose}
                </p>
                <p className="text-[16px] text-[#8a8070] leading-relaxed">
                  {pillar.value}
                </p>
              </FadeIn>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <FadeIn delay={0.15}>
                <div className="overflow-hidden bg-[#2a2826]">
                  <img
                    src={pillar.img}
                    alt={`${pillar.label} transformation work`}
                    className="w-full h-64 object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-20 bg-[#0d0d0d]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
              Problems We Solve
            </p>
            <h2
              className="text-[clamp(28px,4vw,52px)] font-medium text-[#f5f0e8] leading-tight mb-12"
              style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.01em" }}
            >
              Recognise any of these?
            </h2>
          </FadeIn>

          <div className="space-y-px">
            {pillar.problems.map((prob, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="flex items-start gap-6 border-b border-[rgba(245,240,232,0.06)] py-6 group hover:bg-[rgba(245,240,232,0.02)] transition-colors px-2">
                  <span className="text-[11px] tracking-[0.15em] text-[#b8914a] pt-1 min-w-[2rem] flex-shrink-0" style={{ fontFamily: "var(--font-mono)" }}>
                    0{i + 1}
                  </span>
                  <p className="text-[17px] text-[rgba(245,240,232,0.75)] leading-snug" style={{ fontFamily: "var(--font-serif)" }}>
                    {prob}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal for + Example */}
      <section className="py-20 bg-[#ece6d8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <FadeIn>
              <div>
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                  Ideal For
                </p>
                <h3 className="text-[22px] font-medium text-[#0d0d0d] mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                  Who engages this pillar?
                </h3>
                <p className="text-[16px] text-[#2a2826] leading-relaxed">{pillar.ideal}</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="bg-[#f5f0e8] border border-[rgba(13,13,13,0.08)] p-8">
                <p className="text-[11px] tracking-[0.15em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                  Example Engagements
                </p>
                <p className="text-[15px] text-[#2a2826] leading-relaxed italic" style={{ fontFamily: "var(--font-serif)" }}>
                  {pillar.example}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Connects to */}
      <section className="py-16 bg-[#f5f0e8] border-t border-[rgba(13,13,13,0.06)]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="flex flex-wrap items-center gap-6">
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#8a8070]" style={{ fontFamily: "var(--font-mono)" }}>
                This pillar connects to
              </p>
              {pillar.connects.map((c, i) => {
                const slug = pillar.connectSlugs[i];
                const isPillar = pillars.some((p) => p.id === slug);
                return (
                  <Link
                    key={c}
                    to={isPillar ? `/what-we-scale/${slug}` : `/industries/${slug}`}
                    className="text-[12px] tracking-[0.1em] uppercase text-[#b8914a] border border-[#b8914a]/40 px-4 py-2 hover:bg-[#b8914a] hover:text-[#f5f0e8] transition-all"
                  >
                    {c} →
                  </Link>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* All 6 Pillars navigation */}
      <section className="py-16 bg-[#2a2826]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-8" style={{ fontFamily: "var(--font-mono)" }}>
              All Transformation Pillars
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-[rgba(245,240,232,0.06)]">
              {pillars.map((p) => (
                <Link
                  key={p.id}
                  to={`/what-we-scale/${p.id}`}
                  className={`block px-5 py-6 transition-colors group ${p.id === pillar.id ? "bg-[#b8914a]" : "bg-[#2a2826] hover:bg-[rgba(245,240,232,0.04)]"}`}
                >
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[rgba(245,240,232,0.4)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>{p.n}</p>
                  <p className={`text-[16px] font-medium transition-colors ${p.id === pillar.id ? "text-[#f5f0e8]" : "text-[rgba(245,240,232,0.7)] group-hover:text-[#f5f0e8]"}`} style={{ fontFamily: "var(--font-serif)" }}>
                    {p.label}
                  </p>
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Prev / Next + CTA */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div>
              {prev && (
                <Link
                  to={`/what-we-scale/${prev.id}`}
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
                Start Your Sketch
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="text-right">
              {next && (
                <Link
                  to={`/what-we-scale/${next.id}`}
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
