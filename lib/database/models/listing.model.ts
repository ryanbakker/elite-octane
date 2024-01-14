import { Document, Schema, model, models } from "mongoose";

export interface IListing extends Document {
  _id: string;
  title: string;
  createdAt: Date;
  closingDateTime: Date;
  year: Date;
  odometer: string;
  description: string;
  location?: string;
  imageUrl: string;
  engineSize: string;
  price: string;
  carModel: string;
  brand: { _id: string; label: string };
  listingType: { _id: string; label: string };
  body: { _id: string; label: string };
  fuel: { _id: string; label: string };
  drivetrain: { _id: string; label: string };
  transmission: { _id: string; label: string };
  creator: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    photo: string;
  };
}

const ListingSchema = new Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  closingDateTime: { type: Date, default: Date.now, required: true },
  year: { type: Date, default: Date.now, required: true },
  odometer: { type: Number, required: true },
  description: { type: String },
  location: { type: String },
  carModel: { type: String, required: true },
  engineSize: { type: String, required: true },
  price: { type: String, required: true },
  imageUrl: { type: String, required: true },
  brand: { type: Schema.Types.ObjectId, ref: "Brand" },
  listingType: { type: Schema.Types.ObjectId, ref: "ListingType" },
  body: { type: Schema.Types.ObjectId, ref: "Body" },
  fuel: { type: Schema.Types.ObjectId, ref: "Fuel" },
  drivetrain: { type: Schema.Types.ObjectId, ref: "Drivetrain" },
  transmission: { type: Schema.Types.ObjectId, ref: "Transmission" },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});

const Listing = models.Listing || model("Listing", ListingSchema);

export default Listing;
