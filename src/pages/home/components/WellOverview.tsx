import { WellApiService } from "@/api/services/WellApiService";
import { WellMetricsApiService } from "@/api/services/WellMetricsApiService";
import type { Well } from "@/types/well";
import type { ParameterMetrics } from "@/types/wellMetrics";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import CustomCalendar from "./CustomCalendar";
import WellCharts from "./WellCharts";
import WellMetadata from "./WellMetadata";

interface ChartProps {
  deviceId: string;
}

const WellOverview = ({ deviceId }: ChartProps) => {
  const [searchParams] = useSearchParams();
  const [well, setWell] = useState<Well | null>(null);
  const [wellParameters, setWellParameters] = useState<ParameterMetrics[]>([]);

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  console.log(from, to);

  useEffect(() => {
    const fetchWellInfo = async () => {
      const data = await WellApiService.getWell(deviceId);
      setWell(data);
    };

    fetchWellInfo();
  }, [deviceId]);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!from || !to || !well?.parameters) return;

      const paramIds = well.parameters.map((p) => p.id);
      const metrics = await WellMetricsApiService.filterWellMetrics(
        deviceId,
        from,
        to,
        paramIds,
        { type: "Avg", interval: "1d" }
      );

      setWellParameters(metrics);
    };

    fetchMetrics();
  }, [deviceId, from, to, well?.parameters]);

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
