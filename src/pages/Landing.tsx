import "../App.css";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import globeImage from "../assets/image.png";
import logoImage from "../assets/logo.png";
import appleImage from "../assets/apple.svg";
import googleImage from "../assets/google.svg";

import Footer from '../components/footer';
import mistplay1 from '../assets/mistplay-img1.png';
import earn from '../assets/earn.png';
import reward from '../assets/reward.png';

import gameCards from '../assets/features/gameCards.webp';
import rewards from '../assets/features/rewards.png';
import tokens from '../assets/features/tokens.png';
import consoles from '../assets/features/consoles.png';
import { Gamepad2, List, Gift, DollarSign} from 'lucide-react';
import FoldableCard from '../components/FoldableCard';
import QRModal from '../components/QRModal';


import ParticlesComponent from '../components/particlesComponent';
import LiveEarningsCounter from '../components/LiveEarningsCounter';
import RatingsSection from '../components/ratingsCompnent/RatingsSection';
import CookiesConsent from '../components/cookies/CookiesConsent';
import { useGA } from '../hooks/gtag';
import { useBankID } from '../hooks/useBankID';
import { isPhone, isSocialBrowser } from '../utils/browserDetection';



function Landing() {
  const { trackEvent } = useGA();
  
  const navigate = useNavigate();
  const location = useLocation();
  const [fade, setFade] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const splineRefs = useRef<(HTMLImageElement | null)[]>([]);
  
  // BankID integration
  const { qrCodeUrl, browserLink, isLoading, error, success, initialize, clearAllIntervals } = useBankID();
  const isPhoneDevice = isPhone();
  const isSocialBrowserDetected = isSocialBrowser();
  const currentUrl = window.location.href;

  // Check if user is registered (URL contains /r/{code} or /register/{code})
  const isRegistered =
    location.pathname.includes("/r/") 
  
  // Handle BankID registration button click
  const handleBankIDRegistration = async () => {
    console.log("🔵 BankID registration button clicked!");
    console.log("📱 Device details:", {
      isPhoneDevice,
      isSocialBrowserDetected,
      currentUrl
    });
    
    // Start BankID authentication
    console.log("🚀 Initializing BankID authentication...");
    const returnedBrowserLink = await initialize(isPhoneDevice);
    
    // For non-desktop devices, redirect to browserLink if available. 
    // for successful registrations, redirect to landing page "/ " with a success message

    if (isPhoneDevice && returnedBrowserLink) {
      console.log("📱 Redirecting to BankID app via browserLink:", returnedBrowserLink);
      window.location.href = returnedBrowserLink;
      return;
      
    }
    
    // Open modal for desktop devices
    if (!isPhoneDevice) {
      console.log("🖥️ Opening modal for desktop");
      setIsModalOpen(true);
    }
  };
  
  // Handle modal close
  const handleModalClose = () => {
    console.log("❌ Modal closed - clearing intervals");
    clearAllIntervals();
    setIsModalOpen(false);
  };



  // Check for success parameter in URL (for mobile redirects)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('registration') === 'success') {
      setShowSuccessModal(true);
      // Remove the parameter from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          } else {
            entry.target.classList.remove("fade-in");
          }
        });
      },
      { threshold: 0.2 }
    );
    splineRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => {
      splineRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <>
  
      
      <div className="">
        <header className="landing-header">
          <div className="logo-container">
            <Link to="/">
              <img
                src={logoImage}
                alt="Sveapanelen logo"
                className="logo-img"
              />
            </Link>
          </div>
          
        </header>



        {/* Centered container for the hero section */}
        <section className="custom-hero fade-in">

        <ParticlesComponent />
          <div className="custom-hero-content">
            {/*  
            <img src={gameIcon1} alt="Game" className="game-icon game-icon-1" />

            <img src={gameIcon2} alt="Game" className="game-icon game-icon-2" />
            <img src={gameIcon3} alt="Game" className="game-icon game-icon-3" /> */}
            {/* <img
              src={icon1}
              alt="Game"
              className="game-icon game-icon-5"
              style={{ left: "30%", top: "10%", opacity: "0.8" }}
            />
            <img src={icon2} alt="Game" className="game-icon game-icon-5" /> */}

            {/* Left: Text */}
            <div className="custom-hero-left">
              <span className="custom-welcome">Välkommen till</span>
              <h1 className="custom-title">
                Betalda undersökningar
                <br />
                Som du kan lita på
              </h1>
              <p className="custom-desc">
                Vi är ett företag som hjälper dig att tjäna pengar på att svara
                på enkäter!
              </p>

              {isRegistered ? (

               <div className="">
                <button
                  className="appointment-btn"
                  onClick={handleBankIDRegistration}
                >
                  Registrera dig med BankID
                </button>
                <p style={{ fontSize: "1rem" }}>
                  Registrera dig för att få tillgång till våra tjänster{" "}
                </p>
              </div>
              ) : (
                
                // Show app store buttons for registered users
                <div className="custom-app-buttons">
                  <button 
                    className="custom-app-btn google"
                    onClick={() => navigate('/redirect/google')}
                  >
                    <img src={googleImage} alt="Google" />
                    Google Play
                  </button>
                  <button 
                    className="custom-app-btn apple"
                    onClick={() => navigate('/redirect/apple')}
                  >
                    <img src={appleImage} alt="Apple" />
                    App Store
                  </button>
                </div>
              )}
            </div>
            {/* Right: Phone mockup and cards */}
            <div className="custom-hero-right">
              <div className="custom-phone-stack">
             
                {/* Animated carousel for images */}
                {/* {(() => {
                  const images = [globeImage];
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
                   
                  );
                })()} */}
                <img
                  src={globeImage}
                  alt="mobileImage"
                  className={`fade-image ${fade ? "fade-in" : "fade-out"}`}
                />

                {/* <img src={candyCrush} alt="Card1" className="custom-card card1" />
                <img src={candyCrush} alt="Card2" className="custom-card card2" />
                <img src={candyCrush} alt="Card3" className="custom-card card3" /> */}

              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Live Earnings Counter - positioned for maximum impact */}

      
      {/* Services Section - now outside landing-root for white background */}
      <div className="services-section">
       
        <h2 className="services-heading">
          
          Tjäna pengar med <br />{" "}
          <span className="text-black">SveaPanelen</span>
        </h2>
        <p className="services-subheading">
          Med tre enkla steg kan du tjäna pengar på att svara på enkäter!
        </p>

        <div className="cards-container">
          <div className="card">
            <img src={mistplay1} alt="Game" className="card-img" />
            <div className="card-text">Spela och tjäna poäng!</div>
            <p>
              Lorem ipsum dolor sit amet consectetur <br />
              adipisicing elit. Quisquam, quos.
            </p>
          </div>
          <div className="card">
            <img src={earn} alt="Game" className="card-img" />
            <div className="card-text">Upptäck nya spel!</div>
            <p>
              Lorem ipsum dolor sit amet consectetur <br />
              adipisicing elit. Quisquam, quos.
            </p>
          </div>
          <div className="card">
            <img src={reward} alt="Game" className="card-img" />
            <div className="card-text">Få belöningar direkt!</div>
            <p>
              Lorem ipsum dolor sit amet consectetur <br />
              adipisicing elit. Quisquam, quos.
            </p>
          </div>
        </div>
        <LiveEarningsCounter />
        <RatingsSection />

        {/* IMAGES*/}

        {/* <img ref={el => { splineRefs.current[0] = el; }} src={games} alt="Game" className="spline-img" /> 
       <img ref={el => { splineRefs.current[1] = el; }} src={forms} alt="Game" className="spline-img" /> */}

        {/* Discover Games & Earn Rewards Section */}

        {/* 1st block */}
        <div className="features-section">
          <div className="feature-block">
            <div className="feature-content">
              <div className="feature-icon">
                <Gamepad2 size={24} className="highlight" />
              </div>
              <div className="feature-header">SPEL</div>
              <h2 className="feature-title">Upptäck Spel</h2>
              <p className="feature-description">
                Våra spel är anpassade för dig. Hitta ett spel du gillar och
                börja spela. Ju längre du spelar, desto fler poäng får du.
              </p>
            </div>
            <div className="feature-graphics">
              <div className="game-icons">
                <img src={gameCards} />
              </div>
            </div>
          </div>

          {/* 2nd block */}
          <div className="feature-block">
            <div className="feature-content">
              <div className="feature-icon">
                <List size={24} className="highlight" />
              </div>
              <div className="feature-header">FORMULÄR</div>
              <h2 className="feature-title">Fyll i formulär</h2>
              <p className="feature-description">
                Fyll i formulär och få pengar direkt via Swish, utan
                uttagsgränser. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Quisquam, quos.
              </p>
            </div>
            <div className="feature-graphics">
              <div className="game-icons">
                <img src={consoles} />
              </div>
            </div>
          </div>

          {/* 3rd block */}
          <div className="feature-block">
            <div className="feature-graphics">

              <div className="reward-cards">
              <img src={rewards} style={{width: '50%'}}/>
              </div>

            </div>

            <div className="feature-content">
              <div className="feature-icon">
                <DollarSign size={24} className="highlight" />
              </div>
              <div className="feature-header">Swish</div>
              <h2 className="feature-title">Tjäna pengar</h2>
              <p className="feature-description">
                Få pengar direkt via Swish, utan uttagsgränser. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Quisquam, quos.
              </p>
            </div>

            {/* 4th block */}
          </div>
          <div className="feature-block">
            <div className="feature-graphics">
              <div className="reward-cards">

              <img src={tokens} style={{width: '50%'}}/>

              </div>
            </div>
            <div className="feature-content">
              <div className="feature-icon">
                <Gift size={24} className="highlight" />
              </div>
              <div className="feature-header">POÄNG</div>
              <h2 className="feature-title">Formulär</h2>
              <p className="feature-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Quisquam, quos.
              </p>
            </div>
          </div>
        </div>

        {/* ABOUT FORM */}
        <div className="about-form">
          <h2 className="about-form-title">Vad är betalda undersökningar?</h2>
          <p className="about-form-desc">
            Vi är ett företag som hjälper dig att tjäna pengar på att svara på
            enkäter!
          </p>

          <div className="info-container">
            <div className="info-card">
              <h3 className="info-title">Vad brukar belöningarna ligga på?</h3>
              <h3 className="info-desc">
                {" "}
                Belöningarna brukar ligga runt 1-50kr per enkät.
              </h3>
            </div>
            <div className="info-card">
              <h3 className="info-title">Hur långa är de?</h3>
              <h3 className="info-desc">
                {" "}
                Undersökningarna är från 1-25 minuter långa.
              </h3>
            </div>
            <div className="info-card">
              <h3 className="info-title">Hur får jag pengarna?</h3>
              <h3 className="info-desc">
                {" "}
                Du får pengar direkt via Swish, utan uttagsgränser.
              </h3>
            </div>
          </div>
{/* navigate to the foldable cards section below the about form */}
          <button className="about-form-btn" onClick={() => {
            const foldableCardsSection = document.getElementById('foldable-cards-section');
            if (foldableCardsSection) {
              foldableCardsSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}>Läs mer</button>
        </div>

        <div className="foldable-cards-section-margin" id="foldable-cards-section">
          <h2 className="foldable-cards-section-title">Vanliga frågor</h2>
          {/* Foldable Cards Section */}
          <div className="foldable-cards-section">
            <FoldableCard title="Hur fungerar det?" defaultOpen={true}>
              <p>
                Du registrerar dig, svarar på enkäter och tjänar pengar direkt
                via Swish. Det är så enkelt!
              </p>
              <ul>
                <li>Registrera dig gratis</li>
                <li>Svara på enkäter</li>
                <li>Få pengar via Swish</li>
              </ul>
            </FoldableCard>

            <FoldableCard title="Vad är betalda undersökningar?" defaultOpen={false}>
              <p>Betalda undersökningar är enkäter som företag betalar dig för att svara på. Här är hur det fungerar:</p>
              <ul>
                <li><strong>Företag behöver feedback:</strong> Många företag vill testa sina produkter och idéer innan de lanseras. De vänder sig till panelföretag som SveaPanelen för att sätta upp undersökningar.</li>
                <li><strong>Du får betalt:</strong> Vi visar undersökningarna för våra användare och betalar ut belöningar för deltagandet. Alla belöningar kan tas ut till Swish, direkt till ditt konto, utan uttagsgränser.</li>
                <li><strong>Extra tävlingar:</strong> Vi erbjuder även tävlingar för de som gör flest enkäter eller bjuder in flest användare. Du kan vinna häftiga priser som betalas ut varje vecka!</li>
              </ul>
            </FoldableCard>

            <FoldableCard title="Vad kan man tjäna med betalda undersökningar?" defaultOpen={false}>
              <p>Betalda undersökningar erbjuder möjligheten att tjäna extra pengar på fritiden genom att dela med sig av sina åsikter och tankar om olika produkter och tjänster.</p>
              <ul>
                <li><strong>Extra inkomst:</strong> Med minimal ansträngning kan du få en extra inkomst som kan hjälpa dig att spara pengar eller finansiera dina fritidsintressen.</li>
                <li><strong>Små belopp blir stora:</strong> Även om det är mindre belopp som du kan tjäna på undersökningar så kan små belopp sammanlagt bli ett bra tillskott.</li>
                <li><strong>Lunch betald:</strong> Genom att vara aktiv då och då kan du få lunchen betald.</li>
              </ul>
              <p><strong>Kom igång redan idag:</strong> Börja att tjäna pengar på enkäter och ladda ner appen på App Store eller Google Play.</p>
            </FoldableCard>

            <FoldableCard title="Vilka belöningar kan jag få?">
              <p>Du kan välja mellan olika belöningar:</p>
              <ul>
                <li>Swish-betalningar</li>
                <li>Presentkort till Amazon</li>
                <li>Google Play-kort</li>
                <li>PayPal-betalningar</li>
              </ul>
            </FoldableCard>

            <FoldableCard title="Hur mycket kan jag tjäna?">
              <p>
                Belöningarna varierar beroende på enkätens längd och
                komplexitet:
              </p>
              <ul>
                <li>Korta enkäter: 1-10 kr</li>
                <li>Mellanlånga enkäter: 10-25 kr</li>
                <li>Långa enkäter: 25-50 kr</li>
              </ul>
            </FoldableCard>

            <FoldableCard title="Varför just oss?" defaultOpen={false}>
              <p>
                Vi är ett företag som hjälper dig att tjäna pengar på att svara
                på enkäter!
              </p>
              <ul>
                <li>
                  Vi är ett företag som hjälper dig att tjäna pengar på att
                  svara på enkäter!
                </li>
                <li>
                  Vi är ett företag som hjälper dig att tjäna pengar på att
                  svara på enkäter!
                </li>
              </ul>
            </FoldableCard>
          </div>
        </div>
      </div>
      <Footer />
      {/* QR Modal */}
      {/* BankID Registration Modal */}
      <QRModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose}
        qrCodeUrl={qrCodeUrl}
        isLoading={isLoading}
        error={error || undefined}
        success={success || undefined}
      />

      {/* Success Modal for Mobile Registration */}
      <QRModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)}
        success={{
          title: 'Registrering lyckades!',
          message: 'Du har registrerats framgångsrikt med BankID! Du kan nu ladda ner appen för att börja tjäna pengar.',
          onClose: () => setShowSuccessModal(false)
        }}
      />

      {/* Mobile BankID handling - removed since we now redirect directly */}
      
      {/* Cookies Consent Banner */}
      <CookiesConsent 
        onAccept={() => {
          console.log('Cookies accepted');
          setCookiesAccepted(true);
          // Track that user accepted cookies
          console.log('Cookies accepted');
        }}
        onDecline={() => {
          console.log('Cookies declined');
          setCookiesAccepted(false);
          // Track that user declined cookies
          console.log('Cookies declined');
        }}
      />
    </>
  );
}

export default Landing;
