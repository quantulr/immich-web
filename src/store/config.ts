import { create } from "zustand";

interface ConfigState {
  collapsed: boolean;
  toggleCollapse: () => void;
}

const useConfigStore = create<ConfigState>()((set) => ({
  collapsed: false,
  toggleCollapse: () => set((state) => ({ collapsed: !state.collapsed })),
}));

export default useConfigStore;
