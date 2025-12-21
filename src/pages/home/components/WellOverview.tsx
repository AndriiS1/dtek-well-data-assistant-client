import { WellApiService } from "@/api/services/WellApiService";
import { WellInsightApiService } from "@/api/services/WellInsightApiService";
import { searchParamsConstants } from "@/constants/searchParamsConstants";
import type { ActionItem } from "@/types/actions";
import type { Well } from "@/types/well";
import { Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import ParameterCharts from "./Charts/ParameterCharts";
import Filters from "./Filters/Filters";
import { WellActionsCarousel } from "./WellActionsCarousel";

interface ChartProps {
  deviceId: string;
}

const WellOverview = ({ deviceId: wellId }: ChartProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [well, setWell] = useState<Well | null>(null);
  const [isGenerating, setIsGenerating] = useState(false); // Loading state
  const [selectedWellActions, setSelectedWellActions] = useState<ActionItem[]>(
    []
  );

  const from = searchParams.get(searchParamsConstants.from);
  const to = searchParams.get(searchParamsConstants.to);
  const aggregationType = searchParams.get(
    searchParamsConstants.aggregationType
  );
  const interval = searchParams.get(searchParamsConstants.interval);

  useEffect(() => {
    const fetchWellInfo = async () => {
      const data = await WellApiService.getWell(wellId);
      setWell(data);
      setSelectedWellActions([]);
    };

    fetchWellInfo();
  }, [wellId]);

  const handleGenerateInsight = async () => {
    if (from && to && well) {
      setIsGenerating(true);

      try {
        const response = await WellInsightApiService.generateWellInsight(
          wellId,
          from,
          to,
          well?.parameters.map((p) => p.id)
        );

        navigate(`/insights?insight=${response}`);
      } catch (error) {
        console.error("Failed to generate insight", error);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden p-4 gap-8 bg-white">
      <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
        {from && to && (
          <WellActionsCarousel
            wellId={wellId}
            from={from}
            to={to}
            selectedActions={selectedWellActions}
            onSelectionChange={setSelectedWellActions}
          />
        )}
        <hr className="my-6 border-t bg-border" />

        {interval && aggregationType && well && from && to && (
          <ParameterCharts
            wellId={wellId}
            from={from}
            to={to}
            parameters={well.parameters}
            aggregationType={aggregationType}
            interval={interval}
            selectedWellActions={selectedWellActions}
          />
        )}
      </div>

      <aside className=" shrink-0 border-l border-gray-200 pl-6 pr-4 overflow-y-auto overflow-x-hidden flex flex-col items-center">
        <div className="sticky top-0 flex flex-col gap-6">
          <Filters />

          <button
            onClick={handleGenerateInsight}
            disabled={isGenerating || !well}
            className={`
        flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg
        text-sm font-medium transition-all
        mx-auto w-[90%]
        ${
          isGenerating
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-violet-600 hover:bg-violet-700 text-white active:scale-[0.98] shadow-sm"
        }
      `}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="truncate">Генерація...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span className="truncate">Згенерувати інсайт</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </div>
  );
};

export default WellOverview;
