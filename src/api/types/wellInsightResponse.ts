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
  aggregations: ParameterPayloadResponse[];
  kpis: InsightKpisItemResponse[];
}

export interface ParameterPayloadResponse {
  dataType: string;
  aggregation: string;
  parameters: InsightParameterMetricsResponse[];
}

export interface InsightKpisItemResponse {
  parameterId: string;
  kind: string;
  name: string;
  value: string;
  aggregation: string;
  change: string | null;
}

export interface InsightParameterMetricsResponse {
  wellId: string;
  parameterId: string;
  parameterName: string;
  dateTicks: InsightDateTickMetricsResponse[];
}

export interface InsightDateTickMetricsResponse {
  timestamp: string;
  value: string;
}
