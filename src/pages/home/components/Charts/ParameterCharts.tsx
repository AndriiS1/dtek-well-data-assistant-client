import { WellMetricsApiService } from "@/api/services/WellMetricsApiService";
import { CHART_COLORS } from "@/constants/chartColors";
import type { ActionItem } from "@/types/actions";
import type { Parameter } from "@/types/well";
import type { ParameterMetrics } from "@/types/wellMetrics";
import { useEffect, useState } from "react";
import MultiParameterChart from "./MultiParameterChart";
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
  const [isMerged, setIsMerged] = useState(false);
  const [showSliders, setShowSliders] = useState(false);

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
      <div>
        <div className="flex flex-col gap-6">
          {[...Array(isMerged ? 1 : 3)].map((_, i) => (
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
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-6 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <button
          onClick={() => setIsMerged(!isMerged)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isMerged
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {isMerged ? "Роз'єднати графіки" : "Об'єднати графіки"}
        </button>

        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={showSliders}
            onChange={(e) => setShowSliders(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">
            Показувати слайдери
          </span>
        </label>
      </div>
      <div className="flex flex-col gap-6">
        {isMerged ? (
          <MultiParameterChart
            parameterMetrics={wellParameters}
            actions={selectedWellActions}
            showSlider={showSliders}
          />
        ) : (
          wellParameters.map((parameter, index) => (
            <ParameterChart
              key={parameter.parameterId}
              parameterMetric={parameter}
              color={CHART_COLORS[index % CHART_COLORS.length]}
              actions={selectedWellActions}
              showSlider={showSliders}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ParameterCharts;
