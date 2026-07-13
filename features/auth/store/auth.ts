import { create } from "zustand";
import type { AuthState, UserProfile } from "@/features/auth/types/auth";

interface AuthActions {
  setUser: (user: UserProfile, sessionExpiresAt?: string) => void;
  clearAuth: () => void;
}

const initialState: AuthState = {
  user: null,
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  ...initialState,

  setUser: (user: UserProfile, sessionExpiresAt?: string) =>
    set({
      user,
      sessionExpiresAt,
    }),

  clearAuth: () =>
    set({ ...initialState }),
}));
