export interface CommonResponse<T> {
  from: number;
  to: number;
  total: number;
  totalPages: number;
  data: T[];
}

export interface GetReq {
  page: number;
  search: string;
}

export interface BaseStoreState<T> {
  isLoading: boolean;
  data: CommonResponse<T>;
  fetchData: () => void;
  page: number;
  search: string;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
}
