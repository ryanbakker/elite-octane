import { Document, Schema, model, models } from "mongoose";

export interface ITransmission extends Document {
  _id: string;
  label: string;
}

const TransmissionSchema = new Schema({
  label: { type: String },
});

const Transmission =
  models.Transmission || model("Transmission", TransmissionSchema);

export default Transmission;
