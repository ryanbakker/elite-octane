import ListingForm from "@/components/listing/ListingForm";
import { auth } from "@clerk/nextjs";
import { Kanit } from "next/font/google";

const kanit = Kanit({ subsets: ["latin"], weight: ["600"] });

function CreateListing() {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="dark:bg-slate-900 py-5">
        <h3 className={`page-heading ${kanit.className}`}>
          <span>Create Listing</span>
        </h3>
      </section>

      <section className="wrapper">
        <ListingForm userId={userId} type="Create" />
      </section>
    </>
  );
}

export default CreateListing;
