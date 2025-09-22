import '../App.css';
import React, { useEffect } from 'react';
import BackButton from '../components/BackButton';
import SocialBrowserWarning from '../components/SocialBrowserWarning';
import BankIDButton from '../components/BankIDButton';
import { useBankID } from '../hooks/useBankID';
import { isPhone, isSocialBrowser } from '../utils/browserDetection';

const RegistrationPage: React.FC = () => {
  const { qrCodeUrl, browserLink, isLoading, initialize } = useBankID();
  const isPhoneDevice = isPhone();
  const isSocialBrowserDetected = isSocialBrowser();
  const currentUrl = window.location.href;

  useEffect(() => {
    // Initialize BankID authentication when component mounts
    initialize(isPhoneDevice);
  }, [initialize, isPhoneDevice]);

  return (
    <div className='registration-page max-w-md mx-auto p-6'>
      <BackButton />
      
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Registrera dig med BankID
        </h1>
        <p className="text-gray-600">
          {isPhoneDevice 
            ? 'Tryck på knappen för att öppna BankID-appen' 
            : 'Skanna QR-koden med BankID för att registrera dig'
          }
        </p>
      </div>

      {/* Show social browser warning if detected */}
      {isPhoneDevice && isSocialBrowserDetected && (
        <SocialBrowserWarning currentUrl={currentUrl} />
      )}

      {/* Show BankID button on mobile (if not in social browser) */}
      {isPhoneDevice && !isSocialBrowserDetected && (
        <BankIDButton 
          browserLink={browserLink} 
          isLoading={isLoading} 
        />
      )}

      {/* Show QR code on desktop */}
      {!isPhoneDevice && (
        <div className="qr-code-container bg-white rounded-lg shadow-lg p-6 text-center">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <svg className="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="ml-3 text-gray-600">Laddar QR-kod...</span>
            </div>
          ) : qrCodeUrl ? (
            <>
              <img 
                src={qrCodeUrl} 
                alt="BankID QR Code" 
                className="qr-code-img mx-auto mb-4 max-w-48 max-h-48"
              />
              <p className="text-sm text-gray-600">
                Öppna BankID-appen på din telefon och skanna koden
              </p>
            </>
          ) : (
            <div className="p-8 text-gray-500">
              <p>QR-kod kunde inte laddas</p>
            </div>
          )}
        </div>
      )}

      {/* Additional help text */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Har du inte BankID installerat? Ladda ner det från App Store eller Google Play.
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
