import { format, formatISO } from "date-fns";

export const formatDateString = (dateString) => {
  return format(new Date(dateString), "d MMMM yyyy");
};

// excepts date in Date format and returns a date in ISO 8601 format (e.g. 2022-06-01)
export const formatToISO = (date) => {
  return formatISO(date).slice(0, 10);
};
