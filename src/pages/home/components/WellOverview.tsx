import { WellApiService } from "@/api/services/WellApiService";
import { WellMetricsApiService } from "@/api/services/WellMetricsApiService";
import { CHART_COLORS } from "@/constants/chartColors";
import { searchParamsConstants } from "@/constants/searchParamsConstants";
import type { Well } from "@/types/well";
import type { ParameterMetrics } from "@/types/wellMetrics";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Filters from "./Filters/Filters";
import WellCharts from "./WellCharts";
import WellMetadata from "./WellMetadata";

interface ChartProps {
  deviceId: string;
}

const WellOverview = ({ deviceId }: ChartProps) => {
  const [searchParams] = useSearchParams();
  const [well, setWell] = useState<Well | null>(null);
  const [wellParameters, setWellParameters] = useState<ParameterMetrics[]>([]);

  const from = searchParams.get(searchParamsConstants.from);
  const to = searchParams.get(searchParamsConstants.to);

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
    <div className="flex flex-col gap-8 p-4">
      <div className="flex flex-row gap-4 items-start">
        <Filters />
        {well && <WellMetadata well={well} />}
      </div>
      <hr className="border-t border-gray-200" />
      <div className="flex flex-col gap-6">
        {wellParameters.map((parameter, index) => (
          <WellCharts
            key={parameter.parameterId}
            parameterMetric={parameter}
            lineColor={CHART_COLORS[index % CHART_COLORS.length]}
          />
        ))}
      </div>
    </div>
  );
};

export default WellOverview;
