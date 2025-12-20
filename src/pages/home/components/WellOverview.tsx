import { WellApiService } from "@/api/services/WellApiService";
import { WellMetricsApiService } from "@/api/services/WellMetricsApiService";
import { CHART_COLORS } from "@/constants/chartColors";
import { searchParamsConstants } from "@/constants/searchParamsConstants";
import type { ActionItem } from "@/types/actions";
import type { Well } from "@/types/well";
import type { ParameterMetrics } from "@/types/wellMetrics";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Filters from "./Filters/Filters";
import ParameterChart from "./ParameterChart";
import { WellActionsCarousel } from "./WellActionsCarousel";

interface ChartProps {
  deviceId: string;
}

const WellOverview = ({ deviceId: wellId }: ChartProps) => {
  const [searchParams] = useSearchParams();
  const [well, setWell] = useState<Well | null>(null);
  const [wellParameters, setWellParameters] = useState<ParameterMetrics[]>([]);
  const [selectedWellActions, setSelectedWellActions] = useState<ActionItem[]>(
    []
  );

  const from = searchParams.get(searchParamsConstants.from);
  const to = searchParams.get(searchParamsConstants.to);
  const aggregationType = searchParams.get(
    searchParamsConstants.aggregationType
  );
  const interval = searchParams.get(searchParamsConstants.interval);

  useEffect(() => {
    const fetchWellInfo = async () => {
      const data = await WellApiService.getWell(wellId);
      setWell(data);
    };

    fetchWellInfo();
  }, [wellId]);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!from || !to || !well?.parameters || !aggregationType || !interval)
        return;

      const paramIds = well.parameters.map((p) => p.id);
      const metrics = await WellMetricsApiService.filterWellMetrics(
        wellId,
        from,
        to,
        paramIds,
        { type: aggregationType, interval: interval }
      );

      setWellParameters(metrics);
    };

    fetchMetrics();
  }, [aggregationType, wellId, from, interval, to, well?.parameters]);

  return (
    <div className="flex h-screen w-full overflow-hidden p-4 gap-8 bg-white">
      <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
        {from && to && (
          <WellActionsCarousel
            wellId={wellId}
            from={from}
            to={to}
            selectedActions={selectedWellActions}
            onSelectionChange={setSelectedWellActions}
          />
        )}
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
