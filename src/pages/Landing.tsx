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
const placeholderSvg =
  'data:image/svg+xml;utf8,<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="%23eafff4"/><text x="50%" y="50%" text-anchor="middle" fill="%235ecb8b" font-size="18" font-family="Arial" dy=".3em">Bild</text></svg>';

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

        {/* centered container  */}
        <section className="custom-hero fade-in">
          <div className="custom-hero-content">
            {/* Left: Text */}
            <div className="custom-hero-left">
              <span className="custom-welcome">Välkommen till</span>
              <h1 className="custom-title">Betalda undersökningar<br/>Som du kan lita på</h1>
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
       
        <div className="services-cards">
          <div className="service-card">
      
            <img src={bankIdImage} alt="" className="service-img" />
            <div className="service-content">
              <h3 className="service-title">1. Registrera dig med BankID</h3>
              <p className="service-desc">SveaPanelen har avtal med Nordea så att vi kan låta våra användare registrera sig med BankID, snabbt och säkert.</p>

            </div>
          </div>
          <div className="service-card">
         
            <img src={personalFormImage} alt="" className="form-img" />
            <div className="service-content">
              <h3 className="service-title">2. Svara på några frågor</h3>
              <p className="service-desc">Du behöver bara svara på några enstaka frågor om dig själv så vi kan hitta matchande undersökningar!</p>

            </div>
          </div>
          <div className="service-card">
           
            <img src={moneyImage} alt="" className="swish-img" />
            <div className="service-content">
              <h3 className="service-title">3. Svara på enkäter & få betalt!</h3>
              <p className="service-desc">Vårt system hittar automatiskt undersökningar som du kan göra, sedan får du betalt och kan ta ut via Swish!</p>
   
            </div>
          </div>
        </div>

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

        <div className="proof-container">
          <h2 className="proof-title">Vi har betalat ut mer än 100 000kr till våra användare!</h2>
          <p className="proof-desc">Vi är ett företag som hjälper dig att tjäna pengar på att svara på enkäter!</p>
        </div>

        <div className='about-form-container'>

          
        </div>

      </div>
      <Footer />
    </>
  );
}

export default Landing; 