"use server";

import { connectToDatabase } from "..";
import Brand from "../models/brand.model";

export const createBrand = async ({ brandLabel }: { brandLabel: string }) => {
  try {
    await connectToDatabase();

    const newBrand = await Brand.create({
      label: brandLabel,
    });

    return JSON.parse(JSON.stringify(newBrand));
  } catch (error) {
    console.log(error);
  }
};

export const getAllBrands = async () => {
  try {
    await connectToDatabase();

    const brands = await Brand.find();

    return JSON.parse(JSON.stringify(brands));
  } catch (error) {
    console.log(error);
  }
};
