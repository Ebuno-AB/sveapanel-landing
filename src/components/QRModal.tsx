import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeUrl?: string;
  isLoading?: boolean;
}

const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose, qrCodeUrl, isLoading = false }) => {
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
          <h2 className="modal-title">Registrera dig med BankID</h2>
          <p className="modal-subtitle">Skanna QR-koden med BankID för att registrera dig</p>
        </div>
        
        <div className="modal-body">
          <div className="qr-code-modal-container">
            <div className="qr-code-placeholder-modal">
              {isLoading ? (
                <div className="flex items-center justify-center p-8">
                  <svg className="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
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
        </div>
      </div>
    </div>
  );
};

export default QRModal; 