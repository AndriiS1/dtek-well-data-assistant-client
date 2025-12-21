import { CHART_COLORS } from "@/constants/chartColors";
import type { ActionItem } from "@/types/actions";
import type { ParameterMetrics } from "@/types/wellMetrics";
import ReactECharts from "echarts-for-react";
import { universalTooltipFormatter } from "./utils/chartUtils";

interface MultiParameterChartProps {
  parameterMetrics: ParameterMetrics[];
  actions?: ActionItem[];
  showSlider: boolean;
}

const MultiParameterChart = ({
  parameterMetrics,
  actions,
  showSlider,
}: MultiParameterChartProps) => {
  const Y_AXIS_WIDTH = 60;
  const EVENT_SERIES_NAME = "Події";

  if (parameterMetrics.length === 0) {
    return (
      <div className="h-75 w-full flex items-center justify-center border border-dashed rounded-xl text-gray-400">
        Немає даних для {parameterMetrics.map((m) => m).join(", ")}
      </div>
    );
  }

  const yAxisConfigs = parameterMetrics.map((m, i) => ({
    key: m.parameterId,
    type: "value" as const,
    name: "",
    position: "left" as const,
    offset: i * Y_AXIS_WIDTH,
    scale: true,
    axisLine: {
      show: true,
      lineStyle: { color: CHART_COLORS[i % CHART_COLORS.length] },
    },
    axisLabel: {
      color: "#6b7280",
      fontSize: 10,
      formatter: (val: number) => val.toFixed(1),
    },
    splitLine: {
      show: i === 0,
      lineStyle: { color: "#f3f4f6", type: "dashed" as const },
    },
  }));

  const eventYAxis = {
    type: "value" as const,
    min: 0,
    max: 1,
    show: false,
  };

  const seriesConfigs = [
    ...parameterMetrics.map((m, i) => {
      const color = CHART_COLORS[i % CHART_COLORS.length];
      return {
        name: m.parameterName,
        type: "line" as const,
        yAxisIndex: i,
        data: m.dateTicks.map((t) => [t.time, parseFloat(t.value)]),
        showSymbol: false,
        smooth: true,
        itemStyle: {
          color: color,
        },
        lineStyle: {
          width: 2,
          color: color,
        },
      };
    }),
    {
      name: EVENT_SERIES_NAME,
      type: "bar" as const,
      yAxisIndex: parameterMetrics.length,
      barWidth: 2,
      itemStyle: { color: "#EF4444", opacity: 0.4 },
      data: actions?.map((e) => [e.timestamp, 1, e.title]),
    },
  ];

  const option = {
    animation: false,
    legend: {
      show: true,
      top: 0,
      textStyle: { fontSize: 11 },
    },
    grid: {
      top: 60,
      right: 20,
      bottom: 70,
      left: parameterMetrics.length * Y_AXIS_WIDTH + 10,
      containLabel: false,
    },
    tooltip: {
      trigger: "axis" as const,
      backgroundColor: "rgba(255, 255, 255, 0.98)",
      borderWidth: 0,
      shadowBlur: 10,
      shadowColor: "rgba(0,0,0,0.1)",
      formatter: (params: unknown) =>
        universalTooltipFormatter(params, EVENT_SERIES_NAME),
    },
    dataZoom: [
      {
        type: "inside" as const,
        xAxisIndex: 0,
        filterMode: "empty",
      },
      {
        type: "slider" as const,
        show: showSlider,
        xAxisIndex: 0,
        bottom: 10,
        height: 24,
        borderColor: "transparent",
        backgroundColor: "#f9fafb",
        fillerColor: "rgba(31, 41, 55, 0.05)",
        handleStyle: { color: "#d1d5db" },
        labelFormatter: "",
      },
    ],
    xAxis: {
      type: "time" as const,
      axisLine: { lineStyle: { color: "#e5e7eb" } },
      axisLabel: {
        color: "#9ca3af",
        fontSize: 10,
        formatter: (val: number) => {
          const d = new Date(val);
          return d.getHours() === 0
            ? d.toLocaleDateString("uk-UA", { day: "numeric", month: "short" })
            : d.toLocaleTimeString("uk-UA", {
                hour: "2-digit",
                minute: "2-digit",
              });
        },
      },
      splitLine: { show: false },
    },
    yAxis: [...yAxisConfigs, eventYAxis],
    series: seriesConfigs,
  };

  return (
    <div className="w-full bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <ReactECharts
        option={option}
        style={{ height: "500px", width: "100%" }}
        opts={{ renderer: "canvas" }}
      />
    </div>
  );
};

export default MultiParameterChart;
