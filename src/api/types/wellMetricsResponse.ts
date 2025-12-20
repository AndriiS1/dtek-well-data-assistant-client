export interface WellMetricsResponse {
  series: ParameterMetricsResponse[];
}

export interface ParameterMetricsResponse {
  wellId: string;
  parameterId: string;
  parameterName: string;
  dateTicks: dateTickMetricsResponse[];
}

export interface dateTickMetricsResponse {
  time: string;
  value: string;
}
