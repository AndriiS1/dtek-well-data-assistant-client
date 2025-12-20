import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "react-router-dom";

interface RadioOption {
  label: string;
  value: string;
}

interface SearchParamRadioProps {
  paramKey: string;
  options: RadioOption[];
  defaultValue: string | null;
  isLoading?: boolean;
}

const RadioButtonList = ({
  paramKey,
  options,
  defaultValue,
  isLoading,
}: SearchParamRadioProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentValue =
    searchParams.get(paramKey) || defaultValue || options[0]?.value;

  const handleChange = (newValue: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(paramKey, newValue);
    setSearchParams(newParams, { replace: true });
  };

  if (isLoading) {
    return (
      <div className="mx-4 flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <RadioGroup
      value={currentValue}
      onValueChange={handleChange}
      className="mx-4 flex flex-col gap-3"
    >
      {options.map((option) => (
        <div key={option.value} className="flex items-center gap-2">
          <RadioGroupItem
            value={option.value}
            id={`${paramKey}-${option.value}`}
          />
          <Label
            htmlFor={`${paramKey}-${option.value}`}
            className="cursor-pointer text-sm font-medium"
          >
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default RadioButtonList;
