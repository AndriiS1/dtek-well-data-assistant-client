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
  ): Promise<string | null> {
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

      return response.data.slug;
    } catch (e) {
      console.log(e);
    }

    return null;
  }

  static async getWellInsight(insightSlug: string): Promise<Insight | null> {
    try {
      const { data } = await apiClient.get<WellInsightResponse>(
        `/WellInsights/GetWellInsight:${insightSlug}`
      );

      const mappedInsight: Insight = {
        insightId: data.insightId,
        wellId: data.wellId,
        createdAt: data.createdAt,
        from: data.from,
        to: data.to,
        interval: data.interval,
        title: data.title,
        slug: data.slug,
        summary: data.summary,
        highlights: data.highlights,
        suspicions: data.suspicions,
        recommendedActions: data.recommendedActions,
        payload: {
          kpis: data.payload.kpis.map((kpi) => ({
            parameterId: kpi.parameterId,
            kind: kpi.kind,
            name: kpi.name,
            value: kpi.value,
            change: kpi.change,
          })),
          parameterPayloads: data.payload.aggregations.map((agg) => ({
            dataType: agg.dataType,
            aggregation: agg.aggregation,
            parameters: agg.parameters.map((param) => ({
              wellId: param.wellId,
              parameterId: param.parameterId,
              parameterName: param.parameterName,
              dateTicks: param.dateTicks.map((tick) => ({
                time: tick.timestamp,
                value: tick.value,
              })),
            })),
          })),
        },
      };

      return mappedInsight;
    } catch (e) {
      console.error("Error fetching well insight:", e);
      return null;
    }
  }

  static async filterWellInsights(
    pagination: PaginationParams
  ): Promise<Pagination<InsightItem> | null> {
    try {
      const response = await apiClient.post<InsightsResponse>(
        `/WellInsights/FilterWellInsights`,
        {
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
