import { create } from "zustand";

export type UserState = {
  currentUser: { id: string; username: string } | undefined;
  setCurrentUser: (user: { id: string; username: string }) => void;
};

export const useUserStore = create<UserState>()((set) => ({
  currentUser: undefined,
  setCurrentUser: (user: { id: string; username: string }) =>
    set({ currentUser: user }),
}));
