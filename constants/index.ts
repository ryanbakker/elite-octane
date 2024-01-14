export const navLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create Listing",
    route: "/listings/create",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
];

// Listing Form Defaults
export const listingDefaultValues = {
  title: "",
  endDateTime: new Date(),
  odometer: "",
  description: "",
  location: "",
  imageUrl: "",
  year: new Date(),
  brandId: "",
  carModel: "",
  listingTypeId: "",
  bodyId: "",
  fuelId: "",
  drivetrainId: "",
  engineSize: "",
  price: "",
  transmissionId: "",
};
