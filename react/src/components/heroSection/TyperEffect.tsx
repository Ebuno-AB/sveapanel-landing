import { useState, useEffect } from "react";

interface TyperEffectProps {
  words: string[];
  staticText?: string;
  speed?: number;      // typing speed in ms
  pauseTime?: number;  // pause time at full word in ms
}
const TyperEffect = ({ words, staticText = "", speed = 100, pauseTime = 2000 }: TyperEffectProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(pauseTimer);
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          setIsPaused(true);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, isPaused, currentWordIndex, words, speed, pauseTime]);

  return (
    <span>
      {staticText}
      <span style={{ color: "#00CCA3" }}>{currentText}</span>
      {/* make it blink */}
      <span className={`cursor ${isPaused ? 'blinking' : ''}`}>|</span>
      <style>
        {`
          .cursor {
            display: inline-block;
            color: #ffffffff;
            font-weight: bold;
            margin-left: 2px;
          }

          .cursor.blinking {
            animation: blink 1.2s infinite;
          }

          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}
      </style>            

    </span>
  );
};

export default TyperEffect;