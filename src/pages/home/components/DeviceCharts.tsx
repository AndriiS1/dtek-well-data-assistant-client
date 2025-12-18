import { DeviceDataService } from "@/api/services/DeviceDataService";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DeviceData } from "../../../types/deviceData";
import CustomCalendar from "./CustomCalendar";

interface ChartProps {
  deviceId: string;
  from: string | null;
  to: string | null;
}

const DeviceChart = ({ deviceId, from, to }: ChartProps) => {
  const [deviceData, setDeviceData] = useState<DeviceData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await DeviceDataService.getDeviceData(deviceId, from, to);
      setDeviceData(data);
    };

    if (from && to) {
      fetchData();
    }
  }, [deviceId, from, to]);

  return (
    <div>
      <CustomCalendar />
      <div className="h-100 w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={deviceData?.telemetryData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />

            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#facc15"
              strokeWidth={3}
              dot={{ r: 4, fill: "#facc15" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DeviceChart;
