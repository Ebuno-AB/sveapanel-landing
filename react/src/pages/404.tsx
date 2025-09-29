import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        minHeight: "100vh",
        width: "100vw",
        zIndex: 9999,
        overflow: "hidden",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Decorative SVG Blob */}
      <svg
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "60vw",
          height: "60vw",
          zIndex: 0,
          opacity: 0.18,
        }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#blur)">
          <path
            fill="#fff"
            d="M300,80Q370,120,400,200Q430,280,370,350Q310,420,220,400Q130,380,120,290Q110,200,200,140Q290,80,300,80Z"
          />
        </g>
        <defs>
          <filter id="blur">
            <feGaussianBlur stdDeviation="40" />
          </filter>
        </defs>
      </svg>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "rgba(255,255,255,0.18)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
          borderRadius: "2rem",
          padding: "3rem 2.5rem 2.5rem 2.5rem",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 420,
          width: "90vw",
        }}
      >
        <h1
          style={{
            fontSize: "7rem",
            fontWeight: 900,
            margin: 0,
            letterSpacing: "-0.05em",
            textShadow: "0 8px 32px rgba(44,62,80,0.18)",
            color: "#6a5ae0",
            lineHeight: 1,
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontSize: "2.1rem",
            fontWeight: 700,
            margin: "1rem 0 0.5rem 0",
            color: "#222",
          }}
        >
          Sidan kunde inte hittas
        </h2>
        <p
          style={{
            fontSize: "1.15rem",
            marginBottom: "2.2rem",
            color: "#3b3b3b",
            fontWeight: 400,
          }}
        >
          Oops! Sidan du letar efter finns inte eller har flyttats.
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "#6a5ae0",
            color: "#fff",
            border: "none",
            borderRadius: "1.5rem",
            padding: "0.85rem 2.7rem",
            fontWeight: 700,
            fontSize: "1.15rem",
            boxShadow: "0 2px 12px 0 rgba(44, 62, 80, 0.10)",
            cursor: "pointer",
            transition: "all 0.2s",
            outline: "none",
          }}
        >
          Till startsidan
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
