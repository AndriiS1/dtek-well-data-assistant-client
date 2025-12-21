import type { ActionItem } from "@/types/actions";
import type { Pagination } from "@/types/pagination";
import type { PaginationParams } from "@/types/paginationParams";
import apiClient from "../clients";
import type { ActionsResponse } from "../types/actionsResponse";

export class WellActionsApiService {
  static async getWellActions(
    wellId: string,
    from: string,
    to: string,
    pagination: PaginationParams
  ): Promise<Pagination<ActionItem> | null> {
    try {
      const response = await apiClient.post<ActionsResponse>(
        "/WellActions/FilterWellActions",
        {
          wellId: wellId,
          from: from,
          to: to,
          pagination: {
            limit: pagination.limit,
            offset: pagination.offset,
          },
          fromUtc: from,
          toUtc: to,
        }
      );

      return {
        items: response.data.actions.items.map((item) => ({
          id: item.id,
          wellId: item.wellId,
          timestamp: item.timestamp,
          details: item.details,
          source: item.source,
          title: item.title,
        })),
        limit: response.data.actions.limit,
        total: response.data.actions.total,
        offset: response.data.actions.offset,
        hasNext: response.data.actions.hasNext,
        hasPrevious: response.data.actions.hasPrevious,
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
