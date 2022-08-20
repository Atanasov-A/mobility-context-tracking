import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";

function CustomDateTimePicker() {
  const [value, setValue] = useState<Date | null>();

  return (
    <Stack spacing={1}>
      <DateTimePicker
        label="Responsive"
        renderInput={(params) => <TextField {...params} />}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </Stack>
  );
}

export { CustomDateTimePicker };
