export interface ApiResponse<T> {
  data: T | T[];
  meta?: Meta;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
