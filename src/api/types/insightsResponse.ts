import type { PaginationResponse } from "./paginationResponse";

export interface InsightsResponse {
  insights: PaginationResponse<InsightItemResponse>;
}

export interface InsightItemResponse {
  insightId: string;
  wellId: string;
  createdAt: string;
  from: string;
  to: string;
  interval: string;
  title: string;
  slug: string;
  summary: string;
  highlights: string[];
}
