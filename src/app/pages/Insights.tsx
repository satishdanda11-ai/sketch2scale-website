import { useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { articles, insightTags, type InsightTag } from "../data/insights";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </motion.div>
  );
}

export default function Insights() {
  const [activeTag, setActiveTag] = useState<InsightTag>("All");
  const filtered = activeTag === "All" ? articles : articles.filter((a) => a.tag === activeTag);
  const featured = articles.filter((a) => a.featured);

  return (
    <div className="bg-[#f5f0e8]">
      {/* Hero */}
      <section className="pt-40 pb-20 bg-[#0d0d0d]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-6" style={{ fontFamily: "var(--font-mono)" }}>Insights</p>
            <h1 className="text-[clamp(40px,6vw,82px)] font-medium text-[#f5f0e8] leading-[1.05] max-w-4xl mb-8" style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}>
              We publish
              <br />
              <em className="italic text-[#b8914a]">what we practice.</em>
            </h1>
            <p className="text-[17px] text-[rgba(245,240,232,0.55)] leading-relaxed max-w-xl">
              Articles, frameworks, research, and guides — each applying the Six-S Method lens to real, current business questions. Substantial enough to be referenced later; no high-frequency, low-depth content mill.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20 bg-[#f5f0e8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-10" style={{ fontFamily: "var(--font-mono)" }}>Featured</p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featured.map((art, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Link to="/insights" className="block group cursor-pointer">
                  <div className="relative overflow-hidden bg-[#2a2826] mb-5">
                    <img src={art.img} alt={art.title} className="w-full h-56 object-cover opacity-70 group-hover:opacity-90 transition-all duration-500 group-hover:scale-105" />
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] tracking-[0.15em] uppercase bg-[#b8914a] text-[#f5f0e8] px-2.5 py-1" style={{ fontFamily: "var(--font-mono)" }}>
                        {art.tag}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] text-[#8a8070]" style={{ fontFamily: "var(--font-mono)" }}>{art.date}</span>
                    <span className="w-1 h-1 rounded-full bg-[#c4bdb0]" />
                    <span className="text-[11px] text-[#8a8070]" style={{ fontFamily: "var(--font-mono)" }}>{art.reading} read</span>
                  </div>
                  <h3 className="text-[17px] font-medium text-[#0d0d0d] leading-snug group-hover:text-[#b8914a] transition-colors mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                    {art.title}
                  </h3>
                  <p className="text-[13px] text-[#8a8070] leading-relaxed">{art.excerpt}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* All Insights */}
      <section className="py-20 bg-[#ece6d8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="flex flex-wrap items-center gap-3 mb-12">
              <span className="text-[11px] tracking-[0.15em] uppercase text-[#8a8070] mr-2" style={{ fontFamily: "var(--font-mono)" }}>Filter</span>
              {insightTags.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTag(t)}
                  className={`text-[11px] tracking-[0.12em] uppercase px-4 py-2 border transition-all ${activeTag === t ? "bg-[#0d0d0d] text-[#f5f0e8] border-[#0d0d0d]" : "text-[#2a2826] border-[rgba(13,13,13,0.2)] hover:border-[#b8914a] hover:text-[#b8914a]"}`}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {t}
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="space-y-px">
            {filtered.map((art, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <Link to="/insights" className="block border border-[rgba(13,13,13,0.08)] p-6 lg:p-8 bg-[#ece6d8] hover:bg-[#f5f0e8] transition-colors group">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                    <div className="lg:col-span-1">
                      <span className="text-[10px] tracking-[0.15em] uppercase text-[#b8914a]" style={{ fontFamily: "var(--font-mono)" }}>{art.tag}</span>
                    </div>
                    <div className="lg:col-span-7">
                      <h3 className="text-[17px] font-medium text-[#0d0d0d] group-hover:text-[#b8914a] transition-colors leading-snug" style={{ fontFamily: "var(--font-serif)" }}>
                        {art.title}
                      </h3>
                      <p className="text-[13px] text-[#8a8070] mt-2 leading-relaxed">{art.excerpt}</p>
                    </div>
                    <div className="lg:col-span-3 lg:text-right">
                      <p className="text-[11px] text-[#8a8070]" style={{ fontFamily: "var(--font-mono)" }}>{art.date}</p>
                      <p className="text-[11px] text-[#8a8070]" style={{ fontFamily: "var(--font-mono)" }}>{art.reading} read</p>
                    </div>
                    <div className="lg:col-span-1 lg:text-right">
                      <ArrowRight size={14} className="text-[#b8914a] opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-[#0d0d0d]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#8a8070] mb-4" style={{ fontFamily: "var(--font-mono)" }}>Stay Current</p>
                <h2 className="text-[clamp(24px,3.5vw,44px)] font-medium text-[#f5f0e8] leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
                  Frameworks and perspectives,
                  <br />
                  <em className="italic text-[#b8914a]">when they're ready.</em>
                </h2>
                <p className="text-[14px] text-[rgba(245,240,232,0.5)] mt-4 max-w-md">
                  A sustainable cadence over volume. Each piece is substantial enough to reference later.
                </p>
              </div>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-[rgba(245,240,232,0.06)] border border-[rgba(245,240,232,0.12)] px-4 py-3.5 text-[14px] text-[#f5f0e8] placeholder-[#8a8070] focus:outline-none focus:border-[#b8914a] transition-colors"
                />
                <button type="submit" className="px-6 py-3.5 bg-[#b8914a] text-[#f5f0e8] text-[12px] tracking-[0.12em] uppercase font-medium hover:bg-[#d4a85a] transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
