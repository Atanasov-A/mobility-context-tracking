import { Route, Routes } from "react-router-dom";
import { CreateJourneyPage } from "../components/pages/CreateJourneyPage";
import { ResetPasswordPage } from "../components/pages/login/ResetPasswordPage";
import { SignInPage } from "../components/pages/login/SignInPage";
import { SignUpPage } from "../components/pages/login/SignUpPage";

const RoutesComponent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<CreateJourneyPage />} />
        <Route path="login" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />

        <Route path="about" element={<div>ABOUT </div>} />
      </Routes>
    </>
  );
};

export { RoutesComponent };
