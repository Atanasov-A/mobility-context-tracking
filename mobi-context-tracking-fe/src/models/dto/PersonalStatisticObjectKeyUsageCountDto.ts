export interface PersonalStatisticObjectKeyUsageCountDto {
  personalStatisticObjectKeyUsageCount: {
    name: string;
    count: number;
  }[];
  personalTotalCount: number;
  overallStatisticObjectKeyUsageCount: {
    name: string;
    count: number;
  }[];
  overallTotalCount: number;
}
