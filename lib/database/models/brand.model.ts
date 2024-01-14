import { Document, Schema, model, models } from "mongoose";

export interface IBrand extends Document {
  _id: string;
  label: string;
}

const BrandSchema = new Schema({
  label: { type: String },
});

const Brand = models.Brand || model("Brand", BrandSchema);

export default Brand;
