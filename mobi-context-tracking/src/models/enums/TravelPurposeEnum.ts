export enum TravelPurposeEnum {
  EDUCATION = "education",
  WORK = "work",
  PICK_UP = "pick up",
  SHOPPING = "shopping",
  FREE_TIME = "free time",
  HOME = "home",
  SPORT = "sport",
  // EDUCATION,
  // WORK,
  // PICK_UP,
  // SHOPPING,
  // FREE_TIME,
  // HOME,
  // SPORT,
}

export const getKeyByValue = (value: string) => {
  const indexOfValue = Object.values(TravelPurposeEnum).indexOf(
    value as unknown as TravelPurposeEnum
  );

  const key = Object.keys(TravelPurposeEnum)[indexOfValue];

  return key;
};
