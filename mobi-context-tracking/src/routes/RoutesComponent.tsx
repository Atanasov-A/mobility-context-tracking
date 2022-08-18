import { Route, Routes } from "react-router-dom";
import { SearchLocationPage } from "../components/pages/SearchLocationPage";

const RoutesComponent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SearchLocationPage />} />

        <Route path="about" element={<div>ABOUT </div>} />
      </Routes>
    </>
  );
};

export { RoutesComponent };
