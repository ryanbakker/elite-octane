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
import { IFuel } from "@/lib/database/models/fuel.model";
import { createFuel, getAllFuels } from "@/lib/database/actions/fuel.actions";

type FuelDropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
  userId: string;
};

function FuelDropdown({ value, onChangeHandler, userId }: FuelDropdownProps) {
  const [fuels, setFuels] = useState<IFuel[]>([]);
  const [newFuel, setNewFuel] = useState("");

  const handleAddCategory = () => {
    createFuel({
      fuelLabel: newFuel.trim(),
    }).then((fuel) => {
      setFuels((prevState) => [...prevState, fuel]);
    });
  };

  useEffect(() => {
    const getTypes = async () => {
      const typeList = await getAllFuels();
      typeList && setFuels(typeList as IFuel[]);
    };

    getTypes();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="form-dropdown-trigger">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent className="form-dropdown-container">
        {fuels.length > 0 &&
          fuels
            .slice()
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((fuel) => (
              <p className="form-dropdown-item">
                <SelectItem
                  key={fuel._id}
                  value={fuel._id}
                  className="form-dropdown-text"
                >
                  {fuel.label}
                </SelectItem>
              </p>
            ))}
      </SelectContent>
    </Select>
  );
}

export default FuelDropdown;
