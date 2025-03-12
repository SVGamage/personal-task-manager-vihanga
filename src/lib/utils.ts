import { Status } from "@/app/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToReadable(isoDate: string): string {
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }
  const day = date.getUTCDate();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  return `${day}${getOrdinalSuffix(day)} ${monthNames[month]} ${year}`;
}

export function statusMap(status: Status) {
  const statusMap = {
    PENDING: "Pending",
    ONGOING: "Ongoing",
    COMPLETED: "Completed",
    DELETED: "Deleted",
  };
  return statusMap[status];
}
