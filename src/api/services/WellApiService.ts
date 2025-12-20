import apiClient from "@/api/clients";
import type { Well } from "@/types/well";
import type { WellResponse } from "../types/wellResponse";

export class WellApiService {
  static async getWell(wellId: string): Promise<Well | null> {
    try {
      const response = await apiClient.get<WellResponse>(`/Wells/${wellId}`);

      const well = response.data;
      return {
        id: well.id,
        name: well.name,
        externalId: well.externalId,
        assetId: well.assetId,
        assetName: well.assetName,
        parameters: well.parameters.map((parameter) => ({
          id: parameter.id,
          name: parameter.name,
          dataType: parameter.dataType,
        })),
      };
    } catch (e) {
      console.log(e);
    }

    return null;
  }
}
