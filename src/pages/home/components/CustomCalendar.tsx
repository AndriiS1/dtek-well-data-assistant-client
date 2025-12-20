import { Calendar } from "@/components/ui/calendar";
import { addDays, endOfDay, startOfDay } from "date-fns";
import type { DateRange } from "react-day-picker";
import { useSearchParams } from "react-router-dom";

const CustomCalendar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");

  const dateRange: DateRange | undefined = {
    from: fromParam ? new Date(fromParam) : startOfDay(new Date()),
    to: toParam ? new Date(toParam) : endOfDay(addDays(new Date(), 7)),
  };

  const handleSetDate = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      const newParams = new URLSearchParams(searchParams);

      newParams.set("from", startOfDay(range.from).toISOString());
      newParams.set("to", endOfDay(range.to).toISOString());

      setSearchParams(newParams, { replace: true });
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
