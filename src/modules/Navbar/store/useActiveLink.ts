// src/modules/Navbar/hooks/useActiveLinkStore.ts
import { create } from "zustand";

interface ActiveLinkState {
  activeLink: string | null;
  setActiveLink: (link: string) => void;
}

export const useActiveLinkStore = create<ActiveLinkState>((set) => ({
  activeLink: null,
  setActiveLink: (link) => set({ activeLink: link }),
}));
