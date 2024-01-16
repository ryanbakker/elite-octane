import { IListing } from "@/lib/database/models/listing.model";
import Card from "./Card";
import Pagination from "./Pagination";

type CollectionProps = {
  data: IListing[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Listings_Posted" | "My_Watchlist" | "All_Listings";
};

function Collection({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) {
  return (
    <div className="wrapper mb-16">
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10 gap-6">
            {data.map((listing) => {
              const hasSaveLink = collectionType === "Listings_Posted";
              const saved = collectionType === "My_Watchlist";

              return (
                <li key={listing._id}>
                  <Card
                    listing={listing}
                    hasSaveLink={hasSaveLink}
                    saved={saved}
                  />
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="bg-gradient-to-tr from-slate-900 to-sky-800 flex items-center justify-center rounded-lg py-28 flex-col gap-3">
          <h3 className="text-xl font-medium">{emptyTitle}</h3>
          <p className="font-light">{emptyStateSubtext}</p>
        </div>
      )}
    </div>
  );
}

export default Collection;
