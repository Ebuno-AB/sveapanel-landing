import React from 'react';

interface BankIDButtonProps {
  browserLink: string | null;
  isLoading: boolean;
}

const BankIDButton: React.FC<BankIDButtonProps> = ({ browserLink, isLoading }) => {
  const handleBankIDClick = () => {
    if (browserLink) {
      window.location.href = browserLink;
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleBankIDClick}
        disabled={!browserLink || isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors duration-200"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Laddar BankID...
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              Öppna BankID
            </div>
            <p className="text-sm mt-1 opacity-80">Tryck för att öppna BankID-appen</p>
          </>
        )}
      </button>
    </div>
  );
};

export default BankIDButton; 