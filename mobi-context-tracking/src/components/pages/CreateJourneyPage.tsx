import { useState } from "react";
import { HorizontalLinearStepper } from "../HorizontalLinearStepper";
import {JourneyInformation} from "../JourneyInformation";
import { MapWithSearchboxContainer } from "../map/MapWithSearchboxContainer";
import { GraphhoperLocation } from "../models/GraphhoperLocation";
import { GraphhoperLocationPoint } from "../models/GraphhoperLocationPoint";

const firstStep = 0;
const lastStep = 1;

const CreateJourneyPage = () => {
  const [selectedValueStartingLocation, setSelectedValueStartingLocation] =
    useState<GraphhoperLocation>();
  const [selectedValueEndLocation, setSelectedValueEndLocation] =
    useState<GraphhoperLocation>();

  const [newStartPointAfterMarkerDragged, setNewStartPointAfterMarkerDragged] =
    useState<GraphhoperLocationPoint>();
  const [newEndPointAfterMarkerDragged, setNewEndPointAfterMarkerDragged] =
    useState<GraphhoperLocationPoint>();

  const [activeStep, setActiveStep] = useState(0);
  const [stepperValidationError, setStepperValidationError] = useState(false);
  const [stepperValidationErrorIndex, setStepperValidationErrorIndex] =
    useState(-1);

  const isStepValid = (stepIndex: number) => {
    if (stepIndex === firstStep) {
      if (
        selectedValueStartingLocation == null ||
        selectedValueEndLocation == null
      ) {
        setStepperValidationError(true);
        setStepperValidationErrorIndex(0);
        return false;
      }
    }
    setStepperValidationError(false);
    return true;
  };

  const handleNext = () => {
    const validStep = isStepValid(activeStep);
    if (activeStep === lastStep) {
      // Save the data
    }
    if (validStep) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <HorizontalLinearStepper
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        handleNext={handleNext}
        handleBack={handleBack}
        stepperValidationError={stepperValidationError}
        stepperValidationErrorIndex={stepperValidationErrorIndex}
      />

      {activeStep === firstStep && (
        <JourneyInformation />
        // <MapWithSearchboxContainer
        //   selectedValueStartingLocation={selectedValueStartingLocation}
        //   setSelectedValueStartingLocation={setSelectedValueStartingLocation}
        //   selectedValueEndLocation={selectedValueEndLocation}
        //   setSelectedValueEndLocation={setSelectedValueEndLocation}
        //   setNewStartPointAfterMarkerDragged={
        //     setNewStartPointAfterMarkerDragged
        //   }
        //   setNewEndPointAfterMarkerDragged={setNewEndPointAfterMarkerDragged}
        // />
      )}
      {activeStep === lastStep && <JourneyInformation />}
    </>
  );
};

export { CreateJourneyPage };
