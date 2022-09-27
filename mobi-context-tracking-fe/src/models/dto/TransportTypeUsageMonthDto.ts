export interface TransportTypeUsageMonthDto {
  jsonObjectMonthUsageCount: {
    monthName: string;
    transportTypes: {
      name: string;
      count: number;
    }[];
  }[];
  totalCount: number;
}
