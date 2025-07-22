import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../components/redirectComponent/Redirect.css';
import { useGA } from '../hooks/gtag';

const Redirect: React.FC = () => {
  const { platform } = useParams<{ platform: string }>();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const { trackEvent } = useGA();

  // Device detection function
  const detectDevice = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    
    console.log('User Agent:', userAgent); // Debug log
    console.log('User Agent length:', userAgent.length); // Debug log
    
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
  }, []);

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
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(redirectTimer);
    };
  }, [platform, navigate]);

  // Calculate the target platform for display
  const getTargetPlatform = () => {
    console.log('Platform from URL:', platform); // Debug log
    
    if (platform === 'google') return 'google';
    if (platform === 'apple') return 'apple';
    if (platform === 'detect') return detectDevice();
    
    // Fallback: detect device for any other platform value
    return detectDevice();
  };

  const targetPlatform = getTargetPlatform();
  const isGoogle = targetPlatform === 'google';
  const platformName = isGoogle ? 'Google Play' : 'App Store';
  const platformColor = isGoogle ? '#4285F4' : '#007AFF';
  
  console.log('Final platform:', targetPlatform, 'isGoogle:', isGoogle, 'platformName:', platformName); // Debug log

  return (
    <div className="redirect-container">
      <div className="redirect-content">
        <h1 className="redirect-title">Omdirigerar till {platformName}</h1>
        <p className="redirect-subtitle">
          Du kommer snart att omdirigeras till SveaPanelen appen
        </p>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${progress}%`,
                backgroundColor: platformColor 
              }}
            />
          </div>
          <div className="progress-text">{Math.round(progress)}%</div>
        </div>

        {/* Loading Dots */}
        <div className="loading-dots">
          <div className="dot" style={{ backgroundColor: platformColor }} />
          <div className="dot" style={{ backgroundColor: platformColor }} />
          <div className="dot" style={{ backgroundColor: platformColor }} />
        </div>
      </div>
    </div>
  );
};

export default Redirect;