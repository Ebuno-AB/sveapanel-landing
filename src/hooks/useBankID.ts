import { useState, useEffect, useRef, useCallback } from 'react';
import QRCode from 'qrcode';
import Swal from 'sweetalert2'; // for error messages
import { BANKID_CONFIG, getApiUrl } from '../config/bankid';




export const useBankID = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [browserLink, setBrowserLink] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [error, setError] = useState<{title: string; message: string} | null>(null);
  
  const orderRefRef = useRef<string | null>(null);
  const qrRefreshInterval = useRef<NodeJS.Timeout | null>(null);
  const verifyInterval = useRef<NodeJS.Timeout | null>(null);
  const refreshCount = useRef<number>(0);
  const verifyCount = useRef<number>(0);

  // Generic API call function
  const makeApiCall = async (endpoint: string, data?: Record<string, string>) => {

    const formData = new FormData();
    if (data) {
    
      Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    }
    
    const response = await fetch(getApiUrl(endpoint), {
      method: 'POST',
      body: formData,
    });
    
    const responseText = await response.text();
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${responseText}`);
    
    const parsed = JSON.parse(responseText);
    if (!parsed) throw new Error('Invalid response');
    
    return parsed;
  };

  // Generate QR code
  const generateQRCode = async (text: string): Promise<string> => {
    try {
      return await QRCode.toDataURL(text, { width: 200, margin: 2 });
    } catch (error) {
      console.error('QR generation failed:', error);
      return '';
    }
  };

  // Clear all intervals 
  const clearAllIntervals = useCallback((): void => {
    [qrRefreshInterval, verifyInterval].forEach(ref => {
      if (ref.current) {
        clearInterval(ref.current);
        ref.current = null;
      }
    });
  }, []);

  // Show error (custom modal) or success (SweetAlert)
  const showMessage = (type: 'error' | 'success', customMessage?: string) => {
    clearAllIntervals();
    if (isComplete && type === 'error') return;

    if (type === 'error') {
      const message = customMessage || 'Något gick fel. Prova igen.';
      setError({
        title: 'Hoppsan!',
        message: message
      });
    } else {
      const buttons = `
        <a href="${BANKID_CONFIG.APP_STORE_URLS.APPLE}" style="margin: 10px;">
          <button class="swal2-confirm swal2-styled">App Store</button>
        </a>
        <a href="${BANKID_CONFIG.APP_STORE_URLS.ANDROID}" style="margin: 10px;">
          <button class="swal2-confirm swal2-styled">Google Play</button>
        </a>
      `;
      Swal.fire({
        title: 'Grattis!',
        html: `<p>Du har registrerats! Ladda ner appen:</p><div>${buttons}</div>`,
        showConfirmButton: false,
      });
    }
  };

  // Clear error and retry authentication
  const retryAuthentication = () => {
    setError(null);
    setIsLoading(true);
    
    // Reset counters
    refreshCount.current = 0;
    verifyCount.current = 0;
    
    beginAuthentication().then(success => {
      if (success) {
        // Restart verification interval
        verifyInterval.current = startInterval(
          verifyAuthentication, 
          BANKID_CONFIG.INTERVALS.VERIFY, 
          verifyCount
        );
        
        // Restart QR refresh interval for desktop (assuming this was started initially)
        if (!qrRefreshInterval.current) {
          qrRefreshInterval.current = startInterval(
            refreshQR, 
            BANKID_CONFIG.INTERVALS.QR_REFRESH, 
            refreshCount
          );
        }
      }
    });
  };

  // Begin authentication
  const beginAuthentication = useCallback(async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null); // Clear any previous errors
      const response = await makeApiCall(BANKID_CONFIG.ENDPOINTS.BEGIN);
      
      if (!response.data) throw new Error('No data received');
      
      const { orderRef, browserLink, qr } = response.data;
      orderRefRef.current = orderRef;
      setBrowserLink(browserLink);
      
      if (qr) {
        const qrUrl = await generateQRCode(qr);
        setQrCodeUrl(qrUrl);
      }
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Begin error:', error);
      showMessage('error');
      setIsLoading(false);
      return false;
    }
  }, []);

  // Refresh QR code
  const refreshQR = useCallback(async (): Promise<void> => {
    if (!orderRefRef.current) return;
    
    try {
      refreshCount.current++;
      console.log('Refreshing QR code ' + refreshCount.current);
      const response = await makeApiCall(BANKID_CONFIG.ENDPOINTS.UPDATE_QR, {
        order_ref: orderRefRef.current
      });
      
      if (response.data?.qr) {
        const qrUrl = await generateQRCode(response.data.qr);
        setQrCodeUrl(qrUrl);
      }
    } catch (error) {
      console.error('QR refresh error:', error);
    }
  }, []);

  // Verify authentication
  const verifyAuthentication = useCallback(async (): Promise<void> => {
    if (isComplete || !orderRefRef.current) return;
    
    try {
      verifyCount.current++;
      console.log('Verifying authentication ' + verifyCount.current);
      const response = await makeApiCall(BANKID_CONFIG.ENDPOINTS.VERIFY_ORDER, {
        kod: orderRefRef.current
      });
      
      if (response.status === 'success') {
        setIsComplete(true);
        clearAllIntervals();
        showMessage('success')

        //where to redirect when authentication is complete?
        window.location.href = '/';
      }
      // Continue polling for 'pending' or 'error' status
    } catch (error) {
      console.error('Verify error:', error);
    }
  }, [isComplete]);

  // Start intervals
  const startInterval = (callback: () => void, delay: number, countRef: React.MutableRefObject<number>) => {
    return setInterval(() => {
      if (countRef.current > BANKID_CONFIG.INTERVALS.MAX_RETRIES) {
        clearAllIntervals();
        showMessage('error', 'Timeout - försök igen');
        return;
      }
      callback();
    }, delay);
  };

  // Initialize authentication
  const initialize = useCallback(async (isPhoneDevice: boolean): Promise<void> => {
    const success = await beginAuthentication();
    if (!success) return;
    
    // Start verification polling
    verifyInterval.current = startInterval(
      verifyAuthentication, 
      BANKID_CONFIG.INTERVALS.VERIFY, 
      verifyCount
    );
    
    // Start QR refresh for desktop
    if (!isPhoneDevice) {
      qrRefreshInterval.current = startInterval(
        refreshQR, 
        BANKID_CONFIG.INTERVALS.QR_REFRESH, 
        refreshCount
      );
    }
  }, [beginAuthentication, verifyAuthentication, refreshQR]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearAllIntervals();
  }, [clearAllIntervals]);

  return {
    qrCodeUrl,
    browserLink,
    isLoading,
    isComplete,
    error: error ? { ...error, onRetry: retryAuthentication } : null,
    initialize,
    clearAllIntervals,
  };
}; 