import type { PaginationResponse } from "./paginationResponse";

export interface ActionsResponse {
  actions: PaginationResponse<ActionItemResponse>;
}

export interface ActionItemResponse {
  id: string;
  wellId: string;
  timestamp: string;
  title: string;
  details: string;
  source: string;
}
