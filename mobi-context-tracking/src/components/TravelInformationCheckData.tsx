import { Box, Grid, Typography } from "@mui/material";
import moment from "moment";
import { LABEL_CONSTANTS } from "../constants/ComponentsLabels";
import { GraphhoperLocationPoint } from "../models/GraphhoperLocationPoint";
import { displayDurationInMillisHumanReadable } from "../utils/dateHelpers";
import { MapComponent } from "./map/MapComponent";
import { MapCustomMarker } from "./map/MapCustomMarker";

interface Props {
  startDateValue: Date;
  endDateValue: Date;
  travelPurposeValues: string[];
  weatherValues: string[];
  transportValues: string[];
  transportTypeReason: string;
  startLocationName: string;
  endLocationName: string;
  travelDurationInMillis: number;
  startLocationPoint: GraphhoperLocationPoint;
  endLocationPoint: GraphhoperLocationPoint;
}
const TravelInformationCheckData = (props: Props) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Grid container spacing={1} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ boxShadow: 2, p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              {LABEL_CONSTANTS.startLocation}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {props.startLocationName}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ boxShadow: 2, p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              {LABEL_CONSTANTS.endLocation}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {props.endLocationName}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={5}>
          <Box sx={{ boxShadow: 2, p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              {LABEL_CONSTANTS.startTime}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {moment(props.startDateValue).format("LLLL")}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box sx={{ boxShadow: 2, p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              {LABEL_CONSTANTS.endTime}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {moment(props.endDateValue).format("LLLL")}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={2} sx={{ boxShadow: 1 }}>
          <Box sx={{ boxShadow: 2, p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              {LABEL_CONSTANTS.travelDuration}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {displayDurationInMillisHumanReadable(
                props.travelDurationInMillis
              )}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ boxShadow: 2, p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              {LABEL_CONSTANTS.travelPurpose}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {props.travelPurposeValues.join(", ")}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ boxShadow: 2, p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              {LABEL_CONSTANTS.weather}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {props.weatherValues.join(", ")}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ boxShadow: 2, p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              {LABEL_CONSTANTS.transportType}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {props.transportValues.join(", ")}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ boxShadow: 2, p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              {LABEL_CONSTANTS.transportTypeReason}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {props.transportTypeReason}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <MapComponent>
        <MapCustomMarker
          key={LABEL_CONSTANTS.startLocation}
          label={LABEL_CONSTANTS.startLocation + " - "}
          markerPointLocation={props.startLocationPoint}
          markerName={props.startLocationName}
        />
        <MapCustomMarker
          key={LABEL_CONSTANTS.endLocation}
          label={LABEL_CONSTANTS.endLocation + " - "}
          markerPointLocation={props.endLocationPoint}
          markerName={props.endLocationName}
        />
      </MapComponent>
    </Box>
  );
};

export { TravelInformationCheckData };
