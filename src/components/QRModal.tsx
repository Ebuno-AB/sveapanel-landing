import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import '../App.css'

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeUrl?: string;
  isLoading?: boolean;
  error?: {
    title: string;
    message: string;
    onRetry?: () => void;
  };
  success?: {
    title: string;
    message: string;
    onClose?: () => void;
  };
}

const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose, qrCodeUrl, isLoading = false, error, success }) => {  
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <h2 className="modal-title">
            {error ? error.title : success ? success.title : 'Registrera dig med BankID'}
          </h2>
           <p className="modal-subtitle">
            {error ? error.message : success ? success.message : 'Skanna QR-koden med BankID för att registrera dig'}
          </p>
        </div>
        
        <div className="modal-body">
          {error ? (
            // Error State
            <div className="text-center p-8">
              <div className="mb-6">
 
              </div>
              <div className="modal-button-container">
                {error.onRetry && (
                  <button
                    onClick={error.onRetry}
                    className="modal-btn"
                  >
                    Försök igen
                  </button>
                )}
                
                <button
                  onClick={onClose}
                  className="modal-btn" 
                >
                  Stäng
                </button>
              </div>
            </div>
          ) : success ? (
            // Success State
            <div className="text-center p-8">
              <div className="modal-button-container">
                <button
                  onClick={success.onClose || onClose}
                  className="modal-btn bg-green-600 hover:bg-green-700"
                >
                  Stäng
                </button>
              </div>
            </div>
          ) : (
            // Normal QR Code State  
            <div className="qr-code-modal-container">
              <div className="qr-code-placeholder-modal">
                {isLoading ? (
                  <div className="flex items-center justify-center p-8">
                  
                  </div>
                ) : qrCodeUrl ? (
                  <img 
                    src={qrCodeUrl} 
                    alt="BankID QR Code" 
                    className="qr-code-img max-w-48 max-h-48"
                    onError={(e) => {
                      console.error('QR code image failed to load');
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center p-8 text-gray-500">
                    <p>QR-kod kunde inte laddas</p>
                  </div>
                )}
              </div>
              <p className="qr-code-modal-text mt-4">
                {isLoading ? 'Laddar QR-kod...' : 'Skanna QR-koden med BankID för att registrera dig'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRModal; 