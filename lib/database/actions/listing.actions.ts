"use server";

import {
  CreateListingParams,
  GetAllListingsParams,
  GetRelatedListingsByBrandParams,
  UpdateListingParams,
} from "@/types";
import { connectToDatabase } from "..";
import User from "../models/user.model";
import Listing from "../models/listing.model";
import { revalidatePath } from "next/cache";
import Brand from "../models/brand.model";
import ListingType from "../models/listingType.model";
import Body from "../models/body.model";
import Fuel from "../models/fuel.model";
import Drivetrain from "../models/drivetrain.model";
import Transmission from "../models/transmission.model";

const getBodyByLabel = async (label: string) => {
  return Body.findOne({ label: { $regex: label, $options: "i" } });
};
const getBrandByLabel = async (label: string) => {
  return Brand.findOne({ label: { $regex: label, $options: "i" } });
};
const getDrivetrainByLabel = async (label: string) => {
  return Drivetrain.findOne({ label: { $regex: label, $options: "i" } });
};
const getFuelByLabel = async (label: string) => {
  return Fuel.findOne({ label: { $regex: label, $options: "i" } });
};
const getTransmissionByLabel = async (label: string) => {
  return Transmission.findOne({ label: { $regex: label, $options: "i" } });
};
const getListingTypeByLabel = async (label: string) => {
  return ListingType.findOne({ label: { $regex: label, $options: "i" } });
};

const populateListing = (query: any) => {
  return query
    .populate({
      path: "creator",
      model: User,
      select: "_id firstName lastName photo username",
    })
    .populate({ path: "brand", model: Brand, select: "_id label" })
    .populate({ path: "listingType", model: ListingType, select: "_id label" })
    .populate({ path: "body", model: Body, select: "_id label" })
    .populate({ path: "fuel", model: Fuel, select: "_id label" })
    .populate({ path: "drivetrain", model: Drivetrain, select: "_id label" })
    .populate({
      path: "transmission",
      model: Transmission,
      select: "_id label",
    });
};

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

export async function getListingById(listingId: string) {
  try {
    await connectToDatabase();

    const listing = await populateListing(Listing.findById(listingId));

    if (!listing) throw new Error("Listing not found");

    return JSON.parse(JSON.stringify(listing));
  } catch (error) {
    console.log(error);
  }
}

export async function getRelatedListingsByBrand({
  brandId,
  listingId,
  limit = 3,
  page = 1,
}: GetRelatedListingsByBrandParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ brand: brandId }, { _id: { $ne: listingId } }],
    };

    const listingsQuery = Listing.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const listings = await populateListing(listingsQuery);
    const listingsCount = await Listing.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(listings)),
      totalPages: Math.ceil(listingsCount / limit),
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getAllListings({
  query,
  limit = 9,
  page,
  body,
  brand,
  drivetrain,
  fuel,
  transmission,
  listingType,
}: GetAllListingsParams) {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const bodyCondition = body ? await getBodyByLabel(body) : null;
    const brandCondition = brand ? await getBrandByLabel(brand) : null;
    const drivetrainCondition = drivetrain
      ? await getDrivetrainByLabel(drivetrain)
      : null;
    const fuelCondition = fuel ? await getFuelByLabel(fuel) : null;
    const transmissionCondition = transmission
      ? await getTransmissionByLabel(transmission)
      : null;
    const listingTypeCondition = listingType
      ? await getListingTypeByLabel(listingType)
      : null;
    const conditions = {
      $and: [
        titleCondition,
        bodyCondition ? { body: bodyCondition._id } : {},
        brandCondition ? { brand: brandCondition._id } : {},
        drivetrainCondition ? { drivetrain: drivetrainCondition._id } : {},
        fuelCondition ? { fuel: fuelCondition._id } : {},
        transmissionCondition
          ? { transmission: transmissionCondition._id }
          : {},
        listingTypeCondition ? { listingType: listingTypeCondition._id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const listingsQuery = Listing.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const listings = await populateListing(listingsQuery);
    const listingsCount = await Listing.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(listings)),
      totalPages: Math.ceil(listingsCount / limit),
    };
  } catch (error) {
    console.log(error);
  }
}
