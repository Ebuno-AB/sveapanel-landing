import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import qrCode from '../assets/features/qr-code.png'

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose }) => {
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
              <img 
                src={qrCode} 
                alt="QR Code" 
                className="qr-code-img"
                onError={(e) => {
                  console.error('QR code image failed to load');
                  e.currentTarget.style.display = 'none';
                }}
                onLoad={() => {
                  console.log('QR code image loaded successfully');
                }}
              />
            </div>
            <p className="qr-code-modal-text">Skanna QR-koden för att registrera dig</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRModal; 