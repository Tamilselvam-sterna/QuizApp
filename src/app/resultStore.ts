import { create } from "zustand";
import { apiProvider } from "../network/apiProvider";
import { BaseStoreState } from "../models/common-models";

export interface resultStoreState extends BaseStoreState<[ResultResponse]> {
  percentage: string;
  positionId: number;
  subjectId: number;
  setDateFilter: (dateFilter: string) => void;
  setPercentage: (percentage: string) => void;
  setIsFilterApplied: (isApplied: boolean) => void;
  setStartDate: (startDate: string | undefined) => void;
  setEndDate: (endDate: string | undefined) => void;
  setPosition: (position: string) => void;
  setSubject: (subject: string) => void;
  startDate: string | undefined;
  endDate: string | undefined;
  dateFilter: string;
  isFilterApplied: boolean;
  reset: () => void;
}

export const resultStore = create<resultStoreState>((set) => ({
  isLoading: false,
  page: 1,
  search: "",
  startDate: undefined,
  endDate: undefined,
  positionId: 0,
  subjectId: 0,
  dateFilter: "All",
  isFilterApplied: false,
  percentage: "All",
  data: {
    from: 0,
    to: 0,
    totalPages: 0,
    total: 0,
    data: [],
  },
  setPage: (page) => set({ page: page }),
  setSearch: (search) => set({ search: search }),
  setDateFilter: (dateFilter: string) => set({ dateFilter }),
  setPercentage: (percentage) => set({ percentage }),
  setStartDate: (startDate: string | undefined) => set({ startDate }),
  setPosition: (position: string) => set({ positionId: Number(position) }),
  setSubject: (subjectId: string) => set({ subjectId: Number(subjectId) }),
  setEndDate: (endDate: string | undefined) => set({ endDate }),
  setIsFilterApplied: (isFilterApplied: boolean) => set({ isFilterApplied }),
  reset: () => {
    set({
      page: 1,
      search: "",
      dateFilter: "All",
      percentage: "All",
      positionId: 0,
      subjectId: 0,
      isFilterApplied: false,
      startDate: undefined,
      endDate: undefined,
    });
  },

  async fetchData() {
    set({ isLoading: true });
    const {
      page,
      search,
      percentage,
      dateFilter,
      startDate,
      endDate,
      positionId,
      subjectId,
    } = resultStore.getState();
    const result = await apiProvider.fetchAllResult({
      page,
      search,
      percentage,
      dateFilter,
      startDate,
      endDate,
      positionId,
      subjectId,
    });
    if (result != null) {
      set({ data: result.data });
    }
    set({ isLoading: false });
  },
}));
