export interface DeviceData {
  telemetryData: TelemetryData[];
}

export interface TelemetryData {
  time: string;
  value: number;
}
