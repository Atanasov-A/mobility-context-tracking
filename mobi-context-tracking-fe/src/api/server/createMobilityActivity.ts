import { MobilityActivityInformation } from "../../models/MobilityActivityInformation";
import { serverClient } from "./serverClient";

export const createMobilityActivity = (
  mobilityActivityInformation: MobilityActivityInformation
) => {
  return serverClient.post(
    "/api/v1/add-mobility-activity",
    mobilityActivityInformation
  );
};
