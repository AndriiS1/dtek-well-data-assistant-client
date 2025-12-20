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

const ParameterChart = ({ parameterMetric, lineColor }: ChartProps) => {
  if (parameterMetric.dateTicks.length === 0) {
    return (
      <div className="h-75 w-full flex items-center justify-center border border-dashed rounded-xl text-gray-400">
        Немає даних для {parameterMetric.parameterName}
      </div>
    );
  }

  const chartData = parameterMetric.dateTicks.map((tick) => ({
    time: tick.time,
    value: parseFloat(tick.value),
  }));

  const formatDate = (tickItem: string) => {
    const date = new Date(tickItem);

    const datePart = date.toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
    });
    const timePart = date.toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${datePart} о ${timePart}`;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="h-auto w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          {parameterMetric.parameterName}
        </h3>
        <p className="text-[10px] text-gray-400 font-mono">
          ID: {parameterMetric.parameterId}
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
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
            tick={{ fill: "#9ca3af", fontSize: 11 }}
            tickFormatter={formatDate}
            minTickGap={30}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 11 }}
            domain={["auto", "auto"]}
            tickFormatter={(val) => val.toFixed(1)}
          />

          <Tooltip
            labelFormatter={formatDate}
            formatter={(value: number | undefined) => {
              if (value === undefined) return ["0", "Value"];
              return [formatNumber(value), "Value"];
            }}
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
            dot={{ r: 3, fill: lineColor, strokeWidth: 0 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
            name={parameterMetric.parameterName}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ParameterChart;
