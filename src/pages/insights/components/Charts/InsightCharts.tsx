import { CHART_COLORS } from "@/constants/chartColors";
import type { ActionItem } from "@/types/actions";
import type { ParameterPayload } from "@/types/insight";
import { Calendar, Clock } from "lucide-react";
import { useState } from "react";
import MultiParameterChart from "../../../home/components/Charts/MultiParameterChart";
import ParameterChart from "../../../home/components/Charts/ParameterChart";

interface Props {
  from: string;
  to: string;
  interval: string;
  parameterPayloads: ParameterPayload[];
  selectedWellActions: ActionItem[];
}

const InsightCharts = ({
  from,
  to,
  interval,
  parameterPayloads,
  selectedWellActions,
}: Props) => {
  const [isMerged, setIsMerged] = useState(true);
  const [showSliders, setShowSliders] = useState(false);

  const [selectedAggregation, setSelectedAggregation] = useState<string>(
    parameterPayloads[0]?.aggregation || ""
  );

  const activePayload =
    parameterPayloads.find((p) => p.aggregation === selectedAggregation) ||
    parameterPayloads[0];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsMerged(!isMerged)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isMerged
                ? "bg-blue-600 text-white shadow-md shadow-blue-100"
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
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end text-[11px] text-gray-400 font-medium leading-tight">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              <span>
                {formatDate(from)} — {formatDate(to)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5 text-blue-500/80">
              <Clock className="w-3 h-3" />
              <span>Інтервал: {interval}</span>
            </div>
          </div>

          <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-200">
            {parameterPayloads.map((payload) => (
              <button
                key={payload.aggregation}
                onClick={() => setSelectedAggregation(payload.aggregation)}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                  selectedAggregation === payload.aggregation
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {payload.aggregation.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {activePayload &&
          (isMerged ? (
            <MultiParameterChart
              parameterMetrics={activePayload.parameters}
              actions={selectedWellActions}
              showSlider={showSliders}
            />
          ) : (
            activePayload.parameters.map((parameter, index) => (
              <ParameterChart
                key={parameter.parameterId}
                parameterMetric={parameter}
                color={CHART_COLORS[index % CHART_COLORS.length]}
                actions={selectedWellActions}
                showSlider={showSliders}
              />
            ))
          ))}
      </div>
    </div>
  );
};

export default InsightCharts;
