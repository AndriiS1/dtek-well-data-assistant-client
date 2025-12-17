import type { DeviceData } from "../../types/deviceData";

export const fetchDeviceData = async (
  deviceId: string
): Promise<DeviceData> => {
  return {
    telemetryData: [
      { time: "08:00", value: 400 },
      { time: "09:00", value: 300 },
      { time: "10:00", value: 600 },
      { time: "11:00", value: 800 },
      { time: "12:00", value: 500 },
    ],
  };
};
