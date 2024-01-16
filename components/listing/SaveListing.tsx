"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { IListing } from "@/lib/database/models/listing.model";
import { createSave } from "@/lib/database/actions/save.actions";

type SaveListingProps = {
  listing: IListing;
  userId: string;
};

function SaveListing({ listing, userId }: SaveListingProps) {
  const [isSaved, setIsSaved] = useState(() => {
    // Initialize the state based on local storage or any other persistence mechanism
    const savedState = localStorage.getItem("isSaved");
    return savedState ? JSON.parse(savedState) : false;
  });

  const listingId = listing._id;

  useEffect(() => {
    // Update local storage when the state changes
    localStorage.setItem("isSaved", JSON.stringify(isSaved));
  }, [isSaved]);

  async function handleSaveListing() {
    try {
      await createSave({
        saverId: userId,
        listingId: listingId,
        createdAt: new Date(),
      });

      // Update the state to indicate that the listing is saved
      setIsSaved(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {isSaved ? (
        // Button when the listing is saved
        <Button
          size="lg"
          className="flex flex-row gap-1.5 items-center disabled text-white bg-red-500 cursor-default hover:bg-red-500"
        >
          <Heart size={16} className="text-white fill-white" /> Saved
        </Button>
      ) : (
        // Button when the listing is not saved
        <Button
          size="lg"
          className="flex flex-row gap-1.5 items-center"
          onClick={handleSaveListing}
        >
          <Heart size={16} /> Save Listing
        </Button>
      )}
    </>
  );
}

export default SaveListing;
