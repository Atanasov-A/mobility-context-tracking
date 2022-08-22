import { useEffect, useState } from "react";
import { isSameLocation } from "../../utils/compareCoordinates";
import { calculateDifferenceBetweenDatesInMillis } from "../../utils/dateHelpers";
import { HorizontalLinearStepper } from "../HorizontalLinearStepper";
import { JourneyInformation } from "../JourneyInformation";
import { MapWithSearchboxContainer } from "../map/MapWithSearchboxContainer";
import { GraphhoperLocation } from "../../models/GraphhoperLocation";
import { GraphhoperLocationPoint } from "../../models/GraphhoperLocationPoint";
import { parseGraphHopperLocationName } from "../../utils/graphHopperLocationNameConverter";

const firstStep = 0;
const lastStep = 1;

const CreateJourneyPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [stepperValidationError, setStepperValidationError] = useState(false);
  const [stepperValidationErrorIndex, setStepperValidationErrorIndex] =
    useState(-1);

  const [selectedValueStartingLocation, setSelectedValueStartingLocation] =
    useState<GraphhoperLocation>();
  const [selectedValueEndLocation, setSelectedValueEndLocation] =
    useState<GraphhoperLocation>();

  const [newStartPointAfterMarkerDragged, setNewStartPointAfterMarkerDragged] =
    useState<GraphhoperLocationPoint>();
  const [newEndPointAfterMarkerDragged, setNewEndPointAfterMarkerDragged] =
    useState<GraphhoperLocationPoint>();
  const [
    selectedValueStartingLocationNameAfterMarkerDragged,
    setSelectedValueStartingLocationNameAfterMarkerDragged,
  ] = useState<string>();
  const [
    selectedValueEndLocationNameAfterMarkerDragged,
    setSelectedValueEndLocationNameAfterMarkerDragged,
  ] = useState<string>();

  const [startLocationName, setStartLocationName] = useState("");
  const [endLocationName, setEndLocationName] = useState("");
  const [startLocationPoint, setStartLocationPoint] =
    useState<GraphhoperLocationPoint>();
  const [endLocationPoint, setEndLocationPoint] =
    useState<GraphhoperLocationPoint>();

  const [startDateValue, setStartDateValue] = useState<Date | null>(null);
  const [endDateValue, setEndDateValue] = useState<Date | null>(null);
  const [travelDurationInMillis, setTravelDurationInMillis] = useState<
    number | null
  >(null);

  const [selectedTravelPurposeValues, setSelectedTravelPurposeValues] =
    useState<string[]>([]);
  const [selectedWeatherValues, setSelectedWeatherValues] = useState<string[]>(
    []
  );
  const [selectedTransportValues, setSelectedTransportValues] = useState<
    string[]
  >([]);
  const [reasonForChosenTransport, setReasonForChosenTransport] =
    useState<string>("");

  useEffect(() => {
    if (
      selectedValueStartingLocation != null &&
      selectedValueEndLocation != null &&
      // TODO Refactor undefined when marker not dragged
      isSameLocation(
        newStartPointAfterMarkerDragged,
        selectedValueStartingLocation.point
      ) &&
      isSameLocation(
        newEndPointAfterMarkerDragged,
        selectedValueEndLocation.point
      )
    ) {
      setStartLocationName(
        parseGraphHopperLocationName(selectedValueStartingLocation)
      );
      setStartLocationPoint(selectedValueStartingLocation.point);
      setEndLocationName(
        parseGraphHopperLocationName(selectedValueEndLocation)
      );
      setEndLocationPoint(selectedValueEndLocation.point);
    } else {
      setStartLocationName(selectedValueStartingLocationNameAfterMarkerDragged);
      setStartLocationPoint(newStartPointAfterMarkerDragged);
      setEndLocationName(selectedValueEndLocationNameAfterMarkerDragged);
      setEndLocationPoint(newEndPointAfterMarkerDragged);
    }
  }, [
    newStartPointAfterMarkerDragged,
    newEndPointAfterMarkerDragged,
    selectedValueStartingLocation,
    selectedValueEndLocation,
    selectedValueStartingLocationNameAfterMarkerDragged,
    selectedValueEndLocationNameAfterMarkerDragged,
  ]);

  useEffect(() => {
    if (startDateValue != null && endDateValue != null) {
      const duration = calculateDifferenceBetweenDatesInMillis(
        startDateValue,
        endDateValue
      );
      setTravelDurationInMillis(duration);
    }
  }, [startDateValue, endDateValue]);

  const isStepValid = (stepIndex: number) => {
    if (stepIndex === firstStep) {
      if (
        selectedValueStartingLocation == null ||
        selectedValueEndLocation == null
      ) {
        setStepperValidationError(true);
        setStepperValidationErrorIndex(firstStep);
        return false;
      }
    }
    if (stepIndex === lastStep) {
      if (
        startDateValue == null ||
        endDateValue == null ||
        selectedTravelPurposeValues.length === 0 ||
        selectedWeatherValues.length === 0 ||
        selectedTransportValues.length === 0 ||
        reasonForChosenTransport.trim() === ""
      ) {
        setStepperValidationError(true);
        setStepperValidationErrorIndex(lastStep);
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

      {/* {null && (
        <MapWithSearchboxContainer
          selectedValueStartingLocation={selectedValueStartingLocation}
          setSelectedValueStartingLocation={setSelectedValueStartingLocation}
          selectedValueEndLocation={selectedValueEndLocation}
          setSelectedValueEndLocation={setSelectedValueEndLocation}
          setNewStartPointAfterMarkerDragged={
            setNewStartPointAfterMarkerDragged
          }
          setNewEndPointAfterMarkerDragged={setNewEndPointAfterMarkerDragged}
          setSelectedValueStartingLocationNameAfterMarkerDragged={
            setSelectedValueStartingLocationNameAfterMarkerDragged
          }
          setSelectedValueEndLocationNameAfterMarkerDragged={
            setSelectedValueEndLocationNameAfterMarkerDragged
          }
        />
      )} */}

      {activeStep === firstStep && (
        <MapWithSearchboxContainer
          selectedValueStartingLocation={selectedValueStartingLocation}
          setSelectedValueStartingLocation={setSelectedValueStartingLocation}
          selectedValueEndLocation={selectedValueEndLocation}
          setSelectedValueEndLocation={setSelectedValueEndLocation}
          setNewStartPointAfterMarkerDragged={
            setNewStartPointAfterMarkerDragged
          }
          setNewEndPointAfterMarkerDragged={setNewEndPointAfterMarkerDragged}
          setSelectedValueStartingLocationNameAfterMarkerDragged={
            setSelectedValueStartingLocationNameAfterMarkerDragged
          }
          setSelectedValueEndLocationNameAfterMarkerDragged={
            setSelectedValueEndLocationNameAfterMarkerDragged
          }
        />
        // <JourneyInformation
        //   startDateValue={startDateValue}
        //   setStartDateValue={setStartDateValue}
        //   endDateValue={endDateValue}
        //   setEndDateValue={setEndDateValue}
        //   selectedTravelPurposeValues={selectedTravelPurposeValues}
        //   setSelectedTravelPurposeValues={setSelectedTravelPurposeValues}
        //   selectedWeatherValues={selectedWeatherValues}
        //   setSelectedWeatherValues={setSelectedWeatherValues}
        //   selectedTransportValues={selectedTransportValues}
        //   setSelectedTransportValues={setSelectedTransportValues}
        //   reasonForChosenTransport={reasonForChosenTransport}
        //   setReasonForChosenTransport={setReasonForChosenTransport}
        //   travelDurationInMillis={travelDurationInMillis}
        // />
      )}
      {activeStep === lastStep && (
        <JourneyInformation
          startDateValue={startDateValue}
          setStartDateValue={setStartDateValue}
          endDateValue={endDateValue}
          setEndDateValue={setEndDateValue}
          selectedTravelPurposeValues={selectedTravelPurposeValues}
          setSelectedTravelPurposeValues={setSelectedTravelPurposeValues}
          selectedWeatherValues={selectedWeatherValues}
          setSelectedWeatherValues={setSelectedWeatherValues}
          selectedTransportValues={selectedTransportValues}
          setSelectedTransportValues={setSelectedTransportValues}
          reasonForChosenTransport={reasonForChosenTransport}
          setReasonForChosenTransport={setReasonForChosenTransport}
          travelDurationInMillis={travelDurationInMillis}
        />
      )}
    </>
  );
};

export { CreateJourneyPage };
