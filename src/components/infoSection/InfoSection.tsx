import React from 'react';
import './InfoSection.css';
import CardSection from '../cardSection/CardSection';

const InfoSection: React.FC = () => {
  return (
    <div className="info-section">
      <h2 className="info-section-title">
        Tre enkla steg till att tjäna pengar
      </h2>

      <div className="info-section-cards">
        <CardSection
          title="Svara på enkäter"
          description="Hjälp företag och myndigheter genom att dela din åsikt"
        />
        <CardSection
          title="Bjud in vänner"
          description="Få bonusar när du tipsar andra om tjänsten"
        />
        <CardSection
          title="Tjäna pengar"
          description="Lös uppgifter och se dina belöningar växa"
        />
      </div>
    </div>
  );
};

export default InfoSection;
