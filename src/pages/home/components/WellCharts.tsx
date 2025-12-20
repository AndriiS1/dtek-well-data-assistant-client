import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
}

const WellCharts = ({ parameterMetric, lineColor }: ChartProps) => {
  if (parameterMetric.dateTicks.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        No data available
      </div>
    );
  }

  const chartData = parameterMetric.dateTicks.map((tick) => ({
    time: tick.time,
    value: parseFloat(tick.value),
  }));

  return (
    <div className="h-100 w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          {parameterMetric.parameterName}
        </h3>
        <p className="text-xs text-gray-400">
          Well ID: {parameterMetric.wellId}
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f0f0f0"
          />

          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            domain={["auto", "auto"]}
          />

          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke={lineColor}
            strokeWidth={3}
            dot={{ r: 4, fill: lineColor }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            name={parameterMetric.parameterName}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WellCharts;
