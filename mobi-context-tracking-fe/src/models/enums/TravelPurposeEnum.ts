// https://www.bmvi.de/SharedDocs/DE/Publikationen/G/verkehr-in-zahlen-2021-2022-pdf.pdf?__blob=publicationFile
// B5

// Beruf
// Ausbildung
// Geschäft
// Einkauf
// Freizeit
// BEGLEITUNG
// Urlaub
export enum TravelPurposeEnum {
  JOB = "job",
  EDUCATION = "education",
  BUSINESS = "business",
  SHOPPING = "shopping",
  LEISURE = "leisure",
  ACCOMPANYING = "accompanying",
  VACATION = "vacation",
  // EDUCATION,
  // WORK,
  // PICK_UP,
  // SHOPPING,
  // FREE_TIME,
  // HOME,
  // SPORT,
}

export const getTravelPurposeKeyByValue = (value: string) => {
  const indexOfValue = Object.values(TravelPurposeEnum).indexOf(
    value as unknown as TravelPurposeEnum
  );

  const key = Object.keys(TravelPurposeEnum)[indexOfValue] as TravelPurposeEnum;

  return key;
};
