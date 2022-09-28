import { TransportTypeEnum } from "./enums/TransportTypeEnum";
import { TravelPurposeEnum } from "./enums/TravelPurposeEnum";
import { WeatherEnum } from "./enums/WeatherEnum";
import { LocationPoint } from "./LocationPoint";

export interface MobilityActivityInformation {
  startLocationName: string;
  endLocationName: string;
  startLocationPoint: LocationPoint;
  endLocationPoint: LocationPoint;
  startDate: string;
  endDate: string;
  travelPurposeList: TravelPurposeEnum[];
  weatherList: WeatherEnum[];
  transportType: TransportTypeEnum;
  reasonForTransport: string;
}
