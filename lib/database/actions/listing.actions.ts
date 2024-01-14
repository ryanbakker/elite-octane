"use server";

import { CreateListingParams, UpdateListingParams } from "@/types";
import { connectToDatabase } from "..";
import User from "../models/user.model";
import Listing from "../models/listing.model";
import { revalidatePath } from "next/cache";

export async function createListing({
  userId,
  listing,
  path,
}: CreateListingParams) {
  try {
    await connectToDatabase();

    const creator = await User.findById(userId);
    if (!creator) throw new Error("Creator not found");

    const newListing = await Listing.create({
      ...listing,
      brand: listing.brandId,
      listingType: listing.listingTypeId,
      body: listing.bodyId,
      fuel: listing.fuelId,
      drivetrain: listing.drivetrainId,
      transmission: listing.transmissionId,
      creator: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newListing));
  } catch (error) {
    console.log(error);
  }
}

export async function updateListing({
  userId,
  listing,
  path,
}: UpdateListingParams) {
  try {
    await connectToDatabase();

    const listingToUpdate = await Listing.findById(listing._id);
    if (!listingToUpdate || listingToUpdate.creator.toHexString() !== userId) {
      throw new Error("Unauthorized or Listing not found");
    }

    const updateListing = await Listing.findByIdAndUpdate(
      listing._id,
      {
        ...listing,
        brand: listing.brandId,
        listingType: listing.listingTypeId,
        body: listing.bodyId,
        fuel: listing.fuelId,
        drivetrain: listing.drivetrainId,
        transmission: listing.transmissionId,
      },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updateListing));
  } catch (error) {
    console.log(error);
  }
}
