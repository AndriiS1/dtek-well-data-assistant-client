import type { ActionItem } from "@/types/actions";
import ReactECharts from "echarts-for-react";

export interface dateTickMetrics {
  time: string;
  value: string;
}

export interface ParameterMetrics {
  wellId: string;
  parameterId: string;
  parameterName: string;
  dateTicks: dateTickMetrics[];
}

interface ChartProps {
  parameterMetric: ParameterMetrics;
  lineColor: string;
  actions?: ActionItem[];
}

interface TooltipFormatterParams {
  componentType: "series";
  seriesName: string;
  seriesIndex: number;
  color: string;
  value: [number | string, number, string?];
  dataIndex: number;
}

const ParameterChart = ({
  parameterMetric,
  lineColor,
  actions: events,
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
    tooltip: {
      trigger: "axis",
      backgroundColor: "#fff",
      borderRadius: 8,
      borderWidth: 0,
      shadowBlur: 10,
      shadowColor: "rgba(0,0,0,0.1)",
      shadowOffsetX: 0,
      shadowOffsetY: 4,
      formatter: (params: unknown) => {
        const items = params as TooltipFormatterParams[];
        const date = new Date(items[0].value[0]).toLocaleString("uk-UA", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        });

        let html = `<div style="font-weight: 600; margin-bottom: 4px; color: #374151;">${date}</div>`;

        items.forEach((item) => {
          if (item.seriesName === "Events" && item.value[2]) {
            const eventTime = new Date(item.value[0]).toLocaleTimeString(
              "uk-UA",
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            );

            html += `
        <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #f3f4f6;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="display:inline-block;border-radius:2px;width:3px;height:12px;background-color:${item.color};"></span>
            <b style="color: #EF4444; font-size: 11px; uppercase">Подія (${eventTime}):</b>
          </div>
          <div style="padding-left: 9px; margin-top: 2px; color: #4B5563;">${item.value[2]}</div>
        </div>`;
          } else if (item.seriesName !== "Events") {
            html += `
        <div style="display: flex; justify-content: space-between; gap: 20px; margin-top: 4px;">
          <span>
            <span style="display:inline-block;margin-right:6px;border-radius:50%;width:8px;height:8px;background-color:${
              item.color
            };"></span>
            ${item.seriesName}
          </span>
          <b style="color: #111827;">${item.value[1].toFixed(2)}</b>
        </div>`;
          }
        });

        return html;
      },
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
        lineStyle: { width: 3, color: lineColor },
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
        data: events?.map((event) => [event.timestamp, 1, event.title]),
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
