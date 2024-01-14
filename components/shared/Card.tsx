import { IListing } from "@/lib/database/models/listing.model";
import {
  formatClosingTime,
  formatCreatedDate,
  formatPrice,
  formatYear,
} from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { FileEdit, MapPin, Timer } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Kanit } from "next/font/google";

const kanit = Kanit({ subsets: ["latin"], weight: ["600"] });

type CardProps = {
  listing: IListing;
  hasSaveLink?: boolean;
  saved?: boolean;
};

function Card({ listing, hasSaveLink, saved }: CardProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isListingCretor = userId === listing.creator._id.toString();
  return (
    <Link
      href={`/listings/${listing._id}`}
      className="group flex min-h-[380px] max-w-[400px] w-full flex-col overflow-hidden rounded-xl shadow-md transition-all hover:shadow-lg hover:scale-[1.01] dark:bg-slate-800 border border-transparent hover:border-sky-800"
    >
      <div
        style={{ backgroundImage: `url(${listing.imageUrl})` }}
        className="flex items-center justify-center flex-grow bg-cover bg-center min-h-[250px]"
      />

      <div className="flex min-h-[200px] flex-col gap-3 p-4 justify-between">
        <div className="flex flex-col gap-0.5">
          <h4
            className={`${kanit.className} text-3xl line-clamp-1 text-slate-50`}
          >
            {listing.title}
          </h4>
          <h5 className="text-lg font-medium text-slate-200">
            $ {formatPrice(listing.price)}
          </h5>

          <div className="flex flex-row gap-8 pt-8 justify-between">
            <p className="flex flex-row gap-1 items-center dark:text-slate-400">
              <Timer size={18} />
              {
                formatClosingTime(listing.closingDateTime.toString())
                  .formattedDate
              }
            </p>
            <p className="flex flex-row gap-1 items-center dark:text-slate-400">
              <MapPin size={18} /> {listing.location}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-col items-center justify-center p-[3px] border border-sky-900 w-fit rounded-full">
              <Image
                src={listing.creator.photo}
                alt={listing.creator.firstName}
                height={30}
                width={30}
                className="rounded-full"
              />
            </div>
            <p className="text-slate-200">@{listing.creator.username}</p>
          </div>

          <p className="text-slate-200">
            {formatCreatedDate(listing.createdAt.toString())}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
