import type { ActionItem } from "@/types/actions";
import type { ParameterMetrics } from "@/types/wellMetrics";
import ReactECharts from "echarts-for-react";
import { universalTooltipFormatter } from "./utils/chartUtils";

interface ChartProps {
  parameterMetric: ParameterMetrics;
  color: string;
  actions?: ActionItem[];
  showSlider: boolean;
}

const ParameterChart = ({
  parameterMetric,
  color,
  actions,
  showSlider,
}: ChartProps) => {
  if (parameterMetric.dateTicks.length === 0) {
    return (
      <div className="h-75 w-full flex items-center justify-center border border-dashed rounded-xl text-gray-400">
        Немає даних для {parameterMetric.parameterName}
      </div>
    );
  }

  const chartData = parameterMetric.dateTicks.map((tick) => [
    tick.time,
    parseFloat(tick.value),
  ]);

  const option = {
    animation: false,
    grid: {
      top: 20,
      right: 20,
      bottom: 40,
      left: 50,
      containLabel: true,
    },
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: 0,
        filterMode: "filter",
      },
      {
        type: "slider",
        show: showSlider,
        xAxisIndex: 0,
        bottom: 10,
        height: 20,
        borderColor: "transparent",
        backgroundColor: "#f9fafb",
        fillerColor: `${color}22`,
        selectedDataBackground: {
          lineStyle: {
            color: color,
            width: 1,
          },
          areaStyle: {
            color: color,
            opacity: 0.1,
          },
        },
        handleStyle: {
          color: color,
          borderColor: color,
        },
        moveHandleStyle: {
          color: color,
          opacity: 0.5,
        },
        emphasis: {
          moveHandleStyle: {
            color: color,
          },
          handleStyle: {
            color: color,
          },
        },
        labelFormatter: "",
      },
    ],
    tooltip: {
      trigger: "axis",
      backgroundColor: "#fff",
      borderRadius: 8,
      borderWidth: 0,
      shadowBlur: 10,
      shadowColor: "rgba(0,0,0,0.1)",
      shadowOffsetX: 0,
      shadowOffsetY: 4,
      formatter: (params: unknown) => universalTooltipFormatter(params),
    },
    xAxis: {
      type: "time",
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: "#9ca3af",
        fontSize: 11,
        formatter: (value: number) => {
          const date = new Date(value);
          return date.getHours() === 0 && date.getMinutes() === 0
            ? date.toLocaleDateString("uk-UA", {
                day: "numeric",
                month: "short",
              })
            : date.toLocaleTimeString("uk-UA", {
                hour: "2-digit",
                minute: "2-digit",
              });
        },
      },
      splitLine: {
        show: true,
        lineStyle: { color: "#f9fafb" },
      },
    },
    yAxis: [
      {
        type: "value",
        scale: true,
        axisLabel: {
          color: "#9ca3af",
          formatter: (val: number) => val.toFixed(1),
        },
        splitLine: { lineStyle: { color: "#f0f0f0", type: "dashed" } },
      },
      {
        type: "value",
        min: 0,
        max: 1,
        show: false,
      },
    ],
    series: [
      {
        name: parameterMetric.parameterName,
        type: "line",
        yAxisIndex: 0,
        data: chartData,
        showSymbol: false,
        lineStyle: { width: 3, color: color },
      },
      {
        name: "Events",
        type: "bar",
        yAxisIndex: 1,
        barWidth: 2,
        itemStyle: {
          color: "#EF4444",
          opacity: 0.4,
          borderRadius: [2, 2, 0, 0],
        },
        data: actions?.map((event) => [event.timestamp, 1, event.title]),
      },
    ],
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          {parameterMetric.parameterName}
        </h3>
        <p className="text-[10px] text-gray-400 font-mono">
          ID: {parameterMetric.parameterId}
        </p>
      </div>

      <ReactECharts
        option={option}
        style={{ height: "300px", width: "100%" }}
        opts={{ renderer: "canvas" }}
      />
    </div>
  );
};

export default ParameterChart;
