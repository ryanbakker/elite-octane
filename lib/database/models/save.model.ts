import { Document, Schema, model, models } from "mongoose";

export interface ISave extends Document {
  createdAt: Date;
  listing: {
    _id: string;
    price: string;
    closingDateTime: Date;
    year: Date;
    carModel: string;
    brand: {
      _id: string;
      label: string;
    };
  };
  saver: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    photoUrl: string;
  };
}

export type ISaveItem = {
  _id: string;
  createdAt: Date;
  listingBrand: string;
  listingModel: string;
  listingYear: string;
  saver: string;
};

const SaveSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  listing: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
  },
  saver: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Save = models.Save || model("Save", SaveSchema);

export default Save;
