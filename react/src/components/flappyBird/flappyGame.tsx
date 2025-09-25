import React, { useEffect, useRef, useState } from "react";
import FlappySound from "@/src/public/assets/flappySound.mp3";
import LosingSound from "@/src/public/assets/losingSound.mp3";
import Bird_Img from "@/src/public/assets/sveaBird.png";
import * as balanceRedux from "@/src/redux/slices/balanceSlice";
import { useDispatch } from "react-redux";

/** ---------- FIXED WORLD (prevents zoomed look) ---------- */
const WORLD_W = 360; // 9:16
const WORLD_H = 640;

type Pipe = {
  x: number;
  top: number;
  gap: number;
  passed: boolean;
  id: number;
};

function FlappyBirdCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTRef = useRef<number>(0);
  const runningRef = useRef<boolean>(false);
  const dispatch = useDispatch();

  /** visual CSS size (can change on resize; world size does NOT) */
  const [cssSize, setCssSize] = useState({ w: WORLD_W, h: WORLD_H });

  useEffect(() => {
    const fit = () => {
      const maxW = Math.min(window.innerWidth, 380);
      const w = Math.max(300, Math.floor(maxW));
      const h = Math.floor((w * WORLD_H) / WORLD_W);
      setCssSize({ w, h });
    };
    fit();
    window.addEventListener("resize", fit, { passive: true });
    return () => window.removeEventListener("resize", fit);
  }, []);

  /** ----- Tuning derived from the fixed world ----- */
  const tuningRef = useRef({
    GAME_W: WORLD_W,
    GAME_H: WORLD_H,
    VIEW_H: WORLD_H - 100,
    GROUND_H: 100,
    GRAVITY: 1300,
    JUMP_VY: -420,
    MAX_DROP_ANGLE: 20,
    MAX_RISE_ANGLE: -20,
    PIPE_W: 70,
    PIPE_GAP_MIN: 170,
    PIPE_GAP_MAX: 210,
    PIPE_HOLE_MIN: 80,
    PIPE_HOLE_MAX: WORLD_H - 100 - 80,
    SPAWN_DIST: 240,
    SPEED_BASE: 160,
    HIT_R: 16,
    DPR: 1,
  });

  /** ----- Assets ----- */
  const imgRef = useRef<HTMLImageElement | null>(null);
  const soundPassRef = useRef<HTMLAudioElement | null>(null);
  const soundLoseRef = useRef<HTMLAudioElement | null>(null);
  const audioUnlockedRef = useRef(false);

  useEffect(() => {
    const img = new Image();
    img.src = Bird_Img;
    img.onload = () => (imgRef.current = img);
    img.onerror = () => (imgRef.current = null);
  }, []);
  useEffect(() => {
    soundPassRef.current = new Audio(FlappySound);
    soundLoseRef.current = new Audio(LosingSound);
    if (soundPassRef.current) soundPassRef.current.muted = true;
    if (soundLoseRef.current) soundLoseRef.current.muted = true;
  }, []);

  /** ----- Game state (no React re-renders per frame) ----- */
  const stateRef = useRef<{
    mode: "waiting" | "playing" | "dead";
    birdX: number;
    birdY: number;
    birdVY: number;
    angle: number;
    pipes: Pipe[];
    score: number;
    best: number;
    groundX: number;
    parallaxX: number;
    spawnAcc: number;
    flyAcc: number;
    flyFrame: number;
    shakeT: number;
  }>({
    mode: "waiting",
    birdX: Math.floor(WORLD_W * 0.24),
    birdY: Math.floor((WORLD_H - 100) * 0.5),
    birdVY: 0,
    angle: 0,
    pipes: [],
    score: 0,
    best: Number(localStorage.getItem("flappy_best") || 0),
    groundX: 0,
    parallaxX: 0,
    spawnAcc: 0,
    flyAcc: 0,
    flyFrame: 0,
    shakeT: 0,
  });

  /** ----- Precomputed paints ----- */
  const paintsRef = useRef<{ sky?: CanvasGradient; ground?: CanvasPattern }>(
    {}
  );

  function setupCanvas(c: HTMLCanvasElement) {
    const ctx = c.getContext("2d")!;
    const DPR = Math.min(window.devicePixelRatio || 1, 2); // cap for iOS
    c.width = WORLD_W * DPR;
    c.height = WORLD_H * DPR;
    c.style.width = `${cssSize.w}px`;
    c.style.height = `${cssSize.h}px`;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    // tuning always based on fixed world
    tuningRef.current = {
      ...tuningRef.current,
      GAME_W: WORLD_W,
      GAME_H: WORLD_H,
      GROUND_H: 100,
      VIEW_H: WORLD_H - 100,
      PIPE_HOLE_MAX: WORLD_H - 100 - 80,
      DPR,
    };

    // sky
    const sky = ctx.createLinearGradient(0, 0, 0, WORLD_H);
    sky.addColorStop(0, "#4EC0CA");
    sky.addColorStop((WORLD_H - 100) / WORLD_H, "#4EC0CA");
    sky.addColorStop((WORLD_H - 100) / WORLD_H, "#5EE270");
    sky.addColorStop(1, "#5EE270");
    paintsRef.current.sky = sky;

    // ground stripes
    const stripeH = 6;
    const pc = document.createElement("canvas");
    pc.width = 16;
    pc.height = stripeH;
    const pctx = pc.getContext("2d")!;
    pctx.fillStyle = "#5EE270";
    pctx.fillRect(0, 0, 8, stripeH);
    pctx.fillStyle = "#4BC850";
    pctx.fillRect(8, 0, 8, stripeH);
    paintsRef.current.ground = ctx.createPattern(pc, "repeat") || undefined;

    resetGame();
  }

  function resetGame() {
    const T = tuningRef.current,
      s = stateRef.current;
    s.mode = "waiting";
    s.birdX = Math.floor(WORLD_W * 0.24);
    s.birdY = Math.floor(T.VIEW_H * 0.5);
    s.birdVY = 0;
    s.angle = 0;
    s.pipes = [];
    s.score = 0;
    s.groundX = 0;
    s.parallaxX = 0;
    s.spawnAcc = 0;
    s.flyAcc = 0;
    s.flyFrame = 0;
    s.shakeT = 0;
  }

  /** ----- Input ----- */
  const act = () => {
    if (!audioUnlockedRef.current) {
      if (soundPassRef.current) soundPassRef.current.muted = false;
      if (soundLoseRef.current) soundLoseRef.current.muted = false;
      audioUnlockedRef.current = true;
    }
    const s = stateRef.current,
      T = tuningRef.current;
    if (s.mode === "waiting") {
      s.mode = "playing";
      s.birdVY = T.JUMP_VY;
      return;
    }
    if (s.mode === "dead") {
      resetGame();
      s.mode = "playing";
      s.birdVY = T.JUMP_VY;
      return;
    }
    if (s.mode === "playing") s.birdVY = T.JUMP_VY;
  };

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const onDown = (e: PointerEvent) => {
      e.preventDefault();
      act();
    };
    c.addEventListener("pointerdown", onDown, { passive: false });
    return () => c.removeEventListener("pointerdown", onDown);
  }, []);

  /** ----- Loop ----- */
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    setupCanvas(c);
    runningRef.current = true;
    lastTRef.current = performance.now();

    const step = (t: number) => {
      if (!runningRef.current) return;
      const dt = Math.min(1 / 30, (t - lastTRef.current) / 1000);
      lastTRef.current = t;
      tick(dt);
      draw();
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);

    const onVis = () => {
      if (document.hidden) {
        runningRef.current = false;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      } else {
        runningRef.current = true;
        lastTRef.current = performance.now();
        rafRef.current = requestAnimationFrame(step);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      runningRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [cssSize.w, cssSize.h]);

  function spawnPipe() {
    const T = tuningRef.current;
    const gap = rand(T.PIPE_GAP_MIN, T.PIPE_GAP_MAX);
    const minC = T.PIPE_HOLE_MIN + gap / 2;
    const maxC = T.PIPE_HOLE_MAX - gap / 2;
    const center = rand(minC, maxC);
    const top = Math.floor(center - gap / 2);
    stateRef.current.pipes.push({
      x: T.GAME_W + 24,
      top,
      gap,
      passed: false,
      id: Math.random(),
    });
  }

  function drawGround(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    pattern?: CanvasPattern
  ) {
    // ground base
    ctx.fillStyle = "#DED895";
    ctx.fillRect(0, 0, w, h);

    // grass stripe on top (optional pattern)
    if (pattern) {
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, w, 6); // thin stripe at the top of ground
    }
  }

  function tick(dt: number) {
    const s = stateRef.current,
      T = tuningRef.current;
    if (s.mode === "playing") {
      const speed = T.SPEED_BASE + Math.min(120, s.score * 6);
      s.parallaxX = (s.parallaxX + speed * 0.25 * dt) % (T.GAME_W * 2);
      s.groundX = (s.groundX + speed * dt) % T.GAME_W;

      s.birdVY += T.GRAVITY * dt;
      s.birdY += s.birdVY * dt;
      s.birdY = Math.max(0, Math.min(T.VIEW_H - 1, s.birdY));

      const vf = s.birdVY / 400;
      s.angle =
        s.birdVY < 0
          ? Math.max(T.MAX_RISE_ANGLE, vf * 15)
          : Math.min(T.MAX_DROP_ANGLE, vf * 90);

      s.spawnAcc += speed * dt;
      while (s.spawnAcc >= T.SPAWN_DIST) {
        s.spawnAcc -= T.SPAWN_DIST;
        spawnPipe();
      }

      for (const p of s.pipes) {
        p.x -= speed * dt;
        if (!p.passed && p.x + T.PIPE_W < s.birdX) {
          p.passed = true;
          s.score += 1;
          s.shakeT = 0.15;
          dispatch(balanceRedux.increment(1));
          play(soundPassRef.current);
        }
      }
      s.pipes = s.pipes.filter((p) => p.x > -T.PIPE_W - 10);

      const r = T.HIT_R;
      const hitBounds = s.birdY + r > T.VIEW_H || s.birdY - r < 0;
      const hitPipe = s.pipes.some((p) => {
        const inX = s.birdX + r > p.x && s.birdX - r < p.x + T.PIPE_W;
        if (!inX) return false;
        return s.birdY - r < p.top || s.birdY + r > p.top + p.gap;
      });
      if (hitBounds || hitPipe) {
        s.mode = "dead";
        s.best = Math.max(s.best, s.score);
        localStorage.setItem("flappy_best", String(s.best));
        s.shakeT = 0.35;
        play(soundLoseRef.current);
      }
    } else if (s.mode === "waiting") {
      const t = performance.now() * 0.003;
      s.birdY = tuningRef.current.VIEW_H * 0.55 + Math.sin(t) * 6;
      s.angle = Math.sin(t) * 2;
    } else if (s.mode === "dead") {
      if (s.birdY < tuningRef.current.VIEW_H - 1) {
        s.birdVY += tuningRef.current.GRAVITY * dt;
        s.birdY += s.birdVY * dt;
        const vf = s.birdVY / 400;
        s.angle = Math.min(tuningRef.current.MAX_DROP_ANGLE, vf * 90);
      } else {
        s.birdY = tuningRef.current.VIEW_H - 1;
        s.birdVY = 0;
        s.angle = tuningRef.current.MAX_DROP_ANGLE;
      }
    }

    s.flyAcc += dt;
    const adv = s.mode === "dead" ? 1 / 4 : 1 / 6;
    while (s.flyAcc >= adv) {
      s.flyAcc -= adv;
      s.flyFrame = (s.flyFrame + 1) % 3;
    }
    if (s.shakeT > 0) s.shakeT = Math.max(0, s.shakeT - dt);
  }

  /** ----- Drawing ----- */
  function draw() {
    const c = canvasRef.current!,
      ctx = c.getContext("2d")!;
    const s = stateRef.current,
      T = tuningRef.current;

    ctx.save();
    ctx.clearRect(0, 0, T.GAME_W, T.GAME_H);

    // sky
    ctx.fillStyle = paintsRef.current.sky!;
    ctx.fillRect(0, 0, T.GAME_W, T.GAME_H);

    // simple clouds
    ctx.globalAlpha = 0.6;
    drawCloudRow(ctx, -s.parallaxX * 0.5, 70, T.GAME_W);
    ctx.globalAlpha = 1;

    // pipes
    for (const p of s.pipes) {
      drawPipe(ctx, p.x, 0, T.PIPE_W, p.top, true);
      drawPipe(
        ctx,
        p.x,
        p.top + p.gap,
        T.PIPE_W,
        T.VIEW_H - (p.top + p.gap),
        false
      );
    }

    // ground
    ctx.save();
    ctx.translate(-s.groundX, T.VIEW_H);
    drawGround(ctx, T.GAME_W * 2, T.GROUND_H, paintsRef.current.ground!);
    ctx.restore();

    // bird
    const shake = s.shakeT > 0 ? 6 * (s.shakeT / 0.35) : 0;
    const bx = s.birdX + (Math.random() - 0.5) * shake;
    const by = s.birdY + (Math.random() - 0.5) * shake;
    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate((s.angle * Math.PI) / 180);
    ctx.translate(-bx, -by);
    drawBird(ctx, bx, by, s.flyFrame);
    ctx.restore();

    // score + overlays
    if (s.mode === "playing") drawScore(ctx, s.score);
    if (s.mode === "waiting") {
      drawCenterText(ctx, "Flappy Svea", 54);
      drawSubText(ctx, "Tryck för att spela", 18, 54);
    } else if (s.mode === "dead") {
      drawCenterText(ctx, "Game Over", 50);
      drawSubText(ctx, "Tryck för att spela igen", 16, 52);
    }

    ctx.restore();
  }

  /** ----- Helpers ----- */
  function play(a?: HTMLAudioElement | null) {
    if (!a || a.muted) return;
    a.currentTime = 0;
    a.play().catch(() => {});
  }
  function rand(a: number, b: number) {
    return a + Math.random() * (b - a);
  }

  function drawCloudRow(
    ctx: CanvasRenderingContext2D,
    baseX: number,
    y: number,
    W: number
  ) {
    const spacing = 320,
      width = spacing * 4;
    const start = Math.floor((baseX - W) / width) - 1;
    const end = Math.ceil((baseX + W) / width) + 1;
    ctx.fillStyle = "white";
    for (let i = start; i <= end; i++) {
      const ox = baseX + i * width;
      roundedRect(ctx, ox + 40, y + 12, 84, 22, 10);
      ctx.fill();
      roundedRect(ctx, ox + 260, y + 48, 56, 16, 8);
      ctx.fill();
      roundedRect(ctx, ox + 500, y + 10, 84, 22, 10);
      ctx.fill();
      roundedRect(ctx, ox + 740, y + 80, 64, 18, 8);
      ctx.fill();
    }
  }

  function drawPipe(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    top: boolean
  ) {
    const g = ctx.createLinearGradient(x, y, x + w, y);
    g.addColorStop(0, "#00CCA3");
    g.addColorStop(1, "#4BC850");
    ctx.fillStyle = g;
    ctx.strokeStyle = "#0a6b51";
    ctx.lineWidth = 2;

    const rBody = 12;
    if (top)
      pathRoundedRect(ctx, x, y, w, h, { tl: 0, tr: 0, br: rBody, bl: rBody });
    else
      pathRoundedRect(ctx, x, y, w, h, { tl: rBody, tr: rBody, br: 0, bl: 0 });
    ctx.fill();
    ctx.stroke();

    const capH = 18,
      capY = top ? y + h - capH : y - 2;
    const rCap = Math.min(9, capH / 2);
    pathRoundedRect(ctx, x - 4, capY, w + 8, capH, {
      tl: rCap,
      tr: rCap,
      br: rCap,
      bl: rCap,
    });
    ctx.fill();
    ctx.stroke();
  }

  const SPRITE_FRAMES = 3;
  function drawBird(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    frame: number
  ) {
    const img = imgRef.current;
    const targetH = WORLD_H * 0.24; // tuned for WORLD_H
    if (img && img.complete && img.naturalHeight) {
      const fw = img.width / SPRITE_FRAMES,
        fh = img.height;
      const aspect = fw / fh,
        tw = Math.floor(targetH * aspect);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        img,
        frame * (fw - 20),
        0,
        fw,
        fh,
        Math.floor(x - tw / 2),
        Math.floor(y - targetH / 2),
        tw,
        targetH
      );
    } else {
      const r = 18;
      ctx.fillStyle = "#FFD54A";
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  function drawScore(ctx: CanvasRenderingContext2D, score: number) {
    const W = WORLD_W,
      H = WORLD_H;
    const size = Math.max(26, Math.floor(W * 0.11));
    ctx.font = `bold ${size}px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial`;
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = Math.max(3, Math.floor(W * 0.01));
    ctx.textAlign = "center";
    const y = Math.floor(H * 0.18);
    ctx.strokeText(String(score), Math.floor(W / 2), y);
    ctx.fillText(String(score), Math.floor(W / 2), y);
  }

  function drawCenterText(
    ctx: CanvasRenderingContext2D,
    text: string,
    base: number
  ) {
    const W = WORLD_W,
      H = WORLD_H;
    const size = Math.max(28, Math.floor(W * (base / 400)));
    ctx.font = `bold ${size}px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial`;
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = Math.max(3, Math.floor(W * 0.012));
    ctx.textAlign = "center";
    ctx.strokeText(text, Math.floor(W / 2), Math.floor(H / 2 - H * 0.08));
    ctx.fillText(text, Math.floor(W / 2), Math.floor(H / 2 - H * 0.08));
  }

  function drawSubText(
    ctx: CanvasRenderingContext2D,
    text: string,
    base: number,
    offset: number
  ) {
    const W = WORLD_W,
      H = WORLD_H;
    const size = Math.max(12, Math.floor(W * (base / 500)));
    ctx.font = `bold ${size}px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial`;
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = Math.max(2, Math.floor(W * 0.008));
    ctx.textAlign = "center";
    const y = Math.floor(H / 2 + H * (offset / 500));
    ctx.strokeText(text, Math.floor(W / 2), y);
    ctx.fillText(text, Math.floor(W / 2), y);
  }

  function roundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }
  function pathRoundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: { tl?: number; tr?: number; br?: number; bl?: number }
  ) {
    const tl = r.tl ?? 0,
      tr = r.tr ?? 0,
      br = r.br ?? 0,
      bl = r.bl ?? 0;
    ctx.beginPath();
    ctx.moveTo(x + tl, y);
    ctx.lineTo(x + w - tr, y);
    tr ? ctx.arcTo(x + w, y, x + w, y + tr, tr) : ctx.lineTo(x + w, y);
    ctx.lineTo(x + w, y + h - br);
    br
      ? ctx.arcTo(x + w, y + h, x + w - br, y + h, br)
      : ctx.lineTo(x + w, y + h);
    ctx.lineTo(x + bl, y + h);
    bl ? ctx.arcTo(x, y + h, x, y + h - bl, bl) : ctx.lineTo(x, y + h);
    ctx.lineTo(x, y + tl);
    tl ? ctx.arcTo(x, y, x + tl, y, tl) : ctx.lineTo(x, y);
    ctx.closePath();
  }

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.focus();
    }
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <canvas
        ref={canvasRef}
        style={{
          width: `${cssSize.w}px`,
          height: `${cssSize.h}px`,
          borderRadius: "20px",
          display: "block",
          touchAction: "manipulation",
          cursor: "pointer"
        }}
        onKeyDown={(e) => {
          if (e.code === "Space") {
            e.preventDefault();
            act();
          }
        }}
        tabIndex={0}
      />
    </div>
  );
}

export default React.memo(FlappyBirdCanvas);
