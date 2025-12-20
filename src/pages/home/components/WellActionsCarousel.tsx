import { WellActionsApiService } from "@/api/services/WellActionsApiService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Action, ActionItem } from "@/types/actions";
import { CheckSquare, ChevronLeft, ChevronRight, Square } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface WellActionsCarouselProps {
  wellId: string;
  from: string;
  to: string;
  selectedActions: ActionItem[];
  onSelectionChange: (selectedActions: ActionItem[]) => void;
}

const LIMIT = 10;

function ActionSkeleton() {
  return (
    <div className="p-1 h-full">
      <Card className="h-50 border-2 border-transparent flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start mb-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-3 w-10" />
          </div>
          <Skeleton className="h-4 w-1/3" />
        </CardHeader>
        <CardContent className="flex-1 space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </CardContent>
      </Card>
    </div>
  );
}

export function WellActionsCarousel({
  wellId,
  from,
  to,
  selectedActions,
  onSelectionChange,
}: WellActionsCarouselProps) {
  const [data, setData] = useState<Action | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await WellActionsApiService.getWellActions(
        wellId,
        from,
        to,
        {
          limit: LIMIT,
          offset: offset,
        }
      );
      setData(result);
    } catch (error) {
      console.error("Failed to fetch actions:", error);
    } finally {
      setIsLoading(false);
    }
  }, [wellId, from, to, offset]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setOffset(0);
  }, [wellId, from, to]);

  const totalItems = data?.total || 0;
  const currentPage = Math.floor(offset / LIMIT) + 1;
  const totalPages = Math.ceil(totalItems / LIMIT);

  const handleNextPage = () => {
    if (offset + LIMIT < totalItems) setOffset((prev) => prev + LIMIT);
  };

  const handlePrevPage = () => {
    setOffset((prev) => Math.max(0, prev - LIMIT));
  };

  const allVisibleSelected = data?.items.length
    ? data.items.every((item) => selectedActions.some((a) => a.id === item.id))
    : false;

  const handleToggleAll = () => {
    if (!data?.items) return;
    if (allVisibleSelected) {
      const visibleIds = new Set(data.items.map((i) => i.id));
      onSelectionChange(selectedActions.filter((a) => !visibleIds.has(a.id)));
    } else {
      const newItems = data.items.filter(
        (item) => !selectedActions.some((a) => a.id === item.id)
      );
      onSelectionChange([...selectedActions, ...newItems]);
    }
  };

  const toggleSelection = (actionItem: ActionItem) => {
    const isSelected = selectedActions.some((a) => a.id === actionItem.id);
    if (isSelected) {
      onSelectionChange(selectedActions.filter((a) => a.id !== actionItem.id));
    } else {
      onSelectionChange([...selectedActions, actionItem]);
    }
  };

  if (!isLoading && (!data || data.items.length === 0))
    return (
      <div className="p-8 text-center text-sm">Не знайдено жодних подій.</div>
    );

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Header with Selection Info and Pagination */}
      <div className="flex items-center justify-between px-12">
        <div className="flex items-center gap-4">
          {isLoading ? (
            <Skeleton className="h-9 w-48" />
          ) : (
            <>
              <span className="text-sm font-medium text-muted-foreground">
                {selectedActions.length} подій обрано
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleToggleAll}
                className="flex gap-2 items-center"
              >
                {allVisibleSelected ? (
                  <>
                    <CheckSquare className="h-4 w-4" /> Скасувати вибір
                  </>
                ) : (
                  <>
                    <Square className="h-4 w-4" /> Обрати всі на сторінці
                  </>
                )}
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isLoading ? (
            <Skeleton className="h-8 w-32" />
          ) : (
            <>
              <span className="text-xs text-muted-foreground mr-2">
                Сторінка {currentPage} з {totalPages || 1}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevPage}
                disabled={offset === 0}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextPage}
                disabled={offset + LIMIT >= totalItems}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="w-full px-12">
        <Carousel opts={{ align: "start", loop: false }} className="w-full">
          <CarouselContent className="items-stretch">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <CarouselItem
                    key={i}
                    className="flex flex-col md:basis-1/2 lg:basis-1/3"
                  >
                    <ActionSkeleton />
                  </CarouselItem>
                ))
              : data?.items.map((item: ActionItem) => {
                  const isSelected = selectedActions.some(
                    (a) => a.id === item.id
                  );
                  return (
                    <CarouselItem
                      key={item.id}
                      className="flex flex-col md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="p-1 h-full">
                        <Card
                          onClick={() => toggleSelection(item)}
                          className={cn(
                            "h-full cursor-pointer transition-all duration-200 border-2 flex flex-col",
                            isSelected
                              ? "border-blue-500/80 bg-primary/5 ring-2 ring-primary/20"
                              : "hover:border-muted-foreground/50 border-transparent"
                          )}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle
                                className={cn(
                                  "text-lg transition-colors",
                                  isSelected
                                    ? "text-primary"
                                    : "text-foreground"
                                )}
                              >
                                {item.title}
                              </CardTitle>
                              <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">
                                {item.source}
                              </span>
                            </div>
                            <p className="text-sm font-medium text-blue-500/80">
                              {new Date(item.timestamp).toLocaleString()}
                            </p>
                          </CardHeader>
                          <CardContent className="flex-1">
                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {item.details}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  );
                })}
          </CarouselContent>
          <CarouselPrevious disabled={isLoading} />
          <CarouselNext disabled={isLoading} />
        </Carousel>
      </div>
    </div>
  );
}
