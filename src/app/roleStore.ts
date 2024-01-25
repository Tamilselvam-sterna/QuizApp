import { create } from "zustand";
import { BaseStoreState } from "../models/common-models";
import { apiProvider } from "../network/apiProvider";
import { RoleDataType } from "../models/role";

export interface positionStoreState extends BaseStoreState<RoleDataType> {}

export const roleStore = create<positionStoreState>((set) => ({
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
    const { page, search } = roleStore.getState();
    const result = await apiProvider.fetchAllRole({ page, search });

    if (result != null) {
      set({ data: result.data ?? [] });
    }
    set({ isLoading: false });
  },
}));
