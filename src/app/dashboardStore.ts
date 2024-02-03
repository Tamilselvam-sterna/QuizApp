import { create } from "zustand";
import { apiProvider } from "../network/apiProvider";
import { DashBoardStats } from "../models/dashboard";

export interface dashboardState {
  setDateFilter: (dateFilter: string) => void;
  setIsFilterApplied: (isApplied: boolean) => void;
  setStartDate: (startDate: string | undefined) => void;
  setEndDate: (endDate: string | undefined) => void;
  startDate: string | undefined;
  endDate: string | undefined;
  dateFilter: "All" | "Today" | " Yesterday" | "MonthTillDate" | "DateRange";
  isFilterApplied: boolean;
  reset: () => void;
  fetchData: () => void;
  data: DashBoardStats;
}

export const dashboardStore = create<dashboardState>((set) => ({
  isLoading: false,
  startDate: undefined,
  endDate: undefined,
  dateFilter: "All",
  isFilterApplied: false,
  data: {
    totalUsers: 0,
    totalTestAssignedUsers: 0,
    totalTestCompletedUsers: 0,
    totalTestInCompleteUsers: 0,
    totalSubjects: 0,
    subjectData: [
      {
        subject: "",
        totalUser: 0,
        testCompletedUser: 0,
        testInCompleteUser: 0,
      },
    ],
    lastestResults: [
      {
        id: 0,
        user: {
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          updatedAt: "",
        },
        test: {
          subject: "",
        },
        score: "",
        percentage: 0,
      },
    ],
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
