export interface WellMetrics {
  series: ParameterMetrics[];
}

export interface ParameterMetrics {
  wellId: string;
  parameterId: string;
  parameterName: string;
  dateTicks: dateTickMetrics[];
}

export interface dateTickMetrics {
  time: string;
  value: string;
}
