import { Alert, AlertProps, AlertTitle } from "@mui/material";

interface Props {
  showAlert: boolean;
  alertMessage?: string;
  alertTitle: string;
}

const StyledAlert = (props: Props & AlertProps) => {
  const { alertMessage, alertTitle, showAlert, ...rest } = props;

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
