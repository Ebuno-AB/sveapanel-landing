import React, { useEffect, useRef, useState } from "react";
import FlappySound from "/react/public/assets/flappySound.mp3"
import LosingSound from "/react/public/assets/losingSound.mp3"
/**
 * -------- Bird Image Config --------
 */
const Bird_Img = "/react/public/assets/sveaBird.png";


/**
 * -------- Game tuning --------
 */
// Base dimensions - optimized for mobile iPhone frame
let GAME_W = 800; // Much larger canvas for more zoomed in appearance
let GAME_H = 1000; // Even taller for better mobile experience
let GROUND_H = 150; // Proportionally larger ground for taller canvas
let VIEW_H = GAME_H - GROUND_H;

// Game constants that will be calculated based on screen size - scaled for 1000px height
let GRAVITY = 1000; // Increased gravity for more responsive feel like original
let JUMP_VELOCITY = -380; // Adjusted jump velocity for better feel
const MAX_DROP_ANGLE = 20; // Increased maximum drop angle like original
const MAX_RISE_ANGLE = -20; // Reduced maximum rise angle
let PIPE_W = 100; // Wider pipes for proportional look
let PIPE_GAP_MIN = 280; // Much larger gaps for taller canvas
let PIPE_GAP_MAX = 340;
let PIPE_HOLE_MIN = 120; // Larger margins for taller canvas
let PIPE_HOLE_MAX = VIEW_H - 120;
let PIPE_SPAWN_DIST = 500; // More spacing for taller canvas
let PIPE_SPEED_BASE = 300; // Faster speed to match taller proportions
let HITBOX_R = 25; // Larger hitbox for scaled elements



function FlappyBirdCanvas({
  onPointGained = () => {},
}: {
  onPointGained: () => void;
}) {

  const soundRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    soundRef.current = new Audio(FlappySound);
  }, []);

  const losingSoundRef = useRef<HTMLAudioElement | null>(null);
useEffect(() => {
  soundRef.current = new Audio(FlappySound);
  losingSoundRef.current = new Audio(LosingSound);
}, []);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: GAME_W, height: GAME_H, displaySize: 500, displayWidth: 1400 });

  // Calculate dimensions to fit within iPhone frame screen area
  const calculateDimensions = () => {
    // Dimensions optimized for iPhone screen area
    // Use a mobile-friendly aspect ratio that fits the phone screen
    const gameWidth = 600;  // Much larger canvas for more zoomed in appearance
    const gameHeight = 900; // Even taller for better mobile experience
    
    // Display dimensions that will be scaled by CSS
    const displayWidth = gameWidth;
    const displayHeight = gameHeight;

    // Update global constants - optimized for mobile frame
    GAME_W = gameWidth;
    GAME_H = gameHeight;
    GROUND_H = GAME_H * 0.15; // 15% of height for ground for better proportions
    VIEW_H = GAME_H - GROUND_H;
    
    // Scale game physics and elements for mobile - more zoomed in feel
    GRAVITY = 1400; // Adjusted for more authentic feel
    JUMP_VELOCITY = -460; // Stronger jump for better control
    PIPE_W = 130; // Wider pipes for better proportions
    PIPE_GAP_MIN = 300; // Much larger gaps for taller canvas
    PIPE_GAP_MAX = 350;
    PIPE_HOLE_MIN = 120; // Larger margins for better spacing
    PIPE_HOLE_MAX = VIEW_H - 120;
    PIPE_SPAWN_DIST = 340; // More spacing for taller canvas
    PIPE_SPEED_BASE = 220; // Faster speed to match proportions
    HITBOX_R = 25; // Larger hitbox for scaled elements
    
    return { width: GAME_W, height: GAME_H, displaySize: displayHeight, displayWidth };
  };

  // persistent game state
  const stateRef = useRef<{
    birdX: number;
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
    birdY: VIEW_H * 0.35,
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
    birdX: GAME_W * 0.2, // Bird starts at 20% from left edge and stays there
  });

  // helpers
  const reset = () => {
    const s = stateRef.current;
    s.mode = "waiting";
    s.t = 0;
    s.birdY = VIEW_H * 0.32;
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
    s.birdX = GAME_W * 0.2; // Reset bird position
  };

  const startGame = () => {
    const s = stateRef.current;
    if (s.mode === "waiting") {
      s.mode = "playing";
    } else if (s.mode === "dead") {
      // restart
      reset();
      stateRef.current.mode = "playing";
    }
  };

  const jump = () => {
    const s = stateRef.current;
    if (s.mode === "waiting" || s.mode === "dead") {
      startGame();
    }
    if (s.mode === "playing") {
      s.birdVY = JUMP_VELOCITY;
      // Removed horizontal movement - bird stays at fixed X position like original
    }
  };

  // controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        jump();
      } else if (e.code === "Tab") {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Responsive resize effect
  useEffect(() => {
    const handleResize = () => {
      const newDimensions = calculateDimensions();
      setDimensions(newDimensions);
    };

    // Set initial dimensions
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // asset load
  useEffect(() => {
    const img = new Image();
    img.src = Bird_Img;

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
  }, [dimensions]);

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
      
      // More authentic angle calculation like original Flappy Bird
      // Angle responds more dramatically to velocity changes
      const velocityFactor = s.birdVY / 400;
      if (s.birdVY < 0) {
        // Rising - slight upward angle
        s.angle = Math.max(MAX_RISE_ANGLE, velocityFactor * 15);
      } else {
        // Falling - increasing downward angle
        s.angle = Math.min(MAX_DROP_ANGLE, velocityFactor * 90);
      }

      // spawn pipes
      s.spawnAccumulator += speed * dt;
      while (s.spawnAccumulator >= PIPE_SPAWN_DIST) {
        s.spawnAccumulator -= PIPE_SPAWN_DIST;
              const gap = rand(PIPE_GAP_MIN, PIPE_GAP_MAX);
      // Pick a center for the gap, not just a top
      const minCenter = PIPE_HOLE_MIN + gap / 2;
      const maxCenter = PIPE_HOLE_MAX - gap / 2;
      const gapCenter = rand(minCenter, maxCenter);
      const hole = Math.max(PIPE_HOLE_MIN, Math.min(PIPE_HOLE_MAX - gap, gapCenter - gap / 2));
      s.pipes.push({
        x: GAME_W + 40,
        top: hole,
        gap,
        passed: false,
        id: Math.random(),
      });
      }

      // move pipes & scoring
      const birdX = s.birdX; // Use actual bird X position
      for (const p of s.pipes) {
        p.x -= speed * dt;
        if (!p.passed && p.x + PIPE_W < birdX) {
        p.passed = true;
        s.score += 1;
        s.money += 1;
        if(soundRef.current) {
          soundRef.current.currentTime = 0;
          soundRef.current.play();
        }
        // console.log("Bird passed through pipe - calling onPointGained()");
        onPointGained();
        s.shakeT = 0.15;
      }
      }
      // remove off-screen
      s.pipes = s.pipes.filter((p) => p.x > -PIPE_W - 10);

      // collisions (circle vs rects)
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
        s.shakeT = 0.35;
      }

      if (losingSoundRef.current) {
      losingSoundRef.current.currentTime = 0;
      losingSoundRef.current.play();
       }
    } else if (s.mode === "waiting") {
      // idle bob - more subtle like original
      s.birdY = VIEW_H * 0.6 + Math.sin(now * 0.003) * 6;
      s.angle = Math.sin(now * 0.003) * 2;
    } else if (s.mode === "dead") {
      s.parallaxX = 0;
    s.groundX = 0;
      // settle on ground - bird falls naturally with gravity
      if (s.birdY < VIEW_H - 1) {
        s.birdVY += GRAVITY * dt;
        s.birdY += s.birdVY * dt;
        // Keep updating angle as bird falls
        const velocityFactor = s.birdVY / 400;
        s.angle = Math.min(MAX_DROP_ANGLE, velocityFactor * 90);
      } else {
        
        s.birdY = VIEW_H - 1;
        s.birdVY = 0;
        s.angle = MAX_DROP_ANGLE; // Bird is flat on ground
      }
      
    }

    // Wing flap animation - faster when alive, slower when dead
    s.flyAcc += dt;
    const flyAdvance = s.mode === "dead" ? 1 / 4 : 1 / 6; // Slower flap when alive
    while (s.flyAcc >= flyAdvance) {
      s.flyAcc -= flyAdvance;
      s.flyFrame = (s.flyFrame + 1) % 3; // 3 frame cycle like original
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

    // distant clouds (parallax) - scaled for taller canvas with seamless loop
    ctx.globalAlpha = 0.6;
    const cloudSpeed = -s.parallaxX * 0.5;
    const cloudSpacing = 400; // Distance between cloud patterns
    const totalCloudWidth = cloudSpacing * 4; // Width of one complete cloud pattern

    // Calculate the base offset for seamless looping
    const baseOffset = cloudSpeed % totalCloudWidth;

    // Draw multiple sets of clouds to ensure seamless coverage
    for (let i = -1; i <= 2; i++) {
      const setOffset = baseOffset + (i * totalCloudWidth);
      drawCloud(ctx, setOffset + 50, 120, 80, 24);
      drawCloud(ctx, setOffset + 400, 200, 50, 16);
      drawCloud(ctx, setOffset + 750, 100, 80, 24);
      drawCloud(ctx, setOffset + 1100, 300, 60, 20);
    }
    ctx.globalAlpha = 1;

    // pipes
    for (const p of s.pipes) {
      drawPipe(ctx, p.x, 0, PIPE_W, p.top, true); // top pipe - cap at bottom
      drawPipe(ctx, p.x, p.top + p.gap, PIPE_W, VIEW_H - (p.top + p.gap), false); // bottom pipe - cap at top
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
    const bx = s.birdX + shakeX; // Use stored bird X position
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
        const fontSize = Math.max(12, GAME_W * 0.032);
        const offsetX = GAME_W * 0.052;
        const offsetY = GAME_H * 0.052;
        // ctx.font = `bold ${fontSize}px Impact, Arial Black, sans-serif`;
        ctx.fillStyle = "#FFD54A";
        ctx.strokeStyle = "#000";
        ctx.lineWidth = Math.max(2, GAME_W * 0.006);
        ctx.textAlign = "center";
        ctx.strokeText("+10kr", bx + offsetX, by - offsetY);
        ctx.fillText("+$10", bx + offsetX, by - offsetY);
      }
    }

    // overlays
    if (s.mode === "waiting") {

      drawCenterText(ctx, "Flappy Svea", 64);

      drawSubText(ctx, "Pröva spela!", 38, 64);
    } else if (s.mode === "dead") {
      
      drawCenterText(ctx, "Game Over", 58);
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
    h: number,
    isTopPipe: boolean = false
  ) => {
    // Shadow effect
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;

    // body
    const grad = ctx.createLinearGradient(x, y, x + w, y);
    grad.addColorStop(0, "#00CCA3");
    grad.addColorStop(1, "#4BC850");
    ctx.fillStyle = grad;
    ctx.strokeStyle = "#064e3b";
    ctx.lineWidth = 2;
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);

    // cap positioning
    let capY;
    if (isTopPipe) {
      // For top pipe, put cap at the bottom (y + h - 24)
      capY = y + h - 24;
    } else {
      // For bottom pipe, put cap at the top (y - 2)
      capY = y - 2;
    }

    ctx.fillRect(x - 4, capY, w + 8, 24);
    ctx.strokeRect(x - 4, capY, w + 8, 24);

    ctx.restore();
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

  const BIRD_WIDTH = GAME_W * 0.3; // Default width proportional to canvas size
  // Add a scaling factor for the bird's width
  const BIRD_WIDTH_SCALE = 1.5; // Scale the width by 1.5x
  const SPRITE_FRAMES = 3; // Number of frames in the spritesheet
  const BIRD_HEIGHT = GAME_H * 0.4; // Set a fixed bird height (e.g. 11% of canvas height)

  const drawBird = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    anim: "1" | "2" | "3",
    flyFrame: number
  ) => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalHeight !== 0) {
      ctx.save();

      const bounce = anim === "1" ? Math.sin(flyFrame * 2) * 1 : 0;
      const scale = anim === "2" ? 1.1 + Math.sin(flyFrame * 0.5) * 0.1 : 1;
        
          ctx.translate(x, y + bounce);
          ctx.scale(scale, scale);
          ctx.imageSmoothingEnabled = false;
    const frameWidth = img.width / SPRITE_FRAMES;
    const frameHeight = img.height;
    const frame = flyFrame % SPRITE_FRAMES;
    const aspect = frameWidth / frameHeight;
    const targetHeight = BIRD_HEIGHT;
    const targetWidth = BIRD_HEIGHT * aspect;

    // Crop a bit from the right of each frame
    const crop = 10; // pixels to crop from the right
    ctx.drawImage(
      img,
      frame * (frameWidth - crop), // sx
      0,                  // sy
      frameWidth - crop,  // sWidth
      frameHeight,        // sHeight
      -targetWidth / 2,   // dx
      -targetHeight / 2,  // dy
      targetWidth,        // dWidth
      targetHeight        // dHeight
    );

      ctx.restore();
    } else {
      // Fallback: draw a simple bird shape
      const size = GAME_W * 0.06; // Proportional fallback bird size
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

      // Wing (animated flap) - 3 frame animation like original
      const wingPositions = [-2, 0, 2];
      const wingOffset = wingPositions[flyFrame % 3];
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
  const fontSize = Math.max(32, GAME_W * 0.12); // Larger score font for zoomed-in feel
  ctx.font = `bold ${fontSize}px 'Cereal', sans-serif`;
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = Math.max(3, GAME_W * 0.012);
  ctx.textAlign = "center";
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.shadowBlur = 6;
  const yPos = GAME_H * 0.14; // 14% from top
  ctx.strokeText(String(score), GAME_W / 2, yPos);
  ctx.fillText(String(score), GAME_W / 2, yPos);
};

const drawCenterText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  baseFontSize: number
) => {
  const fontSize = Math.max(28, GAME_W * (baseFontSize / 400)); // Larger fonts for zoomed-in feel
  ctx.font = `bold ${fontSize}px 'Cereal', sans-serif`;
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = Math.max(4, GAME_W * 0.016);
  ctx.textAlign = "center";
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.shadowBlur = 6;
  ctx.strokeText(text, GAME_W / 2, GAME_H / 2 - GAME_H * 0.08);
  ctx.fillText(text, GAME_W / 2, GAME_H / 2 - GAME_H * 0.08);
};

const drawSubText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  baseFontSize: number,
  offset = 0,
  color = "#fff"
) => {
  const fontSize = Math.max(12, GAME_W * (baseFontSize / 500)); // Scale based on canvas size
  ctx.font = `bold ${fontSize}px 'Cereal', sans-serif`;
  ctx.fillStyle = color;
  ctx.strokeStyle = "#000";
  ctx.lineWidth = Math.max(2, GAME_W * 0.008);
  ctx.textAlign = "center";
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.shadowBlur = 6;
  const scaledOffset = GAME_H * (offset / 500); // Scale offset proportionally
  ctx.strokeText(text, GAME_W / 2, GAME_H / 2 + scaledOffset);
  ctx.fillText(text, GAME_W / 2, GAME_H / 2 + scaledOffset);
};
  // utils
  const rand = (a: number, b: number) => a + Math.random() * (b - a);

  const ignoreClickRef = useRef(false);

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center",
      width: "100%",
      height: "100%"
    }}>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "40px", // Match iPhone screen corners more precisely
          cursor: "pointer",
          display: "block",
          imageRendering: "pixelated", // Better for pixel art games
          objectFit: "fill", // Fill the entire container
        }}
        onClick={() => {
          if (ignoreClickRef.current) {
            ignoreClickRef.current = false;
            return;
          }
          jump();
          const s = stateRef.current;
          if (s.mode === "dead") reset();
        }}
        onTouchStart={() => {
          ignoreClickRef.current = true;
          setTimeout(() => { ignoreClickRef.current = false; }, 400);
          jump();
          const s = stateRef.current;
          if (s.mode === "dead") reset();
        }}
      />
    </div>
  );
}

export default React.memo(FlappyBirdCanvas);


