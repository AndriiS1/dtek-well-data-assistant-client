import { Card, CardContent } from "@/components/ui/card";
import CustomCalendar from "./CustomCalendar";
import GroupingIntervals from "./GroupingIntervals";
import GroupingTypes from "./GroupingTypes";

const Filters = () => {
  const GroupingFilters = () => {
    return (
      <Card>
        <CardContent className="flex flex-row gap-4">
          <div className="flex-1">
            <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
              Інтервал
            </h3>
            <GroupingIntervals />
          </div>

          <hr className="w-px bg-border self-stretch" />

          <div className="flex-1">
            <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
              Тип агрегації
            </h3>
            <GroupingTypes />
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="shrink-0 w-full flex justify-center">
        {GroupingFilters()}
      </div>
      <div className="w-full flex justify-center">
        <CustomCalendar />
      </div>
    </div>
  );
};

export default Filters;
