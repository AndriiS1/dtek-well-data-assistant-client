import { WellInsightApiService } from "@/api/services/WellInsightApiService";
import { searchParamsConstants } from "@/constants/searchParamsConstants";
import type { InsightItem } from "@/types/insights";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import InsightOverview from "./InsightOverview";

const ITEMS_PER_PAGE = 10;

const InsightsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [insights, setInsights] = useState<InsightItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const currentPage = Number(searchParams.get("page")) || 1;
  const selectedInsightSlug = searchParams.get(searchParamsConstants.insight);

  useEffect(() => {
    const fetchData = async () => {
      const offset = (currentPage - 1) * ITEMS_PER_PAGE;

      const response = await WellInsightApiService.filterWellInsights({
        limit: ITEMS_PER_PAGE,
        offset: offset,
      });

      console.log(response);
      if (response) {
        setInsights(response.items);
        setTotalCount(response.total);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...currentParams, page: newPage.toString() });
  };

  const handleInsightClick = (insightSlug: string) => {
    const currentParams = Object.fromEntries(searchParams.entries());

    if (selectedInsightSlug === insightSlug) {
      delete currentParams[searchParamsConstants.insight];
    } else {
      currentParams[searchParamsConstants.insight] = insightSlug;
    }

    setSearchParams(currentParams);
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="flex bg-gray-50 h-screen">
      <aside className="w-80 bg-white border-r border-gray-200  sticky top-0">
        <div className="p-4 flex-1 overflow-y-auto">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Інсайти
          </h2>

          <ul className="space-y-2">
            {insights.map((item) => (
              <li
                key={item.slug}
                onClick={() => handleInsightClick(item.slug)}
                className={`text-sm flex justify-between p-2 rounded-md cursor-pointer transition-all ${
                  selectedInsightSlug === item.slug
                    ? "bg-yellow-400/10 text-yellow-600 font-medium border-r-4 border-yellow-400"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>{item.title || item.slug}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="p-1 rounded hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <span className="text-xs text-gray-500 font-medium">
            Сторінка {currentPage} з {totalPages || 1}
          </span>

          <button
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="p-1 rounded hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto bg-white">
        {selectedInsightSlug ? (
          <InsightOverview insightSlug={selectedInsightSlug} />
        ) : (
          <div className="h-full flex items-center justify-center">
            <h1 className="text-2xl font-light text-gray-400">
              Виберіть інсайт для перегляду...
            </h1>
          </div>
        )}
      </main>
    </div>
  );
};

export default InsightsPage;
