import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const steps = [
  "Select start and end location",
  "Add more information about the journey",
];

interface Props {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  handleNext: () => void;
  handleBack: () => void;
  handleOnComplete: () => void;
  stepperValidationError: boolean;
  stepperValidationErrorIndex: number;
}

const HorizontalLinearStepper = (props: Props) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={props.activeStep} sx={{mb: 2}}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
          } = {};
          if (
            props.stepperValidationError &&
            props.stepperValidationErrorIndex === index
          ) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Field is invalid or empty.
              </Typography>
            );
            labelProps.error = true;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {props.activeStep === steps.length ? (
        <React.Fragment>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ mb: 1 }}>All steps completed!</Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Button color="inherit" onClick={props.handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={props.handleOnComplete}>
              Save the data on the server
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mb: 1 }}>Step {props.activeStep + 1}</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={props.activeStep === 0}
              onClick={props.handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={props.handleNext}>
              {props.activeStep === steps.length ? "Save data" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export { HorizontalLinearStepper };
