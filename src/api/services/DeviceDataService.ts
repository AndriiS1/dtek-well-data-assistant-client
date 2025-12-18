import apiClient from "@/api/clients";
import type { DeviceResponse } from "@/api/types/deviceResponse";
import type { DeviceData } from "@/types/deviceData";

export class DeviceDataService {
  static async getDeviceData(
    deviceId: string,
    from: string,
    to: string
  ): Promise<DeviceData> {
    try {
      await apiClient.get<DeviceResponse>("/devices/history", {
        params: { deviceId, from, to },
      });
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
