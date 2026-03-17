import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { tokenStorage } from "./tokenStorage";

type AuthState = {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  login: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: !!tokenStorage.getToken(),

      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

      login: (token: string) => {
        tokenStorage.setToken(token);
        set({ isAuthenticated: true });
      },

      logout: () => {
        tokenStorage.clear();
        set({ isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
    },
  ),
);
