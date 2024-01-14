"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllDrivetrains } from "@/lib/database/actions/drivetain.actions";
import { IDrivetrain } from "@/lib/database/models/drivetrain.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const DrivetrainFilter = () => {
  const [drivetrains, setDrivetrains] = useState<IDrivetrain[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getDrivetrains = async () => {
      const drivetrainList = await getAllDrivetrains();

      drivetrainList && setDrivetrains(drivetrainList as IDrivetrain[]);
    };

    getDrivetrains();
  }, []);

  const onSelectDrivetrain = (drivetrain: string) => {
    let newUrl = "";

    if (drivetrain && drivetrain !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "drivetrain",
        value: drivetrain,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["drivetrain"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <Select onValueChange={(value: string) => onSelectDrivetrain(value)}>
      <SelectTrigger className="form-dropdown-trigger">
        <SelectValue placeholder="Drivetrain" />
      </SelectTrigger>
      <SelectContent className="form-dropdown-container">
        <SelectItem value="All">All</SelectItem>

        {drivetrains.map((drivetrain) => (
          <SelectItem
            value={drivetrain.label}
            key={drivetrain._id}
            className="form-dropdown-text"
          >
            {drivetrain.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DrivetrainFilter;
