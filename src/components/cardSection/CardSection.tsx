import React from 'react';
import './CardSection.css';

interface CardSectionProps {
  title: string;
  description: string;
}

const CardSection: React.FC<CardSectionProps> = ({ 
  title = "", 
  description = "" 
}) => {
  return (
    <div className="card-section">
      <h3 className="card-section-title">
        {title}
      </h3>
      <div className="card-section-placeholder"></div>
      <p className="card-section-description">
        {description}
      </p>
    </div>
  );
};

export default CardSection;
