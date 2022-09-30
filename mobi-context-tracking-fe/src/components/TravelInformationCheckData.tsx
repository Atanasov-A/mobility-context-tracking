import { Box, Grid, Typography } from "@mui/material";
import moment from "moment";
import { LABEL_CONSTANTS } from "../constants/ComponentsLabels";
import { GeoapifyLocation } from "../models/GeoapifyLocation";
import { GeoapifyRouting } from "./map/GeoapifyRouting";
import { MapComponent } from "./map/MapComponent";

interface Props {
  startDateValue: Date;
  endDateValue: Date;
  travelPurposeValues: string[];
  weatherValues: string[];
  transportValue: string;
  transportTypeReason: string;
  startLocationName: string;
  endLocationName: string;
  startLocation: GeoapifyLocation;
  endLocation: GeoapifyLocation;
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

        <Grid item xs={12} md={6}>
          <Box sx={{ boxShadow: 2, p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              {LABEL_CONSTANTS.startTime}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {moment(props.startDateValue).format("LLLL")}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ boxShadow: 2, p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              {LABEL_CONSTANTS.endTime}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {moment(props.endDateValue).format("LLLL")}
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
              {props.transportValue}
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
        <GeoapifyRouting
          startLocation={props.startLocation}
          endLocation={props.endLocation}
        />
      </MapComponent>
    </Box>
  );
};

export { TravelInformationCheckData };
