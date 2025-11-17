import { create } from 'zustand';

interface BaseState {
  state: boolean;
  setState: (value: boolean) => void;
}

export const useProfileDialogStore = create<BaseState>((set) => ({
  state: false,
  setState: (value: boolean) => set(() => ({ state: value })),
}));

export const useMyProfileDialogStore = create<BaseState>((set) => ({
  state: false,
  setState: (value: boolean) => set(() => ({ state: value })),
}));

export const useTitleSidebarStore = create<BaseState>((set) => ({
  state: false,
  setState: (value) => set({ state: value }),
}));

export const useMyTitleDialogStore = create<BaseState>((set) => ({
  state: false,
  setState: (value: boolean) => set(() => ({ state: value })),
}));
