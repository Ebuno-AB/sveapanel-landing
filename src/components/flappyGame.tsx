import React, { useEffect, useRef, useState } from "react";

/**
 * -------- Bird Image Config --------
 */
const BIRD_IMAGE_URL = "/assets/flappysvea.svg"; // SVG bird image

/**
 * -------- Game tuning --------
 */
const GAME_W = 400;
const GAME_H = 800;
const GROUND_H = 120;
const VIEW_H = GAME_H - GROUND_H;

const GRAVITY = 1700; // px/s^2
const JUMP_VELOCITY = -420; // px/s
const MAX_DROP_ANGLE = 80; // degrees
const MAX_RISE_ANGLE = -25; // degrees
const PIPE_W = 70;
const PIPE_GAP_MIN = 140;
const PIPE_GAP_MAX = 180;
const PIPE_HOLE_MIN = 80; // min top margin
const PIPE_HOLE_MAX = VIEW_H - 80;
const PIPE_SPAWN_DIST = 240; // px between pipes
const PIPE_SPEED_BASE = 160; // px/s (will scale with score)
const HITBOX_R = 16; // circle radius for collisions

export default function FlappyBirdCanvas({
  onPointGained = () => {},
}: {
  onPointGained: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // persistent game state
  const stateRef = useRef<{
    mode: "waiting" | "playing" | "dead" | "celebrating";
    t: number;
    birdY: number;
    birdVY: number;
    angle: number;
    pipes: {
      x: number;
      top: number;
      gap: number;
      passed: boolean;
      id: number;
    }[];
    score: number;
    best: number;
    money: number;
    groundX: number;
    parallaxX: number;
    shakeT: number;
    flyFrame: number;
    celebFrame: number;
    flyAcc: number;
    celebAcc: number;
    spawnAccumulator: number;
  }>({
    mode: "waiting",
    t: 0,
    birdY: VIEW_H * 0.45,
    birdVY: 0,
    angle: 0,
    pipes: [],
    score: 0,
    best: Number(localStorage.getItem("flappy_best") || 0),
    money: 0,
    groundX: 0,
    parallaxX: 0,
    shakeT: 0,
    flyFrame: 0,
    celebFrame: 0,
    flyAcc: 0,
    celebAcc: 0,
    spawnAccumulator: 0,
  });

  // for small UI bits
  const [ui, setUi] = useState({
    mode: "waiting" as "waiting" | "playing" | "dead" | "celebrating",
    score: 0,
    best: Number(localStorage.getItem("flappy_best") || 0),
    money: 0,
  });

  // helpers
  const reset = () => {
    const s = stateRef.current;
    s.mode = "waiting";
    s.t = 0;
    s.birdY = VIEW_H * 0.45;
    s.birdVY = 0;
    s.angle = 0;
    s.pipes = [];
    s.score = 0;
    s.money = 0;
    s.groundX = 0;
    s.parallaxX = 0;
    s.shakeT = 0;
    s.flyFrame = 0;
    s.celebFrame = 0;
    s.flyAcc = 0;
    s.celebAcc = 0;
    s.spawnAccumulator = 0;
    setUi({ mode: s.mode, score: s.score, best: s.best, money: s.money });
  };

  const startGame = () => {
    const s = stateRef.current;
    if (s.mode === "waiting") {
      s.mode = "playing";
      setUi((u) => ({ ...u, mode: "playing" }));
    } else if (s.mode === "dead") {
      // restart
      reset();
      stateRef.current.mode = "playing";
      setUi((u) => ({ ...u, mode: "playing" }));
    }
  };

  const jump = () => {
    const s = stateRef.current;
    if (s.mode === "waiting" || s.mode === "dead") {
      startGame();
    }
    if (s.mode === "playing") {
      s.birdVY = JUMP_VELOCITY;
    }
  };

  // controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        jump();
      }
    };
    const onClick = () => jump();
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    window.addEventListener("touchstart", onClick, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("touchstart", onClick);
    };
  }, []);

  // asset load
  useEffect(() => {
    const img = new Image();
    img.src = BIRD_IMAGE_URL;
    img.onload = () => {
      imgRef.current = img;
    };
    img.onerror = () => {
      console.warn("Bird image not found, using fallback graphics");
      imgRef.current = null; // Use fallback rendering
    };

    // Start the game loop regardless of image loading
    reset();
    loop(performance.now());

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // main loop
  const loop = (now: number) => {
    const s = stateRef.current;
    const c = canvasRef.current;
    if (!c) {
      rafRef.current = requestAnimationFrame(loop);
      return;
    }
    const ctx = c.getContext("2d")!;
    const dt = Math.min(1 / 30, rafRef.current ? (now - s.t) / 1000 : 0); // clamp big spikes
    s.t = now;

    // difficulty scales with score
    const speed = PIPE_SPEED_BASE + Math.min(120, s.score * 6);

    // background
    s.parallaxX = (s.parallaxX + speed * 0.25 * dt) % (GAME_W * 2);
    s.groundX = (s.groundX + speed * dt) % GAME_W;

    // physics
    if (s.mode === "playing") {
      s.birdVY += GRAVITY * dt;
      s.birdY += s.birdVY * dt;
      s.birdY = Math.max(0, Math.min(VIEW_H - 1, s.birdY));
      // angle responds to velocity
      const t = (s.birdVY / 600) * MAX_DROP_ANGLE;
      s.angle = Math.max(MAX_RISE_ANGLE, Math.min(MAX_DROP_ANGLE, t));

      // spawn pipes
      s.spawnAccumulator += speed * dt;
      while (s.spawnAccumulator >= PIPE_SPAWN_DIST) {
        s.spawnAccumulator -= PIPE_SPAWN_DIST;
        const gap = rand(PIPE_GAP_MIN, PIPE_GAP_MAX);
        const hole = rand(PIPE_HOLE_MIN, PIPE_HOLE_MAX - gap);
        s.pipes.push({
          x: GAME_W + 40,
          top: hole,
          gap,
          passed: false,
          id: Math.random(),
        });
      }

      // move pipes & scoring
      for (const p of s.pipes) {
        p.x -= speed * dt;
        if (!p.passed && p.x + PIPE_W < 80) {
          p.passed = true;
          s.score += 1;
          s.money += 10;
          onPointGained();
          setUi((u) => ({ ...u, score: s.score, money: s.money }));
          // small celebration burst
          s.shakeT = 0.15;
        }
      }
      // remove off-screen
      s.pipes = s.pipes.filter((p) => p.x > -PIPE_W - 10);

      // collisions (circle vs rects)
      const birdX = 80;
      const r = HITBOX_R;
      const hitGround = s.birdY + r > VIEW_H || s.birdY - r < 0;
      const hitPipe = s.pipes.some((p) => {
        const inX = birdX + r > p.x && birdX - r < p.x + PIPE_W;
        if (!inX) return false;
        const gapTop = p.top;
        const gapBot = p.top + p.gap;
        const topRectHit = s.birdY - r < gapTop;
        const botRectHit = s.birdY + r > gapBot;
        return topRectHit || botRectHit;
      });
      if (hitGround || hitPipe) {
        s.mode = "dead";
        s.best = Math.max(s.best, s.score);
        localStorage.setItem("flappy_best", String(s.best));
        setUi((u) => ({ ...u, mode: "dead", best: s.best }));
        s.shakeT = 0.35;
      }
    } else if (s.mode === "waiting") {
      // idle bob
      s.birdY = VIEW_H * 0.45 + Math.sin(now * 0.005) * 8;
      s.angle = Math.sin(now * 0.005) * 4;
    } else if (s.mode === "dead") {
      // settle on ground
      if (s.birdY < VIEW_H - 1) {
        s.birdVY += GRAVITY * dt;
        s.birdY += s.birdVY * dt;
      } else {
        s.birdY = VIEW_H - 1;
        s.birdVY = 0;
      }
    }

    // simple animation counter for wing flap effect
    s.flyAcc += dt;
    const flyAdvance = 1 / 12; // 12 FPS for smooth animation
    while (s.flyAcc >= flyAdvance) {
      s.flyAcc -= flyAdvance;
      s.flyFrame = (s.flyFrame + 1) % 8; // 8 frame cycle
    }

    // screen shake
    const shakeAmt = s.shakeT > 0 ? 6 * (s.shakeT / 0.35) : 0;
    if (s.shakeT > 0) s.shakeT = Math.max(0, s.shakeT - dt);

    // ---- draw ----
    ctx.save();
    ctx.clearRect(0, 0, GAME_W, GAME_H);

    // sky
    const skyTop = "#4EC0CA";
    const skyBot = "#5EE270";
    const grad = ctx.createLinearGradient(0, 0, 0, GAME_H);
    grad.addColorStop(0, skyTop);
    grad.addColorStop(VIEW_H / GAME_H, skyTop);
    grad.addColorStop(VIEW_H / GAME_H, skyBot);
    grad.addColorStop(1, skyBot);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, GAME_W, GAME_H);

    // distant clouds (parallax)
    ctx.globalAlpha = 0.6;
    drawCloud(ctx, -s.parallaxX * 0.5 + 40, 80, 46, 14);
    drawCloud(ctx, -s.parallaxX * 0.5 + 260, 140, 22, 8);
    drawCloud(ctx, -s.parallaxX * 0.5 + 360, 60, 46, 14);
    ctx.globalAlpha = 1;

    // pipes
    for (const p of s.pipes) {
      drawPipe(ctx, p.x, 0, PIPE_W, p.top);
      drawPipe(ctx, p.x, p.top + p.gap, PIPE_W, VIEW_H - (p.top + p.gap));
    }

    // ground
    ctx.save();
    ctx.translate(-s.groundX, VIEW_H);
    drawGround(ctx, GAME_W * 2, GROUND_H);
    ctx.restore();

    // bird (with slight shake)
    ctx.save();
    const shakeX = (Math.random() - 0.5) * shakeAmt;
    const shakeY = (Math.random() - 0.5) * shakeAmt;
    const bx = 80 + shakeX;
    const by = s.birdY + shakeY;
    ctx.translate(bx, by);
    ctx.rotate((s.angle * Math.PI) / 180);
    ctx.translate(-bx, -by);
    drawBird(
      ctx,
      bx,
      by,
      s.mode === "celebrating" || s.mode === "dead" ? "celebrate" : "fly",
      s.flyFrame
    );
    ctx.restore();

    // score
    if (s.mode === "playing") {
      drawScore(ctx, s.score);
      // floating +$10 briefly near the bird when scoring (based on shake trigger)
      if (s.shakeT > 0.25) {
        ctx.font = "bold 16px Impact, Arial Black, sans-serif";
        ctx.fillStyle = "#FFD54A";
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 3;
        ctx.textAlign = "center";
        ctx.strokeText("+$10", bx + 26, by - 26);
        ctx.fillText("+$10", bx + 26, by - 26);
      }
    }

    // overlays
    if (s.mode === "waiting") {
      drawCenterText(ctx, "Flappy Bird", 64);
      drawSubText(ctx, "Click or press Space to start", 18, 32);
      drawSubText(ctx, "Earn $10 per pipe!", 18, 64, "#FFD54A");
    } else if (s.mode === "dead") {
      drawCenterText(ctx, "Game Over", 58);
      drawBoard(ctx, s.score, s.best, s.money);
      drawSubText(ctx, "Click to play again", 18, 54);
    }

    ctx.restore();
    rafRef.current = requestAnimationFrame(loop);
  };

  // drawing helpers
  const drawCloud = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number
  ) => {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 10);
    ctx.fill();
  };

  const drawPipe = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number
  ) => {
    // body
    const grad = ctx.createLinearGradient(x, y, x + w, y);
    grad.addColorStop(0, "#5EE270");
    grad.addColorStop(1, "#4BC850");
    ctx.fillStyle = grad;
    ctx.strokeStyle = "#064e3b";
    ctx.lineWidth = 2;
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);
    // cap
    ctx.fillRect(x - 4, y + (h > 0 ? -2 : 0), w + 8, 24);
    ctx.strokeRect(x - 4, y + (h > 0 ? -2 : 0), w + 8, 24);
  };

  const drawGround = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.fillStyle = "#DED895";
    ctx.fillRect(0, 0, w, h);
    // grass stripe
    const stripeH = 8;
    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = 16;
    patternCanvas.height = stripeH;
    const pctx = patternCanvas.getContext("2d")!;
    pctx.fillStyle = "#5EE270";
    pctx.fillRect(0, 0, 8, stripeH);
    pctx.fillStyle = "#4BC850";
    pctx.fillRect(8, 0, 8, stripeH);
    const pattern = ctx.createPattern(patternCanvas, "repeat")!;
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, w, stripeH);
  };

  const drawBird = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    anim: "fly" | "celebrate",
    flyFrame: number
  ) => {
    const img = imgRef.current;
    const target = 48; // on-canvas size of the bird

    if (img && img.complete && img.naturalHeight !== 0) {
      // Use SVG bird image
      ctx.save();

      // Add subtle bounce animation when flying
      const bounce = anim === "fly" ? Math.sin(flyFrame * 0.8) * 2 : 0;
      const scale =
        anim === "celebrate" ? 1.1 + Math.sin(flyFrame * 0.5) * 0.1 : 1;

      ctx.translate(x, y + bounce);
      ctx.scale(scale, scale);
      ctx.imageSmoothingEnabled = true;

      // Draw the SVG bird
      ctx.drawImage(img, -target / 2, -target / 2, target, target);

      ctx.restore();
    } else {
      // Fallback: draw a simple bird shape
      const size = 24;
      ctx.save();

      // Bird body (circle)
      ctx.fillStyle = anim === "celebrate" ? "#FFD700" : "#FF6B35";
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.fill();

      // Bird outline
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Wing (animated flap)
      const wingOffset = Math.sin(flyFrame * 0.5) * 3;
      ctx.fillStyle = anim === "celebrate" ? "#FFA500" : "#FF4500";
      ctx.beginPath();
      ctx.ellipse(x - 4, y + wingOffset, 8, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Eye
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(x + 4, y - 4, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Pupil
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(x + 5, y - 4, 2, 0, Math.PI * 2);
      ctx.fill();

      // Beak
      ctx.fillStyle = "#FFA500";
      ctx.beginPath();
      ctx.moveTo(x + size / 2 - 2, y);
      ctx.lineTo(x + size / 2 + 8, y - 2);
      ctx.lineTo(x + size / 2 + 8, y + 2);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    }
  };

  const drawScore = (ctx: CanvasRenderingContext2D, score: number) => {
    ctx.font = "bold 48px Impact, Arial Black, sans-serif";
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 6;
    ctx.textAlign = "center";
    ctx.strokeText(String(score), GAME_W / 2, 70);
    ctx.fillText(String(score), GAME_W / 2, 70);
  };

  const drawCenterText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    size: number
  ) => {
    ctx.font = `bold ${size}px Impact, Arial Black, sans-serif`;
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 8;
    ctx.textAlign = "center";
    ctx.strokeText(text, GAME_W / 2, GAME_H / 2 - 40);
    ctx.fillText(text, GAME_W / 2, GAME_H / 2 - 40);
  };

  const drawSubText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    size: number,
    offset = 0,
    color = "#fff"
  ) => {
    ctx.font = `bold ${size}px Arial, sans-serif`;
    ctx.fillStyle = color;
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 4;
    ctx.textAlign = "center";
    ctx.strokeText(text, GAME_W / 2, GAME_H / 2 + offset);
    ctx.fillText(text, GAME_W / 2, GAME_H / 2 + offset);
  };

  const drawBoard = (
    ctx: CanvasRenderingContext2D,
    score: number,
    best: number,
    money: number
  ) => {
    const w = 260;
    const h = 160;
    const x = GAME_W / 2 - w / 2;
    const y = GAME_H / 2 - h / 2 + 14;
    ctx.fillStyle = "#FFE082";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 6;
    roundRect(ctx, x, y, w, h, 14, true, true);
    ctx.fillStyle = "#000";
    ctx.font = "bold 18px Arial";
    ctx.fillText("Score", x + 60, y + 36);
    ctx.font = "bold 28px Arial";
    ctx.fillText(String(score), x + 60, y + 68);
    ctx.font = "bold 18px Arial";
    ctx.fillText("Best", x + w - 60, y + 36);
    ctx.font = "bold 28px Arial";
    ctx.fillText(String(best), x + w - 60, y + 68);
    ctx.fillStyle = "#0a7b33";
    ctx.font = "bold 18px Arial";
    ctx.fillText("Money", x + w / 2, y + 106);
    ctx.font = "bold 26px Arial";
    ctx.fillText(`$${money}`, x + w / 2, y + 136);
  };

  const roundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    fill: boolean,
    stroke: boolean
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  };

  // utils
  const rand = (a: number, b: number) => a + Math.random() * (b - a);

  return (
    <div className="flex flex-col items-center gap-2">
      <canvas
        ref={canvasRef}
        width={GAME_W}
        height={GAME_H}
        style={{
          width: GAME_W,
          height: GAME_H,
          borderRadius: 12,
          background: "#000",
          cursor: "pointer",
          display: "block",
        }}
        onClick={() => {
          const s = stateRef.current;
          if (s.mode === "dead") reset();
        }}
      />
    </div>
  );
}
