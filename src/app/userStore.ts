import { create } from "zustand";
import { apiProvider } from "../network/apiProvider";
import { BaseStoreState } from "../models/common-models";

export interface UserType {
  id: number;
  firstName: string;
  lastName: string;
}
export interface userStoreType extends BaseStoreState<UserType> {
  isFilterApplied: boolean;
  applyFilter: () => void;
  resetFilter: () => void;
  date: string;
}

export const userStore = create<userStoreType>((set) => ({
  page: 1,
  search: "",
  date: "",
  data: {
    from: 0,
    to: 0,
    total: 0,
    totalPages: 0,
    data: [],
  },
  isFilterApplied: false,
  applyFilter: () => {},
  resetFilter: () => {},
  isLoading: false,
  setPage: (page) => set({ page }),
  setSearch: (search) => set({ search }),
  async fetchData() {
    set({ isLoading: true });
    const { page, search } = userStore.getState();
    const result = await apiProvider.fetchAllUser({ page, search });
    if (result != null) {
      set({ data: result.data ?? [] });
    }
    set({ isLoading: false });
  },
}));
