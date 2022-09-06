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

export const displayDurationInMillisHumanReadable = (
  duration: number | null
) => {
  if (duration != null) {
    return moment.duration(duration, "milliseconds").humanize();
  }
  return "";
};
