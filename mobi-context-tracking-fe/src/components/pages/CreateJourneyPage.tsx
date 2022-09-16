import { useEffect, useState } from "react";
import { LABEL_CONSTANTS } from "../../constants/ComponentsLabels";
import { GeoapifyLocation } from "../../models/GeoapifyLocation";
import { calculateDifferenceBetweenDatesInMillis } from "../../utils/dateHelpers";
import { HorizontalLinearStepper } from "../HorizontalLinearStepper";
import { JourneyInformation } from "../JourneyInformation";
import { GeoapifyRouting } from "../map/GeoapifyRouting";
import { MapComponent } from "../map/MapComponent";
import { SearchLocationAutocomplete } from "../SearchLocationAutocomplete";
import { TravelInformationCheckData } from "../TravelInformationCheckData";

const firstStep = 0;
const lastStep = 1;

const CreateJourneyPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [stepperValidationError, setStepperValidationError] = useState(false);
  const [stepperValidationErrorIndex, setStepperValidationErrorIndex] =
    useState(-1);

  const [startLocation, setStartLocation] = useState<GeoapifyLocation | null>();
  const [endLocation, setEndLocation] = useState<GeoapifyLocation | null>();

  const [startLocationName, setStartLocationName] = useState("");
  const [endLocationName, setEndLocationName] = useState("");

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
    if (
      startLocation != null &&
      startLocation.formatted != null &&
      startLocation.formatted.trim() !== ""
    ) {
      setStartLocationName(startLocation.formatted);
    }
  }, [startLocation]);

  useEffect(() => {
    if (
      endLocation != null &&
      endLocation.formatted != null &&
      endLocation.formatted.trim() !== ""
    ) {
      setEndLocationName(endLocation.formatted);
    }
  }, [endLocation]);

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
        startLocation == null ||
        startLocation?.lat == null ||
        startLocation?.lon == null ||
        endLocation == null ||
        endLocation?.lat == null ||
        endLocation?.lon == null
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
          startDateValue={startDateValue}
          endDateValue={endDateValue}
          travelDurationInMillis={travelDurationInMillis}
          travelPurposeValues={selectedTravelPurposeValues}
          weatherValues={selectedWeatherValues}
          transportValues={selectedTransportValues}
          transportTypeReason={transportTypeReason}
          startLocation={startLocation}
          endLocation={endLocation}
        />
      )}
    </>
  );
};

export { CreateJourneyPage };
