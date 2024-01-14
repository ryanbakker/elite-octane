"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllFuels } from "@/lib/database/actions/fuel.actions";
import { IFuel } from "@/lib/database/models/fuel.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FuelFilter = () => {
  const [fuelTypes, setFuelTypes] = useState<IFuel[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getFuelTypes = async () => {
      const fuelTypeList = await getAllFuels();

      fuelTypeList && setFuelTypes(fuelTypeList as IFuel[]);
    };

    getFuelTypes();
  }, []);

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

  return (
    <Select onValueChange={(value: string) => onSelectFuelType(value)}>
      <SelectTrigger className="form-dropdown-trigger">
        <SelectValue placeholder="Fuel Type" />
      </SelectTrigger>
      <SelectContent className="form-dropdown-container">
        <SelectItem value="All">All</SelectItem>

        {fuelTypes.map((fuel) => (
          <SelectItem
            value={fuel.label}
            key={fuel._id}
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
