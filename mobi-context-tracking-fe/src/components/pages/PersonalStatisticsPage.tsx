import { PersonalStatisticTransporTypeByWeather } from "../statistics/PersonalStatisticTransportTypeByWeather";
import { PersonalStatisticTransportUsage } from "../statistics/PersonalStatisticTransportUsage";

const PersoanlStatiscticsPage = () => {
  return (
    <>
      <PersonalStatisticTransportUsage />
      <PersonalStatisticTransporTypeByWeather />
    </>
  );
};

export { PersoanlStatiscticsPage };
