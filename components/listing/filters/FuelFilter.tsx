"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fuelTypeOptions } from "@/constants";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const FuelFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSelectFuelType = (fuel: string) => {
    let newUrl = "";

    if (fuel && fuel !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "fuel",
        value: fuel,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["fuel"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  const sortedFuelTypes = fuelTypeOptions
    .slice()
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <Select onValueChange={(value: string) => onSelectFuelType(value)}>
      <SelectTrigger className="form-dropdown-trigger">
        <SelectValue placeholder="Fuel Type" />
      </SelectTrigger>
      <SelectContent className="form-dropdown-container">
        <SelectItem value="All">All</SelectItem>

        {sortedFuelTypes.map((fuel) => (
          <SelectItem
            value={fuel.label}
            key={fuel.id}
            className="form-dropdown-text"
          >
            {fuel.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FuelFilter;
