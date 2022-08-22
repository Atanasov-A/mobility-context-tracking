import { Box, Grid, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { displayDifferenceInMillisHumanReadable } from "../utils/dateHelpers";
import { TransportTypeEnum } from "./models/enums/TransportTypeEnum";
import { TravelPurposeEnum } from "./models/enums/TravelPurposeEnum";
import { WeatherEnum } from "./models/enums/WeatherEnum";
import { CustomDateTimePicker } from "./shared/CustomDateTimePicker";
import { MultiSelectDropdown } from "./shared/MultiSelectDropdown";

interface Props {
  startDateValue: Date;
  setStartDateValue: Dispatch<SetStateAction<Date>>;
  endDateValue: Date;
  setEndDateValue: Dispatch<SetStateAction<Date>>;
  selectedTravelPurposeValues: string[];
  setSelectedTravelPurposeValues: Dispatch<SetStateAction<string[]>>;
  selectedWeatherValues: string[];
  setSelectedWeatherValues: Dispatch<SetStateAction<string[]>>;
  selectedTransportValues: string[];
  setSelectedTransportValues: Dispatch<SetStateAction<string[]>>;
  reasonForChosenTransport: string;
  setReasonForChosenTransport: Dispatch<SetStateAction<string>>;
  travelDurationInMillis: number | null;
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
              label="Start location"
              name="Start location"
              onChange={() => {}}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              id="endLocation"
              label="End location"
              name="End location"
              onChange={() => {}}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={5}>
            <CustomDateTimePicker
              label="Starting time"
              dateValue={props.startDateValue}
              setDateValue={props.setStartDateValue}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <CustomDateTimePicker
              label="Ending time"
              dateValue={props.endDateValue}
              setDateValue={props.setEndDateValue}
              minDateTime={props.startDateValue}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              id="duration"
              value={displayDifferenceInMillisHumanReadable(
                props.travelDurationInMillis
              )}
              label="Travel duration"
              helperText="Dynamically calculated"
              onChange={() => {}}
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <MultiSelectDropdown
              label={"Travel purpose"}
              dropdownValues={Object.values(TravelPurposeEnum)}
              selectedDropdownValues={props.selectedTravelPurposeValues}
              setSelectedDropdownValues={props.setSelectedTravelPurposeValues}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MultiSelectDropdown
              label={"Weather"}
              dropdownValues={Object.values(WeatherEnum)}
              selectedDropdownValues={props.selectedWeatherValues}
              setSelectedDropdownValues={props.setSelectedWeatherValues}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <MultiSelectDropdown
              label={"Transportation type"}
              dropdownValues={Object.values(TransportTypeEnum)}
              selectedDropdownValues={props.selectedTransportValues}
              setSelectedDropdownValues={props.setSelectedTransportValues}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              id="reason"
              label="Reason for the choice of this transport"
              name={props.reasonForChosenTransport}
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
