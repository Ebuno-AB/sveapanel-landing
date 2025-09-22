import React from 'react';
import Swal from 'sweetalert2';
import { getSocialBrowserName, isIOS, isAndroid } from '../utils/browserDetection';

interface SocialBrowserWarningProps {
  currentUrl: string;
}

const SocialBrowserWarning: React.FC<SocialBrowserWarningProps> = ({ currentUrl }) => {
  const browserName = getSocialBrowserName();

  const openInChrome = (url: string): void => {
    if (isAndroid()) {
      // Android Chrome
      window.location.href = 'intent://' + url.replace(/^https?:\/\//, '') + 
        '#Intent;scheme=https;package=com.android.chrome;end';
    } else if (isIOS()) {
      // iOS Chrome
      window.location.href = 'googlechrome://' + url.replace(/^https?:\/\//, '');
      // Fallback after delay if Chrome doesn't open
      setTimeout(() => {
        window.location.href = url;
      }, 2500);
    } else {
      window.location.href = url;
    }
  };

  const openInSafari = (_url: string): void => {
    // Show feedback to user
    Swal.fire({
      title: 'Öppna i webbläsare...',
      text: 'Kopiera länken och öppna i din vanliga webbläsare',
      showConfirmButton: true,
      confirmButtonText: 'Kopiera länk',
      timer: 12000
    }).then((result) => {
      if (result.isConfirmed) {
        copyPageUrl();
      }
    });
  };

  // const tryOpenExternalBrowser = (): void => {
  //   const url = currentUrl;
    
  //   try {
  //     // Try multiple approaches
  //     const opened = window.open(url, '_system');
      
  //     if (!opened) {
  //       if (isIOS()) {
  //         window.location.href = url;
  //       } else if (isAndroid()) {
  //         window.location.href = 'intent://' + url.replace(/^https?:\/\//, '') + 
  //           '#Intent;scheme=https;package=com.android.chrome;end';
  //       } else {
  //         window.location.href = url;
  //       }
  //     }
      
  //     showBrowserOpenFeedback();
  //   } catch (error) {
  //     console.error('Failed to open external browser:', error);
  //     showManualCopyInstructions();
  //   }
  // };

  // const showBrowserOpenFeedback = (): void => {
  //   Swal.fire({
  //     title: 'Öppnar webbläsare...',
  //     text: 'Om inget händer, kopiera länken manuellt',
  //     showConfirmButton: true,
  //     confirmButtonText: 'Kopiera länk',
  //     timer: 3000
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       copyPageUrl();
  //     }
  //   });
  // };

  // const showManualCopyInstructions = (): void => {
  //   Swal.fire({
  //     title: 'Kunde inte öppna webbläsaren',
  //     html: `
  //       <p>Följ dessa steg istället:</p>
  //       <ol>
  //         <li>Kopiera länken nedan</li>
  //         <li>Öppna din vanliga webbläsare (Safari/Chrome)</li>
  //         <li>Klistra in länken där</li>
  //       </ol>
  //     `,
  //     showCancelButton: true,
  //     confirmButtonText: 'Kopiera länk',
  //     cancelButtonText: 'Avbryt'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       copyPageUrl();
  //     }
  //   });
  // };

  const copyPageUrl = (): void => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      Swal.fire({
        title: 'Länken kopierad!',
        text: 'Öppna din vanliga webbläsare och klistra in länken',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false
      });
    }).catch(() => {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = currentUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      
      Swal.fire({
        title: 'Länken kopierad!',
        text: 'Öppna din vanliga webbläsare och klistra in länken',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false
      });
    });
  };

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-4 rounded">
      <div className="flex">
        <div className="py-1">
          <svg className="fill-current h-6 w-6 text-yellow-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
          </svg>
        </div>
        <div className="flex-1">
          <p className="font-bold">Du använder {browserName}-webbläsaren</p>
          <p className="text-sm">För att slutföra registreringen behöver du öppna sidan i din vanliga webbläsare.</p>
          
          <div className="mt-3 space-y-2">
            <button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => openInChrome(currentUrl)}
            >
              Öppna i Chrome
            </button>
            
            {isIOS() && (
              <button 
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => openInSafari(currentUrl)}
              >
                Öppna i Safari
              </button>
            )}
            
            <button 
              className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded text-sm"
              onClick={copyPageUrl}
            >
              Kopiera länk manuellt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialBrowserWarning; 