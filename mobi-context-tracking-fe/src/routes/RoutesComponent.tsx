import { Route, Routes } from "react-router-dom";
import { CreateJourneyPage } from "../components/pages/CreateJourneyPage";
import { SignInPage } from "../components/pages/login/SignInPage";
import { SignUpPage } from "../components/pages/login/SignUpPage";
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
          path="saved-routes"
          element={
            <ProtectedRoute>
              <div>Saved routes </div>
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
