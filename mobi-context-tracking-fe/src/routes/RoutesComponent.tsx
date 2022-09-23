import { Navigate, Route, Routes } from "react-router-dom";
import { CreateJourneyPage } from "../components/pages/CreateJourneyPage";
import { SignInPage } from "../components/pages/login/SignInPage";
import { SignUpPage } from "../components/pages/login/SignUpPage";
import { OverallStatiscticsPage } from "../components/pages/OverallStatisticsPage";
import { PersoanlStatiscticsPage } from "../components/pages/PersonalStatisticsPage";
import { ProtectedRoute } from "./ProtectedRoute";

const RoutesComponent = () => {
  return (
    <>
      <Routes>
        <Route
          path="/add-route"
          element={
            <ProtectedRoute>
              <CreateJourneyPage />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route
          path="overall-statistics"
          element={
            <ProtectedRoute>
              <OverallStatiscticsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="personal-statistics"
          element={
            <ProtectedRoute>
              <PersoanlStatiscticsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate replace to="/add-route" />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <div>Page doesn't exist </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export { RoutesComponent };
