import { create } from "zustand";
import { apiProvider } from "../network/apiProvider";
import { BaseStoreState } from "../models/common-models";

export interface resultStoreState extends BaseStoreState<[]> {}

export const resultStore = create<resultStoreState>((set) => ({
  isLoading: false,
  page: 1,
  search: "",
  data: {
    from: 0,
    to: 0,
    totalPages: 0,
    total: 0,
    data: [],
  },
  setPage: (page) => set({ page: page }),
  setSearch: (search) => set({ search: search }),
  async fetchData() {
    set({ isLoading: true });
    const { page, search } = resultStore.getState();
    const result = await apiProvider.fetchAllResult({ page, search });
    if (result != null) {
      set({ data: result.data });
    }
    set({ isLoading: false });
  },
}));
