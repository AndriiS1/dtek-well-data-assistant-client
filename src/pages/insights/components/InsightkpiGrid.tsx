import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { InsightKpisItem } from "@/types/insight";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Droplets,
  Gauge,
  Thermometer,
} from "lucide-react";
import { useMemo, useState } from "react";

interface Props {
  kpis: InsightKpisItem[];
}

export function InsightKpiGrid({ kpis }: Props) {
  const groupedKpis = useMemo(() => {
    return kpis.reduce((acc, kpi) => {
      const agg = kpi.aggregation || "Avg";
      if (!acc[agg]) acc[agg] = [];
      acc[agg].push(kpi);
      return acc;
    }, {} as Record<string, InsightKpisItem[]>);
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

  const trimStringNumbers = (text: string) => {
    return Number(parseFloat(text).toFixed(2));
  };

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Ключові показники
        </h3>

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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {activeKpis.map((kpi) => {
          const changeValue = kpi.change ? trimStringNumbers(kpi.change) : 0;
          const isPositive = Number(changeValue) > 0;

          return (
            <Card
              key={`${kpi.parameterId}-${kpi.aggregation}`}
              className="border-none shadow-sm bg-white"
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                    {getIcon(kpi.name)}
                  </div>

                  {kpi.change && (
                    <div
                      className={cn(
                        "flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold",
                        changeValue === 0
                          ? "bg-gray-100 text-gray-600"
                          : isPositive
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-rose-50 text-rose-600"
                      )}
                    >
                      {isPositive ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {Math.abs(changeValue)}%
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {kpi.name}
                  </p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <h3 className="text-2xl font-bold text-slate-900">
                      {trimStringNumbers(kpi.value)}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
