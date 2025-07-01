export interface ApiResponse<T> {
  data: T;
  meta?: Meta;
}

interface Meta {
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}
