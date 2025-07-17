import '../App.css';
import React, { useState, useEffect } from 'react';
import globeImage from '../assets/image.png';
import logoImage from '../assets/logo.png';
import appleImage from '../assets/apple.svg';
import googleImage from '../assets/google.svg';
import bankIdImage from '../assets/bankId.svg';
import personalFormImage from '../assets/personal_form.svg';
import moneyImage from '../assets/money.svg';
import mobileImage from '../assets/mobile.svg';
import candyCrush from '../assets/candyCrush.svg';
import Footer from '../components/footer';
import Game from '../assets/game.png';
import mistplay1 from '../assets/mistplay-img1.png';
import earn from '../assets/earn.png';
import reward from '../assets/reward.png';
const placeholderSvg =
  'data:image/svg+xml;utf8,<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="%23eafff4"/><text x="50%" y="50%" text-anchor="middle" fill="%235ecb8b" font-size="18" font-family="Arial" dy=".3em">Bild</text></svg>';
  import Spline from '@splinetool/react-spline';


       
function Landing() {
  const images = [globeImage, bankIdImage, personalFormImage];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 400); // match fade-out duration
    }, 3000);
    return () => clearInterval(interval);
  }, []);  

  return (
    <>
      <div className="">
        <header className="landing-header">
          <div className="logo-container">
            <img src={logoImage} alt="Sveapanelen logo" className="logo-img" />
          </div>
          <nav className="nav">
            <a href="#services" className="nav-link">Tjänster</a>
            <button className="appointment-btn" aria-label="Boka ett möte">Registrera dig</button>
          </nav>
        </header>
       
 
  
        {/* Centered container for the hero section */}
        <section className="custom-hero fade-in">
          <div className="custom-hero-content">
            {/* Left: Text */}
            <div className="custom-hero-left">
              <span className="custom-welcome">Välkommen till</span>
              <h1 className="custom-title">Betalda undersökningar<br/>Som du kan lita på</h1>
              <p className="custom-desc">Vi är ett företag som hjälper dig att tjäna pengar på att svara på enkäter!</p>
              <div className="custom-app-buttons">
                <button className="custom-app-btn google">
                  <img src={googleImage} alt="Google" />
                  Google Play
                </button>
                <button className="custom-app-btn apple">
                  <img src={appleImage} alt="Apple" />
                  App Store
                </button>
              </div>
            </div>
            {/* Right: Phone mockup and cards */}
            <div className="custom-hero-right">
              <div className="custom-phone-stack">
                {/* Animated carousel for images */}
                {(() => {
                  const images = [mobileImage, globeImage];
                  const [index, setIndex] = React.useState(0);
                  const [fade, setFade] = React.useState(true);
                  React.useEffect(() => {
                    const interval = setInterval(() => {
                      setFade(false);
                      setTimeout(() => {
                        setIndex((prev) => (prev + 1) % images.length);  
                        setFade(true);
                      }, 600); // match fade-out duration
                    }, 5000);
                    return () => clearInterval(interval);
                  }, []);
                  return (
                    <img
                      src={images[index]}
                      alt="mobileImage"
                      className={`fade-image ${fade ? 'fade-in' : 'fade-out'}`}
                    />
                  );
                })()}
                {/* <img src={candyCrush} alt="Card1" className="custom-card card1" />
                <img src={candyCrush} alt="Card2" className="custom-card card2" />
                <img src={candyCrush} alt="Card3" className="custom-card card3" /> */}
              </div>
            </div>
          </div>
        </section>
      
      </div>
      {/* Services Section - now outside landing-root for white background */}
      <div className="services-section">

        <h2 className="services-heading">Tjäna pengar med <br/> <span className="text-black">SveaPanelen</span></h2>
        <p className="services-subheading">Med tre enkla steg kan du tjäna pengar på att svara på enkäter!</p>
       
     
       <div className="cards-container">
          <div className="card">
            <img src={mistplay1} alt="Game" className="card-img" />
            <div className="card-text">Spela och tjäna poäng!</div>
          </div>
          <div className="card">
            <img src={earn} alt="Game" className="card-img" />
            <div className="card-text">Upptäck nya spel!</div>
          </div>
          <div className="card">
            <img src={reward} alt="Game" className="card-img" />
            <div className="card-text">Få belöningar direkt!</div>
          </div>
        </div>

       
   
        <div className="spline-container"> 
          <img src={Game} alt="Game" className="spline-img" />
          <p className="spline-text">Vi är ett företag som hjälper dig att tjäna pengar på att svara på enkäter!</p>
        </div>

          {/* <Spline
        scene="https://prod.spline.design/4xYMX4Uy35mxFbhh/scene.splinecode" 
      /> */}
   
        

        {/* ABOUT FORM */}

        {/* <div className="about-form">
          <h2 className="about-form-title">Vad är betalda undersökningar?</h2>
          <p className="about-form-desc">Vi är ett företag som hjälper dig att tjäna pengar på att svara på enkäter!</p>
         

          <div className="info-container">
            <div className="info-card">
              <h3 className="info-title">Vad brukar belöningarna ligga på?</h3>
              <h3 className="info-desc"> Belöningarna brukar ligga runt 1-50kr per enkät.</h3>
            </div>
            <div className="info-card">
              <h3 className="info-title">Hur långa är de?</h3>
              <h3 className="info-desc"> Undersökningarna är från 1-25 minuter långa.</h3>
            </div>
            <div className="info-card">
              <h3 className="info-title">Hur får jag pengarna?</h3>
              <h3 className="info-desc"> Du får pengar direkt via Swish, utan uttagsgränser.</h3>
            </div>
          </div>
          <button className="about-form-btn">Läs mer</button>
        </div> */}

        {/* PROOF */}
        {/* <div className="proof-container">
          <h2 className="proof-title">Vi har betalat ut mer än 100 000kr till våra användare!</h2>
          <p className="proof-desc">Vi är ett företag som hjälper dig att tjäna pengar på att svara på enkäter!</p>
        </div> */}

        <div className='about-form-container'>

          
        </div>

      </div>
      <Footer />
    </>
  );
}

export default Landing; 