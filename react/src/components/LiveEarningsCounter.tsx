import React, { useState, useEffect } from 'react';


interface LiveEarningsCounterProps {
  className?: string;
}

const LiveEarningsCounter: React.FC<LiveEarningsCounterProps> = ({ className = '' }) => {
  const [totalEarnings, setTotalEarnings] = useState(2047563);
  const [todayEarnings, setTodayEarnings] = useState(1247);
  const [activeUsers, setActiveUsers] = useState(2847);
  const [surveysCompleted, setSurveysCompleted] = useState(15689);

  useEffect(() => {
    // Simulate live updates every 30 seconds
    const interval = setInterval(() => {
      // Random small increments to simulate live activity
      setTotalEarnings(prev => prev + Math.floor(Math.random() * 50) + 10);
      setTodayEarnings(prev => prev + Math.floor(Math.random() * 20) + 5);
      setActiveUsers(prev => prev + Math.floor(Math.random() * 10) + 1);
      setSurveysCompleted(prev => prev + Math.floor(Math.random() * 30) + 5);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString('sv-SE');
  };

  const formatCurrency = (num: number) => {
    return num.toLocaleString('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  return (
    
    <div className={`live-earnings-counter ${className}`}>

     
      <div className="counter-grid">
        
        <div className="counter-item">

          <div className="counter-value">{formatCurrency(totalEarnings)}</div>
          <div className="counter-label">Totalt utbetalt till användare</div>
        </div>
        
        <div className="counter-item">
 
          <div className="counter-value">{formatCurrency(todayEarnings)}</div>
          <div className="counter-label">Utbetalt idag</div>
        </div>
        
        <div className="counter-item">
        
          <div className="counter-value">{formatNumber(activeUsers)}</div>
          <div className="counter-label">Aktiva användare</div>
        </div>
        
        <div className="counter-item">
  
          <div className="counter-value">{formatNumber(surveysCompleted)}</div>
          <div className="counter-label">Enkäter slutförda</div>
        </div>
      </div>
    </div>
  );
};

export default LiveEarningsCounter; 