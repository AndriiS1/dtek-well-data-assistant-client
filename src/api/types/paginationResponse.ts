export interface PaginationResponse<T> {
  items: T[];
  total: number;
  offset: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
