import { Box, Grid, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { LABEL_CONSTANTS } from "../constants/ComponentsLabels";
import { TransportTypeEnum } from "../models/enums/TransportTypeEnum";
import { TravelPurposeEnum } from "../models/enums/TravelPurposeEnum";
import { WeatherEnum } from "../models/enums/WeatherEnum";
import { CustomDateTimePicker } from "./shared/CustomDateTimePicker";
import { MultiSelectDropdown } from "./shared/MultiSelectDropdown";
import { SelectDropdown } from "./shared/SelectDropdown";

interface Props {
  startDateValue: Date;
  setStartDateValue: Dispatch<SetStateAction<Date>>;
  endDateValue: Date;
  setEndDateValue: Dispatch<SetStateAction<Date>>;
  selectedTravelPurposeValues: string[];
  setSelectedTravelPurposeValues: Dispatch<SetStateAction<string[]>>;
  selectedWeatherValues: string[];
  setSelectedWeatherValues: Dispatch<SetStateAction<string[]>>;
  selectedTransportValue: string;
  setSelectedTransportValue: Dispatch<SetStateAction<string>>;
  reasonForChosenTransport: string;
  setReasonForChosenTransport: Dispatch<SetStateAction<string>>;
  startLocationName: string;
  setStartLocationName: Dispatch<SetStateAction<string>>;
  endLocationName: string;
  setEndLocationName: Dispatch<SetStateAction<string>>;
}

const JourneyInformation = (props: Props) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              id="startLocation"
              label={LABEL_CONSTANTS.startLocation}
              name={LABEL_CONSTANTS.startLocation}
              value={props.startLocationName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.setStartLocationName(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              id="endLocation"
              label={LABEL_CONSTANTS.endLocation}
              name={LABEL_CONSTANTS.endLocation}
              value={props.endLocationName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.setEndLocationName(event.target.value);
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <CustomDateTimePicker
              label={LABEL_CONSTANTS.startTime}
              dateValue={props.startDateValue}
              setDateValue={props.setStartDateValue}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomDateTimePicker
              label={LABEL_CONSTANTS.endTime}
              dateValue={props.endDateValue}
              setDateValue={props.setEndDateValue}
              minDateTime={props.startDateValue}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <MultiSelectDropdown
              label={LABEL_CONSTANTS.travelPurpose}
              dropdownValues={Object.values(TravelPurposeEnum)}
              selectedDropdownValues={props.selectedTravelPurposeValues}
              setSelectedDropdownValues={props.setSelectedTravelPurposeValues}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MultiSelectDropdown
              label={LABEL_CONSTANTS.weather}
              dropdownValues={Object.values(WeatherEnum)}
              selectedDropdownValues={props.selectedWeatherValues}
              setSelectedDropdownValues={props.setSelectedWeatherValues}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <SelectDropdown
              label={LABEL_CONSTANTS.transportType}
              dropdownValues={Object.values(TransportTypeEnum)}
              selectedDropdownValue={props.selectedTransportValue}
              setSelectedDropdownValue={props.setSelectedTransportValue}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              id="reason"
              value={props.reasonForChosenTransport}
              label={LABEL_CONSTANTS.transportTypeReason}
              name={LABEL_CONSTANTS.transportTypeReason}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.setReasonForChosenTransport(event.target.value);
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export { JourneyInformation };
