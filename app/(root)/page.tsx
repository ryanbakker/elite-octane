import BodyFilter from "@/components/listing/filters/BodyFilter";
import BrandFilter from "@/components/listing/filters/BrandFilter";
import ClearButton from "@/components/listing/filters/ClearButton";
import DrivetrainFilter from "@/components/listing/filters/DrivetrainFilter";
import FuelFilter from "@/components/listing/filters/FuelFilter";
import Search from "@/components/listing/filters/Search";
import TransmissionFilter from "@/components/listing/filters/TransmissionFilter";
import TypeFilter from "@/components/listing/filters/TypeFilter";
import Collection from "@/components/shared/Collection";
import Greeting from "@/components/shared/Greeting";
import HeroSection from "@/components/shared/HeroSection";
import { getAllListings } from "@/lib/database/actions/listing.actions";
import { getUserById } from "@/lib/database/actions/user.actions";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const { sessionClaims } = auth();
  const creator = sessionClaims?.userId as string;
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams.query as string) || "";
  const body = (searchParams?.body as string) || "";
  const brand = (searchParams?.brand as string) || "";
  const drivetrain = (searchParams?.drivetrain as string) || "";
  const fuel = (searchParams?.fuel as string) || "";
  const transmission = (searchParams?.transmission as string) || "";
  const listingType = (searchParams?.listingType as string) || "";

  const currentUser = await getUserById(creator);

  const listings = await getAllListings({
    query: searchText,
    body,
    brand,
    drivetrain,
    fuel,
    transmission,
    listingType,
    page: page,
    limit: 9,
  });

  return (
    <>
      <section className="bg-gradient-to-tr dark:from-slate-950 dark:to-slate-800 pt-16 pb-28 relative z-0 overflow-hidden">
        <div className="wrapper">
          <HeroSection />
        </div>
      </section>

      <section id="listings">
        <Greeting
          userFirstName={currentUser.firstName}
          userLastName={currentUser.lastName}
        />

        <div className="wrapper flex flex-col gap-2">
          <div className="flex w-full justify-end">
            <ClearButton />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Search />
            <BrandFilter />
            <TypeFilter />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <DrivetrainFilter />
            <TransmissionFilter />
            <BodyFilter />
            <FuelFilter />
          </div>
        </div>

        <Collection
          data={listings?.data}
          emptyTitle="No Listings Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Listings"
          limit={9}
          page={page}
          totalPages={listings?.totalPages}
        />
      </section>
    </>
  );
}
