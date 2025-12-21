import { CHART_COLORS } from "@/constants/chartColors";
import type { ActionItem } from "@/types/actions";
import type { ParameterMetrics } from "@/types/wellMetrics";
import { useState } from "react";
import MultiParameterChart from "../../../home/components/Charts/MultiParameterChart";
import ParameterChart from "../../../home/components/Charts/ParameterChart";

interface Props {
  parameterMetrics: ParameterMetrics[];
  selectedWellActions: ActionItem[];
}

const InsightCharts = ({ parameterMetrics, selectedWellActions }: Props) => {
  const [isMerged, setIsMerged] = useState(true);
  const [showSliders, setShowSliders] = useState(false);

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
            parameterMetrics={parameterMetrics}
            actions={selectedWellActions}
            showSlider={showSliders}
          />
        ) : (
          parameterMetrics.map((parameter, index) => (
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

export default InsightCharts;
