import React from "react";

export const ModernFeatureCard = ({
  icon,
  title,
  description,
  mockupContent,
}: {
  icon: string;
  title: string;
  description: string;
  mockupContent: React.ReactNode;
}) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "24px",
        padding: "24px",
        width: "320px",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 25px 50px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.1)";
      }}
    >
      {/* Header with icon and title */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "24px" }}>{icon}</span>
        <h3
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#1a1a1a",
            margin: "0",
            lineHeight: "1.2",
          }}
        >
          {title}
        </h3>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: "16px",
          color: "#666",
          lineHeight: "1.5",
          margin: "0",
          fontWeight: "400",
        }}
      >
        {description}
      </p>

      {/* Mockup content */}
      <div style={{ marginTop: "8px" }}>
        {mockupContent}
      </div>
    </div>
  );
};

// const FeatureCard = ({
//   title,
//   description,

// }: {
//   title: string;
//   description: string;

// }) => {
//   return (
//     <div
//       style={{
//         flex: "0 1 350px",
//         backgroundColor: "rgba(255, 255, 255, 0.95)",
//         borderRadius: 20,
//         padding: 40,
//         margin: "10px",
//         textAlign: "left",
//         boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
//         backdropFilter: "blur(10px)",
//         border: "1px solid rgba(255, 255, 255, 0.2)",
//         minHeight: "160px",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "flex-start",
//       }}
//     >
//       <div
//         style={{
//           fontSize: 32,
//           marginBottom: 20,
//         }}
//       >

//       </div>
//       <h3
//         style={{
//           color: "#333",
//           fontSize: 22,
//           fontWeight: "bold",
//           marginBottom: 15,
//           lineHeight: "1.3",
//         }}
//       >
//         {title}
//       </h3>
//       <p
//         style={{
//           color: "#666",
//           fontSize: 16,
//           lineHeight: "1.5",
//           opacity: 0.8,
//         }}
//       >
//         {description}
//       </p>
//     </div>
//   );
// };
