import { startTransition, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { IListingType } from "@/lib/database/models/listingType.model";
import {
  createListingTypes,
  getAllTypes,
} from "@/lib/database/actions/types.actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Input } from "../ui/input";
import { IBrand } from "@/lib/database/models/brand.model";
import {
  createBrand,
  getAllBrands,
} from "@/lib/database/actions/brand.actions";
import { IBody } from "@/lib/database/models/body.model";
import { createBody, getAllBodys } from "@/lib/database/actions/body.actions";
import { IDrivetrain } from "@/lib/database/models/drivetrain.model";
import {
  createDrivetrain,
  getAllDrivetrains,
} from "@/lib/database/actions/drivetain.actions";

type DrivetrainDropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
  userId: string;
};

function DrivetrainDropdown({
  value,
  onChangeHandler,
  userId,
}: DrivetrainDropdownProps) {
  const [drivetrains, setDrivetrains] = useState<IDrivetrain[]>([]);
  const [newDrivetrain, setNewDrivetrain] = useState("");

  const handleAddCategory = () => {
    createDrivetrain({
      drivetrainLabel: newDrivetrain.trim(),
    }).then((drivetrain) => {
      setDrivetrains((prevState) => [...prevState, drivetrain]);
    });
  };

  useEffect(() => {
    const getTypes = async () => {
      const typeList = await getAllDrivetrains();
      typeList && setDrivetrains(typeList as IDrivetrain[]);
    };

    getTypes();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="form-dropdown-trigger">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent className="form-dropdown-container">
        {drivetrains.length > 0 &&
          drivetrains
            .slice()
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((drivetrain) => (
              <p className="form-dropdown-item">
                <SelectItem
                  key={drivetrain._id}
                  value={drivetrain._id}
                  className="form-dropdown-text"
                >
                  {drivetrain.label}
                </SelectItem>
              </p>
            ))}
      </SelectContent>
    </Select>
  );
}

export default DrivetrainDropdown;
