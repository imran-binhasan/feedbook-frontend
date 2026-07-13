import { create } from "zustand";
import type { AuthState, UserProfile } from "@/features/auth/types/auth";

interface AuthActions {
  setUser: (user: UserProfile, sessionExpiresAt?: string) => void;
  clearAuth: () => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  ...initialState,

  setUser: (user: UserProfile, sessionExpiresAt?: string) =>
    set({
      user,
      isAuthenticated: true,
      sessionExpiresAt,
    }),

  clearAuth: () =>
    set({ ...initialState }),
}));
