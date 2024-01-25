import { create } from "zustand";
import { BaseStoreState } from "../models/common-models";
import { apiProvider } from "../network/apiProvider";
import { PositionDataType } from "../models/position";

export interface positionStoreState extends BaseStoreState<PositionDataType> {
  reset: () => void;
}

export const positionStore = create<positionStoreState>((set) => ({
  page: 1,
  search: "",
  data: {
    from: 0,
    to: 0,
    total: 0,
    totalPages: 0,
    data: [],
  },
  isLoading: false,
  setPage: (page) => set({ page }),
  setSearch: (search) => set({ search }),
  async fetchData() {
    set({ isLoading: true });
    const { page, search } = positionStore.getState();
    const result = await apiProvider.fetchAllPosition({ page, search });

    if (result != null) {
      set({ data: result.data ?? [] });
    }
    set({ isLoading: false });
  },
  reset() {
    set({
      page: 1,
      search: "",
      data: {
        from: 0,
        to: 0,
        total: 0,
        totalPages: 0,
        data: [],
      },
    });
  },
}));
