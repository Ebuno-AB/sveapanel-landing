import candyCrushImg from "@/src/public/assets/games/candyCrush.png";
import monopolyImg from "@/src/public/assets/games/monopoly.png";
import pigGameImg from "@/src/public/assets/games/pigGame.png";
import tontongGameImg from "@/src/public/assets/games/tontongGame.png";
import { useEffect, useState } from "react";

const Carousel = () => {
  const itemWidth = 160; // desktop image width
  const itemWidthCompact = 120; // image width for compact view
  const itemPadding = 6 * 2; // padding left + right
  const gap = 20;
  const numItems = 4;

  // Responsive width state
  const [currentItemWidth, setCurrentItemWidth] = useState(itemWidth);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 700) {
        setCurrentItemWidth(itemWidthCompact);
      } else {
        setCurrentItemWidth(itemWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalItemWidth = currentItemWidth + itemPadding + gap;
  const singleSetWidth = numItems * totalItemWidth - gap;
  const isCompact = typeof window !== "undefined" && window.innerWidth <= 1200;

  return (
    <div className="carousel-strip">
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100vw",
          maxWidth: "600px",
          marginLeft: "25px",
          margin: "40px auto 60px",
          marginBottom: isCompact ? "-0px" : undefined,
          maskImage:
            "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            width: `${singleSetWidth * 2}px`,
            animation: "preciseMarquee 18s linear infinite",
            transform: "translateZ(0)",
          }}
        >
          {[
            candyCrushImg,
            monopolyImg,
            pigGameImg,
            tontongGameImg,
          ]
            .concat([
            candyCrushImg,
            monopolyImg,
            pigGameImg,
            tontongGameImg,
            ])
            .map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Game icon"
                draggable={false}
                style={{
                  flex: "0 0 auto",
                  width: `${currentItemWidth}px`,
                  height: `${currentItemWidth}px`,
                  objectFit: "contain",
                  borderRadius: "20px",
                  padding: `${itemPadding / 2}px`,
                  imageRendering: "auto",
                  userSelect: "none",
                }}
              />
            ))}
        </div>
        <style>
          {`
            @keyframes preciseMarquee {
              0% { 
                transform: translateX(0) translateZ(0); 
              }
              100% { 
                transform: translateX(-${singleSetWidth + 20}px) translateZ(0); 
              }
            }
            @media (prefers-reduced-motion: reduce) {
              .carousel-strip * {
                animation: none !important;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Carousel;