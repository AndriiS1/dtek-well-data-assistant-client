export interface WellInsightResponse {
  insightId: string;
  wellId: string;
  createdAt: string;
  from: string;
  to: string;
  interval: string;
  title: string;
  slug: string;
  summary: string;
  payload: InsightPayloadResponse;
  kpis: InsightKpisItemResponse[];
  highlights: string[];
  suspicions: string[];
  recommendedActions: string[];
}

export interface InsightPayloadResponse {
  parameterId: InsightParameterItemResponse[];
  total: number;
  offset: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface InsightParameterItemResponse {
  parameterId: string;
  name: string;
  dataType: string;
  metrics: InsightMetricsItemResponse[];
  aggregation: string;
}

export interface InsightKpisItemResponse {
  parameterId: string;
  kind: string;
  name: string;
  value: string;
  change: string | null;
}

export interface InsightMetricsItemResponse {
  timestamp: string;
  value: string;
}
