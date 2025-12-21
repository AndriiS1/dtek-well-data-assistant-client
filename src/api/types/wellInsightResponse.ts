import type { ParameterMetricsResponse } from "./wellMetricsResponse";

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
  highlights: string[];
  suspicions: string[];
  recommendedActions: string[];
  dataType: string;
  aggregation: string;
}

export interface InsightPayloadResponse {
  parametersPayloads: ParameterPayloadResponse[];
  kpis: InsightKpisItemResponse[];
}

export interface ParameterPayloadResponse {
  dataType: string;
  aggregation: string;
  parameters: ParameterMetricsResponse[];
}

export interface InsightKpisItemResponse {
  parameterId: string;
  kind: string;
  name: string;
  value: string;
  change: string | null;
}
