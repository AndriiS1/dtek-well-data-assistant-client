import { Card, CardContent } from "@/components/ui/card";
import CustomCalendar from "./CustomCalendar";
import GroupingIntervals from "./GroupingIntervals";
import GroupingTypes from "./GroupingTypes";

const Filters = () => {
  const GroupingFilters = () => {
    return (
      <Card>
        <CardContent className="flex flex-row gap-8">
          <div className="flex-1">
            <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
              Інтервал
            </h3>
            <GroupingIntervals />
          </div>

          <div className="w-px bg-border self-stretch" />

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
    <div className="flex flex-col items-start gap-4">
      <div className="shrink-0">{GroupingFilters()}</div>
      <div className="grow">
        <CustomCalendar />
      </div>
    </div>
  );
};

export default Filters;
