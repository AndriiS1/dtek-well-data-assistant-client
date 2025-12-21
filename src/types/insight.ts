import type { ParameterMetrics } from "./wellMetrics";

export interface Insight {
  insightId: string;
  wellId: string;
  createdAt: string;
  from: string;
  to: string;
  interval: string;
  title: string;
  slug: string;
  summary: string;
  payload: InsightPayload;
  highlights: string[];
  suspicions: string[];
  recommendedActions: string[];
}

export interface InsightPayload {
  parameterPayloads: ParameterPayload[];
  kpis: InsightKpis[];
}

export interface ParameterPayload {
  dataType: string;
  aggregation: string;
  parameters: ParameterMetrics[];
}

export interface InsightKpis {
  parameterId: string;
  aggregation: string;
  name: string;
  items: InsightKpisItem[];
}

export interface InsightKpisItem {
  kind: string;
  value: string;
}
