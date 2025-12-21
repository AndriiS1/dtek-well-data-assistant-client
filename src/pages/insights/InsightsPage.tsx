import { WellInsightApiService } from "@/api/services/WellInsightApiService";
import { searchParamsConstants } from "@/constants/searchParamsConstants";
import type { InsightItem } from "@/types/insights";
import { Check, ChevronLeft, ChevronRight, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import InsightOverview from "./components/InsightOverview";

const ITEMS_PER_PAGE = 10;

const InsightsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [insights, setInsights] = useState<InsightItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const currentPage = Number(searchParams.get("page")) || 1;
  const selectedInsightSlug = searchParams.get(searchParamsConstants.insight);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const offset = (currentPage - 1) * ITEMS_PER_PAGE;

      const response = await WellInsightApiService.filterWellInsights({
        limit: ITEMS_PER_PAGE,
        offset: offset,
      });

      if (response) {
        setInsights(response.items);
        setTotalCount(response.total);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    if (!isLoading && insights.length > 0 && !selectedInsightSlug) {
      const firstInsightSlug = insights[0].slug;

      const currentParams = Object.fromEntries(searchParams.entries());
      setSearchParams({
        ...currentParams,
        [searchParamsConstants.insight]: firstInsightSlug,
      });
    }
  }, [insights, selectedInsightSlug, isLoading, setSearchParams, searchParams]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

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

  const ListSkeleton = () => (
    <>
      {[...Array(8)].map((_, i) => (
        <li key={i} className="p-3 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-100 rounded w-1/2"></div>
        </li>
      ))}
    </>
  );

  return (
    <div className="flex h-full bg-gray-50">
      <aside className="w-80 bg-white border-r border-gray-200 p-4 flex flex-col h-full overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Інсайти
          </h2>
          <button
            onClick={handleShare}
            title="Скопіювати посилання"
            className={`p-2 rounded-md transition-all ${
              copied
                ? "bg-green-50 text-green-600"
                : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            }`}
          >
            {copied ? <Check size={16} /> : <Share2 size={16} />}
          </button>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {isLoading
              ? ListSkeleton()
              : insights.map((item) => (
                  <li
                    key={item.slug}
                    onClick={() => handleInsightClick(item.slug)}
                    className={`text-sm flex flex-col p-3 rounded-md cursor-pointer transition-all border-r-4 ${
                      selectedInsightSlug === item.slug
                        ? "bg-yellow-400/10 text-yellow-700 font-medium border-yellow-400"
                        : "text-gray-600 hover:bg-gray-100 border-transparent"
                    }`}
                  >
                    <span className="truncate block mb-0.5">
                      {item.title || item.slug}
                    </span>
                    <span
                      className={`text-[11px] leading-tight ${
                        selectedInsightSlug === item.slug
                          ? "text-yellow-600/70"
                          : "text-gray-400"
                      }`}
                    >
                      {new Date(item.createdAt).toLocaleString("uk-UA", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
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
