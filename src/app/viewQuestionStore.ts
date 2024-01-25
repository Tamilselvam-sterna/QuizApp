import { create } from "zustand";
import { BaseStoreState } from "../models/common-models";
import { apiProvider } from "../network/apiProvider";

export interface viewQuestionStore extends BaseStoreState<[]> {}
export const viewQuestionsStore = create<viewQuestionStore>((set) => ({
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
  async fetchData(id: number) {
    set({ isLoading: true });
    const { page, search } = viewQuestionsStore.getState();
    const result = await apiProvider.viewQuestion({
      page,
      search,
      subjectId: id,
    });
    if (result != null) {
      set({ data: result.data ?? [] });
    }
    set({ isLoading: false });
  },
}));

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { create } from "zustand";
// import apiProvider from "../../../network/apiProvider";

// const taskValueStore = create((set) => ({
//   loading: false,
//   viewDatas: [],
//   page: 1,
//   search: "",
//   status: 0,
//   type: 0,
//   user: 0,
//   isFilterApplied: false,
//   taskValues: async (id: number) => {
//     set({ loading: true });
//     try {
//       const filter: any = taskValueStore.getState();
//       const paramas = {
//         page: filter.page,
//         search: filter.search,
//         status: filter.status,
//         type: filter.type,
//         user: filter.user,
//       };
//       const result = await apiProvider.viewTask(paramas, id);
//       if (result != null) {
//         set({ viewDatas: result.data ?? [] });
//       }
//     } catch (e) {
//       console.log(e);
//     }
//     set({ loading: false });
//   },

//   setPage: (page: any) => set({ page: page }),
//   setSearch: (search: any) => set({ search: search }),
//   setStatus: (status: any) => set({ status: status }),
//   setType: (type: any) => set({ type: type }),
//   setUser: (user: any) => set({ user: user }),
//   setFilter: (isFilterApplied: any) =>
//     set({ isFilterApplied: isFilterApplied }),
//   reset: () => {
//     set({
//       page: 1,
//       search: "",
//       status: 0,
//       type: 0,
//       user: 0,
//       isFilterApplied: false,
//     });
//   },
// }));

// export default taskValueStore;
