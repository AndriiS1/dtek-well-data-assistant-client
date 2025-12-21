import { searchParamsConstants } from "@/constants/searchParamsConstants";
import { useSearchParams } from "react-router-dom";
import RadioButtonList from "./RadioButtonList";

const GroupingTypes = () => {
  const [searchParams] = useSearchParams();
  const selectedType = searchParams.get(searchParamsConstants.aggregationType);
  const groupingTypes: string[] = ["avg", "min", "max"];

  return (
    <RadioButtonList
      paramKey={searchParamsConstants.aggregationType}
      options={groupingTypes.map((type) => ({
        label: type,
        value: type,
      }))}
      defaultValue={selectedType ?? groupingTypes[0]}
    />
  );
};

export default GroupingTypes;
