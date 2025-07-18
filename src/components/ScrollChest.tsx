import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import chestSprite from '../assets/chests.png';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ScrollChestProps {
  spriteSheetPath?: string;
}

const ScrollChest: React.FC<ScrollChestProps> = ({ spriteSheetPath = chestSprite }) => {
  const chestRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('ScrollChest component mounted');
    console.log('Chest sprite path:', spriteSheetPath);
    
    // Test if the image loads
    const testImage = new Image();
    testImage.onload = () => {
      console.log('Chest sprite image loaded successfully');
      console.log('Image dimensions:', testImage.width, 'x', testImage.height);
    };
    testImage.onerror = () => {
      console.error('Failed to load chest sprite image');
    };
    testImage.src = spriteSheetPath;
    
    if (!chestRef.current || !spriteRef.current) {
      console.log('Refs not ready');
      return;
    }

    console.log('Setting up GSAP animation');

    // Create the scroll animation for sprite frame changes only
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          // Calculate which frame to show based on scroll progress
          const progress = self.progress;
          const frameIndex = Math.floor(progress * 4); // 4 frames total
          const framePosition = frameIndex * 25; // Each frame is 25% of the sprite sheet height
          
          console.log('Scroll progress:', progress, 'Frame:', frameIndex, 'Position:', framePosition);
          
          // Update the sprite position only
          if (spriteRef.current) {
            spriteRef.current.style.backgroundPositionY = `${framePosition}%`;
          }
        }
      }
    });

    // Add a subtle floating animation to the chest
    gsap.to(chestRef.current, {
      y: "+=5",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    console.log('GSAP animation setup complete');

    return () => {
      console.log('Cleaning up ScrollChest');
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
        <div 
      ref={chestRef}
      className="scroll-chest"
      style={{
        position: 'fixed',
        right: '50px',
        top: '80px',
        width: '80px',
        height: '200',
        zIndex: 1000,
        pointerEvents: 'none',
        transform: 'none' // Ensure no transform animations interfere
      }}
    >
      <div
        ref={spriteRef}
        className="chest-sprite"
                style={{
          width: '100%',
          height: '100%',
          backgroundImage: `url(${spriteSheetPath})`,
          backgroundSize: '100% 400%', // 4 frames vertically
          backgroundPosition: '0% 0%',
          backgroundRepeat: 'no-repeat',
          transition: 'background-position 0.1s ease-out',
          
        }}
      />
    </div>
  );
};

export default ScrollChest; 