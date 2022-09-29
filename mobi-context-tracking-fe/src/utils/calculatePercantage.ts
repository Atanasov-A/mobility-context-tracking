export const calculatePercentage = (num1: number, num2: number) => {
  const divisor = num2 === 0 ? 1 : num2;
  return ((num1 / divisor) * 100).toFixed(2);
};
