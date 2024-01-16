"use server";

import {
  CreateSaveParams,
  GetSavesByListingParams,
  GetSavesByUserParams,
} from "@/types";
import { connectToDatabase } from "..";
import { ObjectId } from "mongodb";
import Save from "../models/save.model";
import Listing from "../models/listing.model";
import User from "../models/user.model";

export const createSave = async ({ listingId, saverId }: CreateSaveParams) => {
  try {
    await connectToDatabase();

    const newSave = await Save.create({
      listing: listingId,
      saver: saverId,
    });

    // Populate the referenced fields (listing and saver)
    const populatedSave = await newSave
      .populate("listing", "price closingDateTime year carModel brand")
      .populate("saver", "firstName lastName email username photoUrl");

    // Log the populated document
    console.log("Saved document:", populatedSave);

    return JSON.parse(JSON.stringify(populatedSave));
  } catch (error) {
    console.log(error);
  }
};

export async function getSavesByListing({
  searchString,
  listingId,
}: GetSavesByListingParams) {
  try {
    await connectToDatabase();

    if (!listingId) throw new Error("Listing ID is required");
    const listingObjectId = new ObjectId(listingId);

    const saves = await Save.aggregate([
      {
        $lookup: {
          from: "listings", // Assuming your listings collection name is "listings"
          localField: "listing._id",
          foreignField: "_id",
          as: "listing",
        },
      },
      {
        $unwind: "$listing",
      },
      {
        $lookup: {
          from: "users",
          localField: "saver._id",
          foreignField: "_id",
          as: "saver",
        },
      },
      {
        $unwind: "$saver",
      },
      {
        $project: {
          _id: 1,
          createdAt: 1,
          listingId: "$listing._id",
          price: "$listing.price",
          closingDateTime: "$listing.closingDateTime",
          year: "$listing.year",
          carModel: "$listing.carModel",
          brand: "$listing.brand",
          saverId: "$saver._id",
          saverName: { $concat: ["$saver.firstName", " ", "$saver.lastName"] },
          saverEmail: "$saver.email",
          saverUsername: "$saver.username",
          saverPhotoUrl: "$saver.photoUrl",
        },
      },
      {
        $match: {
          $and: [
            { listingId: listingObjectId },
            { saver: { $regex: RegExp(searchString, "i") } },
          ],
        },
      },
    ]);

    return JSON.parse(JSON.stringify(saves));
  } catch (error) {
    console.log(error);
  }
}

export async function getSavesByUser({
  userId,
  limit = 3,
  page,
}: GetSavesByUserParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = { saver: userId };

    const saves = await Save.distinct("listing._id")
      .find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "listing",
        model: Listing,
        populate: {
          path: "creator",
          model: User,
          select: "_id firstName lastName username photoUrl email",
        },
      });

    const savesCount = await Save.distinct("listing._id").countDocuments(
      conditions
    );

    return {
      data: JSON.parse(JSON.stringify(saves)),
      totalPages: Math.ceil(savesCount / limit),
    };
  } catch (error) {
    console.log(error);
  }
}

export async function removeSave(userId: string, saveId: string) {
  try {
    await connectToDatabase();

    // Remove the save document from the database based on _id
    const result = await Save.findByIdAndDelete(saveId);

    if (result) {
      // Check if the saver matches the provided userId
      if (result.saver.toString() === userId) {
        // Successfully removed the save
        return { success: true, message: "Save removed successfully" };
      } else {
        // User doesn't have permission to remove
        return {
          success: false,
          message: "User doesn't have permission to remove this save",
        };
      }
    } else {
      // Save not found
      return { success: false, message: "Save not found" };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while removing the save",
    };
  }
}
