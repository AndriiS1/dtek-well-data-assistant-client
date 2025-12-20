import { WellMetricsApiService } from "@/api/services/WellMetricsApiService";
import { CHART_COLORS } from "@/constants/chartColors";
import type { ActionItem } from "@/types/actions";
import type { Parameter } from "@/types/well";
import type { ParameterMetrics } from "@/types/wellMetrics";
import { useEffect, useState } from "react";
import ParameterChart from "./ParameterChart";

interface Props {
  wellId: string;
  from: string;
  to: string;
  parameters: Parameter[];
  aggregationType: string;
  interval: string;
  selectedWellActions: ActionItem[];
}

const ParameterCharts = ({
  wellId,
  from,
  to,
  parameters,
  aggregationType,
  interval,
  selectedWellActions,
}: Props) => {
  const [wellParameters, setWellParameters] = useState<ParameterMetrics[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      setIsLoading(true);
      try {
        const paramIds = parameters.map((p) => p.id);
        const metrics = await WellMetricsApiService.filterWellMetrics(
          wellId,
          from,
          to,
          paramIds,
          { type: aggregationType, interval: interval }
        );
        setWellParameters(metrics);
      } catch (error) {
        console.error("Failed to fetch metrics", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, [aggregationType, wellId, from, interval, to, parameters]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-full h-95 bg-white p-4 rounded-xl border border-gray-100 shadow-sm animate-pulse"
          >
            <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-20 bg-gray-100 rounded mb-6" />
            <div className="w-full h-70 bg-gray-50 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {wellParameters.map((parameter, index) => (
        <ParameterChart
          key={parameter.parameterId}
          parameterMetric={parameter}
          lineColor={CHART_COLORS[index % CHART_COLORS.length]}
          actions={selectedWellActions}
        />
      ))}
    </div>
  );
};

export default ParameterCharts;
