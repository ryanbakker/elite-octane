"use server";

import { connectToDatabase } from "..";
import Drivetrain from "../models/drivetrain.model";

export const createDrivetrain = async ({
  drivetrainLabel,
}: {
  drivetrainLabel: string;
}) => {
  try {
    await connectToDatabase();

    const newDrivetrain = await Drivetrain.create({
      label: drivetrainLabel,
    });

    return JSON.parse(JSON.stringify(newDrivetrain));
  } catch (error) {
    console.log(error);
  }
};

export const getAllDrivetrains = async () => {
  try {
    await connectToDatabase();

    const drivetrains = await Drivetrain.find();

    return JSON.parse(JSON.stringify(drivetrains));
  } catch (error) {
    console.log(error);
  }
};
