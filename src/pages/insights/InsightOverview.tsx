import { WellInsightApiService } from "@/api/services/WellInsightApiService";
import type { ActionItem } from "@/types/actions";
import type { Insight } from "@/types/insight";
import { useEffect, useState } from "react";
import { WellActionsCarousel } from "../home/components/WellActionsCarousel";
import InsightCharts from "./InsightCharts";

interface ChartProps {
  insightSlug: string;
}

const InsightOverview = ({ insightSlug }: ChartProps) => {
  const [insight, setInsight] = useState<Insight | null>(null);
  const [selectedWellActions, setSelectedWellActions] = useState<ActionItem[]>(
    []
  );

  useEffect(() => {
    const fetchWellInfo = async () => {
      const data = await WellInsightApiService.getWellInsight(insightSlug);
      setInsight(data);
      setSelectedWellActions([]);
    };

    fetchWellInfo();
  }, [insightSlug]);

  return (
    <div className="flex w-full overflow-hidden p-4 gap-8 bg-white">
      <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
        {insight && (
          <WellActionsCarousel
            wellId={insight.wellId}
            from={insight.from}
            to={insight.to}
            selectedActions={selectedWellActions}
            onSelectionChange={setSelectedWellActions}
          />
        )}
        <hr className="my-6 border-t bg-border" />

        {insight && (
          <InsightCharts
            parameterMetrics={insight.payload.parameterPayloads[0].parameters}
            selectedWellActions={selectedWellActions}
          />
        )}
      </div>

      <aside className="shrink-0 border-l border-gray-200 pl-8 ">
        {/* <div className="sticky top-0">
          <Filters />
        </div> */}
      </aside>
    </div>
  );
};

export default InsightOverview;
