import { useEffect, useState } from "react";
import { isSameLocation } from "../../utils/compareCoordinates";
import { calculateDifferenceBetweenDatesInMillis } from "../../utils/dateHelpers";
import { HorizontalLinearStepper } from "../HorizontalLinearStepper";
import { JourneyInformation } from "../JourneyInformation";
import { MapWithSearchboxContainer } from "../map/MapWithSearchboxContainer";
import { GraphhoperLocation } from "../../models/GraphhoperLocation";
import { GraphhoperLocationPoint } from "../../models/GraphhoperLocationPoint";
import { parseGraphHopperLocationName } from "../../utils/graphHopperLocationNameConverter";
import { TravelInformationCheckData } from "../TravelInformationCheckData";
import { SearchLocationAutocomplete } from "../SearchLocationAutocomplete";
import { GeoapifyLocation } from "../../models/GeoapifyLocation";
import { LABEL_CONSTANTS } from "../../constants/ComponentsLabels";
import { MapComponent } from "../map/MapComponent";
import { GeoapifyRouting } from "../map/GeoapifyRouting";

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
    useState<GraphhoperLocationPoint | null>(null);
  const [newEndPointAfterMarkerDragged, setNewEndPointAfterMarkerDragged] =
    useState<GraphhoperLocationPoint | null>(null);
  const [
    selectedValueStartingLocationNameAfterMarkerDragged,
    setSelectedValueStartingLocationNameAfterMarkerDragged,
  ] = useState<string>();
  const [
    selectedValueEndLocationNameAfterMarkerDragged,
    setSelectedValueEndLocationNameAfterMarkerDragged,
  ] = useState<string>();

  const [startLocation, setStartLocation] = useState<GeoapifyLocation | null>();
  const [endLocation, setEndLocation] = useState<GeoapifyLocation | null>();

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
  const [transportTypeReason, setTransportTypeReason] = useState<string>("");

  useEffect(() => {
    if (selectedValueStartingLocation != null) {
      if (
        isSameLocation(
          selectedValueStartingLocation.point,
          newStartPointAfterMarkerDragged
        )
      ) {
        setStartLocationName(
          parseGraphHopperLocationName(selectedValueStartingLocation)
        );
        setStartLocationPoint(selectedValueStartingLocation.point);
      } else {
        setStartLocationName(
          selectedValueStartingLocationNameAfterMarkerDragged
        );
        setStartLocationPoint(newStartPointAfterMarkerDragged);
      }
    }
  }, [
    newStartPointAfterMarkerDragged,
    selectedValueStartingLocation,
    selectedValueStartingLocationNameAfterMarkerDragged,
  ]);

  useEffect(() => {
    if (selectedValueEndLocation != null) {
      if (
        isSameLocation(
          selectedValueEndLocation.point,
          newEndPointAfterMarkerDragged
        )
      ) {
        setEndLocationName(
          parseGraphHopperLocationName(selectedValueEndLocation)
        );
        setEndLocationPoint(selectedValueEndLocation.point);
      } else {
        setStartLocationName(selectedValueEndLocationNameAfterMarkerDragged);
        setEndLocationPoint(newEndPointAfterMarkerDragged);
      }
    }
  }, [
    newEndPointAfterMarkerDragged,
    selectedValueEndLocation,
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
        transportTypeReason.trim() === "" ||
        startLocationName.trim() === "" ||
        endLocationName.trim() === ""
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
    if (activeStep > lastStep) {
      // Save the data
    }
    if (validStep) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleOnComplete = () => {};

  return (
    <>
      <HorizontalLinearStepper
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        handleNext={handleNext}
        handleBack={handleBack}
        handleOnComplete={handleOnComplete}
        stepperValidationError={stepperValidationError}
        stepperValidationErrorIndex={stepperValidationErrorIndex}
      />

      {activeStep === firstStep && (
        <>
          <SearchLocationAutocomplete
            label={LABEL_CONSTANTS.startLocation}
            selectedValue={startLocation}
            setSelectedValue={setStartLocation}
          />
          <SearchLocationAutocomplete
            label={LABEL_CONSTANTS.endLocation}
            selectedValue={endLocation}
            setSelectedValue={setEndLocation}
          />
          <MapComponent>
            <GeoapifyRouting
              startLocation={startLocation}
              endLocation={endLocation}
            />
          </MapComponent>
        </>
        // <MapWithSearchboxContainer
        //   selectedValueStartingLocation={selectedValueStartingLocation}
        //   setSelectedValueStartingLocation={setSelectedValueStartingLocation}
        //   selectedValueEndLocation={selectedValueEndLocation}
        //   setSelectedValueEndLocation={setSelectedValueEndLocation}
        //   setNewStartPointAfterMarkerDragged={
        //     setNewStartPointAfterMarkerDragged
        //   }
        //   setNewEndPointAfterMarkerDragged={setNewEndPointAfterMarkerDragged}
        //   setSelectedValueStartingLocationNameAfterMarkerDragged={
        //     setSelectedValueStartingLocationNameAfterMarkerDragged
        //   }
        //   setSelectedValueEndLocationNameAfterMarkerDragged={
        //     setSelectedValueEndLocationNameAfterMarkerDragged
        //   }
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
          reasonForChosenTransport={transportTypeReason}
          setReasonForChosenTransport={setTransportTypeReason}
          travelDurationInMillis={travelDurationInMillis}
          startLocationName={startLocationName}
          setStartLocationName={setStartLocationName}
          endLocationName={endLocationName}
          setEndLocationName={setEndLocationName}
        />
      )}
      {activeStep > lastStep && (
        <TravelInformationCheckData
          startLocationName={startLocationName}
          endLocationName={endLocationName}
          startLocationPoint={startLocationPoint}
          endLocationPoint={endLocationPoint}
          startDateValue={startDateValue}
          endDateValue={endDateValue}
          travelDurationInMillis={travelDurationInMillis}
          travelPurposeValues={selectedTravelPurposeValues}
          weatherValues={selectedWeatherValues}
          transportValues={selectedTransportValues}
          transportTypeReason={transportTypeReason}
        />
      )}
    </>
  );
};

export { CreateJourneyPage };
