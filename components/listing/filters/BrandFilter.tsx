"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllBrands } from "@/lib/database/actions/brand.actions";
import { IBrand } from "@/lib/database/models/brand.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const BrandFilter = () => {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getBrands = async () => {
      const brandList = await getAllBrands();

      brandList && setBrands(brandList as IBrand[]);
    };

    getBrands();
  }, []);

  const onSelectBrand = (brand: string) => {
    let newUrl = "";

    if (brand && brand !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "brand",
        value: brand,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["brand"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  // Sort brands alphabetically by label
  const sortedBrands = brands
    .slice()
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <Select onValueChange={(value: string) => onSelectBrand(value)}>
      <SelectTrigger className="form-dropdown-trigger">
        <SelectValue placeholder="Brand" />
      </SelectTrigger>
      <SelectContent className="form-dropdown-container">
        <SelectItem value="All">All</SelectItem>

        {sortedBrands.map((brand) => (
          <SelectItem
            value={brand.label}
            key={brand._id}
            className="form-dropdown-text"
          >
            {brand.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default BrandFilter;
