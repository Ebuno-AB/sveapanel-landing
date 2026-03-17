const env = {
  apiUrl: import.meta.env.VITE_API_URL as string || "http://api.sveapanelen.yflow.io/v1/",
  socketUrl: import.meta.env.VITE_SOCKET_URL as string || "",
  appEnv: (import.meta.env.VITE_APP_ENV as string) || "development",

  get isDevelopment() {
    return this.appEnv === "development";
  },
  get isProduction() {
    return this.appEnv === "production";
  },
};

export { env };
