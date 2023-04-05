import format from "date-fns/format";

export const formatDateString = (dateString) => {
  return format(new Date(dateString), "d MMMM yyyy");
};
