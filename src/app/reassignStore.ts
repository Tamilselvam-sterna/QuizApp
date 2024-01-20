import { create } from "zustand";
import { BaseStoreState } from "../models/common-models";
import { apiProvider } from "../network/apiProvider";

export interface reassignState extends BaseStoreState<[]> {}

export const reassignStore = create<reassignState>((set) => ({
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
  setPage: (page) => set({ page }),
  setSearch: (search) => set({ search }),
  async fetchData() {
    set({ isLoading: true });
    const { page, search } = reassignStore.getState();
    const result = await apiProvider.fetchReassignData({ page, search });
    if (result != null) {
      set({ data: result.data });
    }
    set({ isLoading: false });
  },
}));
