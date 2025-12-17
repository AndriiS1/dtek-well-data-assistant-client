import { Calendar } from "@/components/ui/calendar";
import { addDays } from "date-fns";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

const CustomCalendar = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

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
