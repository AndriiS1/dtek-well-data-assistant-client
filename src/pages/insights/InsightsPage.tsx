import { searchParamsConstants } from "@/constants/searchParamsConstants";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import InsightOverview from "./InsightOverview";

const InsightsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [slugs, setSlugs] = useState<string[]>([]);
  const selectedInsightSlug = searchParams.get(searchParamsConstants.insight);

  useEffect(() => {
    const fetchData = async () => {
      setSlugs([
        "sverdlovyna-102-asset-kushch-1-62a4c6e402ad4296aab5c4e23765a3f4",
      ]);
    };

    fetchData();
  }, []);

  const handleInsightClick = (insightSlug: string) => {
    if (selectedInsightSlug === insightSlug) {
      setSearchParams({});
      return;
    }

    const params = {
      [searchParamsConstants.insight]: insightSlug,
    };

    setSearchParams(params);
  };

  const getInsightItem = (insight: string) => {
    const isSelected = selectedInsightSlug === insight;

    return (
      <li
        key={insight}
        onClick={() => handleInsightClick(insight)}
        className={`
        text-sm flex justify-between p-2 rounded-md cursor-pointer transition-all
        ${
          isSelected
            ? "bg-yellow-400/10 text-yellow-600 font-medium border-r-4 border-yellow-400"
            : "text-gray-600 hover:bg-gray-100"
        }
      `}
      >
        <span>{insight}</span>
      </li>
    );
  };

  return (
    <div className="flex bg-gray-50">
      <aside
        className="w-80 bg-white border-r border-gray-200 p-4
                        sticky top-0 h-screen overflow-y-auto"
      >
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Інсайти
        </h2>

        <div className="space-y-6">
          {slugs.map((asset) => getInsightItem(asset))}
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {selectedInsightSlug ? (
          <InsightOverview insightSlug={selectedInsightSlug} />
        ) : (
          <h1 className="text-2xl font-light text-gray-400">
            Виберіть інсайт для перегляду...
          </h1>
        )}
      </main>
    </div>
  );
};

export default InsightsPage;
