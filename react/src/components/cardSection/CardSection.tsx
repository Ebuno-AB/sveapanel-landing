import React from "react";
import "./CardSection.css";

interface CardSectionProps {
  title: string;
  description: string;
  backgroundImage?: string;
}

const CardSection: React.FC<CardSectionProps> = ({
  title = "",
  description = "",
  backgroundImage = null,
}) => {
  return (
    <div className="card-section">
      <h4 className="card-section-title">{title}</h4>
      <div
        className="card-section-placeholder"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
      <p className="card-section-description">{description}</p>
    </div>
  );
};

export default CardSection;
