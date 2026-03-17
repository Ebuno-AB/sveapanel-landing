import { ApiClient } from "@/core/api/ApiClient";
import { ENDPOINTS } from "@/core/api/endpoints";
import type {
  BankIDBeginResponse,
  BankIDAuthResponse,
  BankIDQRRefreshResponse,
} from "../types/auth.types";

export const authApi = {
  /** Start a BankID auth session. Returns orderRef, QR data, and app links. */
  async initAuth() {
    const { data } = await ApiClient().post<BankIDBeginResponse>(
      ENDPOINTS.auth.bankid.auth,
    );

    return data;
  },

  /** Poll the verify endpoint to check if the user has signed. */
  async verify(orderRef: string) {
    const { data } = await ApiClient().post<BankIDAuthResponse>(
      ENDPOINTS.auth.bankid.verify,
      { orderRef },
    );
    console.log(data);
    return data;
  },

  /** Get a fresh QR code string for the current session. */
  async refreshQR(orderRef: string) {
    const { data } = await ApiClient().post<BankIDQRRefreshResponse>(
      ENDPOINTS.auth.bankid.qrRefresh,
      { orderRef },
    );
    return data;
  },
};
