"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { transmissionOptions } from "@/constants";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const TransmissionFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSelectTransmission = (transmission: string) => {
    let newUrl = "";

    if (transmission && transmission !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "transmission",
        value: transmission,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["transmission"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  const sortedTransmissionTypes = transmissionOptions
    .slice()
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <Select onValueChange={(value: string) => onSelectTransmission(value)}>
      <SelectTrigger className="form-dropdown-trigger">
        <SelectValue placeholder="Transmission" />
      </SelectTrigger>
      <SelectContent className="form-dropdown-container">
        <SelectItem value="All">All</SelectItem>

        {sortedTransmissionTypes.map((transmission) => (
          <SelectItem
            value={transmission.label}
            key={transmission.id}
            className="form-dropdown-text"
          >
            {transmission.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TransmissionFilter;
