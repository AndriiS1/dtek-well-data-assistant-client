import { WellMetricsApiService } from "@/api/services/WellMetricsApiService";
import { searchParamsConstants } from "@/constants/searchParamsConstants";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RadioButtonList from "./RadioButtonList";

const GroupingIntervals = () => {
  const [intervals, setIntervals] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [searchParams] = useSearchParams();
  const selectedInterval = searchParams.get(searchParamsConstants.interval);

  useEffect(() => {
    const fetchWellInfo = async () => {
      try {
        setIsLoading(true);
        const data = await WellMetricsApiService.getGroupingIntervals();
        setIntervals(data);
      } catch (error) {
        console.error("Failed to fetch intervals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWellInfo();
  }, []);

  return (
    <RadioButtonList
      paramKey={searchParamsConstants.interval}
      options={intervals.map((interval) => ({
        label: interval,
        value: interval,
      }))}
      defaultValue={selectedInterval ?? intervals[0]}
      isLoading={isLoading}
    />
  );
};

export default GroupingIntervals;
