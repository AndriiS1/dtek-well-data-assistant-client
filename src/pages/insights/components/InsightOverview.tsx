import { WellInsightApiService } from "@/api/services/WellInsightApiService";
import type { ActionItem } from "@/types/actions";
import type { Insight } from "@/types/insight";
import { useEffect, useState } from "react";
import { WellActionsCarousel } from "../../home/components/WellActionsCarousel";
import InsightCharts from "./Charts/InsightCharts";
import { InsightBriefInfo } from "./InsightBriefInfo";
import { InsightKpiGrid } from "./InsightkpiGrid";

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
          <div>
            <InsightBriefInfo
              highlights={insight.highlights}
              suspicions={insight.suspicions}
              recommendedActions={insight.recommendedActions}
            />
            <InsightKpiGrid kpis={insight.payload.kpis} />
            <WellActionsCarousel
              wellId={insight.wellId}
              from={insight.from}
              to={insight.to}
              selectedActions={selectedWellActions}
              onSelectionChange={setSelectedWellActions}
            />
            <InsightCharts
              from={insight.from}
              to={insight.to}
              interval={insight.interval}
              parameterPayloads={insight.payload.parameterPayloads}
              selectedWellActions={selectedWellActions}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightOverview;
