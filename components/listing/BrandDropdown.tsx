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

type BrandDropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
  userId: string;
};

function BrandDropdown({ value, onChangeHandler, userId }: BrandDropdownProps) {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [newBrand, setNewBrand] = useState("");

  const handleAddCategory = () => {
    createBrand({
      brandLabel: newBrand.trim(),
    }).then((category) => {
      setBrands((prevState) => [...prevState, category]);
    });
  };

  useEffect(() => {
    const getTypes = async () => {
      const typeList = await getAllBrands();
      typeList && setBrands(typeList as IListingType[]);
    };

    getTypes();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="form-dropdown-trigger">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent className="form-dropdown-container">
        {brands.length > 0 &&
          brands
            .slice()
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((brand) => (
              <p className="form-dropdown-item">
                <SelectItem
                  key={brand._id}
                  value={brand._id}
                  className="form-dropdown-text"
                >
                  {brand.label}
                </SelectItem>
              </p>
            ))}
      </SelectContent>
    </Select>
  );
}

export default BrandDropdown;
