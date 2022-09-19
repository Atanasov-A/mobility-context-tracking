import moment from "moment";
import { useEffect, useState } from "react";
import { LABEL_CONSTANTS } from "../../constants/ComponentsLabels";
import { getTransportTypeKeyByValue } from "../../models/enums/TransportTypeEnum";
import { getTravelPurposeKeyByValue } from "../../models/enums/TravelPurposeEnum";
import { getWeatherKeyByValue } from "../../models/enums/WeatherEnum";
import { GeoapifyLocation } from "../../models/GeoapifyLocation";
import { RouteInformation } from "../../models/RouteInformation";
import { calculateDifferenceBetweenDatesInMillis } from "../../utils/dateHelpers";
import { HorizontalLinearStepper } from "../HorizontalLinearStepper";
import { JourneyInformation } from "../JourneyInformation";
import { LocationSearchHelperText } from "../LocationSearchHelperText";
import { GeoapifyRouting } from "../map/GeoapifyRouting";
import { MapComponent } from "../map/MapComponent";
import { SearchLocationAutocomplete } from "../SearchLocationAutocomplete";
import { StyledAlert } from "../shared/StyledAlert";
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
  const [selectedTransportValue, setSelectedTransportValue] =
    useState<string>();
  const [transportTypeReason, setTransportTypeReason] = useState<string>("");

  const [showAlertNoRouteFound, setShowAlertNoRouteFound] = useState(false);

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
        selectedTransportValue.trim() === "" ||
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
    if (validStep) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleOnComplete = () => {
    const travelPurposeEnumList = selectedTravelPurposeValues.map((tpv) =>
      getTravelPurposeKeyByValue(tpv)
    );
    const weatherEnumList = selectedWeatherValues.map((sw) =>
      getWeatherKeyByValue(sw)
    );

    const routeInformationObject: RouteInformation = {
      startLocationName: startLocationName,
      endLocationName: endLocationName,
      startLocationPoint: { lat: startLocation.lat, lon: startLocation.lon },
      endLocationPoint: { lat: endLocation.lat, lon: endLocation.lon },
      startDate: moment(startDateValue).format("YYYY-MM-DD HH:mm:ss"),
      endDate: moment(endDateValue).format("YYYY-MM-DD HH:mm:ss"),
      travelPurposeList: travelPurposeEnumList,
      weatherList: weatherEnumList,
      transportType: getTransportTypeKeyByValue(selectedTransportValue),
      reasonForTransport: transportTypeReason,
    };
    console.log("on complete", routeInformationObject);
  };

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
          <LocationSearchHelperText />
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
          <StyledAlert
            showAlert={showAlertNoRouteFound}
            alertTitle={"The route you are looking for has not been found."}
            severity="info"
          />

          <MapComponent>
            <GeoapifyRouting
              startLocation={startLocation}
              endLocation={endLocation}
              setShowAlertNoRouteFound={setShowAlertNoRouteFound}
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
          selectedTransportValue={selectedTransportValue}
          setSelectedTransportValue={setSelectedTransportValue}
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
          transportValue={selectedTransportValue}
          transportTypeReason={transportTypeReason}
          startLocation={startLocation}
          endLocation={endLocation}
        />
      )}
    </>
  );
};

export { CreateJourneyPage };
