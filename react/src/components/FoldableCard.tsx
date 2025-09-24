import React, { useState } from 'react';

interface FoldableCardProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

const FoldableCard: React.FC<FoldableCardProps> = ({ 
  title, 
  children, 
  defaultOpen = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`foldable-card ${className} ${isOpen ? 'open' : ''}`}>
      <div className="foldable-card-header" onClick={toggleCard}>
        <h3 className="foldable-card-title">{title}</h3>
        <button 
          className={`foldable-card-toggle ${isOpen ? 'open' : ''}`}
          aria-label={isOpen ? 'Collapse card' : 'Expand card'}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none"
            className="toggle-icon"
          >
            <path 
              d="M5 7.5L10 12.5L15 7.5" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className={`foldable-card-content ${isOpen ? 'open' : ''}`}>
        <div className="foldable-card-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FoldableCard; 