"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllTypes } from "@/lib/database/actions/types.actions";
import { IListingType } from "@/lib/database/models/listingType.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const TypeFilter = () => {
  const [listingTypes, setListingTypes] = useState<IListingType[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getListingTypes = async () => {
      const typeList = await getAllTypes();

      typeList && setListingTypes(typeList as IListingType[]);
    };

    getListingTypes();
  }, []);

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

  return (
    <Select onValueChange={(value: string) => onSelectType(value)}>
      <SelectTrigger className="form-dropdown-trigger">
        <SelectValue placeholder="Condition" />
      </SelectTrigger>
      <SelectContent className="form-dropdown-container">
        <SelectItem value="All">All</SelectItem>

        {listingTypes.map((listingType) => (
          <SelectItem
            value={listingType.label}
            key={listingType._id}
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
