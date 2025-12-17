import type { Device } from "./device";

export interface Asset {
  id: string;
  name: string;
  devices: Device[];
}
