import { create } from "zustand";
import { BaseStoreState } from "../models/common-models";
import { apiProvider } from "../network/apiProvider";
import { ReassignDetails } from "../models/re-assign";

export interface reassignState extends BaseStoreState<ReassignDetails> {
  positionId: number;
  subjectId: number;
  setDateFilter: (dateFilter: string) => void;
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

export const reassignStore = create<reassignState>((set) => ({
  isLoading: false,
  page: 1,
  search: "",
  startDate: undefined,
  endDate: undefined,
  positionId: 0,
  subjectId: 0,
  dateFilter: "All",
  isFilterApplied: false,
  data: {
    from: 0,
    to: 0,
    totalPages: 0,
    total: 0,
    data: [],
  },
  setPage: (page) => set({ page }),
  setSearch: (search) => set({ search }),
  setDateFilter: (dateFilter: string) => set({ dateFilter }),
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
      dateFilter,
      startDate,
      endDate,
      positionId,
      subjectId,
    } = reassignStore.getState();
    const result = await apiProvider.fetchReassignData({
      page,
      search,
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
