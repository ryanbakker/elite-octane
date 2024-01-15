"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { listingTypeOptions } from "@/constants";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const TypeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSelectType = (listingType: string) => {
    let newUrl = "";

    if (listingType && listingType !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "listingType",
        value: listingType,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["listingType"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  const sortedListingTypes = listingTypeOptions
    .slice()
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <Select onValueChange={(value: string) => onSelectType(value)}>
      <SelectTrigger className="form-dropdown-trigger">
        <SelectValue placeholder="Condition" />
      </SelectTrigger>
      <SelectContent className="form-dropdown-container">
        <SelectItem value="All">All</SelectItem>

        {sortedListingTypes.map((listingType) => (
          <SelectItem
            value={listingType.label}
            key={listingType.id}
            className="form-dropdown-text"
          >
            {listingType.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TypeFilter;
