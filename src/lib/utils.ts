import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormattedDate(): string {
  const currentDate = new Date();
  const formatString = 'yyyyMMddHHmmss';

  const formattedDate = format(currentDate, formatString);
  return formattedDate;
}