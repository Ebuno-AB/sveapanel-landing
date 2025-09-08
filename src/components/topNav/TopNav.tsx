
import './TopNav.css';
import React from 'react';

interface TopNavProps {
  handleAppDownload: () => void;
}

const TopNav: React.FC<TopNavProps> = ({ handleAppDownload }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

 return (
    <nav className="modern-topnav">
      <div className="topnav-container">
        {/* Logo */}
        <div className="topnav-logo">
          <img
            src="/logo.png"
            alt="SveaPanelen logo"
            className="topnav-logo-img"
          />
          <span className="topnav-brand">SveaPanelen</span>
        </div>
        
        {/* Navigation Links */}
        <div className="topnav-links">
          <button 
            className="topnav-link"
            onClick={() => scrollToSection('about-section')}
          >
            Om oss
          </button>
          <button 
            className="topnav-link"
            onClick={() => scrollToSection('faq-section')}
          >
            Vanliga frågor
          </button>
            <button 
            className="topnav-link"
            onClick={() => scrollToSection('footer')}
            >
            Kontakt
            </button>
    
        </div>
      </div>
    </nav>
  );
  };

  export default TopNav;