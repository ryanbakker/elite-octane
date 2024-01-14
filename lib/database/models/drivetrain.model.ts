import { Document, Schema, model, models } from "mongoose";

export interface IDrivetrain extends Document {
  _id: string;
  label: string;
}

const DrivetrainSchema = new Schema({
  label: { type: String },
});

const Drivetrain = models.Drivetrain || model("Drivetrain", DrivetrainSchema);

export default Drivetrain;
