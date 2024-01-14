"use server";

import { connectToDatabase } from "..";
import Transmission from "../models/transmission.model";

export const createTransmission = async ({
  transmissionLabel,
}: {
  transmissionLabel: string;
}) => {
  try {
    await connectToDatabase();

    const newTransmission = await Transmission.create({
      label: transmissionLabel,
    });

    return JSON.parse(JSON.stringify(newTransmission));
  } catch (error) {
    console.log(error);
  }
};

export const getAllTransmissions = async () => {
  try {
    await connectToDatabase();

    const transmissions = await Transmission.find();

    return JSON.parse(JSON.stringify(transmissions));
  } catch (error) {
    console.log(error);
  }
};
