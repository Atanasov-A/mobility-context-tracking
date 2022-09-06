import { TextField, TextFieldProps, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { theme } from "../theme/CustomTheme";

const minWidthPhone = 80;
const minWidthDesktop = 600;
const StyledTextField = (props: TextFieldProps) => {
  const [textFieldWidth, setTextFieldWidth] = useState(minWidthDesktop);
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (matches) {
      setTextFieldWidth(minWidthDesktop);
    } else {
      setTextFieldWidth(minWidthPhone);
    }
  }, [matches]);

  return <TextField {...props} sx={{ minWidth: textFieldWidth }} />;
};

export { StyledTextField };
