import { useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useInView, useScroll, useReducedMotion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { industries } from "../data/industries";
import { articles } from "../data/insights";
import { caseStudies } from "../data/work";

const EASE = [0.25, 0.1, 0.25, 1] as const;
const DRAW_EASE = [0.65, 0, 0.35, 1] as const;

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

/* ────────────────────────────────────────────────────────────────
   MOTION PRIMITIVES
   Two reusable signatures run through the whole page:
   1. SplitReveal — headlines assemble themselves word by word,
      standing in for "a sketch becoming legible."
   2. SketchLine — a hairline that draws itself, the same literal
      gesture as the wordmark: a line, becoming a line at scale.
   Both respect prefers-reduced-motion.
──────────────────────────────────────────────────────────────── */

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function SplitReveal({
  text,
  className,
  style,
  delay = 0,
  stagger = 0.045,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return (
      <span ref={ref} className={className} style={style}>
        {text}
      </span>
    );
  }

  return (
    <span ref={ref} className={className} style={style}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.1em", verticalAlign: "top" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "115%", opacity: 0, filter: "blur(8px)" }}
            animate={inView ? { y: "0%", opacity: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.85, delay: delay + i * stagger, ease: DRAW_EASE }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function SketchLine({
  className,
  delay = 0,
  duration = 1.1,
  vertical = false,
}: {
  className?: string;
  delay?: number;
  duration?: number;
  vertical?: boolean;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  return (
    <svg
      ref={ref}
      className={className}
      viewBox={vertical ? "0 0 2 200" : "0 0 200 2"}
      preserveAspectRatio="none"
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
      <motion.line
        x1={vertical ? 1 : 0}
        y1={vertical ? 0 : 1}
        x2={vertical ? 1 : 200}
        y2={vertical ? 200 : 1}
        stroke="#b8914a"
        strokeWidth="1.5"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration, delay, ease: DRAW_EASE }}
      />
    </svg>
  );
}

export default function Home() {
  const [expandedStage, setExpandedStage] = useState<number | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [hoveredTransformation, setHoveredTransformation] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();

  return (
    <div className="bg-[#f5f0e8]">
      {/* The signature: a gold hairline that scales across the top of the
          viewport as you move through the page — the brand's own idea,
          made literal and load-bearing rather than decorative. */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#b8914a] origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen bg-[#0d0d0d] flex flex-col justify-end overflow-hidden" aria-label="Hero">
        {/* Oversized outline wordmark — typography as the only backdrop, no stock photography */}
        <motion.p
          aria-hidden="true"
          className="absolute -bottom-[8vw] left-1/2 -translate-x-1/2 whitespace-nowrap text-[26vw] font-medium pointer-events-none select-none"
          style={{
            fontFamily: "var(--font-serif)",
            letterSpacing: "-0.03em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(245,240,232,0.07)",
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          Sketch
        </motion.p>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 pb-20 pt-36 w-full">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="text-[11px] tracking-[0.25em] uppercase text-[#b8914a] mb-8 font-medium"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Business Design Partner
          </motion.p>

          <div className="max-w-4xl">
            <h1
              className="text-[clamp(44px,7vw,96px)] font-medium leading-[1.05] text-[#f5f0e8] mb-1"
              style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}
            >
              <SplitReveal text="Every transformation" delay={0.3} />
            </h1>
            <h1
              className="text-[clamp(44px,7vw,96px)] font-medium leading-[1.05] text-[#b8914a] italic mb-8 inline-block"
              style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}
            >
              <SplitReveal text="starts with a sketch." delay={0.62} />
              <SketchLine className="block w-full h-[2px] mt-3" delay={1.2} duration={0.9} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.35, ease: EASE }}
              className="text-[17px] text-[rgba(245,240,232,0.65)] leading-relaxed max-w-xl mb-12"
            >
              We are the partner that takes an early, unproven idea and designs the path by which it scales — combining business strategy, design, technology, and storytelling into a single discipline.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5, ease: EASE }}
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
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 pb-8"
        >
          <div className="flex items-center gap-3">
            <SketchLine className="w-8 h-[1px]" delay={1.8} duration={0.5} />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[rgba(245,240,232,0.3)]" style={{ fontFamily: "var(--font-mono)" }}>
              Scroll
            </span>
          </div>
        </motion.div>
      </section>

      {/* ═══ WHAT ARE YOU TRYING TO SCALE? ═══ */}
      <section className="py-24 lg:py-32 bg-[#f5f0e8]" aria-label="What Are You Trying To Scale?">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeInSection>
            <div className="mb-14">
              <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                What are you trying to scale?
              </p>
              <h2 className="text-[clamp(28px,4vw,52px)] font-medium text-[#0d0d0d] leading-tight max-w-xl" style={{ fontFamily: "var(--font-serif)" }}>
                <SplitReveal text="Whatever you are building" />{" "}
                <span className="italic text-[#8a8070]">
                  <SplitReveal text="started as a sketch." delay={0.25} />
                </span>
              </h2>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(13,13,13,0.1)]">
            {scaleCategories.map((cat, i) => (
              <FadeInSection key={cat.label} delay={i * 0.07}>
                <Link
                  to={cat.href}
                  className="block bg-[#f5f0e8] p-8 group cursor-pointer transition-colors duration-300 hover:bg-[#0d0d0d]"
                  onMouseEnter={() => setHoveredCategory(i)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className={`text-[28px] transition-colors ${hoveredCategory === i ? "text-[#b8914a]" : "text-[rgba(13,13,13,0.25)]"}`}>
                      {cat.icon}
                    </span>
                    <span
                      className={`text-[10px] tracking-[0.15em] uppercase font-medium transition-colors ${
                        hoveredCategory === i ? "text-[#b8914a]" : "text-[rgba(13,13,13,0.3)]"
                      }`}
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Scale →
                    </span>
                  </div>
                  <h3
                    className={`text-[20px] font-medium mb-3 transition-colors leading-tight ${hoveredCategory === i ? "text-[#f5f0e8]" : "text-[#0d0d0d]"}`}
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {cat.label}
                  </h3>
                  <p
                    className={`text-[13px] leading-snug transition-colors ${
                      hoveredCategory === i ? "text-[rgba(245,240,232,0.6)]" : "text-[rgba(13,13,13,0.45)]"
                    }`}
                  >
                    {cat.sub}
                  </p>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OUR PHILOSOPHY ═══ */}
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
                  <SplitReveal text="Business first." /> <br />
                  <span className="italic text-[#b8914a]">
                    <SplitReveal text="Design as the superpower." delay={0.3} />
                  </span>
                </h2>
                <p className="text-[17px] text-[rgba(245,240,232,0.6)] leading-relaxed max-w-2xl">
                  Most organisations treat design as a finishing layer — applied after the strategy is decided, to make the result look credible. We refuse this sequencing. Business problems are solved with strategy, design, technology, storytelling, and intelligence working as one system, not in relay.
                </p>
              </FadeInSection>
            </div>
            <div className="lg:col-span-4">
              <FadeInSection delay={0.2}>
                <div className="border border-[rgba(245,240,232,0.1)] p-8 relative">
                  <SketchLine className="absolute top-0 left-8 w-16 h-[2px] -translate-y-1/2" delay={0.6} duration={0.7} />
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

      {/* ═══ MOMENTUM DESIGN ═══ */}
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
                  <SplitReveal text="Momentum is designed," /> <br />
                  <span className="italic text-[#b8914a]">
                    <SplitReveal text="not accidental." delay={0.3} />
                  </span>
                </h2>
                <p className="text-[16px] text-[#8a8070] leading-relaxed">
                  We build the conditions for compounding progress: clarity of direction, visible motion at every stage, and a structure that keeps gaining speed as the engagement deepens. Every deliverable should leave the client with more momentum than they arrived with.
                </p>
              </FadeInSection>
            </div>

            <div className="lg:col-span-7 relative">
              <SketchLine vertical className="absolute left-0 top-0 w-[2px] h-full hidden lg:block" delay={0.15} duration={1.4} />
              <div className="space-y-px lg:pl-10">
                {["Clarity", "Direction", "Visible Motion", "Compounding Progress"].map((item, i) => (
                  <FadeInSection key={item} delay={0.1 * i}>
                    <div className="relative flex items-center gap-6 border border-[rgba(13,13,13,0.08)] px-8 py-6 bg-[#f5f0e8] overflow-hidden group transition-colors duration-300 hover:bg-[rgba(184,145,74,0.06)]">
                      <motion.span
                        className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#b8914a] origin-top"
                        initial={{ scaleY: 0 }}
                        whileHover={{ scaleY: 1 }}
                        transition={{ duration: 0.3, ease: EASE }}
                      />
                      <span className="text-[11px] tracking-[0.2em] text-[#b8914a] font-medium min-w-[2rem]" style={{ fontFamily: "var(--font-mono)" }}>
                        0{i + 1}
                      </span>
                      <span
                        className="text-[22px] font-medium text-[#0d0d0d] group-hover:text-[#b8914a] transition-colors"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {item}
                      </span>
                      <span className="ml-auto text-[#b8914a] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
                    </div>
                  </FadeInSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SIX-S METHOD ═══ */}
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
                  <SplitReveal text="A structured path" /> <br />
                  <SplitReveal text="from sketch to scale." delay={0.25} />
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

          <div className="relative">
            <SketchLine vertical className="absolute left-[19px] top-2 bottom-2 w-[1px] hidden sm:block" delay={0.1} duration={1.6} />
            <div className="space-y-px">
              {sixS.map((s, i) => {
                const isOpen = expandedStage === i;
                return (
                  <FadeInSection key={s.name} delay={i * 0.06}>
                    <div className="relative">
                      <button
                        onClick={() => setExpandedStage(isOpen ? null : i)}
                        className="relative z-10 w-full text-left border border-[rgba(245,240,232,0.08)] bg-[#2a2826] px-8 py-6 flex items-center gap-6 hover:bg-[rgba(245,240,232,0.03)] transition-colors group"
                        aria-expanded={isOpen}
                      >
                        <span className="text-[11px] tracking-[0.2em] text-[#b8914a] font-medium min-w-[2rem]" style={{ fontFamily: "var(--font-mono)" }}>
                          {s.stage}
                        </span>
                        <span className="text-[20px] font-medium text-[#f5f0e8]" style={{ fontFamily: "var(--font-serif)" }}>
                          {s.name}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.25, ease: EASE }}
                          className="ml-auto text-[#8a8070] group-hover:text-[#b8914a] transition-colors text-[18px]"
                        >
                          +
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <div className="px-8 py-5 pl-[4.5rem] text-[14px] text-[rgba(245,240,232,0.6)] leading-relaxed border-x border-b border-[rgba(245,240,232,0.08)]">
                              {s.outcome}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </FadeInSection>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BUSINESS TRANSFORMATIONS ═══ */}
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
                  <SplitReveal text="Real sketches," /> <br />
                  <span className="italic text-[#8a8070]">
                    <SplitReveal text="scaled." delay={0.25} />
                  </span>
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
                    <motion.img
                      src={t.img}
                      alt={t.alt}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.15, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-60px" }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1, ease: EASE }}
                    />
                    <div className="absolute inset-0 bg-[#0d0d0d]/40 group-hover:bg-[#0d0d0d]/20 transition-colors duration-300" />
                    <div
                      className={`absolute top-4 right-4 bg-[#b8914a] px-3 py-1 transition-opacity duration-300 ${
                        hoveredTransformation === i ? "opacity-100" : "opacity-80"
                      }`}
                    >
                      <span className="text-[10px] tracking-[0.15em] uppercase text-[#f5f0e8]" style={{ fontFamily: "var(--font-mono)" }}>
                        {t.type}
                      </span>
                    </div>
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

      {/* ═══ INDUSTRIES ═══ */}
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
                  <SplitReveal text="Transformation looks different" /> <br />
                  <SplitReveal text="in every industry." delay={0.25} />
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
                <Link to={`/industries/${ind.slug}`} className="relative block bg-[#ece6d8] px-6 py-5 group overflow-hidden">
                  <p
                    className="text-[15px] font-medium text-[#0d0d0d] group-hover:text-[#b8914a] transition-colors"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {ind.label}
                  </p>
                  <p
                    className="text-[10px] tracking-[0.15em] uppercase mt-1 text-[#8a8070] group-hover:text-[#b8914a] transition-colors"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {ind.cluster}
                  </p>
                  <span className="absolute left-0 bottom-0 h-[2px] bg-[#b8914a] w-0 group-hover:w-full transition-all duration-300 ease-out" />
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INSIGHTS ═══ */}
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
                  <SplitReveal text="We publish" /> <br />
                  <span className="italic text-[#8a8070]">
                    <SplitReveal text="what we practice." delay={0.25} />
                  </span>
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
                    <motion.img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                      initial={{ clipPath: "inset(0 0 100% 0)" }}
                      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.9, ease: DRAW_EASE }}
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

      {/* ═══ START YOUR SKETCH ═══ */}
      <section className="py-24 lg:py-40 bg-[#0d0d0d]" aria-label="Start Your Sketch">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
          <FadeInSection>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-8" style={{ fontFamily: "var(--font-mono)" }}>
              The first step
            </p>
            <h2
              className="text-[clamp(40px,6vw,88px)] font-medium text-[#f5f0e8] leading-[1.05] mb-4"
              style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}
            >
              <SplitReveal text="Start your sketch." />
            </h2>
            <div className="flex justify-center mb-8">
              <SketchLine className="w-24 h-[2px]" delay={0.6} duration={0.7} />
            </div>
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