import apiClient from "@/api/clients";
import type { WellInsightResponse } from "../types/wellInsightResponse";

export class WellInsightApiService {
  static async getWell(
    wellId: string,
    from: string,
    to: string,
    parameterIds: string[],
    maxMetrics: number
  ): Promise<WellInsightResponse | null> {
    try {
      const response = await apiClient.post<WellInsightResponse>(
        `/WellInsights/GenerateWellInsight`,
        {
          wellId: wellId,
          from: from,
          to: to,
          parameterIds: parameterIds,
          maxMetrics: maxMetrics,
        }
      );

      return response.data;
    } catch (e) {
      console.log(e);
    }

    return null;
  }
}
