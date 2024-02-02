import { create } from "zustand";
import { apiProvider } from "../network/apiProvider";

export interface dashboardState {
  setDateFilter: (dateFilter: string) => void;
  setIsFilterApplied: (isApplied: boolean) => void;
  setStartDate: (startDate: string | undefined) => void;
  setEndDate: (endDate: string | undefined) => void;
  startDate: string | undefined;
  endDate: string | undefined;
  dateFilter: string;
  isFilterApplied: boolean;
  reset: () => void;
}

export const dashboardStore = create<dashboardState>((set) => ({
  isLoading: false,
  startDate: undefined,
  endDate: undefined,
  dateFilter: "All",
  isFilterApplied: false,
  data: {
    from: 0,
    to: 0,
    totalPages: 0,
    total: 0,
    data: [],
  },

  setDateFilter: (dateFilter: string) => set({ dateFilter }),
  setStartDate: (startDate: string | undefined) => set({ startDate }),
  setEndDate: (endDate: string | undefined) => set({ endDate }),
  setIsFilterApplied: (isFilterApplied: boolean) => set({ isFilterApplied }),
  reset: () => {
    set({
      dateFilter: "All",
      isFilterApplied: false,
      startDate: undefined,
      endDate: undefined,
    });
  },
  async fetchData() {
    const { dateFilter, startDate, endDate } = dashboardStore.getState();
    const result = await apiProvider.fetchDashBoardData({
      dateFilter,
      startDate,
      endDate,
    });
    if (result != null) {
      set({ data: result.data });
    }
  },
}));
