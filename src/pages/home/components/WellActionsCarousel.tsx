import { WellActionsApiService } from "@/api/services/WellActionsApiService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { Action, ActionItem } from "@/types/actions";
import { useEffect, useState } from "react";

interface WellActionsCarouselProps {
  wellId: string;
  from: string;
  to: string;
  selectedActions: ActionItem[];
  onSelectionChange: (selectedActions: ActionItem[]) => void;
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await WellActionsApiService.getWellActions(
        wellId,
        from,
        to,
        {
          limit: 10,
          offset: 0,
        }
      );
      setData(result);
      setIsLoading(false);
    };

    fetchData();
  }, [wellId, from, to]);

  const toggleSelection = (actionItem: ActionItem) => {
    const isSelected = selectedActions.filter((a) => a.id === actionItem.id)[0];
    if (isSelected) {
      onSelectionChange(selectedActions.filter((a) => a.id !== actionItem.id));
    } else {
      onSelectionChange([...selectedActions, actionItem]);
    }
  };

  if (isLoading)
    return <div className="p-8 text-center text-sm">Loading actions...</div>;
  if (!data || data.items.length === 0)
    return <div className="p-8 text-center text-sm">No actions found.</div>;

  return (
    <div className="w-full px-12">
      <Carousel opts={{ align: "start", loop: false }} className="w-full">
        <CarouselContent className="items-stretch">
          {data.items.map((item: ActionItem) => {
            const isSelected = selectedActions.some((a) => a.id === item.id);

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
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                        : "hover:border-muted-foreground/50 border-transparent"
                    )}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle
                          className={cn(
                            "text-lg transition-colors",
                            isSelected ? "text-primary" : "text-foreground"
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
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
