import React, { useMemo } from "react";
import QRCode from "react-qr-code";

export interface AppDownloadQRCodeProps {
  /** Custom URL for the QR code. If omitted, a sensible default is computed. */
  url?: string;
  /** Pixel size of the QR code square. */
  size?: number;
  /** Show the short scan instruction text under the QR code. */
  showInstructions?: boolean;
  /** Optional override of foreground color */
  fgColor?: string;
  /** Optional override of background color */
  bgColor?: string;
  /** Optional className wrapper for layout */
  className?: string;
}

/** Computes a good default URL matching your original logic */
export const getDefaultQRCodeUrl = () => {
  if (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1")
  ) {
    // Local dev: replace with your LAN IP/port if needed
    return `http://192.168.0.220:5173/redirect/detect`;
  }
  return `${window.location.origin}/redirect/detect`;
};

const AppDownloadQRCode: React.FC<AppDownloadQRCodeProps> = ({
  url,
  size = 250,
  showInstructions = true,
  fgColor = "#000000",
  bgColor = "#ffffff",
  className = "",
}) => {
  const qrCodeUrl = useMemo(() => url ?? getDefaultQRCodeUrl(), [url]);

  return (
    <div className={`qr-code-container ${className}`}>
      <div className="qr-code-wrapper">
        <QRCode
          value={qrCodeUrl}
          size={size}
          level="H"
          fgColor={fgColor}
          bgColor={bgColor}
        />
      </div>
      {showInstructions && (
        <p className="qr-code-instructions">
          Öppna kameran på din telefon och skanna QR-koden
        </p>
      )}
    </div>
  );
};

export default AppDownloadQRCode;
