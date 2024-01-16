import ListingDetailsLists from "@/components/listing/ListingDetails";
import SaveListing from "@/components/listing/SaveListing";
import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import {
  getListingById,
  getRelatedListingsByBrand,
} from "@/lib/database/actions/listing.actions";
import { formatPrice } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { Kanit } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const kanit = Kanit({ subsets: ["latin"], weight: ["600"] });

async function ListingDetails({
  params: { id },
  searchParams,
}: SearchParamProps) {
  const listing = await getListingById(id);
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isCreator = userId === listing.creator._id;

  const relatedListings = await getRelatedListingsByBrand({
    brandId: listing.brand._id,
    listingId: listing._id,
    page: searchParams.page as string,
  });

  const listingClosed = new Date(listing.closingDateTime) < new Date();

  return (
    <>
      <section>
        <div className="bg-slate-100 dark:bg-slate-900 pb-12">
          <div className="wrapper grid grid-cols-1 md:grid-cols-2">
            <div className="py-8 flex flex-col gap-1">
              <h2 className={`${kanit.className} text-4xl`}>{listing.title}</h2>
              <h3 className="text-2xl font-medium">
                $ {formatPrice(listing.price)}{" "}
                <span className="text-xs text-slate-500">NZD</span>
              </h3>
              <div className="flex flex-row gap-3 items-center py-6 rounded-md">
                <Image
                  src={listing.creator.photo}
                  alt={listing.creator.firstName}
                  height={40}
                  width={40}
                  className="rounded-full"
                />
                <div>
                  <h4 className="text-xs font-light dark:text-slate-400">
                    Listed by
                  </h4>
                  <p className="font-semibold">@{listing.creator.username}</p>
                </div>
              </div>

              <div className="flex flex-row gap-5">
                {isCreator && (
                  <Button asChild size="lg">
                    <Link href={`/listings/${listing._id}/update`}>
                      Edit Listing
                    </Link>
                  </Button>
                )}

                {listingClosed ? (
                  <p>Listing has Closed</p>
                ) : (
                  <SaveListing listing={listing} userId={userId} />
                )}
              </div>

              <ListingDetailsLists listing={listing} />
            </div>
            <div>
              <Image
                src={listing.imageUrl}
                alt={listing.title}
                width={600}
                height={650}
                className="rounded-md w-full object-cover"
              />
            </div>
          </div>
          <div className="wrapper">
            <h4 className="text-xl font-semibold pb-4">Description</h4>
            <p className="font-light leading-7">{listing.description}</p>
          </div>
        </div>
      </section>

      <section className="wrapper mt-8 flex flex-col gap-2 md:gap-6">
        <h2 className={`${kanit.className} text-2xl`}>Related Listings</h2>

        <Collection
          data={relatedListings?.data}
          emptyTitle="No Listings Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Listings"
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedListings?.totalPages}
        />
      </section>
    </>
  );
}

export default ListingDetails;
