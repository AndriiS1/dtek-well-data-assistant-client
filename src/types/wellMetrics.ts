export interface WellMetrics {
  series: ParameterMetrics[];
}

export interface ParameterMetrics {
  wellId: string;
  parameterId: string;
  parameterName: string;
  dateTicks: DateTickMetrics[];
}

export interface DateTickMetrics {
  time: string;
  value: string;
}
