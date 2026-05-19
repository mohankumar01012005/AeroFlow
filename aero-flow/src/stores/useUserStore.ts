import { create } from "zustand";

type UserState = {
  userId: string | null;
  email: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: { id: string; email: string | null }) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
};

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  email: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({
      userId: user.id,
      email: user.email,
      isAuthenticated: true,
      isLoading: false,
    }),

  clearUser: () =>
    set({
      userId: null,
      email: null,
      isAuthenticated: false,
      isLoading: false,
    }),

  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),
}));