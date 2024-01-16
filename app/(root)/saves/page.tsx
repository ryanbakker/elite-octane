import Search from "@/components/listing/filters/Search";
import { getSavesByListing } from "@/lib/database/actions/save.actions";
import { ISaveItem } from "@/lib/database/models/save.model";
import { formatCreatedDate, formatPrice } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { Kanit } from "next/font/google";

const kanit = Kanit({ subsets: ["latin"], weight: ["600"] });

const Saves = async ({ searchParams }: SearchParamProps) => {
  const listingId = (searchParams?.listingId as string) || "";
  const searchText = (searchParams?.query as string) || "";

  const saves = await getSavesByListing({
    listingId,
    searchString: searchText,
  });

  return (
    <>
      <section className="dark:bg-slate-900 py-5">
        <h3 className={`page-heading ${kanit.className}`}>
          <span>Saves</span>
        </h3>
      </section>

      <section className="wrapper mt-8">
        <Search placeholder="Search saver name..." />
      </section>

      <section className="wrapper overflow-x-auto">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[250px] py-3 text-left">Save ID</th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">
                Listing Title
              </th>
              <th className="min-w-[150px] py-3 text-left">Saver</th>
              <th className="min-w-[100px] py-3 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {saves && saves.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No saves found.
                </td>
              </tr>
            ) : (
              <>
                {saves &&
                  saves.map((row: ISaveItem) => (
                    <tr
                      key={row._id}
                      className="p-regular-14 lg:p-regular-16 border-b "
                      style={{ boxSizing: "border-box" }}
                    >
                      <td className="min-w-[250px] py-4 text-primary-500">
                        {row._id}
                      </td>
                      <td className="min-w-[200px] flex-1 py-4 pr-4">
                        {row.listingYear} {row.listingBrand} {row.listingModel}
                      </td>
                      <td className="min-w-[150px] py-4">{row.saver}</td>
                      <td className="min-w-[100px] py-4">
                        {formatCreatedDate(row.createdAt.toString())}
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Saves;
