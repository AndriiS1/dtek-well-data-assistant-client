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
  kpis: InsightKpisResponse[];
}

export interface ParameterPayloadResponse {
  dataType: string;
  aggregation: string;
  parameters: InsightParameterMetricsResponse[];
}

export interface InsightKpisResponse {
  parameterId: string;
  name: string;
  aggregation: string;

  items: InsightKpisItemResponse[];
}

export interface InsightKpisItemResponse {
  kind: string;
  value: string;
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
