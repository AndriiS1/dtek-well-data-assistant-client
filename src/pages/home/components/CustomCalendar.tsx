import { Calendar } from "@/components/ui/calendar";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import { useSearchParams } from "react-router-dom";

const CustomCalendar = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (date?.from && date?.to) {
      const currentParams = Object.fromEntries(searchParams.entries());

      setSearchParams(
        {
          ...currentParams,
          from: date.from.toISOString(),
          to: date.to.toISOString(),
        },
        { replace: true }
      );
    }
  }, [date, searchParams, setSearchParams]);

  return (
    <Calendar
      autoFocus
      mode="range"
      defaultMonth={date?.from}
      selected={date}
      onSelect={setDate}
      numberOfMonths={1}
      className="rounded-md border"
    />
  );
};

export default CustomCalendar;
