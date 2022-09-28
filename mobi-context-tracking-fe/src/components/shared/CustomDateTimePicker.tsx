import { useMediaQuery } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { theme } from "../theme/CustomTheme";

interface Props {
  dateValue: Date;
  setDateValue: React.Dispatch<React.SetStateAction<Date>>;
  minDateTime?: Date;
  label?: string;
}

function CustomDateTimePicker(props: Props) {
  const isBiggerThanSmartphone = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Stack spacing={1}>
      {!isBiggerThanSmartphone && (
        <MobileDateTimePicker
          label={props.label}
          value={props.dateValue}
          onChange={(newValue) => {
            props.setDateValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
          minDateTime={props.minDateTime ? props.minDateTime : null}
        />
      )}

      {isBiggerThanSmartphone && (
        <DesktopDateTimePicker
          label={props.label}
          value={props.dateValue}
          onChange={(newValue) => {
            props.setDateValue(newValue);
          }}
          renderInput={(params) => (
            <TextField
              onKeyDown={(e) => e.preventDefault()}
              {...params}
              helperText="Click on the calendar icon to select date"
            />
          )}
          minDateTime={props.minDateTime ? props.minDateTime : null}
        />
      )}
    </Stack>
  );
}

export { CustomDateTimePicker };
