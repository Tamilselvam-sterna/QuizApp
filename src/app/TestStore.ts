import { create } from "zustand";
import { apiProvider } from "../network/apiProvider";

export const testStore = create((set) => ({
  testData: [],
  isloading: false,

  async fetchAllTest() {
    const result = await apiProvider.fetchAllTest();
    if (result != null) {
      set({ testData: result.data ?? [] });
    }
  },
}));
