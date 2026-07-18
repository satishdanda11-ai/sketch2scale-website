import { useRef, useState } from "react";
import { Link } from "react-router";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { ArrowRight } from "lucide-react";

/* ────────────────────────────────────────────────────────────────
   TRANSFORMATION HERO
   A pinned, scroll-driven sequence: sketch → product → brand →
   ecosystem → scale → Sketch2Scale.

   IMPORTANT ARCHITECTURE NOTE (read before "simplifying" this):
   Only ONE scene is ever mounted at a time, swapped via
   AnimatePresence keyed on the active scene index. An earlier
   version kept all 6 scenes permanently mounted with independent
   scroll-derived opacity values — in practice that let two
   headlines render simultaneously (a genuine bug, not just a
   theoretical risk), because it relies on several continuous
   motion values independently reaching exactly 0 rather than on a
   single source of truth for "what's currently visible." Discrete
   mount/unmount makes the overlap structurally impossible instead
   of numerically unlikely — keep it this way.
──────────────────────────────────────────────────────────────── */

const EASE = [0.25, 0.1, 0.25, 1] as const;
const GOLD = "#b8914a";
const CREAM = "#f5f0e8";
const GOLD_GLOW = { filter: "drop-shadow(0 0 6px rgba(184,145,74,0.55))" } as const;

// Scroll fraction where each scene begins. Scene 6 (finale) gets a
// longer hold so the CTA isn't rushed off screen.
const BOUNDS = [0, 0.15, 0.3, 0.45, 0.6, 0.74, 1] as const;
const FADE = 0.02;

/* Faint technical grid — ambient backdrop, the one "blueprint" cue
   that reads as engineered rather than merely pretty. */
function HUDGrid() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(rgba(245,240,232,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,0.05) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 85%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 85%)",
      }}
    />
  );
}

/* Viewfinder-style corner brackets around the stage — the recurring
   "this is instrumentation, not an illustration" cue. */
function HUDCorners() {
  const corner = "absolute w-6 h-6 border-[#b8914a]";
  return (
    <div aria-hidden="true" className="absolute -inset-4 md:-inset-6 pointer-events-none">
      <span className={`${corner} top-0 left-0 border-t border-l`} style={{ opacity: 0.55 }} />
      <span className={`${corner} top-0 right-0 border-t border-r`} style={{ opacity: 0.55 }} />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} style={{ opacity: 0.55 }} />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} style={{ opacity: 0.55 }} />
    </div>
  );
}

// Filters out duplicate/out-of-order x points (and their paired y values).
// A zero-width segment (two adjacent points clamped to the same edge)
// previously produced an invalid WAAPI keyframe offset and crashed on
// mount — keep this guard on any range built from Math.max/min clamping.
function dedupeRange<T>(xs: number[], ys: T[]): [number[], T[]] {
  const outX: number[] = [];
  const outY: T[] = [];
  xs.forEach((x, i) => {
    if (outX.length === 0 || x > outX[outX.length - 1]) {
      outX.push(x);
      outY.push(ys[i]);
    }
  });
  return [outX, outY];
}

/* A single gold scan-line that sweeps the viewport at the exact
   moment two scenes swap — a decorative flourish layered on top of
   the AnimatePresence crossfade, not what makes the swap correct. */
function ScanSweep({ scrollYProgress, boundary }: { scrollYProgress: MotionValue<number>; boundary: number }) {
  const lo = Math.max(0, boundary - FADE * 1.4);
  const midLo = Math.max(0, boundary - FADE * 0.5);
  const midHi = Math.min(1, boundary + FADE * 0.5);
  const hi = Math.min(1, boundary + FADE * 1.4);
  const [topX, topY] = dedupeRange([lo, hi], ["-8%", "108%"]);
  const [opX, opY] = dedupeRange([lo, midLo, midHi, hi], [0, 1, 1, 0]);
  const top = useTransform(scrollYProgress, topX, topY, { clamp: true });
  const opacity = useTransform(scrollYProgress, opX, opY, { clamp: true });
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-x-0 h-px pointer-events-none z-20"
      style={{
        top,
        opacity,
        background: "linear-gradient(90deg, transparent 0%, rgba(184,145,74,0.9) 50%, transparent 100%)",
        boxShadow: "0 0 12px 2px rgba(184,145,74,0.6)",
      }}
    />
  );
}

const SCENES = [
  { key: "sketch", label: "The Sketch", line: "Every transformation", accent: "begins with a sketch." },
  { key: "product", label: "The Product", line: "Ideas", accent: "become products." },
  { key: "brand", label: "The Brand", line: "Products", accent: "become brands." },
  { key: "ecosystem", label: "The Ecosystem", line: "Brands", accent: "become ecosystems." },
  { key: "scale", label: "The Scale", line: "Ecosystems", accent: "scale businesses." },
] as const;

// Drives only the internal line-drawing progress for the active scene's
// artwork. Visibility itself is handled by AnimatePresence, not this.
function useSceneDraw(scrollYProgress: MotionValue<number>, index: number) {
  const start = BOUNDS[index];
  const end = BOUNDS[index + 1];
  return useTransform(scrollYProgress, [start, Math.min(start + (end - start) * 0.75, end)], [0, 1], { clamp: true });
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] tracking-[0.25em] uppercase text-[#b8914a] font-medium" style={{ fontFamily: "var(--font-mono)" }}>
      {children}
    </span>
  );
}

function SceneHeadline({ scene, index }: { scene: (typeof SCENES)[number]; index: number }) {
  return (
    <div className="absolute inset-x-0 bottom-0 h-[26vh] flex flex-col justify-end px-6 lg:px-12 pb-10 lg:pb-14 pointer-events-none">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-full pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(13,13,13,0) 0%, rgba(13,13,13,0.75) 65%, rgba(13,13,13,0.92) 100%)" }}
      />
      <div className="relative max-w-[1440px] mx-auto w-full">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[11px] tracking-[0.2em] text-[rgba(245,240,232,0.35)]" style={{ fontFamily: "var(--font-mono)" }}>
            0{index + 1} / 06
          </span>
          <span className="w-6 h-px bg-[rgba(184,145,74,0.5)]" />
          <Eyebrow>{scene.label}</Eyebrow>
        </div>
        <h2
          className="text-[clamp(26px,4.2vw,54px)] font-medium leading-[1.1] text-[#f5f0e8] max-w-2xl line-clamp-2"
          style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}
        >
          {scene.line} <span className="italic text-[#b8914a]">{scene.accent}</span>
        </h2>
      </div>
    </div>
  );
}

/* ── Stage art, one per scene, sharing a common 0 0 520 360 box so
   the transformation reads as continuous rather than as slides.
   Each only receives `draw` — visibility is handled by the parent
   AnimatePresence wrapper, not by an opacity prop here. ── */

function StageSketch({ draw }: { draw: MotionValue<number> }) {
  return (
    <svg viewBox="0 0 520 360" className="w-full h-full" aria-hidden="true">
      <motion.path
        d="M 66 46 Q 44 44 46 68 L 49 296 Q 51 318 75 320 L 448 316 Q 470 314 468 290 L 464 60 Q 462 40 438 42 Z"
        fill="none"
        stroke={CREAM}
        strokeOpacity={0.55}
        strokeWidth={2}
        strokeLinecap="round"
        style={{ pathLength: draw }}
      />
      {[128, 168, 208].map((y, i) => (
        <motion.path
          key={y}
          d={`M 92 ${y} Q 200 ${y - 6} 300 ${y} T ${i === 0 ? 420 : 380} ${y + 4}`}
          fill="none"
          stroke={CREAM}
          strokeOpacity={0.32}
          strokeWidth={1.5}
          strokeLinecap="round"
          style={{ pathLength: draw }}
        />
      ))}
      <motion.g style={{ opacity: useTransform(draw, [0.85, 1], [0, 1], { clamp: true }) }}>
        <path d="M 420 250 L 452 218 L 466 232 L 434 264 Z M 452 218 L 462 208 L 476 222 L 466 232 Z" fill={GOLD} fillOpacity={0.85} />
      </motion.g>
    </svg>
  );
}

function StageProduct({ draw }: { draw: MotionValue<number> }) {
  const reveal = (from: number, to: number) => useTransform(draw, [from, to], [0, 1], { clamp: true });
  return (
    <svg viewBox="0 0 520 360" className="w-full h-full" aria-hidden="true">
      <motion.rect x={50} y={40} width={420} height={280} rx={14} fill="none" stroke={CREAM} strokeOpacity={0.5} strokeWidth={1.5} style={{ pathLength: draw }} />
      <motion.g style={{ opacity: reveal(0.15, 0.4) }}>
        <rect x={50} y={40} width={420} height={40} rx={14} fill={CREAM} fillOpacity={0.06} />
        <circle cx={76} cy={60} r={4} fill={CREAM} fillOpacity={0.4} />
        <circle cx={92} cy={60} r={4} fill={CREAM} fillOpacity={0.4} />
        <circle cx={108} cy={60} r={4} fill={CREAM} fillOpacity={0.4} />
      </motion.g>
      <motion.g style={{ opacity: reveal(0.35, 0.65) }}>
        <rect x={74} y={104} width={180} height={14} rx={3} fill={CREAM} fillOpacity={0.5} />
        <rect x={74} y={130} width={260} height={9} rx={2} fill={CREAM} fillOpacity={0.25} />
        <rect x={74} y={148} width={220} height={9} rx={2} fill={CREAM} fillOpacity={0.25} />
        <rect x={74} y={182} width={148} height={78} rx={8} fill={CREAM} fillOpacity={0.06} stroke={CREAM} strokeOpacity={0.2} />
        <rect x={236} y={182} width={148} height={78} rx={8} fill={CREAM} fillOpacity={0.06} stroke={CREAM} strokeOpacity={0.2} />
      </motion.g>
      <motion.g style={{ opacity: reveal(0.6, 0.9) }}>
        <rect x={74} y={284} width={118} height={30} rx={4} fill={GOLD} />
        <path d="M 168 296 l 8 4 l -8 4" fill="none" stroke="#0d0d0d" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
    </svg>
  );
}

function StageBrand({ draw }: { draw: MotionValue<number> }) {
  const reveal = (from: number, to: number) => useTransform(draw, [from, to], [0, 1], { clamp: true });
  return (
    <svg viewBox="0 0 520 360" className="w-full h-full" aria-hidden="true">
      <motion.path
        d="M 232 120 C 200 120 190 148 216 160 C 260 180 280 176 296 196 C 310 214 296 240 260 240 C 232 240 220 226 218 210"
        fill="none"
        stroke={GOLD}
        strokeWidth={5}
        strokeLinecap="round"
        style={{ pathLength: draw }}
      />
      <motion.g style={{ opacity: reveal(0.25, 0.5) }}>
        {[
          { cx: 130, cy: 90, fill: CREAM, fo: 0.5 },
          { cx: 158, cy: 90, fill: "#0d0d0d", fo: 1, stroke: true },
          { cx: 186, cy: 90, fill: GOLD, fo: 1 },
          { cx: 214, cy: 90, fill: "#8a8070", fo: 0.8 },
        ].map((s, i) => (
          <circle key={i} cx={s.cx} cy={s.cy} r={11} fill={s.fill} fillOpacity={s.fo} stroke={s.stroke ? CREAM : "none"} strokeOpacity={0.3} />
        ))}
      </motion.g>
      <motion.g style={{ opacity: reveal(0.45, 0.75) }}>
        <rect x={330} y={70} width={130} height={168} rx={6} fill="none" stroke={CREAM} strokeOpacity={0.35} strokeWidth={1.5} />
        <circle cx={395} cy={118} r={14} fill="none" stroke={GOLD} strokeWidth={2} />
        <rect x={358} y={150} width={74} height={7} rx={2} fill={CREAM} fillOpacity={0.4} />
        <rect x={368} y={166} width={54} height={5} rx={2} fill={CREAM} fillOpacity={0.22} />
      </motion.g>
      <motion.g style={{ opacity: reveal(0.65, 1) }}>
        <rect x={92} y={220} width={168} height={92} rx={8} fill="none" stroke={CREAM} strokeOpacity={0.3} strokeWidth={1.5} />
        <rect x={112} y={244} width={60} height={8} rx={2} fill={GOLD} fillOpacity={0.85} />
        <rect x={112} y={262} width={120} height={6} rx={2} fill={CREAM} fillOpacity={0.25} />
        <rect x={112} y={276} width={90} height={6} rx={2} fill={CREAM} fillOpacity={0.25} />
      </motion.g>
    </svg>
  );
}

const ECOSYSTEM_NODES = [
  { label: "Website", angle: -90 },
  { label: "App", angle: -30 },
  { label: "AI", angle: 30 },
  { label: "Marketing", angle: 90 },
  { label: "Operations", angle: 150 },
  { label: "Data", angle: 210 },
];

function EcosystemSpoke({ node, index, cx, cy, r, draw }: { node: (typeof ECOSYSTEM_NODES)[number]; index: number; cx: number; cy: number; r: number; draw: MotionValue<number> }) {
  const rad = (node.angle * Math.PI) / 180;
  const nx = cx + r * Math.cos(rad);
  const ny = cy + r * Math.sin(rad) * 0.85;
  const lineDraw = useTransform(draw, [index * 0.1, index * 0.1 + 0.45], [0, 1], { clamp: true });
  const nodeOpacity = useTransform(draw, [index * 0.1 + 0.25, index * 0.1 + 0.5], [0, 1], { clamp: true });
  return (
    <g>
      <motion.line x1={cx} y1={cy} x2={nx} y2={ny} stroke={CREAM} strokeOpacity={0.3} strokeWidth={1.3} style={{ pathLength: lineDraw }} />
      <motion.g style={{ opacity: nodeOpacity }}>
        <circle cx={nx} cy={ny} r={5} fill={CREAM} fillOpacity={0.8} />
        <text
          x={nx}
          y={ny + (Math.sin(rad) < -0.2 ? -14 : Math.sin(rad) > 0.2 ? 24 : 4)}
          textAnchor="middle"
          fontSize={11}
          fill={CREAM}
          fillOpacity={0.55}
          style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.08em" }}
        >
          {node.label.toUpperCase()}
        </text>
      </motion.g>
    </g>
  );
}

function StageEcosystem({ draw }: { draw: MotionValue<number> }) {
  const cx = 260;
  const cy = 180;
  const r = 128;
  return (
    <svg viewBox="0 0 520 360" className="w-full h-full" aria-hidden="true">
      <motion.circle cx={cx} cy={cy} r={26} fill="none" stroke={GOLD} strokeWidth={2.5} style={{ pathLength: draw }} />
      {ECOSYSTEM_NODES.map((n, i) => (
        <EcosystemSpoke key={n.label} node={n} index={i} cx={cx} cy={cy} r={r} draw={draw} />
      ))}
    </svg>
  );
}

const SCALE_RINGS = [
  { from: 0.1, to: 0.55, radius: 78 },
  { from: 0.3, to: 0.75, radius: 100 },
  { from: 0.5, to: 1, radius: 122 },
];

function PulseRing({ cx, cy, radius, from, to, draw }: { cx: number; cy: number; radius: number; from: number; to: number; draw: MotionValue<number> }) {
  const local = useTransform(draw, [from, to], [0, 1], { clamp: true });
  const ringOpacity = useTransform(local, [0, 0.3, 1], [0, 0.5, 0]);
  return <motion.circle cx={cx} cy={cy} r={radius} fill="none" stroke={GOLD} strokeWidth={1} style={{ opacity: ringOpacity }} />;
}

const SCALE_MARKETS = [
  { label: "USA", angle: -140, dist: 150 },
  { label: "Canada", angle: -35, dist: 155 },
  { label: "India", angle: 70, dist: 150 },
];

function MarketMarker({ market, index, cx, cy, draw }: { market: (typeof SCALE_MARKETS)[number]; index: number; cx: number; cy: number; draw: MotionValue<number> }) {
  const rad = (market.angle * Math.PI) / 180;
  const nx = cx + market.dist * Math.cos(rad);
  const ny = cy + market.dist * Math.sin(rad) * 0.8;
  const arcDraw = useTransform(draw, [0.35 + index * 0.12, 0.75 + index * 0.08], [0, 1], { clamp: true });
  return (
    <g>
      <motion.path d={`M ${cx + 66 * Math.cos(rad)} ${cy + 66 * Math.sin(rad) * 0.8} L ${nx} ${ny}`} stroke={GOLD} strokeOpacity={0.5} strokeWidth={1.2} strokeDasharray="3 4" style={{ pathLength: arcDraw }} />
      <motion.g style={{ opacity: arcDraw }}>
        <circle cx={nx} cy={ny} r={4} fill={GOLD} />
        <text x={nx} y={ny - 12} textAnchor="middle" fontSize={10} fill={CREAM} fillOpacity={0.5} style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}>
          {market.label}
        </text>
      </motion.g>
    </g>
  );
}

function StageScale({ draw }: { draw: MotionValue<number> }) {
  const cx = 260;
  const cy = 180;
  return (
    <svg viewBox="0 0 520 360" className="w-full h-full" aria-hidden="true">
      <motion.circle cx={cx} cy={cy} r={62} fill="none" stroke={CREAM} strokeOpacity={0.4} strokeWidth={1.5} style={{ pathLength: draw }} />
      <motion.ellipse cx={cx} cy={cy} rx={62} ry={22} fill="none" stroke={CREAM} strokeOpacity={0.28} strokeWidth={1} style={{ pathLength: draw }} />
      <motion.ellipse cx={cx} cy={cy} rx={62} ry={44} fill="none" stroke={CREAM} strokeOpacity={0.22} strokeWidth={1} style={{ pathLength: draw }} />
      <motion.ellipse cx={cx} cy={cy} rx={22} ry={62} fill="none" stroke={CREAM} strokeOpacity={0.28} strokeWidth={1} style={{ pathLength: draw }} />
      {SCALE_RINGS.map((r, i) => (
        <PulseRing key={i} cx={cx} cy={cy} radius={r.radius} from={r.from} to={r.to} draw={draw} />
      ))}
      {SCALE_MARKETS.map((m, i) => (
        <MarketMarker key={m.label} market={m} index={i} cx={cx} cy={cy} draw={draw} />
      ))}
    </svg>
  );
}

const STAGES = [StageSketch, StageProduct, StageBrand, StageEcosystem, StageScale];

/* ── Finale ── */

function FinaleScene() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <div
        aria-hidden="true"
        className="absolute w-[60vmin] h-[60vmin] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(184,145,74,0.18) 0%, rgba(184,145,74,0) 70%)" }}
      />
      <motion.div initial={{ y: 18 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="relative">
        <Eyebrow>The Finale</Eyebrow>
        <h2 className="mt-6 text-[clamp(40px,7vw,104px)] font-medium leading-[1.02] text-[#f5f0e8]" style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}>
          Sketch <span className="italic text-[#b8914a]">→</span> Scale
        </h2>
        <p className="mt-7 text-[16px] md:text-[17px] text-[rgba(245,240,232,0.6)] leading-relaxed max-w-md mx-auto">
          We transform ideas into scalable businesses, brands, products, and digital ecosystems.
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            to="/discovery-workshop"
            className="inline-flex items-center gap-3 bg-[#b8914a] text-[#f5f0e8] text-[13px] tracking-[0.12em] uppercase font-medium px-8 py-4 hover:bg-[#d4a85a] transition-colors group"
          >
            Start Your Sketch
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Progress rail ── */

function ProgressRail({ active, percent }: { active: number; percent: number }) {
  return (
    <div className="hidden lg:flex fixed right-10 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-4">
      <span className="text-[10px] tracking-[0.2em] text-[rgba(184,145,74,0.7)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
        {String(percent).padStart(2, "0")}%
      </span>
      {[...SCENES.map((s) => s.label), "Finale"].map((label, i) => (
        <div key={label} className="group relative flex items-center">
          <span
            className="absolute right-5 whitespace-nowrap text-[10px] tracking-[0.15em] uppercase transition-opacity duration-200 opacity-0 group-hover:opacity-100"
            style={{ color: active === i ? GOLD : "rgba(245,240,232,0.5)", fontFamily: "var(--font-mono)" }}
          >
            {label}
          </span>
          <span
            className="block transition-all duration-300"
            style={{
              width: active === i ? 18 : 10,
              height: 1,
              background: active === i ? GOLD : "rgba(245,240,232,0.25)",
              boxShadow: active === i ? "0 0 6px rgba(184,145,74,0.8)" : "none",
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* ── Reduced-motion fallback: same content, no pin, simple fades ── */

function StaticFallback() {
  return (
    <section className="bg-[#0d0d0d] py-24" aria-label="Every transformation begins with a sketch">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-24">
        <div>
          <Eyebrow>Business Design Partner</Eyebrow>
          <h1 className="mt-6 text-[clamp(36px,7vw,80px)] font-medium leading-[1.05] text-[#f5f0e8]" style={{ fontFamily: "var(--font-serif)" }}>
            Every transformation <span className="italic text-[#b8914a]">starts with a sketch.</span>
          </h1>
        </div>
        {SCENES.map((s) => (
          <div key={s.key}>
            <Eyebrow>{s.label}</Eyebrow>
            <p className="mt-4 text-[clamp(24px,4vw,44px)] font-medium text-[#f5f0e8]" style={{ fontFamily: "var(--font-serif)" }}>
              {s.line} <span className="italic text-[#b8914a]">{s.accent}</span>
            </p>
          </div>
        ))}
        <div className="text-center pt-8">
          <h2 className="text-[clamp(32px,6vw,72px)] font-medium text-[#f5f0e8]" style={{ fontFamily: "var(--font-serif)" }}>
            Sketch <span className="italic text-[#b8914a]">→</span> Scale
          </h2>
          <p className="mt-5 text-[16px] text-[rgba(245,240,232,0.6)] max-w-md mx-auto">
            We transform ideas into scalable businesses, brands, products, and digital ecosystems.
          </p>
          <Link
            to="/discovery-workshop"
            className="mt-8 inline-flex items-center gap-3 bg-[#b8914a] text-[#f5f0e8] text-[13px] tracking-[0.12em] uppercase font-medium px-8 py-4 hover:bg-[#d4a85a] transition-colors"
          >
            Start Your Sketch <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Main export ── */

export default function TransformationHero() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const [percent, setPercent] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let idx = 0;
    for (let i = 0; i < BOUNDS.length - 1; i++) {
      if (v >= BOUNDS[i]) idx = i;
    }
    setActive(idx);
    setPercent(Math.round(v * 100));
  });

  // One draw MotionValue per scene, always computed (cheap, stable hook
  // count) — only the one matching `active` is ever actually rendered.
  const draw0 = useSceneDraw(scrollYProgress, 0);
  const draw1 = useSceneDraw(scrollYProgress, 1);
  const draw2 = useSceneDraw(scrollYProgress, 2);
  const draw3 = useSceneDraw(scrollYProgress, 3);
  const draw4 = useSceneDraw(scrollYProgress, 4);
  const draws = [draw0, draw1, draw2, draw3, draw4];

  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0], { clamp: true });

  if (reduce) return <StaticFallback />;

  const ActiveStage = active < 5 ? STAGES[active] : null;

  return (
    <div ref={containerRef} style={{ height: "650vh" }} className="relative bg-[#0d0d0d]" aria-label="Sketch2Scale: every transformation begins with a sketch">
      <div className="sticky top-0 h-screen overflow-hidden">
        <HUDGrid />

        {/* oversized outline wordmark, ambient backdrop */}
        <p
          aria-hidden="true"
          className="absolute -bottom-[8vw] left-1/2 -translate-x-1/2 whitespace-nowrap text-[26vw] font-medium pointer-events-none select-none"
          style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.03em", color: "transparent", WebkitTextStroke: "1px rgba(245,240,232,0.05)" }}
        >
          Scale
        </p>

        <ProgressRail active={active} percent={percent} />

        {/* exactly one scene mounted at a time — see architecture note at top of file */}
        <AnimatePresence mode="sync" initial={false}>
          {active < 5 ? (
            <motion.div
              key={`scene-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="absolute inset-0"
            >
              <div className="absolute inset-x-0 top-[9vh] bottom-[29vh] flex items-center justify-center px-6">
                <div className="relative w-full max-w-[520px] aspect-[520/360]" style={GOLD_GLOW}>
                  <HUDCorners />
                  {ActiveStage && <ActiveStage draw={draws[active]} />}
                </div>
              </div>
              <SceneHeadline scene={SCENES[active]} index={active} />
            </motion.div>
          ) : (
            <motion.div
              key="scene-finale"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute inset-0"
            >
              <FinaleScene />
            </motion.div>
          )}
        </AnimatePresence>

        {/* scan-sweep cut lines — one per scene boundary, including into the finale */}
        {BOUNDS.slice(1).map((b) => (
          <ScanSweep key={b} scrollYProgress={scrollYProgress} boundary={b} />
        ))}

        {/* scroll cue, scene 1 only */}
        <motion.div style={{ opacity: scrollCueOpacity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <span className="w-8 h-px bg-[rgba(184,145,74,0.6)]" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-[rgba(245,240,232,0.3)]" style={{ fontFamily: "var(--font-mono)" }}>
            Scroll to watch it happen
          </span>
        </motion.div>

        {/* top-left constant label + live readout, present throughout the sequence */}
        {/* <div className="absolute top-8 left-6 lg:left-12 flex items-center gap-4">
          <span className="text-[11px] tracking-[0.25em] uppercase text-[rgba(245,240,232,0.4)]" style={{ fontFamily: "var(--font-mono)" }}>
            Business Design Partner
          </span>
        </div> */}
        <div className="absolute top-8 right-6 lg:hidden text-right">
          <span className="text-[11px] tracking-[0.2em] text-[rgba(184,145,74,0.8)]" style={{ fontFamily: "var(--font-mono)" }}>
            {String(percent).padStart(2, "0")}%
          </span>
        </div>
      </div>
    </div>
  );
}