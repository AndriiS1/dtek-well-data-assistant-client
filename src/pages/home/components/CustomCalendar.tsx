import { Calendar } from "@/components/ui/calendar";
import { addDays, endOfDay, startOfDay } from "date-fns";
import type { DateRange } from "react-day-picker";
import { useSearchParams } from "react-router-dom";

interface Props {
  from: string | null;
  to: string | null;
}

const CustomCalendar = ({ from, to }: Props) => {
  const dateRange: DateRange | undefined = {
    from: from ? new Date(from) : new Date(),
    to: to ? new Date(to) : addDays(new Date(), 7),
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSetDate = (dateRange: DateRange | undefined) => {
    if (dateRange?.from && dateRange?.to) {
      const currentParams = Object.fromEntries(searchParams.entries());

      setSearchParams(
        {
          ...currentParams,
          from: startOfDay(dateRange.from).toISOString(),
          to: endOfDay(dateRange.to).toISOString(),
        },
        { replace: true }
      );
    }
  };

  return (
    <Calendar
      autoFocus
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={handleSetDate}
      numberOfMonths={1}
      className="rounded-md border"
    />
  );
};

export default CustomCalendar;
