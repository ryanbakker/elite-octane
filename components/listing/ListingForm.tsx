"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IListing } from "@/lib/database/models/listing.model";
import { useRouter } from "next/navigation";
import { listingDefaultValues } from "@/constants";
import { useForm } from "react-hook-form";
import { listingFormSchema } from "@/lib/validator";
import {
  createListing,
  updateListing,
} from "@/lib/database/actions/listing.actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import TypeDropdown from "./TypeDropdown";
import BrandDropdown from "./BrandDropdown";
import TransmissionDropdown from "./TransmissionDropdown";
import BodyDropdown from "./BodyDropdown";
import FuelDropdown from "./FuelDropdown";
import DrivetrainDropdown from "./DrivetrainDropdown";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import { DatePicker } from "@tremor/react";
import { useUploadThing } from "@/lib/uploadthing";

type ListingFormProps = {
  userId: string;
  type: "Create" | "Update";
  listing?: IListing;
  listingId?: string;
};

const ListingForm = ({
  userId,
  type,
  listing,
  listingId,
}: ListingFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const initialValues =
    listing && type === "Update"
      ? {
          ...listing,
          closingDateTime: new Date(listing.closingDateTime),
          year: new Date(listing.year),
        }
      : listingDefaultValues;

  const form = useForm<z.infer<typeof listingFormSchema>>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: initialValues,
  });

  const { startUpload } = useUploadThing("imageUploader");

  async function onSubmit(values: z.infer<typeof listingFormSchema>) {
    const adjustedDeadline = new Date(values.closingDateTime);
    const adjustedBuildYear = new Date(values.year);
    const utcDeadlineDate = new Date(adjustedDeadline.toISOString());
    const utcBuildYear = new Date(adjustedBuildYear.toISOString());

    utcDeadlineDate.setUTCDate(utcDeadlineDate.getUTCDate() + 1);
    utcDeadlineDate.setUTCHours(17, 0, 0, 0);

    utcBuildYear.setUTCDate(utcBuildYear.getUTCDate() + 1);
    utcBuildYear.setUTCHours(17, 0, 0, 0);

    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newListing = await createListing({
          listing: {
            ...values,
            imageUrl: uploadedImageUrl,
            closingDateTime: utcDeadlineDate,
            year: utcBuildYear,
          },
          userId,
          path: "/profile",
        });

        if (newListing) {
          form.reset();
          router.push(`/listings/${newListing._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!listingId) {
        router.back();
        return;
      }

      try {
        const updatedListing = await updateListing({
          userId,
          listing: {
            ...values,
            _id: listingId,
            imageUrl: uploadedImageUrl,
            closingDateTime: utcDeadlineDate,
            year: utcBuildYear,
          },
          path: `/listings/${listingId}`,
        });

        if (updatedListing) {
          form.reset();
          router.push(`/listings/${updatedListing._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  function cancelForm() {
    form.reset();
    router.back();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 mb-12"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete="off"
                  placeholder="2014 Audi S4..."
                  className="form-input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="h-full flex flex-col gap-3 w-full">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="off"
                      placeholder="10000"
                      className="form-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="closingDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Closing Deadline</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onValueChange={(date) => field.onChange(date)}
                      className="form-datepicker"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Build Year</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onValueChange={(date) => field.onChange(date)}
                      className="form-datepicker"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="off"
                      placeholder="Auckland"
                      className="form-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="listingTypeId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Listing Type</FormLabel>
                  <FormControl>
                    <TypeDropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                      userId={userId}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-5 items-center">
          <FormField
            control={form.control}
            name="brandId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <BrandDropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                    userId={userId}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="carModel"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="off"
                    placeholder="S4"
                    className="form-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-5 items-center">
          <FormField
            control={form.control}
            name="bodyId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Body Style</FormLabel>
                <FormControl>
                  <BodyDropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                    userId={userId}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="odometer"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Odometer (km)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="off"
                    className="form-input"
                    placeholder="125000"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-5 items-center">
          <FormField
            control={form.control}
            name="transmissionId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Transmission</FormLabel>
                <FormControl>
                  <TransmissionDropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                    userId={userId}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="drivetrainId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Drivetrain</FormLabel>
                <FormControl>
                  <DrivetrainDropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                    userId={userId}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-5 items-center">
          <FormField
            control={form.control}
            name="fuelId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Fuel Type</FormLabel>
                <FormControl>
                  <FuelDropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                    userId={userId}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="engineSize"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Engine Size (cc)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="off"
                    className="form-input"
                    placeholder="2000"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  autoComplete="off"
                  placeholder="This vehicle includes..."
                  className="form-textarea"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row gap-3">
          <Button
            onClick={cancelForm}
            size="lg"
            variant="outline"
            disabled={form.formState.isSubmitting}
            className="dark:bg-slate-900 border dark:border-sky-950 dark:text-sky-50 hover:dark:border-sky-700 transition-all hover:dark:text-sky-300"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="default"
            disabled={form.formState.isSubmitting}
            className="dark:bg-slate-800 border dark:border-sky-900 dark:text-sky-50 hover:dark:border-sky-600 transition-all hover:dark:text-sky-300"
          >
            {form.formState.isSubmitting ? "Submitting..." : `${type} Listing`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ListingForm;
