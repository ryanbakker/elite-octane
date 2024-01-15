"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { drivetrainOptions } from "@/constants";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const DrivetrainFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const sortedDrivetrains = drivetrainOptions
    .slice()
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <Select onValueChange={(value: string) => onSelectDrivetrain(value)}>
      <SelectTrigger className="form-dropdown-trigger">
        <SelectValue placeholder="Drivetrain" />
      </SelectTrigger>
      <SelectContent className="form-dropdown-container">
        <SelectItem value="All">All</SelectItem>

        {sortedDrivetrains.map((drivetrain) => (
          <SelectItem
            value={drivetrain.label}
            key={drivetrain.id}
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
