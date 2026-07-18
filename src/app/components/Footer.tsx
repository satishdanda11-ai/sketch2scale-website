import { Link } from "react-router";
import { pillars as pillarData } from "../data/pillars";
import { industries as industryData } from "../data/industries";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] text-[#f5f0e8] pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[rgba(245,240,232,0.1)]">

          {/* Company */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#8a8070]" style={{ fontFamily: "var(--font-mono)" }}>
                Business Design Partner
              </span>
              <h2 className="text-[22px] font-medium text-[#f5f0e8] mt-1" style={{ fontFamily: "var(--font-serif)" }}>
                Sketch2Scale
              </h2>
            </div>
            <p className="text-[13px] text-[#8a8070] leading-relaxed max-w-xs">
              We treat design as a business function, not a decoration. Every transformation starts with a sketch — we design the path by which it scales.
            </p>
            <div className="mt-6">
              <Link
                to="/discovery-workshop"
                className="inline-flex items-center gap-2 text-[12px] tracking-[0.12em] uppercase font-medium px-5 py-3 bg-[#b8914a] text-[#f5f0e8] hover:bg-[#d4a85a] transition-colors"
              >
                Start Your Sketch
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8070] mb-4 font-medium" style={{ fontFamily: "var(--font-mono)" }}>
              Navigate
            </p>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-[13px] text-[rgba(245,240,232,0.7)] hover:text-[#b8914a] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pillars */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8070] mb-4 font-medium" style={{ fontFamily: "var(--font-mono)" }}>
              Transformations
            </p>
            <ul className="space-y-2">
              {pillarData.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/what-we-scale/${p.id}`}
                    className="text-[13px] text-[rgba(245,240,232,0.7)] hover:text-[#b8914a] transition-colors"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries + Resources */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8070] mb-4 font-medium" style={{ fontFamily: "var(--font-mono)" }}>
              Industries
            </p>
            <ul className="space-y-1.5 mb-6">
              {industryData.map((ind) => (
                <li key={ind.id}>
                  <Link
                    to={`/industries/${ind.id}`}
                    className="text-[12px] text-[rgba(245,240,232,0.6)] hover:text-[#b8914a] transition-colors"
                  >
                    {ind.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8070] mb-3 font-medium" style={{ fontFamily: "var(--font-mono)" }}>
              Resources
            </p>
            <ul className="space-y-1.5">
              {["Frameworks", "Research", "Guides"].map((r) => (
                <li key={r}>
                  <Link to="/insights" className="text-[12px] text-[rgba(245,240,232,0.6)] hover:text-[#b8914a] transition-colors">
                    {r}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="py-8 border-b border-[rgba(245,240,232,0.1)]">
          <div className="flex flex-col md:flex-row md:items-center gap-4 max-w-lg">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8070] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                Insights & Frameworks
              </p>
              <p className="text-[13px] text-[rgba(245,240,232,0.7)]">We publish what we practice.</p>
            </div>
            <form
              className="flex gap-2 flex-1"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-[rgba(245,240,232,0.06)] border border-[rgba(245,240,232,0.12)] px-4 py-2.5 text-[13px] text-[#f5f0e8] placeholder-[#8a8070] focus:outline-none focus:border-[#b8914a] transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#b8914a] text-[#f5f0e8] text-[12px] tracking-[0.1em] uppercase font-medium hover:bg-[#d4a85a] transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p
            className="text-[13px] text-[rgba(245,240,232,0.5)] italic max-w-sm leading-relaxed"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            "This blueprint is the sketch. What Sketch2Scale becomes is the scale."
          </p>
          <div className="flex flex-wrap items-center gap-6 text-[11px] text-[#8a8070]">
            <span>© {new Date().getFullYear()} Sketch2Scale</span>
            <Link to="/contact" className="hover:text-[#b8914a] transition-colors">Privacy</Link>
            <Link to="/contact" className="hover:text-[#b8914a] transition-colors">Terms</Link>
            <span>sketch2scale.in</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
