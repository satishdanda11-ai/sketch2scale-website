import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import { pillars as pillarData } from "../data/pillars";
import { industries as industryData, clusters } from "../data/industries";

const pillars = pillarData.map((p) => ({
  slug: p.id,
  label: p.label,
  desc: p.tagline,
}));

const industriesClusters = clusters.map((cluster) => ({
  label: cluster.label,
  items: cluster.ids.map((id) => {
    const ind = industryData.find((i) => i.id === id);
    return { slug: id, label: ind?.label ?? id };
  }),
}));

const navItems = [
  { label: "About", href: "/about" },
  { label: "What We Scale", href: "/what-we-scale", mega: "pillars" },
  { label: "Industries", href: "/industries", mega: "industries" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Discovery Workshop", href: "/discovery-workshop" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();
  const megaRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMega(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  function handleNavEnter(mega: string) {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActiveMega(mega);
  }

  function handleNavLeave() {
    leaveTimer.current = setTimeout(() => setActiveMega(null), 200);
  }

  const isDark = !scrolled && !mobileOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#f5f0e8] border-b border-[rgba(13,13,13,0.1)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex flex-col leading-none group"
              aria-label="Sketch2Scale — Home"
            >
              <span
                className={`text-[18px] font-semibold tracking-tight transition-colors ${
                  scrolled ? "text-[#0d0d0d]" : "text-[#f5f0e8]"
                }`}
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Sketch2Scale
              </span>
              <span
                className={`text-[9px] tracking-[0.2em] uppercase font-medium transition-colors mt-0.5 ${
                  scrolled ? "text-[#8a8070]" : "text-[rgba(245,240,232,0.5)]"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Business Design Partner
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8" role="navigation">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + "/");
                if (item.mega) {
                  return (
                    <div
                      key={item.label}
                      onMouseEnter={() => handleNavEnter(item.mega!)}
                      onMouseLeave={handleNavLeave}
                      className="relative"
                    >
                      <button
                        className={`flex items-center gap-1 text-[13px] tracking-wide transition-colors pb-1 border-b ${
                          scrolled
                            ? isActive
                              ? "text-[#0d0d0d] border-[#b8914a]"
                              : "text-[#2a2826] border-transparent hover:text-[#0d0d0d] hover:border-[#0d0d0d]"
                            : isActive
                            ? "text-[#f5f0e8] border-[#b8914a]"
                            : "text-[rgba(245,240,232,0.8)] border-transparent hover:text-[#f5f0e8] hover:border-[rgba(245,240,232,0.4)]"
                        }`}
                      >
                        {item.label}
                        <ChevronDown size={12} className={`transition-transform ${activeMega === item.mega ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`text-[13px] tracking-wide transition-colors pb-1 border-b ${
                      scrolled
                        ? isActive
                          ? "text-[#0d0d0d] border-[#b8914a]"
                          : "text-[#2a2826] border-transparent hover:text-[#0d0d0d] hover:border-[#0d0d0d]"
                        : isActive
                        ? "text-[#f5f0e8] border-[#b8914a]"
                        : "text-[rgba(245,240,232,0.8)] border-transparent hover:text-[#f5f0e8] hover:border-[rgba(245,240,232,0.4)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <Link
                to="/discovery-workshop"
                className={`hidden lg:inline-flex items-center gap-2 text-[12px] tracking-[0.12em] uppercase font-medium px-5 py-2.5 transition-all duration-200 border ${
                  scrolled
                    ? "bg-[#0d0d0d] text-[#f5f0e8] border-[#0d0d0d] hover:bg-[#b8914a] hover:border-[#b8914a]"
                    : "bg-[#f5f0e8] text-[#0d0d0d] border-[#f5f0e8] hover:bg-[#b8914a] hover:text-[#f5f0e8] hover:border-[#b8914a]"
                }`}
              >
                Start Your Sketch
              </Link>

              <button
                className={`lg:hidden p-2 transition-colors ${
                  scrolled ? "text-[#0d0d0d]" : "text-[#f5f0e8]"
                }`}
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menus */}
        <AnimatePresence>
          {activeMega === "pillars" && (
            <motion.div
              ref={megaRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              onMouseEnter={() => handleNavEnter("pillars")}
              onMouseLeave={handleNavLeave}
              className="absolute top-full left-0 right-0 bg-[#f5f0e8] border-b border-[rgba(13,13,13,0.1)] shadow-lg"
            >
              <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8">
                <div className="mb-4">
                  <p className="text-[11px] tracking-[0.2em] uppercase text-[#8a8070]" style={{ fontFamily: "var(--font-mono)" }}>
                    Transformation Pillars
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                  {pillars.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/what-we-scale/${p.slug}`}
                      className="group py-3 border-b border-[rgba(13,13,13,0.08)] hover:border-[#b8914a] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[15px] font-medium text-[#0d0d0d] group-hover:text-[#b8914a] transition-colors" style={{ fontFamily: "var(--font-serif)" }}>
                          {p.label}
                        </span>
                        <span className="text-[#b8914a] opacity-0 group-hover:opacity-100 transition-opacity text-sm">→</span>
                      </div>
                      <p className="text-[12px] text-[#8a8070] mt-1 leading-snug">{p.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          {activeMega === "industries" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              onMouseEnter={() => handleNavEnter("industries")}
              onMouseLeave={handleNavLeave}
              className="absolute top-full left-0 right-0 bg-[#f5f0e8] border-b border-[rgba(13,13,13,0.1)] shadow-lg"
            >
              <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8">
                <div className="mb-4">
                  <p className="text-[11px] tracking-[0.2em] uppercase text-[#8a8070]" style={{ fontFamily: "var(--font-mono)" }}>
                    Industries
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-8">
                  {industriesClusters.map((cluster) => (
                    <div key={cluster.label}>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8070] mb-3 font-medium" style={{ fontFamily: "var(--font-mono)" }}>
                        {cluster.label}
                      </p>
                      <div className="space-y-1">
                        {cluster.items.map((ind) => (
                          <Link
                            key={ind.slug}
                            to={`/industries/${ind.slug}`}
                            className="block text-[14px] text-[#2a2826] hover:text-[#b8914a] py-1 border-b border-transparent hover:border-[#b8914a] transition-colors"
                          >
                            {ind.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#0d0d0d] flex flex-col overflow-y-auto"
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-[rgba(245,240,232,0.1)]">
              <Link to="/" onClick={() => setMobileOpen(false)}>
                <span className="text-[18px] font-semibold text-[#f5f0e8]" style={{ fontFamily: "var(--font-serif)" }}>
                  Sketch2Scale
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-[#f5f0e8]"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex-1 px-6 py-8 space-y-1">
              {navItems.map((item) => {
                if (item.mega === "pillars") {
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === "pillars" ? null : "pillars")}
                        className="w-full flex items-center justify-between py-4 text-[16px] text-[#f5f0e8] border-b border-[rgba(245,240,232,0.08)]"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {item.label}
                        <ChevronDown size={16} className={`transition-transform ${mobileExpanded === "pillars" ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === "pillars" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            {pillars.map((p) => (
                              <Link
                                key={p.slug}
                                to={`/what-we-scale/${p.slug}`}
                                onClick={() => setMobileOpen(false)}
                                className="block pl-4 py-3 text-[14px] text-[rgba(245,240,232,0.7)] hover:text-[#b8914a] border-b border-[rgba(245,240,232,0.05)] transition-colors"
                              >
                                {p.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                if (item.mega === "industries") {
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === "industries" ? null : "industries")}
                        className="w-full flex items-center justify-between py-4 text-[16px] text-[#f5f0e8] border-b border-[rgba(245,240,232,0.08)]"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {item.label}
                        <ChevronDown size={16} className={`transition-transform ${mobileExpanded === "industries" ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === "industries" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            {industriesClusters.map((cluster) => (
                              <div key={cluster.label} className="pl-4 pt-2 pb-1">
                                <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8070] mb-2" style={{ fontFamily: "var(--font-mono)" }}>{cluster.label}</p>
                                {cluster.items.map((ind) => (
                                  <Link
                                    key={ind.slug}
                                    to={`/industries/${ind.slug}`}
                                    onClick={() => setMobileOpen(false)}
                                    className="block py-2 text-[14px] text-[rgba(245,240,232,0.7)] hover:text-[#b8914a] transition-colors"
                                  >
                                    {ind.label}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-4 text-[16px] text-[#f5f0e8] border-b border-[rgba(245,240,232,0.08)] hover:text-[#b8914a] transition-colors"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="px-6 pb-8 pt-4 border-t border-[rgba(245,240,232,0.08)]">
              <Link
                to="/discovery-workshop"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center bg-[#b8914a] text-[#f5f0e8] py-4 text-[12px] tracking-[0.15em] uppercase font-medium"
              >
                Start Your Sketch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile sticky CTA bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#f5f0e8] border-t border-[rgba(13,13,13,0.1)] px-6 py-3">
        <Link
          to="/discovery-workshop"
          className="block w-full text-center bg-[#0d0d0d] text-[#f5f0e8] py-3 text-[12px] tracking-[0.15em] uppercase font-medium"
        >
          Start Your Sketch
        </Link>
      </div>
    </>
  );
}
