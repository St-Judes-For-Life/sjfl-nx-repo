export type PaginationReq = {
  page: number;
  size: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  lastRow: number;
};
