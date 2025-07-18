import "../App.css";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import globeImage from "../assets/image.png";
import logoImage from "../assets/logo.png";
import appleImage from "../assets/apple.svg";
import googleImage from "../assets/google.svg";

import personalFormImage from "../assets/personal_form.svg";
import Footer from "../components/footer";
import mistplay1 from "../assets/mistplay-img1.png";
import earn from "../assets/earn.png";
import reward from "../assets/reward.png";
import gameIcon1 from "../assets/dragon_city.png";
import gameIcon2 from "../assets/arena.png";
import gameIcon3 from "../assets/toonblast.png";
import icon1 from "../assets/icon1.svg";
import icon2 from "../assets/icon2.png";

import gameCards from "../assets/features/gameCards.webp";
import rewards from "../assets/features/rewards.png";
import tokens from "../assets/features/tokens.png";
import consoles from "../assets/features/consoles.png";
import {
  Gamepad2,
  List,
  Gift,
  DollarSign,
  ChevronDown,
  Banknote,
} from "lucide-react";
import FoldableCard from "../components/FoldableCard";
import QRModal from "../components/QRModal";

const placeholderSvg =
  'data:image/svg+xml;utf8,<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="%23eafff4"/><text x="50%" y="50%" text-anchor="middle" fill="%235ecb8b" font-size="18" font-family="Arial" dy=".3em">Bild</text></svg>';
import Spline from "@splinetool/react-spline";

function Landing() {
  const navigate = useNavigate();
  const location = useLocation();
  const images = [globeImage, personalFormImage];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const splineRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Check if user is registered (URL contains /r/{code})
  const isRegistered =
    location.pathname.includes("/r/") ||
    location.pathname.includes("/register/");

  // Extract referral code if present
  const referralCode =
    location.pathname.match(/\/r\/([^\/]+)/)?.[1] ||
    location.pathname.match(/\/register\/([^\/]+)/)?.[1] ||
    null;

  // Debug logging
  console.log("Current pathname:", location.pathname);
  console.log("Is registered:", isRegistered);
  console.log("Referral code:", referralCode);

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
          <nav className="nav">
            <a href="#services" className="nav-link">
              Tjänster
            </a>
            <button
              className="appointment-btn"
              aria-label="Boka ett möte"
              onClick={() => navigate("/register")}
            >
              Registrera dig
            </button>
          </nav>
        </header>

        {/* Centered container for the hero section */}
        <section className="custom-hero fade-in">
          <div className="custom-hero-content">
            <img src={gameIcon1} alt="Game" className="game-icon game-icon-1" />

            <img src={gameIcon2} alt="Game" className="game-icon game-icon-2" />
            <img src={gameIcon3} alt="Game" className="game-icon game-icon-3" />
            <img
              src={icon1}
              alt="Game"
              className="game-icon game-icon-5"
              style={{ left: "20%", top: "20%", opacity: "0.8" }}
            />
            <img src={icon2} alt="Game" className="game-icon game-icon-5" />

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
                // Show app store buttons for registered users
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
              ) : (
                <div className="">
                  <button
                    className="appointment-btn"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Registrera dig med BankID
                  </button>
                  <p style={{ fontSize: "1rem" }}>
                    Registrera dig för att få tillgång till våra tjänster{" "}
                  </p>
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

        <div className="ratings-section">
          <h2 className="ratings-headline">
            Vi har betalat ut mer än{" "}
            <span className="highlight">10 000 000 kr</span> till våra
            användare!
          </h2>
          <p className="ratings-desc">
            SveaPanelen har tusentals nöjda användare och ett av de högsta
            betygen i branschen.
          </p>
          <div className="ratings-summary">
            <span className="ratings-value">4.7</span>
            <span className="ratings-stars">★★★★</span>
            <span className="ratings-stars-last">★</span>
            <span className="ratings-outof">/ 5.0</span>
            <span className="ratings-count">(2500+ omdömen)</span>
          </div>
          <div className="ratings-testimonials">
            <div className="testimonial-card">
              <p className="testimonial-text">
                “Trovärdig, cashback och erbjuder roliga spel i appen! Varje
                enkät och spel är underhållande. Jag kan varmt rekommendera den!
                :) ”
              </p>
              <span className="testimonial-user">– Randy M.G.</span>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                “Bästa panelen jag testat. Bra support och många
                undersökningar.”
              </p>
              <span className="testimonial-user">– Erik L.</span>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                “Trodde inte det var så enkelt att tjäna pengar på enkäter!”
              </p>
              <span className="testimonial-user">– Maria P.</span>
            </div>
          </div>
        </div>

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
              <div className="reward-cards"></div>
              <img src={rewards} />
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
                <img src={tokens} />
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
          <button className="about-form-btn">Läs mer</button>
        </div>

        <div className="foldable-cards-section-margin">
          <h2 className="foldable-cards-section-title">Vanliga frågor</h2>
          {/* Foldable Cards Section */}
          <div className="foldable-cards-section">
            <FoldableCard title="Hur fungerar det?" defaultOpen={false}>
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
      <QRModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default Landing;
