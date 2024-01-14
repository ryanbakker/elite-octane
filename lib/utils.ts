import { type ClassValue, clsx } from "clsx";

import { twMerge } from "tailwind-merge";
import qs from "query-string";

import { UrlQueryParams, RemoveUrlQueryParams } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatClosingTime(inputString: string): {
  formattedTime: string;
  formattedDate: string;
} {
  const inputDate = new Date(inputString);

  // Extracting time components
  const hours = inputDate.getUTCHours();
  const minutes = inputDate.getUTCMinutes();
  const ampm = hours >= 12 ? "pm" : "am";

  // Formatting time as "hh:mmampm"
  const formattedTime = `${hours % 12 || 12}:${
    minutes < 10 ? "0" : ""
  }${minutes}${ampm}`;

  // Extracting date components
  const day = inputDate.getUTCDate();
  const month = inputDate.getUTCMonth() + 1; // Months are zero-based
  const year = inputDate.getUTCFullYear();

  // Formatting date as "dd/mm/yyyy"
  const formattedDate = `${day}/${month}/${year}`;

  return { formattedTime, formattedDate };
}

export function formatYear(inputString: string): string {
  const inputDate = new Date(inputString);

  // Extracting year component
  const year = inputDate.getFullYear();

  // Formatting date as "yyyy"
  const formattedYear = `${year}`;

  return formattedYear;
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function formatPrice(any: any): string {
  return any.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatOdometer(number: string): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function removeKeysFromQuery({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

function padWithZero(num: number): string {
  return num < 10 ? "0" + num : num.toString();
}

export function formatCreatedDate(dateString: string): string {
  const postDate = new Date(dateString);
  const now = new Date();
  const timeDifference = now.getTime() - postDate.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return "just now";
  } else if (minutes < 60) {
    return `${minutes} mins ago`;
  } else if (hours < 24) {
    return `${hours} hrs ago`;
  } else if (days < 3) {
    return `${days} days ago`;
  } else {
    // Format date as dd/mm/yy
    const formattedDate =
      padWithZero(postDate.getDate()) +
      "/" +
      padWithZero(postDate.getMonth() + 1) +
      "/" +
      postDate.getFullYear().toString().slice(-2);
    return formattedDate;
  }
}
