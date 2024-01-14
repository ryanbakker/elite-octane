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

type BodyDropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
  userId: string;
};

function BodyDropdown({ value, onChangeHandler, userId }: BodyDropdownProps) {
  const [bodys, setBodys] = useState<IBody[]>([]);
  const [newBody, setNewBody] = useState("");

  const handleAddCategory = () => {
    createBody({
      bodyLabel: newBody.trim(),
    }).then((body) => {
      setBodys((prevState) => [...prevState, body]);
    });
  };

  useEffect(() => {
    const getTypes = async () => {
      const typeList = await getAllBodys();
      typeList && setBodys(typeList as IListingType[]);
    };

    getTypes();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="form-dropdown-trigger">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent className="form-dropdown-container">
        {bodys.length > 0 &&
          bodys
            .slice()
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((body) => (
              <p className="form-dropdown-item">
                <SelectItem
                  key={body._id}
                  value={body._id}
                  className="form-dropdown-text"
                >
                  {body.label}
                </SelectItem>
              </p>
            ))}
      </SelectContent>
    </Select>
  );
}

export default BodyDropdown;
