import React, { useState, useEffect } from "react";
import "./HeroSection.css";
import heroMain from "@/assets/Images/HeroMain.webp";
import heroIosReview from "@/assets/Images/HeroIosReview.webp";
import appLogoImg from "@/assets/logo/logo.svg";
import { isIosReview } from "@/config/reviewConfig";

const words = isIosReview
  ? ["enkäter", "cashback", "tävlingar"]
  : ["enkäter", "mobilspel", "cashback", "tävlingar", "frågesport"];

const TYPE_SPEED = 90;
const DELETE_SPEED = 60;
const PAUSE_AFTER_TYPE = 1500;
const PAUSE_AFTER_DELETE = 300;

function useTypewriter(items: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = items[index];

    if (!isDeleting && text === current) {
      const t = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
      return () => clearTimeout(t);
    }

    if (isDeleting && text === "") {
      const t = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % items.length);
      }, PAUSE_AFTER_DELETE);
      return () => clearTimeout(t);
    }

    const delay = isDeleting ? DELETE_SPEED : TYPE_SPEED;
    const t = setTimeout(() => {
      setText(current.slice(0, text.length + (isDeleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, isDeleting, index, items]);

  return text;
}

interface HeroSectionProps {
  onAppDownload?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onAppDownload }) => {
  const typedWord = useTypewriter(words);

  return (
    <div className="hero">
      <div className="hero-overlay">
        <div className="hero-inner">

          <div className="hero-col hero-copy">
            <h1 className="hero-title">Sveriges bästa rewards-app.</h1>
            <h3 className="hero-sub">
              Bli en av våra <span className="accent">300 000+</span> användare
              som tjänar pengar på{" "}
              <span className="typewriter-word">{typedWord}</span>
              <span className="typewriter-cursor">|</span>.
            </h3>
            <ul className="hero-features">
              <li className="hero-feature">
                <span className="feature-text">
                  Registrera dig på en 1 min med <strong>BankID</strong>
                </span>
              </li>
              <li className="hero-feature">
                <span className="feature-text">
                  Ta ut dina pengar när du vill med <strong>Swish</strong>
                </span>
              </li>
            </ul>
            <div className="custom-app-buttons">
              <button className="custom-app-btn" onClick={onAppDownload}>
                Ladda ner appen
                <img
                  src={appLogoImg}
                  alt="App"
                  style={{ width: 18, height: 18, objectFit: "contain" }}
                />
              </button>
            </div>
          </div>

          {/* Right: visuals */}
          <div className="hero-col hero-visual">
            <div className="phone-wrap">
              <img
                src={isIosReview ? heroIosReview : heroMain}
                className="phone-img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
