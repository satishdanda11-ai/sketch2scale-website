import { useRef, useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { industries } from "../data/industries";
import { articles } from "../data/insights";
import { caseStudies } from "../data/work";

const UNSPLASH_IMGS = {
  hero: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop&auto=format",
};

const scaleCategories = [
  { label: "A Startup", sub: "From ambiguous idea to investable, scalable company", href: "/industries/startups", icon: "◈" },
  { label: "A Product", sub: "From concept to platform people actually use", href: "/what-we-scale/product", icon: "◉" },
  { label: "A Brand", sub: "From inconsistent identity to compounding market trust", href: "/what-we-scale/brand", icon: "◇" },
  { label: "An AI Platform", sub: "From technical capability to defensible business advantage", href: "/industries/ai", icon: "◎" },
  { label: "A Movement", sub: "From an idea with reach to a following that acts", href: "/what-we-scale/influence", icon: "○" },
  { label: "A Business", sub: "From plateau to strategic clarity and growth architecture", href: "/what-we-scale/business", icon: "□" },
];

const sixS = [
  { stage: "01", name: "Discover", outcome: "A shared understanding of the real problem and the opportunity worth solving" },
  { stage: "02", name: "Clarify", outcome: "A validated direction, so nothing is built on a contested premise" },
  { stage: "03", name: "Sketch", outcome: "The earliest tangible expression of the strategy — rough, directional, real" },
  { stage: "04", name: "Strategize", outcome: "A documented growth architecture the whole organisation can execute against" },
  { stage: "05", name: "Design & Build", outcome: "The fully realised platform, brand, or campaign — usable, scalable, defensible" },
  { stage: "06", name: "Launch & Scale", outcome: "Momentum in the market — not just a deliverable, but visible, compounding motion" },
];

const transformations = caseStudies
  .filter((c) => c.featured)
  .map((c) => ({
    outcome: c.outcome,
    type: `${c.pillar} · ${c.industry}`,
    img: c.img,
    alt: c.outcome,
  }));

const industriesGrid = industries.map((ind) => ({
  label: ind.label,
  cluster: ind.cluster,
  slug: ind.id,
}));

const featuredInsights = articles.filter((a) => a.featured);

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const [expandedStage, setExpandedStage] = useState<number | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [hoveredTransformation, setHoveredTransformation] = useState<number | null>(null);
  const [hoveredIndustry, setHoveredIndustry] = useState<string | null>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div className="bg-[#f5f0e8]">
      {/* ═══ 6.1 HERO ═══ */}
      <section
        ref={heroRef}
        className="relative min-h-screen bg-[#0d0d0d] flex flex-col justify-end overflow-hidden"
        aria-label="Hero"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={UNSPLASH_IMGS.hero}
            alt="Architectural perspective — structured momentum"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/40 via-[#0d0d0d]/60 to-[#0d0d0d]/90" />
        </div>

        {/* Cursor-responsive element */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
            transition: "transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        >
          <div className="absolute top-1/3 right-[15%] w-px h-40 bg-[#b8914a]/30" />
          <div className="absolute top-1/3 right-[15%] w-40 h-px bg-[#b8914a]/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 pb-20 pt-36">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[11px] tracking-[0.25em] uppercase text-[#b8914a] mb-8 font-medium"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Business Design Partner
            </motion.p>

            <div className="max-w-4xl">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-[clamp(44px,7vw,96px)] font-medium leading-[1.05] text-[#f5f0e8] mb-8"
                style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}
              >
                Every transformation
                <br />
                <em className="italic text-[#b8914a]">starts with a sketch.</em>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-[17px] text-[rgba(245,240,232,0.65)] leading-relaxed max-w-xl mb-12"
              >
                We are the partner that takes an early, unproven idea and designs the path by which it scales — combining business strategy, design, technology, and storytelling into a single discipline.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-wrap items-center gap-4"
              >
                <Link
                  to="/what-we-scale"
                  className="inline-flex items-center gap-3 text-[13px] tracking-[0.1em] uppercase font-medium text-[#f5f0e8] border border-[rgba(245,240,232,0.3)] px-6 py-3.5 hover:border-[#f5f0e8] transition-all duration-200 group"
                >
                  See what we scale
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/work"
                  className="text-[13px] tracking-wide text-[rgba(245,240,232,0.5)] hover:text-[#b8914a] transition-colors border-b border-transparent hover:border-[#b8914a] pb-0.5"
                >
                  View our work
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 pb-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-[rgba(245,240,232,0.2)]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[rgba(245,240,232,0.3)]" style={{ fontFamily: "var(--font-mono)" }}>
              Scroll
            </span>
          </div>
        </motion.div>
      </section>

      {/* ═══ 6.2 WHAT ARE YOU TRYING TO SCALE? ═══ */}
      <section className="py-24 lg:py-32 bg-[#f5f0e8]" aria-label="What Are You Trying To Scale?">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeInSection>
            <div className="mb-14">
              <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                What are you trying to scale?
              </p>
              <h2 className="text-[clamp(28px,4vw,52px)] font-medium text-[#0d0d0d] leading-tight max-w-xl" style={{ fontFamily: "var(--font-serif)" }}>
                Whatever you are building{" "}
                <em className="italic text-[#8a8070]">started as a sketch.</em>
              </h2>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(13,13,13,0.1)]">
            {scaleCategories.map((cat, i) => (
              <FadeInSection key={cat.label} delay={i * 0.07}>
                <Link
                  to={cat.href}
                  className="block bg-[#f5f0e8] p-8 group cursor-pointer transition-colors hover:bg-[#0d0d0d]"
                  onMouseEnter={() => setHoveredCategory(i)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className={`text-[28px] transition-colors ${hoveredCategory === i ? "text-[#b8914a]" : "text-[rgba(13,13,13,0.15)]"}`}>
                      {cat.icon}
                    </span>
                    <span className={`text-[10px] tracking-[0.15em] uppercase font-medium transition-colors ${hoveredCategory === i ? "text-[#b8914a]" : "text-[rgba(13,13,13,0.0)]"}`} style={{ fontFamily: "var(--font-mono)" }}>
                      Scale →
                    </span>
                  </div>
                  <h3
                    className={`text-[20px] font-medium mb-3 transition-colors leading-tight ${hoveredCategory === i ? "text-[#f5f0e8]" : "text-[#0d0d0d]"}`}
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {cat.label}
                  </h3>
                  <p className={`text-[13px] leading-snug transition-colors ${hoveredCategory === i ? "text-[rgba(245,240,232,0.6)]" : "text-[rgba(13,13,13,0.0)]"}`}>
                    {cat.sub}
                  </p>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6.3 OUR PHILOSOPHY ═══ */}
      <section className="py-24 lg:py-40 bg-[#0d0d0d]" aria-label="Our Philosophy">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
            <div className="lg:col-span-8">
              <FadeInSection>
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-10" style={{ fontFamily: "var(--font-mono)" }}>
                  Our Philosophy
                </p>
                <h2
                  className="text-[clamp(36px,5.5vw,76px)] font-medium text-[#f5f0e8] leading-[1.05] mb-8"
                  style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}
                >
                  Business first.
                  <br />
                  <em className="italic text-[#b8914a]">Design as the superpower.</em>
                </h2>
                <p className="text-[17px] text-[rgba(245,240,232,0.6)] leading-relaxed max-w-2xl">
                  Most organisations treat design as a finishing layer — applied after the strategy is decided, to make the result look credible. We refuse this sequencing. Business problems are solved with strategy, design, technology, storytelling, and intelligence working as one system, not in relay.
                </p>
              </FadeInSection>
            </div>
            <div className="lg:col-span-4">
              <FadeInSection delay={0.2}>
                <div className="border border-[rgba(245,240,232,0.1)] p-8">
                  <p className="text-[12px] tracking-[0.15em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                    The test we apply to every decision
                  </p>
                  <p className="text-[15px] text-[rgba(245,240,232,0.8)] leading-relaxed italic" style={{ fontFamily: "var(--font-serif)" }}>
                    "A visitor should never conclude that Sketch2Scale makes beautiful things. A visitor should conclude that Sketch2Scale understands business."
                  </p>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 6.4 MOMENTUM DESIGN ═══ */}
      <section className="py-24 lg:py-36 bg-[#f5f0e8] overflow-hidden" aria-label="Momentum Design">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <FadeInSection>
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-6" style={{ fontFamily: "var(--font-mono)" }}>
                  We Design Momentum
                </p>
                <h2
                  className="text-[clamp(32px,4.5vw,60px)] font-medium text-[#0d0d0d] leading-[1.08] mb-8"
                  style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}
                >
                  Momentum is designed,
                  <br />
                  <em className="italic text-[#b8914a]">not accidental.</em>
                </h2>
                <p className="text-[16px] text-[#8a8070] leading-relaxed">
                  We build the conditions for compounding progress: clarity of direction, visible motion at every stage, and a structure that keeps gaining speed as the engagement deepens. Every deliverable should leave the client with more momentum than they arrived with.
                </p>
              </FadeInSection>
            </div>

            <div className="lg:col-span-7">
              <div className="space-y-px">
                {["Clarity", "Direction", "Visible Motion", "Compounding Progress"].map((item, i) => (
                  <FadeInSection key={item} delay={0.1 * i}>
                    <div className="flex items-center gap-6 border border-[rgba(13,13,13,0.08)] px-8 py-6 bg-[#f5f0e8] hover:bg-[#0d0d0d] hover:text-[#f5f0e8] group transition-all duration-300">
                      <span className="text-[11px] tracking-[0.2em] text-[#b8914a] font-medium min-w-[2rem]" style={{ fontFamily: "var(--font-mono)" }}>
                        0{i + 1}
                      </span>
                      <span className="text-[22px] font-medium group-hover:text-[#f5f0e8] text-[#0d0d0d] transition-colors" style={{ fontFamily: "var(--font-serif)" }}>
                        {item}
                      </span>
                      <span className="ml-auto text-[#b8914a] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </div>
                  </FadeInSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 6.5 SIX-S METHOD ═══ */}
      <section className="py-24 lg:py-36 bg-[#2a2826]" aria-label="The Six-S Method">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeInSection>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
              <div>
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                  The Six-S Method
                </p>
                <h2
                  className="text-[clamp(28px,4vw,54px)] font-medium text-[#f5f0e8] leading-tight"
                  style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}
                >
                  A structured path
                  <br />
                  from sketch to scale.
                </h2>
              </div>
              <Link
                to="/discovery-workshop"
                className="inline-flex items-center gap-2 text-[12px] tracking-[0.12em] uppercase text-[#b8914a] border border-[#b8914a] px-5 py-3 hover:bg-[#b8914a] hover:text-[#f5f0e8] transition-all group self-start lg:self-auto"
              >
                Begin with Discover
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeInSection>

          <div className="space-y-px">
            {sixS.map((s, i) => (
              <FadeInSection key={s.name} delay={i * 0.06}>
                <button
                  onClick={() => setExpandedStage(expandedStage === i ? null : i)}
                  className="w-full text-left border border-[rgba(245,240,232,0.08)] px-8 py-6 flex items-center gap-6 hover:bg-[rgba(245,240,232,0.03)] transition-colors group"
                  aria-expanded={expandedStage === i}
                >
                  <span className="text-[11px] tracking-[0.2em] text-[#b8914a] font-medium min-w-[2rem]" style={{ fontFamily: "var(--font-mono)" }}>
                    {s.stage}
                  </span>
                  <span
                    className="text-[20px] font-medium text-[#f5f0e8] min-w-[160px]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {s.name}
                  </span>
                  <motion.span
                    initial={false}
                    animate={{ opacity: expandedStage === i ? 1 : 0, x: expandedStage === i ? 0 : -8 }}
                    transition={{ duration: 0.25 }}
                    className="text-[14px] text-[rgba(245,240,232,0.55)] leading-relaxed flex-1 text-left hidden lg:block"
                  >
                    {s.outcome}
                  </motion.span>
                  <span className="ml-auto text-[#8a8070] group-hover:text-[#b8914a] transition-colors text-[18px]">
                    {expandedStage === i ? "−" : "+"}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: expandedStage === i ? "auto" : 0, opacity: expandedStage === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden lg:hidden"
                >
                  <div className="px-8 pb-5 pl-24 text-[14px] text-[rgba(245,240,232,0.55)] leading-relaxed">
                    {s.outcome}
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6.6 BUSINESS TRANSFORMATIONS ═══ */}
      <section className="py-24 lg:py-36 bg-[#f5f0e8]" aria-label="Business Transformations">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeInSection>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
              <div>
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                  Business Transformations
                </p>
                <h2
                  className="text-[clamp(28px,4vw,52px)] font-medium text-[#0d0d0d] leading-tight"
                  style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}
                >
                  Real sketches,
                  <br />
                  <em className="italic text-[#8a8070]">scaled.</em>
                </h2>
              </div>
              <Link
                to="/work"
                className="text-[12px] tracking-[0.12em] uppercase text-[#0d0d0d] border-b border-[#0d0d0d] pb-0.5 hover:text-[#b8914a] hover:border-[#b8914a] transition-colors self-start lg:self-auto"
              >
                See all transformations
              </Link>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[rgba(13,13,13,0.1)]">
            {transformations.map((t, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div
                  className="relative bg-[#f5f0e8] group overflow-hidden cursor-pointer"
                  onMouseEnter={() => setHoveredTransformation(i)}
                  onMouseLeave={() => setHoveredTransformation(null)}
                >
                  <div className="relative h-56 overflow-hidden bg-[#2a2826]">
                    <img
                      src={t.img}
                      alt={t.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0d0d0d]/40 group-hover:bg-[#0d0d0d]/20 transition-colors duration-300" />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredTransformation === i ? 1 : 0 }}
                      className="absolute top-4 right-4 bg-[#b8914a] px-3 py-1"
                    >
                      <span className="text-[10px] tracking-[0.15em] uppercase text-[#f5f0e8]" style={{ fontFamily: "var(--font-mono)" }}>
                        {t.type}
                      </span>
                    </motion.div>
                  </div>
                  <div className="p-8">
                    <p className="text-[16px] text-[#0d0d0d] leading-snug font-medium" style={{ fontFamily: "var(--font-serif)" }}>
                      {t.outcome}
                    </p>
                    <Link
                      to="/work"
                      className="mt-4 inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#b8914a] opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Read the transformation <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6.7 INDUSTRIES ═══ */}
      <section className="py-24 lg:py-32 bg-[#ece6d8]" aria-label="Industries">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeInSection>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
              <div>
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                  Industries
                </p>
                <h2
                  className="text-[clamp(24px,3.5vw,44px)] font-medium text-[#0d0d0d] leading-tight"
                  style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.01em" }}
                >
                  Transformation looks different
                  <br />in every industry.
                </h2>
              </div>
              <Link
                to="/industries"
                className="text-[12px] tracking-[0.12em] uppercase text-[#0d0d0d] border-b border-[#0d0d0d] pb-0.5 hover:text-[#b8914a] hover:border-[#b8914a] transition-colors self-start"
              >
                All industries
              </Link>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-[rgba(13,13,13,0.08)]">
            {industriesGrid.map((ind, i) => (
              <FadeInSection key={ind.slug} delay={i * 0.04}>
                <Link
                  to={`/industries/${ind.slug}`}
                  className="block bg-[#ece6d8] px-6 py-5 group hover:bg-[#0d0d0d] transition-colors"
                  onMouseEnter={() => setHoveredIndustry(ind.slug)}
                  onMouseLeave={() => setHoveredIndustry(null)}
                >
                  <p
                    className={`text-[15px] font-medium transition-colors ${hoveredIndustry === ind.slug ? "text-[#f5f0e8]" : "text-[#0d0d0d]"}`}
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {ind.label}
                  </p>
                  <p
                    className={`text-[10px] tracking-[0.15em] uppercase mt-1 transition-colors ${hoveredIndustry === ind.slug ? "text-[#b8914a]" : "text-[#8a8070]"}`}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {ind.cluster}
                  </p>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6.8 INSIGHTS ═══ */}
      <section className="py-24 lg:py-36 bg-[#f5f0e8]" aria-label="Insights">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeInSection>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
              <div>
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                  Insights
                </p>
                <h2
                  className="text-[clamp(24px,3.5vw,44px)] font-medium text-[#0d0d0d] leading-tight"
                  style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.01em" }}
                >
                  We publish
                  <br />
                  <em className="italic text-[#8a8070]">what we practice.</em>
                </h2>
              </div>
              <Link
                to="/insights"
                className="text-[12px] tracking-[0.12em] uppercase text-[#0d0d0d] border-b border-[#0d0d0d] pb-0.5 hover:text-[#b8914a] hover:border-[#b8914a] transition-colors self-start"
              >
                Read more insights
              </Link>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredInsights.map((item, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <Link to="/insights" className="block group">
                  <div className="relative h-48 overflow-hidden bg-[#2a2826] mb-5">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#b8914a] font-medium" style={{ fontFamily: "var(--font-mono)" }}>
                      {item.tag}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#c4bdb0]" />
                    <span className="text-[11px] text-[#8a8070]" style={{ fontFamily: "var(--font-mono)" }}>
                      {item.reading}
                    </span>
                  </div>
                  <h3
                    className="text-[16px] font-medium text-[#0d0d0d] leading-snug group-hover:text-[#b8914a] transition-colors"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {item.title}
                  </h3>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6.9 START YOUR SKETCH ═══ */}
      <section className="py-24 lg:py-40 bg-[#0d0d0d]" aria-label="Start Your Sketch">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
          <FadeInSection>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-8" style={{ fontFamily: "var(--font-mono)" }}>
              The first step
            </p>
            <h2
              className="text-[clamp(40px,6vw,88px)] font-medium text-[#f5f0e8] leading-[1.05] mb-8"
              style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}
            >
              Start your sketch.
            </h2>
            <p className="text-[17px] text-[rgba(245,240,232,0.55)] leading-relaxed max-w-md mx-auto mb-12">
              A Discovery Workshop is a structured, single-session conversation — not a sales call. Begin there.
            </p>
            <Link
              to="/discovery-workshop"
              className="inline-flex items-center gap-3 bg-[#b8914a] text-[#f5f0e8] text-[13px] tracking-[0.12em] uppercase font-medium px-8 py-4 hover:bg-[#d4a85a] transition-colors group"
            >
              Book a Discovery Workshop
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
