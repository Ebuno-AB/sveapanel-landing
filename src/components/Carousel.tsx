
const Carousel = () => {
  // Calculate exact dimensions for perfect loop
  const itemWidth = 160; // image width
  const itemPadding = 6 * 2; // padding left + right
  const gap = 20;
  const totalItemWidth = itemWidth + itemPadding + gap;
  const numItems = 4;
  const singleSetWidth = numItems * totalItemWidth - gap; // minus gap after last item
  
  return (
    <div className="carousel-strip">
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100vw",
          maxWidth: "600px",
          marginLeft: "-5rem",
          margin: "40px auto 60px",
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
            // Use calculated width for precise positioning
            width: `${singleSetWidth * 2}px`,
            animation: "preciseMarquee 10s linear infinite",
            transform: "translateZ(0)",
          }}
        >
          {[
            "/assets/games/candyCrush.png",
            "/assets/games/monopoly.png", 
            "/assets/games/pigGame.png",
            "/assets/games/tontongGame.png",
          ]
            .concat([
              "/assets/games/candyCrush.png",
              "/assets/games/monopoly.png",
              "/assets/games/pigGame.png", 
              "/assets/games/tontongGame.png",
            ])
            .map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Game icon"
                draggable={false}
                style={{
                  flex: "0 0 auto",
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`, 
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
                transform: translateX(-${singleSetWidth +20}px) translateZ(0); 
              }
            }
            
            /* Accessibility */
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