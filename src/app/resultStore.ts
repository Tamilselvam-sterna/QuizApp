import { create } from "zustand";
import { apiProvider } from "../network/apiProvider";

const resultStore = create((set) => ({
    page: 1,
    search: "",
    resultData: [],
    setPage: (page) => set({ page: page }),
    setSearch: (search) => set({ search: search })
    async fetchAllResult() {
        const { page, search } = resultStore.getState()
        const result = await apiProvider.fetchAllResult({ page, search })
        if (result != null) {
            set({resultData: result.data} ?? [])
        }
    } 

   

}))