import { Button } from "@/components/ui/button";
import { SearchParamProps } from "@/types";
import Link from "next/link";
import { Kanit } from "next/font/google";
import { auth } from "@clerk/nextjs";
import { getListingsByUser } from "@/lib/database/actions/listing.actions";
import Collection from "@/components/shared/Collection";
import { getSavesByUser } from "@/lib/database/actions/save.actions";
import { ISave } from "@/lib/database/models/save.model";

const kanit = Kanit({ subsets: ["latin"], weight: ["600"] });

async function Profile({ searchParams }: SearchParamProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const savesPage = Number(searchParams?.savesPage) || 1;
  const listingsPage = Number(searchParams?.listingsPage) || 1;

  const saves = await getSavesByUser({ userId, page: savesPage });
  const savedListings = saves?.data.map((save: ISave) => save.listing);

  const createdListings = await getListingsByUser({
    userId,
    page: listingsPage,
  });

  return (
    <>
      <section className="dark:bg-slate-900 py-5">
        <h3 className={`page-heading ${kanit.className}`}>
          <span>My Profile</span>
        </h3>
      </section>

      <section>
        <div className="wrapper flex flex-row items-end justify-between">
          <h2 className="text-3xl font-semibold underline underline-offset-8">
            Watchlist
          </h2>

          <Button asChild size="lg">
            <Link href="/#listings">Explore Listings</Link>
          </Button>
        </div>
      </section>

      <section className="dark:bg-slate-900 py-5 mb-8 mt-2">
        <div className="wrapper">
          <Collection
            data={savedListings}
            emptyTitle="No listings saved yet"
            emptyStateSubtext="No worries, save cars you like and find them here"
            collectionType="My_Watchlist"
            limit={3}
            page={savesPage}
            totalPages={saves?.totalPages}
          />
        </div>
      </section>

      <section>
        <div className="wrapper flex flex-row items-end justify-between">
          <h2 className="text-3xl font-semibold underline underline-offset-8">
            My Listings
          </h2>

          <Button asChild size="lg">
            <Link href="/listings/create">Create Listing</Link>
          </Button>
        </div>
      </section>

      <section className="dark:bg-slate-900 py-5 mb-8 mt-2">
        <Collection
          data={createdListings?.data}
          emptyTitle="No listings have been created yet"
          emptyStateSubtext="Go create one now"
          collectionType="Listings_Posted"
          limit={3}
          page={listingsPage}
          urlParamName="listingsPage"
          totalPages={createdListings?.totalPages}
        />
      </section>
    </>
  );
}

export default Profile;
