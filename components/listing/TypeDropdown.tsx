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

type TypeDropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
  userId: string;
};

function TypeDropdown({ value, onChangeHandler, userId }: TypeDropdownProps) {
  const [listingTypes, setListingTypes] = useState<IListingType[]>([]);
  const [newListingType, setNewListingType] = useState("");

  const handleAddCategory = () => {
    createListingTypes({
      typeLabel: newListingType.trim(),
    }).then((category) => {
      setListingTypes((prevState) => [...prevState, category]);
    });
  };

  useEffect(() => {
    const getTypes = async () => {
      const typeList = await getAllTypes();
      typeList && setListingTypes(typeList as IListingType[]);
    };

    getTypes();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="form-dropdown-trigger">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent className="form-dropdown-container">
        {listingTypes.length > 0 &&
          listingTypes
            .slice()
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((type) => (
              <p className="form-dropdown-item">
                <SelectItem
                  key={type._id}
                  value={type._id}
                  className="form-dropdown-text"
                >
                  {type.label}
                </SelectItem>
              </p>
            ))}
      </SelectContent>
    </Select>
  );
}

export default TypeDropdown;
