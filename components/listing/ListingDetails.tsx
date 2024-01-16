import { IListing } from "@/lib/database/models/listing.model";
import { formatClosingTime, formatOdometer, formatYear } from "@/lib/utils";
import { Calendar, Fuel, Gauge, MapPin, Sparkles, Timer } from "lucide-react";
import React from "react";

function ListingDetailsLists({ listing }: { listing: IListing }) {
  return (
    <div className="flex flex-row gap-3 pt-6 pr-12">
      <ul className="listing-details-list">
        <li className="listing-details-list-item">
          <div className="listing-details-list-item-icon">
            <Timer className="text-slate-200" size={24} />
          </div>
          <div className="listing-details-list-item-text">
            <h4 className="listing-details-list-item-text-heading">
              Listing Closes
            </h4>
            <p className="listing-details-list-item-text-data">
              {
                formatClosingTime(listing.closingDateTime.toString())
                  .formattedTime
              }{" "}
              &nbsp;-&nbsp;{" "}
              {
                formatClosingTime(listing.closingDateTime.toString())
                  .formattedDate
              }
            </p>
          </div>
        </li>
        <li className="listing-details-list-item">
          <div className="listing-details-list-item-icon">
            <Sparkles className="text-slate-200" size={24} />
          </div>
          <div className="listing-details-list-item-text">
            <h4 className="listing-details-list-item-text-heading">
              Condition
            </h4>
            <p className="listing-details-list-item-text-data">
              {listing.listingType.label}
            </p>
          </div>
        </li>
        <li className="listing-details-list-item">
          <div className="listing-details-list-item-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className="text-slate-200 h-6 w-6"
            >
              <path
                fill="currentColor"
                d="m21.71 20.29l-1.42 1.42a1 1 0 0 1-1.41 0L7 9.85A3.81 3.81 0 0 1 6 10a4 4 0 0 1-3.78-5.3l2.54 2.54l.53-.53l1.42-1.42l.53-.53L4.7 2.22A4 4 0 0 1 10 6a3.81 3.81 0 0 1-.15 1l11.86 11.88a1 1 0 0 1 0 1.41M2.29 18.88a1 1 0 0 0 0 1.41l1.42 1.42a1 1 0 0 0 1.41 0l5.47-5.46l-2.83-2.83M20 2l-4 2v2l-2.17 2.17l2 2L18 8h2l2-4Z"
              />
            </svg>
          </div>
          <div className="listing-details-list-item-text">
            <h4 className="listing-details-list-item-text-heading">Make</h4>
            <p className="listing-details-list-item-text-data">
              {listing.brand.label}
            </p>
          </div>
        </li>
        <li className="listing-details-list-item">
          <div className="listing-details-list-item-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className="text-slate-200 h-6 w-6"
            >
              <path
                fill="currentColor"
                d="M3 6h13l3 4h2c1.11 0 2 .89 2 2v3h-2a3 3 0 0 1-3 3a3 3 0 0 1-3-3H9a3 3 0 0 1-3 3a3 3 0 0 1-3-3H1V8c0-1.11.89-2 2-2m-.5 1.5V10h8V7.5zm9.5 0V10h5.14l-1.89-2.5zm-6 6A1.5 1.5 0 0 0 4.5 15A1.5 1.5 0 0 0 6 16.5A1.5 1.5 0 0 0 7.5 15A1.5 1.5 0 0 0 6 13.5m12 0a1.5 1.5 0 0 0-1.5 1.5a1.5 1.5 0 0 0 1.5 1.5a1.5 1.5 0 0 0 1.5-1.5a1.5 1.5 0 0 0-1.5-1.5"
              />
            </svg>
          </div>
          <div className="listing-details-list-item-text">
            <h4 className="listing-details-list-item-text-heading">Variant</h4>
            <p className="listing-details-list-item-text-data">
              {listing.body.label}
            </p>
          </div>
        </li>
        <li className="listing-details-list-item">
          <div className="listing-details-list-item-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className="text-slate-200 h-6 w-6"
            >
              <path
                fill="currentColor"
                d="M12 2a2.75 2.75 0 0 0-.75 5.396v3.854a.75.75 0 0 0 1.5 0V7.396A2.751 2.751 0 0 0 12 2M5.5 4A2.5 2.5 0 0 0 3 6.5v12a2.5 2.5 0 0 0 5 0V15h1.5v3.5a2.5 2.5 0 0 0 5 0V15H19a2 2 0 0 0 2-2V6.5a2.5 2.5 0 0 0-5 0V10h-2.25v1.5h3.75v-5a1 1 0 1 1 2 0V13a.5.5 0 0 1-.5.5h-6v5a1 1 0 1 1-2 0v-5H6.5v5a1 1 0 1 1-2 0v-12a1 1 0 0 1 2 0v5h3.75V10H8V6.5A2.5 2.5 0 0 0 5.5 4"
              />
            </svg>
          </div>
          <div className="listing-details-list-item-text">
            <h4 className="listing-details-list-item-text-heading">
              Transmission
            </h4>
            <p className="listing-details-list-item-text-data">
              {listing.transmission.label}
            </p>
          </div>
        </li>
        <li className="listing-details-list-item">
          <div className="listing-details-list-item-icon">
            <Fuel className="text-slate-200" size={24} />
          </div>
          <div>
            <h4 className="listing-details-list-item-text-heading">Fuel</h4>
            <p className="listing-details-list-item-text-data">
              {listing.fuel.label}
            </p>
          </div>
        </li>
      </ul>
      <ul className="listing-details-list">
        <li className="listing-details-list-item">
          <div className="listing-details-list-item-icon">
            <MapPin className="text-slate-200" size={24} />
          </div>
          <div className="listing-details-list-item-text">
            <h4 className="listing-details-list-item-text-heading">Location</h4>
            <p className="listing-details-list-item-text-data">
              {listing.location}
            </p>
          </div>
        </li>
        <li className="listing-details-list-item">
          <div className="listing-details-list-item-icon">
            <Calendar className="text-slate-200" size={24} />
          </div>
          <div className="listing-details-list-item-text">
            <h4 className="listing-details-list-item-text-heading">Year</h4>
            <p className="listing-details-list-item-text-data">
              {formatYear(listing.year.toString())}
            </p>
          </div>
        </li>
        <li className="listing-details-list-item">
          <div className="listing-details-list-item-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className="text-slate-200 h-6 w-6"
            >
              <g fill="none" fill-rule="evenodd">
                <path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                <path
                  fill="currentColor"
                  fill-rule="nonzero"
                  d="M12 2c1.751 0 3.19.592 4.168 1.159C17.492 3.926 18 5.369 18 6.657v1.71a29.634 29.634 0 0 1 2.624 1.852a1 1 0 0 1-1.248 1.562A25.958 25.958 0 0 0 18 10.769v6.817A4.414 4.414 0 0 1 13.586 22h-3.172A4.414 4.414 0 0 1 6 17.586v-6.817c-.467.324-.93.657-1.375 1.012a1 1 0 0 1-1.25-1.562A29.616 29.616 0 0 1 6 8.368V6.657c0-1.289.508-2.731 1.832-3.498C8.81 2.592 10.25 2 12 2m4 9.414l-.121.122l-.136.144a3 3 0 0 0-.735 1.759l-.008.218V17l-.005.15a2 2 0 0 1-1.838 1.844L13 19h-2l-.15-.005a2 2 0 0 1-1.844-1.838L9 17v-3.343l-.007-.198a3 3 0 0 0-.723-1.764l-.149-.16l-.121-.12v6.17l.008.192a2.414 2.414 0 0 0 2.215 2.215l.191.008h3.172l.191-.008a2.414 2.414 0 0 0 2.215-2.215l.008-.191zM12 8c-.554 0-1.284.192-2.128.547c-.284.12-.572.254-.859.398l-.43.223l.953.953a5 5 0 0 1 1.457 3.271l.007.265V17h2v-3.343a5 5 0 0 1 1.282-3.344l.182-.192l.953-.953a15.16 15.16 0 0 0-1.29-.621C13.285 8.192 12.555 8 12 8m0-4c-1.297 0-2.39.44-3.165.89C8.323 5.185 8 5.823 8 6.656v.56c.361-.185.729-.359 1.096-.514C10.034 6.308 11.054 6 12 6s1.966.308 2.904.703c.367.155.735.329 1.096.513v-.56c0-.832-.323-1.47-.835-1.767C14.39 4.44 13.297 4 12 4"
                />
              </g>
            </svg>
          </div>
          <div className="listing-details-list-item-text">
            <h4 className="listing-details-list-item-text-heading">Model</h4>
            <p className="listing-details-list-item-text-data">
              {listing.carModel}
            </p>
          </div>
        </li>
        <li className="listing-details-list-item">
          <div className="listing-details-list-item-icon">
            <Gauge className="text-slate-200" size={24} />
          </div>
          <div className="listing-details-list-item-text">
            <h4 className="listing-details-list-item-text-heading">Odometer</h4>
            <p className="listing-details-list-item-text-data">
              {formatOdometer(listing.odometer)} km
            </p>
          </div>
        </li>
        <li className="listing-details-list-item">
          <div className="listing-details-list-item-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 20 20"
              className="text-slate-200 h-6 w-6"
            >
              <path
                fill="currentColor"
                d="M3 4a2 2 0 1 1 4 0v1h1.585a1.5 1.5 0 0 1 2.83 0H13V4a2 2 0 1 1 4 0v3a2 2 0 1 1-4 0V6h-1.585a1.508 1.508 0 0 1-.915.915v6.17c.426.151.764.489.915.915H13v-1a2 2 0 1 1 4 0v3a2 2 0 1 1-4 0v-1h-1.585a1.5 1.5 0 0 1-2.83 0H7v1a2 2 0 1 1-4 0v-3a2 2 0 1 1 4 0v1h1.585c.151-.426.489-.764.915-.915v-6.17A1.504 1.504 0 0 1 8.585 6H7v1a2 2 0 1 1-4 0zm2-1a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1m10 0a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1M5 12a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0v-3a1 1 0 0 0-1-1m9 1v3a1 1 0 1 0 2 0v-3a1 1 0 1 0-2 0"
              />
            </svg>
          </div>
          <div className="listing-details-list-item-text">
            <h4 className="listing-details-list-item-text-heading">
              Drivetrain
            </h4>
            <p className="listing-details-list-item-text-data">
              {listing.drivetrain.label}
            </p>
          </div>
        </li>
        <li className="listing-details-list-item">
          <div className="listing-details-list-item-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 256 256"
              className="text-slate-200 h-6 w-6"
            >
              <path
                fill="currentColor"
                d="M244 112a12 12 0 0 0-12 12v16h-16v-8a20 20 0 0 0-20-20h-11l-34.17-34.14A19.86 19.86 0 0 0 136.69 72H124V56h16a12 12 0 0 0 0-24H84a12 12 0 0 0 0 24h16v16H60a20 20 0 0 0-20 20v48H24v-16a12 12 0 0 0-24 0v56a12 12 0 0 0 24 0v-16h16v12.69a19.86 19.86 0 0 0 5.86 14.14l35.31 35.31A19.86 19.86 0 0 0 95.31 232h41.38a19.86 19.86 0 0 0 14.14-5.86L185 192h11a20 20 0 0 0 20-20v-8h16v16a12 12 0 0 0 24 0v-56a12 12 0 0 0-12-12m-52 56h-8.69a19.86 19.86 0 0 0-14.14 5.86L135 208H97l-33-33V96h71l34.14 34.14a19.86 19.86 0 0 0 14.17 5.86H192Z"
              />
            </svg>
          </div>
          <div className="listing-details-list-item-text">
            <h4 className="listing-details-list-item-text-heading">Engine</h4>
            <p className="listing-details-list-item-text-data">
              {listing.engineSize} cc
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ListingDetailsLists;
