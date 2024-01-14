"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllTransmissions } from "@/lib/database/actions/transmission.actions";
import { ITransmission } from "@/lib/database/models/transmission.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const TransmissionFilter = () => {
  const [transmissionTypes, setTransmissionTypes] = useState<ITransmission[]>(
    []
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getTransmissionTypes = async () => {
      const transmissionList = await getAllTransmissions();

      transmissionList &&
        setTransmissionTypes(transmissionList as ITransmission[]);
    };

    getTransmissionTypes();
  }, []);

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

  return (
    <Select onValueChange={(value: string) => onSelectTransmission(value)}>
      <SelectTrigger className="form-dropdown-trigger">
        <SelectValue placeholder="Transmission" />
      </SelectTrigger>
      <SelectContent className="form-dropdown-container">
        <SelectItem value="All">All</SelectItem>

        {transmissionTypes.map((transmission) => (
          <SelectItem
            value={transmission.label}
            key={transmission._id}
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
