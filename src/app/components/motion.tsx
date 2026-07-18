import { useRef } from "react";
import { motion, useInView, useScroll, useReducedMotion } from "motion/react";

/**
 * Shared motion system for the site.
 * Import these into any page instead of redefining local FadeIn/SplitText
 * helpers — that's what let Home and About drift out of sync before.
 */

export const EASE = [0.25, 0.1, 0.25, 1] as const;
export const DRAW_EASE = [0.65, 0, 0.35, 1] as const;

/** Standard scroll-triggered fade-up used for every section on the site. */
export function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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

/**
 * Headline text animation: assembles word by word with a blur-to-focus
 * lift. This is the site's text-animation signature — use it on every
 * primary heading (h1/h2/blockquote), not just the homepage.
 */
export function SplitReveal({
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

/**
 * A hairline that draws itself — the site's literal "sketch becoming a
 * line, at scale" motif. Use for dividers, underlines, and connecting
 * lines down numbered lists (beliefs, process stages, etc.).
 */
export function SketchLine({
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

/**
 * Fixed gold hairline across the top of the viewport that fills with
 * scroll progress. This is a global signature, not a per-page one —
 * mount it once in the root layout (e.g. App.tsx / Layout.tsx) rather
 * than inside individual page components, so it persists correctly
 * across route changes and doesn't reset/duplicate per page.
 */
export function ScrollProgressLine() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#b8914a] origin-left z-[60]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}