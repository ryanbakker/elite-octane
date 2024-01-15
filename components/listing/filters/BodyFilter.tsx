"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bodyStyleOptions } from "@/constants";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

function BodyFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSelectBodyType = (bodyType: string) => {
    let newUrl = "";

    if (bodyType && bodyType !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "body",
        value: bodyType,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["body"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  const sortedBodyTypes = bodyStyleOptions
    .slice()
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <Select onValueChange={(value: string) => onSelectBodyType(value)}>
      <SelectTrigger className="form-dropdown-trigger">
        <SelectValue placeholder="Body Style" />
      </SelectTrigger>
      <SelectContent className="form-dropdown-container">
        <SelectItem value="All">All</SelectItem>

        {sortedBodyTypes.map((body) => (
          <SelectItem
            value={body.label}
            key={body.id}
            className="form-dropdown-text"
          >
            {body.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default BodyFilter;
