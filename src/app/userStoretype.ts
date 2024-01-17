export interface GenericType<T> {
  from: number;
  to: number;
  total: number;
  totalPages: number;
  data: T[];
}

export interface BaseStoreState<T> {
  isLoading: boolean;
  data: GenericType<T>;
  fetchData: () => void;
  page: number;
  search: string;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
}
