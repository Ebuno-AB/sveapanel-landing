import { useState, useRef, useCallback, useEffect } from "react";
import QRCode from "qrcode";
import { authApi } from "../api/auth.api";
import { useAuthStore } from "@/core/auth/authStore";
import type { BankIdStatus } from "../types/auth.types";

const MAX_POLLS = 60;
const POLL_INTERVAL = 2000;
const QR_REFRESH_INTERVAL = 1000;

export const useBankIdLogin = () => {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<BankIdStatus>(null);
  const [error, setError] = useState<string | null>(null);
  const [universalLink, setUniversalLink] = useState<string | null>(null);

  const orderRefRef = useRef<string | null>(null);
  const pollTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const qrTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollCount = useRef(0);
  const isCancelled = useRef(false);

  const login = useAuthStore((s) => s.login);

  const cleanup = useCallback(() => {
    if (pollTimer.current) clearInterval(pollTimer.current);
    if (qrTimer.current) clearInterval(qrTimer.current);
    pollTimer.current = null;
    qrTimer.current = null;
  }, []);

  const generateQR = async (qrString: string) => {
    try {
      const url = await QRCode.toDataURL(qrString, { width: 250, margin: 2 });
      setQrDataUrl(url);
    } catch {
      console.error("QR generation failed");
    }
  };

  const startPolling = useCallback(
    (orderRef: string) => {
      pollCount.current = 0;

      // Poll verify endpoint
      pollTimer.current = setInterval(async () => {
        if (isCancelled.current) {
          cleanup();
          return;
        }

        pollCount.current++;
        if (pollCount.current > MAX_POLLS) {
          cleanup();
          setStatus("timeout");
          setError("Tidsgränsen gick ut. Försök igen.");
          return;
        }

        try {
          const res = await authApi.verify(orderRef);
          console.log("verify response:", res);
          setStatus(res.status);

          if ((res.status === "success" || res.status === 200) && res.accessToken) {
            cleanup();
            login(res.accessToken);
          } else if (res.status === "failed" || res.status === 400) {
            cleanup();
            setError(res.message ?? "Inloggningen misslyckades.");
          }
        } catch {
          // Keep polling on transient errors
        }
      }, POLL_INTERVAL);

      // Refresh QR every second
      qrTimer.current = setInterval(async () => {
        if (isCancelled.current) return;
        try {
          const res = await authApi.refreshQR(orderRef);
          if (res.qr) {
            await generateQR(res.qr);
          }
        } catch {
          // Non-critical — QR just stays stale for one tick
        }
      }, QR_REFRESH_INTERVAL);
    },
    [cleanup, login],
  );

  /** Kick off BankID login. Returns the universalLink for same-device flow. */
  const start = useCallback(async () => {
    cleanup();
    isCancelled.current = false;
    setError(null);
    setStatus("pending");
    setIsLoading(true);
    setQrDataUrl("");

    try {
      const res = await authApi.initAuth();
      console.log(res);
      orderRefRef.current = res.orderRef;
      setUniversalLink(res.universalLink);

      if (res.qr) {
        await generateQR(res.qr);
      }

      setIsLoading(false);
      startPolling(res.orderRef);
      return res.universalLink;
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message ?? "Kunde inte starta BankID. Försök igen.");
      return null;
    }
  }, [cleanup, startPolling]);

  /** Cancel an in-progress login. */
  const cancel = useCallback(() => {
    isCancelled.current = true;
    cleanup();
    setStatus(null);
    setError(null);
    setQrDataUrl("");
    orderRefRef.current = null;
  }, [cleanup]);

  useEffect(() => cleanup, [cleanup]);

  return {
    qrDataUrl,
    isLoading,
    status,
    error,
    universalLink,
    isSuccess: status === "success" || status === 200,
    isPending: status === "pending",
    start,
    cancel,
  };
};
