import { Alert, AlertProps, AlertTitle } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  showAlert: boolean;
  alertMessage?: string;
  alertTitle: string;
}

const StyledAlert = (props: Props & AlertProps) => {
  const { alertMessage, alertTitle, showAlert, ...rest } = props;
  const [isVisible, setIsVisible] = useState(showAlert);

  return (
    <>
      {props.showAlert && (
        <Alert {...rest} sx={{ width: "100%" }}>
          <AlertTitle>{alertTitle}</AlertTitle>
          {alertMessage}
        </Alert>
      )}
    </>
  );
};

export { StyledAlert };
