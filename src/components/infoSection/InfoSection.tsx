import React from 'react';
import './InfoSection.css';
import CardSection from '../cardSection/CardSection';

const InfoSection: React.FC = () => {
  return (
    <div className="info-section">
      <h2 style={{ color: "white", marginTop: "3rem"}}>
        Tre enkla steg till att tjäna pengar
      </h2>

      <div className="info-section-cards">
       <CardSection
        title="Spela mobilspel"
        description="Spela och samla poäng – belöningarna tickar in medan du spelar."
      />
      <CardSection
        title="Svara på enkäter"
        description="Korta enkäter anpassade för dig. Få poäng för varje svar och extra bonus när du tipsar en vän."
      />
      <CardSection
        title="Tjäna pengar"
        description="Lös uppgifter, klara mål och se saldot växa."
      />

      </div>
    </div>
  );
};

export default InfoSection;
