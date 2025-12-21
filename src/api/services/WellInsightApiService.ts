import apiClient from "@/api/clients";
import type { Insight } from "@/types/insight";
import type { WellInsightResponse } from "../types/wellInsightResponse";

export class WellInsightApiService {
  static async generateWellInsight(
    wellId: string,
    from: string,
    to: string,
    parameterIds: string[],
    maxMetrics: number
  ): Promise<WellInsightResponse | null> {
    try {
      const response = await apiClient.post(
        `/WellInsights/GenerateWellInsight`,
        {
          wellId: wellId,
          from: from,
          to: to,
          parameterIds: parameterIds,
          maxMetrics: maxMetrics,
        }
      );

      console.log("WellInsightResponse", response);

      return response.data;
    } catch (e) {
      console.log(e);
    }

    return null;
  }

  static async getWellInsight(insightSlug: string): Promise<Insight | null> {
    try {
      const response = await apiClient.get(
        `/WellInsights/GetWellInsight:${insightSlug}`
      );

      console.log("WellInsightResponse", response);

      return null;
    } catch (e) {
      console.log(e);
    }

    return null;
  }
}
