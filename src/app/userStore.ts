import { create } from "zustand";
import { apiProvider } from "../network/apiProvider";
import { BaseStoreState } from "../models/common-models";
import moment from "moment";

export interface UserType {
  id: number;
  firstName: string;
  lastName: string;
}
// export interface userStoreType extends BaseStoreState<UserType> {
//   isFilterApplied: boolean;
//   setDate(date: undefined): void;
//   type: string;
//   reset(): void;
//   date: undefined;
//   setIsFilterApplied(isApplied: boolean): void;
// }

// export const userStore = create<userStoreType>((set) => ({
//   page: 1,
//   type: "Today",
//   search: "",
//   date: undefined,
//   data: {
//     from: 0,
//     to: 0,
//     total: 0,
//     totalPages: 0,
//     data: [],
//   },
//   isFilterApplied: false,
//   setIsFilterApplied: (isApplied: boolean) =>
//     set({ isFilterApplied: isApplied }),
//   isLoading: false,
//   setPage: (page) => set({ page }),
//   setSearch: (search) => set({ search }),
//   async fetchData() {
//     set({ isLoading: true });
//     // const { page, search } = userStore.getState();
//     // const result = await apiProvider.fetchAllUser({ page, search });
//     // if (result != null) {
//     //   set({ data: result.data ?? [] });
//     // }
//     // set({ isLoading: false });
//     const filters = userStore.getState();
//     const data = {
//       startDate:
//         filters.date == null
//           ? null
//           : moment(filters.date[0]).format("YYYY-MM-DD"),
//       endDate:
//         filters.date == null
//           ? null
//           : moment(filters.date[1]).format("YYYY-MM-DD"),
//       dateFilter: filters.type.replaceAll(" ", ""),
//     };
//   },
//   setDate: (date: undefined) => set({ date }),
//   reset: () => {
//     set({
//       type: "Today",
//       page: 1,
//       search: "",
//       date: undefined,
//       isFilterApplied: false,
//     });
//   },
// }));

export interface userStoreType extends BaseStoreState<UserType> {}

export const userStore = create<userStoreType>((set) => ({
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
    const { page, search } = userStore.getState();
    const result = await apiProvider.fetchAllUser({ page, search });
    if (result != null) {
      set({ data: result.data ?? [] });
    }
    set({ isLoading: false });
  },
}));
