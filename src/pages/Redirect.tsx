import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGA } from '../hooks/gtag';
import '../components/redirectComponent/Redirect.css';

const Redirect: React.FC = () => {
  const { platform } = useParams<{ platform: string }>();
  const navigate = useNavigate();
  const [, setProgress] = useState(0);
  const { trackEvent } = useGA();

  // Device detection function
  const detectDevice = () => {
    const userAgent = navigator.userAgent.toLowerCase();
  
    
    // Check for Android devices (more comprehensive check)
    if (/android/.test(userAgent) || /mobile.*android/.test(userAgent)) {
      console.log('Detected: Android device'); // Debug log
      return 'google';
    }
    
    // Check for iOS devices (more comprehensive check)
    if (/iphone|ipad|ipod|ios/.test(userAgent) || /mobile.*safari/.test(userAgent)) {
      console.log('Detected: iOS device'); // Debug log
      return 'apple';
    }
    
    // Additional checks for mobile devices
    if (/mobile|tablet/.test(userAgent)) {
      console.log('Detected: Mobile device, defaulting to Google Play'); // Debug log
      return 'google';
    }
    
    // Default to Google Play for other devices (fallback)
    console.log('Detected: Other device, defaulting to Google Play'); // Debug log
    return 'google';
  };

  useEffect(() => { 
      trackEvent('conversion', {
          'send_to': 'AW-764023269/BruBCL2A_rQDEOWjqOwC'
      });    
  }, [window.gtag]);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + (100 / 30); // 30 steps over 3 seconds
      });
    }, 100);

    // Redirect after 3 seconds
    const redirectTimer = setTimeout(() => {
      // Use the same logic as getTargetPlatform for consistency
      let targetPlatform;
      
      if (platform === 'google') {
        targetPlatform = 'google';
      } else if (platform === 'apple') {
        targetPlatform = 'apple';
      } else {
        // For 'detect' or any other value, detect the device
        targetPlatform = detectDevice();
      }

      console.log('Redirecting to platform:', targetPlatform); // Debug log
      
      if (targetPlatform === 'google') {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.ebuno.swishpanelenfinal';
      } else if (targetPlatform === 'apple') {
        window.location.href = 'https://apps.apple.com/app/apple-store/id1617681550?pt=120111031&ct=direct&mt=8'; 
      } else {
        navigate('/'); // Fallback to home
      }
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(redirectTimer);
    };
  }, [platform, navigate]);



  
  return (
    <div className="redirect-page">
      <div className="pendulum-container">
        <div className="pendulum">
          <div className="pendulum-dot dot-1"></div>
          <div className="pendulum-dot dot-2"></div>
          <div className="pendulum-dot dot-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Redirect;