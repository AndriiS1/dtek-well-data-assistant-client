import apiClient from "@/api/clients";
import type { DeviceData } from "@/types/deviceData";
import type { AssetWellResponse } from "../types/assetsResponse";

export class WellMetricsApiService {
  static async getWell(wellId: string): Promise<DeviceData> {
    try {
      await apiClient.get<AssetWellResponse>(`/Wells/${wellId}`);
    } catch (e) {
      console.log(e);
    }

    return {
      telemetryData: [
        { time: "08:00", value: 400 },
        { time: "09:00", value: 300 },
        { time: "10:00", value: 600 },
        { time: "11:00", value: 800 },
        { time: "12:00", value: 500 },
      ],
    };
  }
}
