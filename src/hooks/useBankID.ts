import { useState, useEffect, useRef, useCallback } from 'react';
import QRCode from 'qrcode';
import { BANKID_CONFIG, getApiUrl } from '../config/bankid';




export const useBankID = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [browserLink, setBrowserLink] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [error, setError] = useState<{title: string; message: string} | null>(null);
  const [success, setSuccess] = useState<{title: string; message: string; onClose?: () => void} | null>(null);
  
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

  // Show error (custom modal) or success (custom modal)
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
      setSuccess({
        title: 'Grattis!',
        message: 'Du har registrerats framgångsrikt med BankID! Ladda ner appen för att fortsätta.',
        onClose: () => {
          window.location.href = '/';
        }
      });
    
    }
  };

  // Clear error and retry authentication
  const retryAuthentication = (isPhoneDevice?: boolean) => {
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    
    // Reset counters
    refreshCount.current = 0;
    verifyCount.current = 0;
    
    beginAuthentication().then(result => {
      if (result.success) {
        // Restart verification interval with device type
        verifyInterval.current = startInterval(
          () => verifyAuthentication(isPhoneDevice), 
          BANKID_CONFIG.INTERVALS.VERIFY, 
          verifyCount
        );
        
        // Restart QR refresh interval for desktop (assuming this was started initially)
        if (!qrRefreshInterval.current && !isPhoneDevice) {
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
  const beginAuthentication = useCallback(async (): Promise<{ success: boolean; browserLink: string | null }> => {
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
      return { success: true, browserLink };
    } catch (error) {
      console.error('Begin error:', error);
      showMessage('error');
      setIsLoading(false);
      return { success: false, browserLink: null };
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
  const verifyAuthentication = useCallback(async (isPhoneDevice?: boolean): Promise<void> => {
    if (isComplete || !orderRefRef.current) return;
    
    try {
      verifyCount.current++;
      console.log('Verifying authentication ' + verifyCount.current);
      const response = await makeApiCall(BANKID_CONFIG.ENDPOINTS.VERIFY_ORDER, {
        order_ref: orderRefRef.current 
      });
      console.log('Verify response:', response);
      if (response.status === 'success') {
        setIsComplete(true);
        clearAllIntervals();
        
        // For mobile devices, redirect to landing page with success message
        if (isPhoneDevice) {
          console.log('📱 Mobile authentication successful - redirecting to landing page');
          window.location.href = '/?registration=success';
        } else {
          // For desktop, show success message in modal
          showMessage('success');
        }
        console.log('Authentication successful');
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
  const initialize = useCallback(async (isPhoneDevice: boolean): Promise<string | null> => {
    const result = await beginAuthentication();
    if (!result.success) return null;
    
    // Start verification polling with device type
    verifyInterval.current = startInterval(
      () => verifyAuthentication(isPhoneDevice), 
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
    
    // Return the browserLink for immediate use
    return result.browserLink;
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
    success,
    initialize,
    clearAllIntervals,
  };
}; 