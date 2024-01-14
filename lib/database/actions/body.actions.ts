"use server";

import { connectToDatabase } from "..";
import Body from "../models/body.model";

export const createBody = async ({ bodyLabel }: { bodyLabel: string }) => {
  try {
    await connectToDatabase();

    const newBody = await Body.create({
      label: bodyLabel,
    });

    return JSON.parse(JSON.stringify(newBody));
  } catch (error) {
    console.log(error);
  }
};

export const getAllBodys = async () => {
  try {
    await connectToDatabase();

    const bodys = await Body.find();

    return JSON.parse(JSON.stringify(bodys));
  } catch (error) {
    console.log(error);
  }
};
