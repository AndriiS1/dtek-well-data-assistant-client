import { WellApiService } from "@/api/services/WellApiService";
import { WellMetricsApiService } from "@/api/services/WellMetricsApiService";
import { CHART_COLORS } from "@/constants/chartColors";
import { searchParamsConstants } from "@/constants/searchParamsConstants";
import type { Well } from "@/types/well";
import type { ParameterMetrics } from "@/types/wellMetrics";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Filters from "./Filters/Filters";
import ParameterChart from "./ParameterChart";

interface ChartProps {
  deviceId: string;
}

const WellOverview = ({ deviceId }: ChartProps) => {
  const [searchParams] = useSearchParams();
  const [well, setWell] = useState<Well | null>(null);
  const [wellParameters, setWellParameters] = useState<ParameterMetrics[]>([]);

  const from = searchParams.get(searchParamsConstants.from);
  const to = searchParams.get(searchParamsConstants.to);
  const aggregationType = searchParams.get(
    searchParamsConstants.aggregationType
  );
  const interval = searchParams.get(searchParamsConstants.interval);

  useEffect(() => {
    const fetchWellInfo = async () => {
      const data = await WellApiService.getWell(deviceId);
      setWell(data);
    };

    fetchWellInfo();
  }, [deviceId]);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!from || !to || !well?.parameters || !aggregationType || !interval)
        return;

      const paramIds = well.parameters.map((p) => p.id);
      const metrics = await WellMetricsApiService.filterWellMetrics(
        deviceId,
        from,
        to,
        paramIds,
        { type: aggregationType, interval: interval }
      );

      setWellParameters(metrics);
    };

    fetchMetrics();
  }, [aggregationType, deviceId, from, interval, to, well?.parameters]);

  console.log(wellParameters);

  return (
    <div className="flex h-screen w-full overflow-hidden p-4 gap-8 bg-white">
      <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
        <div className="flex flex-col gap-6">
          {wellParameters.map((parameter, index) => (
            <ParameterChart
              key={parameter.parameterId}
              parameterMetric={parameter}
              lineColor={CHART_COLORS[index % CHART_COLORS.length]}
            />
          ))}
        </div>
      </div>

      <aside className="shrink-0 border-l border-gray-200 pl-8 overflow-y-auto">
        <div className="sticky top-0">
          <Filters />
        </div>
      </aside>
    </div>
  );
};

export default WellOverview;
