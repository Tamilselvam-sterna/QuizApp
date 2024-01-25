import { create } from "zustand";
import { apiProvider } from "../network/apiProvider";
import { BaseStoreState } from "../models/common-models";

export interface UserType {
  id: number;
  firstName: string;
  lastName: string;
}

export interface userStoreType extends BaseStoreState<UserType> {
  positionId: string | number;
  roleId: string | number;
  dateFilter: string;
  isFilterApplied: boolean;
  setPosition: (position: string) => void;
  setRoleId: (roleId: string) => void;
  setDateFilter: (search: string) => void;
  setIsFilterApplied: (isApplied: boolean) => void;
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
  startDate: string | undefined;
  endDate: string | undefined;
  reset: () => void;
}

export const userStore = create<userStoreType>((set) => ({
  page: 1,
  search: "",
  dateFilter: "All",
  positionId: 0,
  isFilterApplied: false,
  startDate: undefined,
  endDate: undefined,
  roleId: 0,

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
  setDateFilter: (type: string) => set({ dateFilter: type }),
  setDateRange: (startDate: string, endDate: string) =>
    set({ startDate, endDate }),
  setPosition: (position: string) => set({ positionId: position }),
  setRoleId: (roleId: string) => set({ roleId }),
  setStartDate: (startDate: string) => set({ startDate }),
  setEndDate: (endDate: string) => set({ endDate }),
  setIsFilterApplied: (isApplied: boolean) =>
    set({ isFilterApplied: isApplied }),
  reset: () => {
    set({
      page: 1,
      search: "",
      dateFilter: "All",
      positionId: 0,
      isFilterApplied: false,
      startDate: undefined,
      endDate: undefined,
    });
  },

  async fetchData() {
    set({ isLoading: true });
    const { page, search, positionId, dateFilter, startDate, endDate, roleId } =
      userStore.getState();
    const result = await apiProvider.fetchAllUser({
      page,
      search,
      positionId,
      dateFilter,
      startDate,
      endDate,
      roleId,
    });
    if (result != null) {
      set({ data: result.data ?? [] });
    }
    set({ isLoading: false });
  },
}));
