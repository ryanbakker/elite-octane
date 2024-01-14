import { Document, Schema, model, models } from "mongoose";

export interface IBody extends Document {
  _id: string;
  label: string;
}

const BodySchema = new Schema({
  label: { type: String },
});

const Body = models.Body || model("Body", BodySchema);

export default Body;
