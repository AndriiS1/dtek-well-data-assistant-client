import apiClient from "@/api/clients";
import type { AssetResponse } from "@/api/types/assetResponse";
import type { Asset } from "@/types/asset";

export class AssetService {
  static async getDeviceData(): Promise<Asset[]> {
    try {
      await apiClient.get<AssetResponse>("/devices/history");
    } catch (e) {
      console.log(e);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
      {
        id: "1",
        name: "Oil Well Alpha",
        devices: [
          { id: "d1", name: "Pressure Sensor", status: "online" },
          { id: "d2", name: "Flow Meter", status: "online" },
        ],
      },
      {
        id: "2",
        name: "Gas Drill Beta",
        devices: [{ id: "d3", name: "Temperature Gauge", status: "offline" }],
      },
    ];
  }
}
