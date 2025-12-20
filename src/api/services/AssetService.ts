import apiClient from "@/api/clients";
import type { Asset } from "@/types/asset";
import type { AssetsResponse } from "../types/assetsResponse";

export class AssetService {
  static async getAssets(): Promise<Asset[]> {
    try {
      const response = await apiClient.get<AssetsResponse>("/Assets");

      return response.data.assets.map((asset) => ({
        id: asset.id,
        name: asset.name,
        parentId: asset.parentId,
        wells: asset.wells,
      }));
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}
