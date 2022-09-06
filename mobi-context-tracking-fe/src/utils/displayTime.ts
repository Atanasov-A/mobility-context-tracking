export const displayTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const minutesWithLeadingZero = String(minutes).padStart(2, "0");
  const hoursWithLeadingZero = String(hours).padStart(2, "0");
  const secondsWithLeadingZero = String(seconds).padStart(2, "0");

  let outputTime: string;

  if (hours > 0) {
    outputTime += hoursWithLeadingZero + ":";
  }
  if (minutes > 0) {
    outputTime += minutesWithLeadingZero + ":";
  }

  outputTime += secondsWithLeadingZero;

  return outputTime;
};
