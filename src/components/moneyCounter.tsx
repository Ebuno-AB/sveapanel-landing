import React from "react";

interface SimpleCircularProgressProps {
  value?: number;
  maxValue?: number;
  size?: number;
  strokeWidth?: number;
}

const SimpleCircularProgress: React.FC<SimpleCircularProgressProps> = ({
  value = 0,
  maxValue = 100,
  size = 85,        // total SVG width/height in px
  strokeWidth = 12,  // thickness of the ring
}) => {
  const clamped = Math.max(0, Math.min(value, maxValue));
  const pct = clamped / maxValue;

  const radius = size / 2;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - pct * circumference;

  // Font size scales with the component size
  const fontSize = Math.max(10, Math.round(size * 0.23));

  return (
    <div className="">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`Progress ${Math.round(pct * 89)}%`}
      >
        {/* background ring */}
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          stroke="#f9f9f9ff"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* progress ring — rotated around center so 0% starts at 12 o'clock */}
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          stroke="#10b981"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${radius} ${radius})`}
          style={{ transition: "stroke-dashoffset 500ms ease" }}
        />

        {/* center text inside the SVG — always centered */}
        <text
          x={radius}
          y={radius}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: `${fontSize}px`,
            fontWeight: 600,
            fill: "#ebe8e8ff",
            userSelect: "none",
          }}
        >
          {clamped}kr
        </text>
      </svg>
    </div>
  );
};

export default SimpleCircularProgress;
