import { Calendar } from "@/components/ui/calendar";
import { searchParamsConstants } from "@/constants/searchParamsConstants";
import {
  addDays,
  differenceInMilliseconds,
  endOfDay,
  startOfDay,
} from "date-fns";
import type { DateRange } from "react-day-picker";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const POINT_LIMIT = 100_000;

const CustomCalendar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getIntervalMs = (interval: string): number => {
    const units: Record<string, number> = {
      m: 60 * 1000,
      h: 60 * 60 * 1000,
      d: 24 * 60 * 60 * 1000,
      w: 7 * 24 * 60 * 60 * 1000,
      mo: 30 * 24 * 60 * 60 * 1000,
      y: 365 * 24 * 60 * 60 * 1000,
    };

    const match = interval.match(/^(\d+)(m|h|d|w|mo|y)$/);
    if (!match) return 60 * 60 * 1000;
    const value = parseInt(match[1], 10);
    const unit = match[2];

    return value * (units[unit] || units.h);
  };
  const fromParam = searchParams.get(searchParamsConstants.from);
  const toParam = searchParams.get(searchParamsConstants.to);
  const intervalParam =
    searchParams.get(searchParamsConstants.interval) || "1h";

  const dateRange: DateRange | undefined = {
    from: fromParam ? new Date(fromParam) : startOfDay(new Date()),
    to: toParam ? new Date(toParam) : endOfDay(addDays(new Date(), 7)),
  };

  const handleSetDate = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      const start = startOfDay(range.from);
      const end = endOfDay(range.to);

      const durationMs = differenceInMilliseconds(end, start);
      const intervalMs = getIntervalMs(intervalParam);
      const totalPoints = Math.floor(durationMs / intervalMs);

      if (totalPoints > POINT_LIMIT) {
        toast.error("Проміжок занадто великий", {
          description: `Для ${intervalParam} інтервалу, даний проміжок містить ${totalPoints.toLocaleString()} точок. Будь ласка виберіть менший проміжок, або більшу агрегацію (Ліміт: 100k).`,
        });
        return;
      }

      const newParams = new URLSearchParams(searchParams);
      newParams.set(searchParamsConstants.from, start.toISOString());
      newParams.set(searchParamsConstants.to, end.toISOString());

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
