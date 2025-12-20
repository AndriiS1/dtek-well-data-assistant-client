import { WellApiService } from "@/api/services/WellApiService";
import { WellMetricsApiService } from "@/api/services/WellMetricsApiService";
import type { Well } from "@/types/well";
import type { ParameterMetrics } from "@/types/wellMetrics";
import { useEffect, useState } from "react";
import CustomCalendar from "./CustomCalendar";
import WellCharts from "./WellCharts";
import WellMetadata from "./WellMetadata";

interface ChartProps {
  deviceId: string;
  from: string | null;
  to: string | null;
}

const WellOverview = ({ deviceId, from, to }: ChartProps) => {
  const [well, setWell] = useState<Well | null>(null);
  const [wellParameters, setWellParameters] = useState<ParameterMetrics[]>([]);

  useEffect(() => {
    const fetchData = async (from: string, to: string) => {
      const wellData = await WellApiService.getWell(deviceId);
      const wellParameters = await WellMetricsApiService.filterWellMetrics(
        deviceId,
        from,
        to,
        wellData?.parameters.map((p) => p.id) ?? [],
        { type: "Avg", interval: "1d" }
      );
      setWell(wellData);
      setWellParameters(wellParameters);
    };

    if (from && to) {
      fetchData(from, to);
    }
  }, [deviceId, from, to]);

  console.log(wellParameters);

  return (
    <div>
      <div className="flex flex-row gap-4">
        {well && <WellMetadata well={well} />}
        <CustomCalendar />
      </div>
      <WellCharts
        telemetry={[
          { time: "08:00", value: 400 },
          { time: "09:00", value: 300 },
          { time: "10:00", value: 600 },
          { time: "11:00", value: 800 },
          { time: "12:00", value: 500 },
        ]}
      />
    </div>
  );
};

export default WellOverview;
