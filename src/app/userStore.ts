import { create } from "zustand";
import { apiProvider } from "../network/apiProvider";
import { BaseStoreState } from "./userStoretype";

export const userStore = create((set) => ({
  page: 1,
  search: "",
  AlluserData: [],
  isloading: false,
  setPage: (page) => set({ page }),
  setSearch: (search) => set({ search }),

  async fetchAlluser() {
    const { page, search } = userStore.getState();

    const result = await apiProvider.fetchAllUser({ page, search });
    if (result != null) {
      set({ AlluserData: result.data ?? [] });
    }
  },
}));
