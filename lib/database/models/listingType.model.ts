import { Document, Schema, model, models } from "mongoose";

export interface IListingType extends Document {
  _id: string;
  label: string;
}

const ListingTypeSchema = new Schema({
  label: { type: String },
});

const ListingType =
  models.ListingType || model("ListingType", ListingTypeSchema);

export default ListingType;
