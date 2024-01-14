"use server";

import { connectToDatabase } from "..";
import ListingType from "../models/listingType.model";

export const createListingTypes = async ({
  typeLabel,
}: {
  typeLabel: string;
}) => {
  try {
    await connectToDatabase();

    const newListingType = await ListingType.create({
      label: typeLabel,
    });

    return JSON.parse(JSON.stringify(newListingType));
  } catch (error) {
    console.log(error);
  }
};

export const getAllTypes = async () => {
  try {
    await connectToDatabase();

    const types = await ListingType.find();

    return JSON.parse(JSON.stringify(types));
  } catch (error) {
    console.log(error);
  }
};
