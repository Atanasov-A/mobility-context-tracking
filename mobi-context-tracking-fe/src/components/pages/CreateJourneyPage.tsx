import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMobilityActivity } from "../../api/server/createMobilityActivity";
import { LABEL_CONSTANTS } from "../../constants/ComponentsLabels";
import { getTransportTypeKeyByValue } from "../../models/enums/TransportTypeEnum";
import { getTravelPurposeKeyByValue } from "../../models/enums/TravelPurposeEnum";
import { getWeatherKeyByValue } from "../../models/enums/WeatherEnum";
import { GeoapifyLocation } from "../../models/GeoapifyLocation";
import { MobilityActivityInformation } from "../../models/MobilityActivityInformation";
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

  const [selectedTravelPurposeValues, setSelectedTravelPurposeValues] =
    useState<string[]>([]);
  const [selectedWeatherValues, setSelectedWeatherValues] = useState<string[]>(
    []
  );
  const [selectedTransportValue, setSelectedTransportValue] =
    useState<string>();
  const [transportTypeReason, setTransportTypeReason] = useState<string>("");

  const [showAlertNoRouteFound, setShowAlertNoRouteFound] = useState(false);
  const [alertSuccessfullySaved, setAlertSuccessfullySaved] = useState(false);

  const navigate = useNavigate();

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

  const handleOnComplete = async () => {
    const travelPurposeEnumList = selectedTravelPurposeValues.map((tpv) =>
      getTravelPurposeKeyByValue(tpv)
    );
    const weatherEnumList = selectedWeatherValues.map((sw) =>
      getWeatherKeyByValue(sw)
    );

    const mobilityActivityInformationObject: MobilityActivityInformation = {
      startLocationName: startLocationName,
      endLocationName: endLocationName,
      startLocationPoint: { lat: startLocation.lat, lon: startLocation.lon },
      endLocationPoint: { lat: endLocation.lat, lon: endLocation.lon },
      startDate: moment(startDateValue, true).toISOString(),
      endDate: moment(endDateValue).toISOString(),
      travelPurposeList: travelPurposeEnumList,
      weatherList: weatherEnumList,
      transportType: getTransportTypeKeyByValue(selectedTransportValue),
      reasonForTransport: transportTypeReason,
    };

    const result = await createMobilityActivity(
      mobilityActivityInformationObject
    );
    if (result.status === 200 || result.status === 201) {
      setAlertSuccessfullySaved(true);
      setTimeout(() => {
        navigate("/overall-statistics");
      }, 1100);
    }
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

      <StyledAlert
        alertTitle="Mobility activity saved"
        showAlert={alertSuccessfullySaved}
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
