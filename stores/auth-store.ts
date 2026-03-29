'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AuthState = {
  token: string | null;
  username: string | null;
  isAuthenticated: boolean;
  setAuth: (payload: { token: string; username: string }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      username: null,
      isAuthenticated: false,
      setAuth: ({ token, username }) => {
        set({ token, username, isAuthenticated: true });
      },
      logout: () => {
        set({ token: null, username: null, isAuthenticated: false });
      }
    }),
    {
      name: 'shop-auth-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
