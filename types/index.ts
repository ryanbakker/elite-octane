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
