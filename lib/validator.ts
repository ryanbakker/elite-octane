import * as z from "zod";

export const listingFormSchema = z.object({
  title: z.string(),
  closingDateTime: z.date(),
  year: z.date(),
  odometer: z.string(),
  description: z.string(),
  location: z.string(),
  imageUrl: z.string(),
  price: z.string(),
  brandId: z.string(),
  carModel: z.string(),
  listingTypeId: z.string(),
  bodyId: z.string(),
  fuelId: z.string(),
  drivetrainId: z.string(),
  engineSize: z.string(),
  transmissionId: z.string(),
});
