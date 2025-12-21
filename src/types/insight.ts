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
  kpis: InsightKpisItem[];
}

export interface ParameterPayload {
  dataType: string;
  aggregation: string;
  parameters: ParameterMetrics[];
}

export interface InsightKpisItem {
  parameterId: string;
  aggregation: string;
  kind: string;
  name: string;
  value: string;
  change: string | null;
}
