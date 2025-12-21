import { WellApiService } from "@/api/services/WellApiService";
import { searchParamsConstants } from "@/constants/searchParamsConstants";
import type { ActionItem } from "@/types/actions";
import type { Well } from "@/types/well";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import ParameterCharts from "./Charts/ParameterCharts";
import Filters from "./Filters/Filters";
import { WellActionsCarousel } from "./WellActionsCarousel";

interface ChartProps {
  deviceId: string;
}

const WellOverview = ({ deviceId: wellId }: ChartProps) => {
  const [searchParams] = useSearchParams();
  const [well, setWell] = useState<Well | null>(null);
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

      <aside className="shrink-0 border-l border-gray-200 pl-8 overflow-y-auto">
        <div className="sticky top-0">
          <Filters />
        </div>
      </aside>
    </div>
  );
};

export default WellOverview;
