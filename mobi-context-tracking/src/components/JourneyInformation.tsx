import { Box, Grid, TextField } from "@mui/material";
import { CustomDateTimePicker } from "./shared/CustomDateTimePicker";
import { StyledTextField } from "./shared/StyledTextField";

interface Props {}

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
          <Grid item xs={12} md={6}>
            <CustomDateTimePicker />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomDateTimePicker />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={10}>
            {/* Checkbox */}
            <TextField
              required
              fullWidth
              id="reason"
              label="Reason for this journey"
              name="Reason for this journey"
              onChange={() => {}}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              required
              disabled
              fullWidth
              id="duration"
              label="Journey duration"
              name="Journey duration"
              onChange={() => {}}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            {/* Checkbox */}
            <TextField
              required
              fullWidth
              id="transportMode"
              label="Transport type"
              name="Transport type"
              onChange={() => {}}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              id="reason"
              label="Reason for choosing this transport"
              name="Reason for choosing this transport"
              onChange={() => {}}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export { JourneyInformation };
