import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

/**
 * MarioInline — embeddable mini component (keeps to its box)
 * - Compact layout (default 120px tall, maxWidth 420px)
 * - Smooth hop arc + tiny screen shake on bonk
 * - Wobbling question blocks + flash and coin pop on hit
 * - Reuses a single AudioContext after first interaction
 * - Keyboard support: focus container, press Space/→ to jump
 */

export type MarioInlineProps = {
  tiles?: number;
  onTileHit?: (index: number) => void;
  onAllComplete?: (score: number) => void;
  soundEnabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  height?: number;                     // component height in px
  maxWidth?: number | string;          // width cap (default 420)
  showHud?: boolean;                   // show score/progress badges (default false)
  showTip?: boolean;                   // show helper text (default false)
};

const GROUND_H = 20;

export default function MarioInline({
  tiles = 4,
  onTileHit,
  onAllComplete,
  soundEnabled = true,
  className,
  style,
  height = 120,
  maxWidth = 420,
  showHud = false,
  showTip = false,
}: MarioInlineProps) {
  const [curr, setCurr] = useState(0);
  const [hit, setHit] = useState<boolean[]>(() => Array(Math.max(2, tiles)).fill(false));
  const [score, setScore] = useState(0);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const charCtrls = useAnimationControls();
  const coinCtrls = useAnimationControls();
  const shakeCtrls = useAnimationControls();

  const colW = 56;
  const padX = 8;
  const charOffset = 12;

  const nextX = useMemo(() => padX + curr * colW + colW / 2 - charOffset, [curr]);

  // Single AudioContext
  const audioRef = useRef<{ ctx: AudioContext | null } | null>({ ctx: null });
  const ensureCtx = () => {
    if (!audioRef.current) audioRef.current = { ctx: null };
    if (!audioRef.current.ctx) {
      try {
        const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
        audioRef.current.ctx = new Ctx();
      } catch {}
    }
    return audioRef.current.ctx;
  };

  const play = useCallback((type: "jump" | "coin" | "done") => {
    if (!soundEnabled) return;
    const ctx = ensureCtx();
    if (!ctx) return;
    try {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "square"; o.connect(g); g.connect(ctx.destination);
      const t = ctx.currentTime;
      if (type === "jump") o.frequency.setValueAtTime(440, t);
      if (type === "coin") o.frequency.setValueAtTime(880, t);
      if (type === "done") o.frequency.setValueAtTime(660, t);
      g.gain.setValueAtTime(0.05, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      o.start(); o.stop(t + 0.22);
    } catch {}
  }, [soundEnabled]);

  const jump = useCallback(async () => {
    if (busy || done || curr >= tiles) return;
    setBusy(true);
    play("jump");

    const baseY = -8;
    const apexY = -54;

    await charCtrls.start({
      x: nextX,
      y: [baseY, apexY, baseY],
      transition: { duration: 0.5, times: [0, 0.5, 1], ease: "easeOut" },
    });

    setHit((prev) => { const c = [...prev]; c[curr] = true; return c; });

    const coinX = padX + curr * colW + colW / 2;
    coinCtrls.set({ opacity: 0, y: 0, x: coinX });
    coinCtrls.start({
      opacity: [0, 1, 0],
      y: [0, -30, -46],
      transition: { duration: 0.5, times: [0, 0.45, 1] },
    });

    shakeCtrls.start({ x: [0, -2, 2, -1, 1, 0], transition: { duration: 0.18 } });

    play("coin");
    setScore((s) => s + 100);
    onTileHit?.(curr);

    const next = curr + 1;
    setCurr(next);
    if (next >= tiles) { setDone(true); play("done"); onAllComplete?.(100 * tiles); }
    setBusy(false);
  }, [busy, done, curr, tiles, nextX, charCtrls, coinCtrls, shakeCtrls, play, onTileHit, onAllComplete]);

  // init position
  useEffect(() => {
    charCtrls.set({ x: padX + colW / 2 - charOffset, y: -8 });
  }, []);

  const progress = Math.min(curr, tiles) / tiles;

  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.code === "Space" || e.code === "ArrowRight") {
          e.preventDefault(); jump();
        }
      }}
      className={"inline-block w-full " + (className || "")}
      style={{ maxWidth, ...style }}
      role="region"
      aria-label={`Coin blocks: ${Math.min(curr, tiles)}/${tiles} hit`}
    >
      {/* Scene */}
      <motion.div
        animate={shakeCtrls}
        className="relative overflow-hidden rounded-md border border-neutral-300 bg-gradient-to-b from-sky-100 to-sky-200"
        style={{ height }}
      >
        {/* HUD (optional) */}
        {showHud && (
          <div className="absolute left-2 top-1 z-20 flex items-center gap-2 text-[11px]">
            <div className="rounded bg-white/60 px-2 font-semibold text-neutral-800" aria-live="polite">{score}</div>
            <div className="rounded bg-white/40 px-2 text-neutral-700">{Math.min(curr, tiles)}/{tiles}</div>
          </div>
        )}

        {/* Progress bar */}
        <div className="absolute left-0 right-0 top-0 z-10 h-1 bg-white/30">
          <div className="h-full bg-gradient-to-r from-amber-300 to-amber-500" style={{ width: `${progress * 100}%` }} />
        </div>

        {/* Blocks row */}
        <div className="absolute left-0 right-0 top-6 flex items-end" style={{ paddingLeft: padX, gap: colW - 40 }}>
          {Array.from({ length: tiles }).map((_, i) => (
            <Tile key={i} isNext={i === curr} isHit={hit[i]} onClick={i === curr && !busy && !done ? jump : undefined} />
          ))}
        </div>

        {/* Coin popup (slightly lower for capsule layout) */}
        <motion.div animate={coinCtrls} className="pointer-events-none absolute top-[14px] z-20 -translate-x-1/2">
          <Coin size={16} shine />
        </motion.div>

        {/* Character */}
        <motion.div animate={charCtrls} className="absolute z-10" style={{ bottom: GROUND_H }}>
          <MiniPlumber running={busy} />
        </motion.div>

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-5 border-t border-emerald-700 bg-gradient-to-b from-emerald-500 to-emerald-700" />
      </motion.div>

      {/* Helper (optional) */}
      {showTip && (
        <div className="mt-1 text-[11px] text-neutral-500">
          Tip: Press Space or → to jump. Click the highlighted block.
        </div>
      )}
    </div>
  );
}

/* ---------------------------- Subcomponents ---------------------------- */

function Tile({ isHit, isNext, onClick }: { isHit: boolean; isNext: boolean; onClick?: () => void }) {
  const [wobble, setWobble] = useState(0);
  const [flash, setFlash] = useState(false);
  useEffect(() => setWobble(0), [isNext]);
  useEffect(() => {
    if (isHit) {
      setFlash(true);
      const id = setTimeout(() => setFlash(false), 150);
      return () => clearTimeout(id);
    }
  }, [isHit]);

  const handle = () => { if (!onClick) return; setWobble((n) => n + 1); onClick(); };

  return (
    <motion.button
      onClick={handle}
      disabled={!isNext}
      className="relative h-10 w-10"
      animate={isNext ? { y: [0, -2, 0] } : {}}
      transition={isNext ? { duration: 1.1, repeat: Infinity } : {}}
      aria-label={`Block ${isHit ? "hit" : "ready"}`}
    >
      <motion.div
        key={String(isHit)}
        animate={{
          y: wobble % 2 ? -4 : 0,
          boxShadow: flash
            ? ["0 0 0 rgba(255,255,255,0)", "0 0 14px rgba(255,255,255,0.7)", "0 0 0 rgba(255,255,255,0)"]
            : undefined
        }}
        transition={{ type: "spring", stiffness: 420, damping: 14 }}
        className="grid h-full w-full place-items-center rounded-sm border shadow-sm"
        style={{
          background: isHit ? "linear-gradient(180deg,#b08d57,#8e6b3a)" : "linear-gradient(180deg,#ffdd66,#d9a800)",
          borderColor: isHit ? "#7a5a2f" : "#c18b00",
        }}
      >
        <span className={`text-sm font-black ${isHit ? "text-amber-950/70" : "text-amber-900"}`}>{isHit ? "⬛" : "?"}</span>
      </motion.div>
    </motion.button>
  );
}

function Coin({ size = 16, shine = false }: { size?: number; shine?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <defs>
        <radialGradient id="g" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#fff176" />
          <stop offset="60%" stopColor="#fdd835" />
          <stop offset="100%" stopColor="#f9a825" />
        </radialGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#g)" stroke="#d68910" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" fill="#fff59d" stroke="#f9a825" strokeWidth="1" />
      {shine && <rect x="5" y="3" width="4" height="2" rx="1" fill="#fff9c4" />}
    </svg>
  );
}

function MiniPlumber({ running }: { running: boolean }) {
  return (
    <motion.div className="relative h-10 w-7" animate={running ? { y: [0, -2, 0] } : {}} transition={running ? { duration: 0.25, repeat: Infinity } : {}}>
      {/* Hat */}
      <div className="absolute -top-1 left-1/2 h-2 w-5 -translate-x-1/2 rounded-t bg-red-600" />
      <div className="absolute top-1 left-1/2 h-1 w-4 -translate-x-1/2 bg-red-700" />
      {/* Head */}
      <div className="absolute top-2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded bg-amber-300" />
      {/* Tash */}
      <div className="absolute top-[14px] left-1/2 h-1 w-3 -translate-x-1/2 rounded bg-amber-900" />
      {/* Body */}
      <div className="absolute top-5 left-1/2 h-5 w-5 -translate-x-1/2 rounded bg-blue-700" />
      {/* Buttons */}
      <div className="absolute top-[22px] left-[8px] h-1 w-1 rounded-full bg-yellow-300" />
      <div className="absolute top-[22px] right-[8px] h-1 w-1 rounded-full bg-yellow-300" />
      {/* Shoes */}
      <div className="absolute bottom-0 left-0 h-1.5 w-2.5 rounded bg-amber-800" />
      <div className="absolute bottom-0 right-0 h-1.5 w-2.5 rounded bg-amber-800" />
    </motion.div>
  );
}
