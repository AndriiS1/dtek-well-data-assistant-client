import { Card, CardContent } from "@/components/ui/card";
import type { InsightKpis } from "@/types/insight";
import { Activity, Droplets, Gauge, Thermometer } from "lucide-react";
import { useMemo, useState } from "react";

interface Props {
  kpis: InsightKpis[];
}

export function InsightKpiGrid({ kpis }: Props) {
  const groupedKpis = useMemo(() => {
    return kpis.reduce((acc, kpi) => {
      const agg = kpi.aggregation || "Avg";
      if (!acc[agg]) acc[agg] = [];
      acc[agg].push(kpi);
      return acc;
    }, {} as Record<string, InsightKpis[]>);
  }, [kpis]);

  const aggregations = Object.keys(groupedKpis);
  const [selectedAgg, setSelectedAgg] = useState(aggregations[0] || "");

  const getIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("температур")) return <Thermometer className="h-4 w-4" />;
    if (n.includes("тиск")) return <Gauge className="h-4 w-4" />;
    if (n.includes("витрат") || n.includes("рідин"))
      return <Droplets className="h-4 w-4" />;
    return <Activity className="h-4 w-4" />;
  };

  const activeKpis = groupedKpis[selectedAgg] || [];

  const formatValue = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num)
      ? "0.00"
      : num.toLocaleString("uk-UA", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
  };

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Ключові показники
        </h3>

        {aggregations.length > 1 && (
          <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
            {aggregations.map((agg) => (
              <button
                key={agg}
                onClick={() => setSelectedAgg(agg)}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                  selectedAgg === agg
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {agg.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {activeKpis.map((kpi) => (
          <Card
            key={`${kpi.parameterId}-${kpi.aggregation}`}
            className="border-none shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                  {getIcon(kpi.name)}
                </div>
                <span className="text-[10px] font-bold text-slate-300 uppercase">
                  {kpi.aggregation}
                </span>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                  {kpi.name}
                </p>

                <div className="space-y-2">
                  {kpi.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-baseline justify-between"
                    >
                      <h3 className="text-2xl font-bold text-slate-900 leading-none">
                        {formatValue(item.value)}
                      </h3>
                      <span className="text-xs font-bold text-blue-500/80 bg-blue-50 px-1.5 py-0.5 rounded">
                        {item.kind}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
