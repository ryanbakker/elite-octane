import { Document, Schema, model, models } from "mongoose";

export interface ICarModel extends Document {
  _id: string;
  label: string;
}

const CarModelSchema = new Schema({
  label: { type: String },
});

const CarModel = models.CarModel || model("CarModel", CarModelSchema);

export default CarModel;
