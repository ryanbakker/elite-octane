// USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  photo: string;
};

// LISTING PARAMS
export type CreateListingParams = {
  userId: string;
  listing: {
    title: string;
    closingDateTime: Date;
    year: Date;
    odometer: string;
    description: string;
    location?: string;
    imageUrl: string;
    brandId: string;
    carModel: string;
    price: string;
    listingTypeId: string;
    bodyId: string;
    fuelId: string;
    drivetrainId: string;
    engineSize: string;
    transmissionId: string;
  };
  path: string;
};

export type UpdateListingParams = {
  userId: string;
  listing: {
    _id: string;
    title: string;
    closingDateTime: Date;
    year: Date;
    odometer: string;
    description: string;
    location?: string;
    imageUrl: string;
    price: string;
    brandId: string;
    carModel: string;
    listingTypeId: string;
    bodyId: string;
    fuelId: string;
    drivetrainId: string;
    engineSize: string;
    transmissionId: string;
  };
  path: string;
};

export type GetAllListingsParams = {
  query: string;
  limit: number;
  page: number;
  body: string;
  brand: string;
  drivetrain: string;
  fuel: string;
  transmission: string;
  listingType: string;
};

export type GetRelatedListingsByBrandParams = {
  brandId: string;
  listingId: string;
  limit?: number;
  page: number | string;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
