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
