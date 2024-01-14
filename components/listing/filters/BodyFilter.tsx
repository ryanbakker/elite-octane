"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllBodys } from "@/lib/database/actions/body.actions";
import { IBody } from "@/lib/database/models/body.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function BodyFilter() {
  const [bodyTypes, setBodyTypes] = useState<IBody[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getBodyTypes = async () => {
      const bodyTypeList = await getAllBodys();

      bodyTypeList && setBodyTypes(bodyTypeList as IBody[]);
    };

    getBodyTypes();
  }, []);

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
        keysToRemove: ["bodyType"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <Select onValueChange={(value: string) => onSelectBodyType(value)}>
      <SelectTrigger className="form-dropdown-trigger">
        <SelectValue placeholder="Body Style" />
      </SelectTrigger>
      <SelectContent className="form-dropdown-container">
        <SelectItem value="All">All</SelectItem>

        {bodyTypes.map((body) => (
          <SelectItem
            value={body.label}
            key={body._id}
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
