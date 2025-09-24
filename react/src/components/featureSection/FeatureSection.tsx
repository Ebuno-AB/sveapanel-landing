import React from "react";
import "./FeatureSection.css";

interface FeatureSectionProps {
  background: string;
  title: string;
  description: string;
  backgroundImage?: string;
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  img?: string;
  carousel?: React.ReactNode;
  style?: React.CSSProperties;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  background,
  title,
  description,
  backgroundImage,
  image,
  imageAlt = "",
  children,
  className = "",
  interactive = false,
  carousel, 
}) => {
  // Check if we have content to display
  const hasContent = title || description;

  return (
    <div className={`feature-section ${className}`} style={{ background }}>
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          className="feature-section-bg-image"
        />
      )}

      <div
        className={`feature-section-container ${
          !hasContent && interactive ? "full-width" : ""
        }`}
      >
        {/* Left side - Text content */}
        {hasContent && (
          <div className="feature-section-content">
            <h2 className="feature-section-title">{title}</h2>
            <p className="feature-section-description">{description}</p>

            {carousel && (
              <div className="feature-section-carousel">{carousel}</div>
            )}
          </div>
        )}

        {/* Right side - Visual / Children */}
        {image ? (
          <div className="feature-section-visual">
            <img src={image} alt={imageAlt} className="feature-section-image" />
          </div>
        ) : children && !interactive ? (
          <div className="feature-section-cards">{children}</div>
        ) : null}

        {interactive && (
          <div className="feature-section-interactive">{children}</div>
        )}
      </div>
    </div>
  );
};

export default FeatureSection;
