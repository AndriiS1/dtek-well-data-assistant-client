import apiClient from "@/api/clients";
import type { Aggregation } from "@/types/aggregation";
import type { ParameterMetrics } from "@/types/wellMetrics";
import type { WellMetricsResponse } from "../types/wellMetricsResponse";

export class WellMetricsApiService {
  static async filterWellMetrics(
    wellId: string,
    from: string,
    to: string,
    parameterIds: string[],
    aggregation: Aggregation
  ): Promise<ParameterMetrics[]> {
    try {
      const response = await apiClient.post<WellMetricsResponse>(
        `/WellMetrics/FilterWellMetrics`,
        {
          from: from,
          to: to,
          wellId: wellId,
          parameterIds: parameterIds,
          aggregation: {
            interval: aggregation.interval,
            type: aggregation.type,
          },
        }
      );

      return response.data.series.map((series) => ({
        wellId: series.wellId,
        parameterId: series.parameterId,
        parameterName: series.parameterName,
        dateTicks: series.dateTicks.map((dateTick) => ({
          value: dateTick.value,
          time: dateTick.time,
        })),
      }));
    } catch (e) {
      console.log(e);
    }

    return [];
  }

  static async getGroupingIntervals(): Promise<string[]> {
    try {
      const response = await apiClient.get<string[]>(
        `/WellMetrics/GetGroupingIntervals`
      );

      return response.data;
    } catch (e) {
      console.log(e);
    }

    return [];
  }
}
