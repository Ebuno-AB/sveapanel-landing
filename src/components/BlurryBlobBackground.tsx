import { motion } from "framer-motion";

export default function MovingBlurryBlobsBare() {
  return (
    <div
      style={{
        position: "absolute",
        isolation: "isolate", // keeps mix-blend-mode stable
        pointerEvents: "none",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        borderRadius: 0,
        backgroundColor: "#7dd3fc",
      }}
    >
      {/* Base gradient so blobs have something to blend with */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(1200px 600px at 10% 20%, #4273b0ff 0%, transparent 60%), radial-gradient(900px 500px at 90% 80%, #23936aff 0%, transparent 60%), radial-gradient(800px 800px at 50% 120%, #ae4f80ff 0%, #6b58a2ff 40%)",
        }}
      />

      {/* Blobs */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          mixBlendMode: "screen",
        }}
      >
        <AnimatedBlob
          size={900}
          colorA="black"
          colorB="red"
          initial={{ x: -300, y: 150, scale: 1.0 }}
          animate={{ x: 350, y: 0, scale: 1.15 }}
          duration={26}
        />
        <AnimatedBlob
          size={800}
          colorA="#123456"
          colorB="#456789"
          initial={{ x: 500, y: 300, scale: 1.0 }}
          animate={{ x: 50, y: -120, scale: 1.2 }}
          duration={32}
          delay={-4}
        />
        <AnimatedBlob
          size={950}
          colorA="#000"
          colorB="#888"
          initial={{ x: -200, y: 450, scale: 1.1 }}
          animate={{ x: 600, y: 380, scale: 0.95 }}
          duration={38}
          delay={-8}
        />
      </div>

      {/* Optional grain to hide banding */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.015,
          backgroundImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(
            grain
          )}')`,
        }}
      />
    </div>
  );
}

function AnimatedBlob({
  size = 800,
  colorA = "#700270ff",
  colorB = "#018989ff",
  initial,
  animate,
  duration = 30,
  delay = 0,
}: {
  size?: number;
  colorA?: string;
  colorB?: string;
  initial?: any;
  animate?: any;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={initial}
      animate={{
        ...animate,
        transition: {
          repeat: Infinity,
          repeatType: "mirror",
          ease: [0.6, 0.05, 0.2, 0.95],
          duration,
          delay,
        },
      }}
      style={{
        position: "absolute",
        width: size,
        height: size,
        willChange: "transform",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "9999px",
          background: `radial-gradient(circle at 30% 30%, ${colorA} 0%, ${colorB} 45%, transparent 60%)`,
          // heavy blur
          filter: "blur(50px)",
          opacity: 0.7,
        }}
      />
    </motion.div>
  );
}

const grain = `
<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'>
  <filter id='noise'>
    <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch' />
    <feColorMatrix type='saturate' values='0' />
  </filter>
  <rect width='128' height='128' filter='url(%23noise)'/>
</svg>`;
