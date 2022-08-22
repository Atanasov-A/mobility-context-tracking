import moment from "moment";

export const calculateDifferenceBetweenDatesInMillis = (
  startDate: Date,
  endDate: Date
) => {
  const milliSStartDate = new Date(startDate).getTime();
  const milliSEndDate = new Date(endDate).getTime();
  const difference = milliSEndDate - milliSStartDate;

  return difference;
};

export const displayDifferenceInMillisHumanReadable = (
  timeDifference: number | null
) => {
  if (timeDifference != null) {
    return moment.duration(timeDifference, "milliseconds").humanize();
  }
  return "";
};
