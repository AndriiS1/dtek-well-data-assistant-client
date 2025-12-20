import { WellApiService } from "@/api/services/WellApiService";
import type { Well } from "@/types/well";
import { useEffect, useState } from "react";
import CustomCalendar from "./CustomCalendar";
import WellCharts from "./WellCharts";

interface ChartProps {
  deviceId: string;
  from: string | null;
  to: string | null;
}

const WellOverview = ({ deviceId, from, to }: ChartProps) => {
  const [deviceData, setDeviceData] = useState<Well | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await WellApiService.getWell(deviceId);
      setDeviceData(data);
    };

    fetchData();
  }, [deviceId, from, to]);

  return (
    <div>
      <CustomCalendar />
      {deviceData?.assetName}
      <WellCharts telemetry={[]} />
    </div>
  );
};

export default WellOverview;
