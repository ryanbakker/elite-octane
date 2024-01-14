"use server";

import { connectToDatabase } from "..";
import Fuel from "../models/fuel.model";

export const createFuel = async ({ fuelLabel }: { fuelLabel: string }) => {
  try {
    await connectToDatabase();

    const newFuel = await Fuel.create({
      label: fuelLabel,
    });

    return JSON.parse(JSON.stringify(newFuel));
  } catch (error) {
    console.log(error);
  }
};

export const getAllFuels = async () => {
  try {
    await connectToDatabase();

    const fuels = await Fuel.find();

    return JSON.parse(JSON.stringify(fuels));
  } catch (error) {
    console.log(error);
  }
};
