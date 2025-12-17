import type { DeviceResponse } from "./deviceResponse";

export interface AssetResponse {
  id: string;
  name: string;
  devices: DeviceResponse[];
}
