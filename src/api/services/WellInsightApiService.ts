import apiClient from "@/api/clients";
import type { Insight } from "@/types/insight";
import type { InsightItem } from "@/types/insights";
import type { Pagination } from "@/types/pagination";
import type { PaginationParams } from "@/types/paginationParams";
import type { InsightsResponse } from "../types/insightsResponse";
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

  static async filterWellInsights(
    wellId: string,
    pagination: PaginationParams
  ): Promise<Pagination<InsightItem> | null> {
    try {
      const response = await apiClient.post<InsightsResponse>(
        `/WellInsights/FilterWellInsights`,
        {
          wellId: wellId,
          pagination: {
            limit: pagination.limit,
            offset: pagination.offset,
          },
        }
      );

      return {
        items: response.data.insights.items.map((item) => ({
          insightId: item.insightId,
          wellId: item.wellId,
          createdAt: item.createdAt,
          from: item.from,
          to: item.to,
          interval: item.interval,
          title: item.title,
          slug: item.slug,
          summary: item.summary,
          highlights: item.highlights,
        })),
        limit: response.data.insights.limit,
        total: response.data.insights.total,
        offset: response.data.insights.offset,
        hasNext: response.data.insights.hasNext,
        hasPrevious: response.data.insights.hasPrevious,
      };
    } catch (e) {
      console.log(e);
    }

    return null;
  }
}
