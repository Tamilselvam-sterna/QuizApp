import { create } from "zustand";
import { apiProvider } from "../network/apiProvider";
import { BaseStoreState } from "../models/common-models";

export interface TestStoreState extends BaseStoreState<[]> {}
export const testStore = create<TestStoreState>((set) => ({
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
    const { page, search } = testStore.getState();
    const result = await apiProvider.fetchAllCourses({ page, search });
    if (result != null) {
      set({ data: result.data ?? [] });
    }
    set({ isLoading: false });
  },
}));
