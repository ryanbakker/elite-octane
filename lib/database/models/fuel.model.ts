import { Document, Schema, model, models } from "mongoose";

export interface IFuel extends Document {
  _id: string;
  label: string;
}

const FuelSchema = new Schema({
  label: { type: String },
});

const Fuel = models.Fuel || model("Fuel", FuelSchema);

export default Fuel;
