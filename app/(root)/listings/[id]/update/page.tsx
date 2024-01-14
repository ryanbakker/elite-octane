import { getListingById } from "@/lib/database/actions/listing.actions";
import { Kanit } from "next/font/google";
import { auth } from "@clerk/nextjs";
import ListingForm from "@/components/listing/ListingForm";

const kanit = Kanit({ subsets: ["latin"], weight: ["600"] });

type UpdateListingProps = {
  params: {
    id: string;
  };
};

async function UpdateListing({ params: { id } }: UpdateListingProps) {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const listing = await getListingById(id);

  return (
    <>
      <section className="dark:bg-slate-900 py-5">
        <h3 className={`page-heading ${kanit.className}`}>
          <span>Create Listing</span>
        </h3>
      </section>

      <section className="wrapper">
        <ListingForm
          userId={userId}
          type="Update"
          listing={listing}
          listingId={listing._id}
        />
      </section>
    </>
  );
}

export default UpdateListing;
