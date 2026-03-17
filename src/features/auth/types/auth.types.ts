export type BankIdStatus =
  | "success"
  | "failed"
  | "pending"
  | "no_qr_data"
  | "timeout"
  | "invalidParameters"
  | number
  | null;

export type BankIDBeginResponse = {
  message: string;
  status: "pending";
  orderRef: string;
  autoStartToken: string;
  universalLink: string;
  browserLink: string;
  qr: string;
  qrRefreshUrl: string;
};

export type BankIDAuthResponse = {
  message?: string;
  status: BankIdStatus;
  accessToken: string;
};

export type BankIDQRRefreshResponse = {
  qr: string;
};
