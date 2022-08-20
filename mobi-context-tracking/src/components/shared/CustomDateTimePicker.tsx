import { useMediaQuery } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { useState } from "react";
import { theme } from "../theme/CustomTheme";

function CustomDateTimePicker() {
  const [value, setValue] = useState<Date | null>();
  const isBiggerThanSmartphone = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Stack spacing={1}>
      {/* <DateTimePicker
        label="Responsive"
        renderInput={(params) => <TextField {...params} />}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      /> */}

      {!isBiggerThanSmartphone && (
        <MobileDateTimePicker
          label="For mobile"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      )}

      {isBiggerThanSmartphone && (
        <DesktopDateTimePicker
          label="For desktop"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      )}
    </Stack>
  );
}

export { CustomDateTimePicker };
