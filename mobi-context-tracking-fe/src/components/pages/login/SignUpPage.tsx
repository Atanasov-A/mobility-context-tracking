import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AlertColor } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { AxiosError } from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../api/server/auth/register";
import { UserRegisterCredentials } from "../../../models/UserRegisterCredentials";
import {
  isEmailValid,
  isPasswordRepeatValid,
  isPasswordValid,
  isSignUpValid,
} from "../../../utils/validations";
import { StyledAlert } from "../../shared/StyledAlert";
import { StyledTextField } from "../../shared/StyledTextField";

const SignUpPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [emailValidationError, setEmailValidationError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordValidationError, setPasswordValidationError] = useState(false);
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [passwordRepeatdValidationError, setPasswordRepeatValidationError] =
    useState(false);
  const [signUpValid, setSignUpValid] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>("success");
  const [showAlertTitle, setShowAlertTitle] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (userEmail.length > 0) {
      setEmailValidationError(!isEmailValid(userEmail));
    }
  }, [userEmail]);

  useEffect(() => {
    if (password.length > 0) {
      setPasswordValidationError(!isPasswordValid(password));
    }
  }, [password]);

  useEffect(() => {
    if (passwordRepeat.length > 0) {
      setPasswordRepeatValidationError(
        !isPasswordRepeatValid(password, passwordRepeat)
      );
    }
  }, [passwordRepeat, password]);

  useEffect(() => {
    setSignUpValid(isSignUpValid(userEmail, password, passwordRepeat));
  }, [userEmail, password, passwordRepeat]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userRegisterCredentials: UserRegisterCredentials = {
      email: userEmail,
      password: password,
      passwordRepeat: passwordRepeat,
    };

    try {
      const response = await registerUser(userRegisterCredentials);

      setAlertSeverity("success");
      setShowAlertTitle("Registration successfully");
      setShowAlert(true);

      clearForm();
    } catch (error) {
      setAlertSeverity("error");
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 409) {
        setShowAlertTitle("Email already in use");
      } else if (axiosError.response?.status === 400) {
        setShowAlertTitle("Credentials are not valid");
      } else {
        setShowAlertTitle("Something went wrong. Try again later");
      }
      setShowAlert(true);
    }
  };

  const clearForm = () => {
    setUserEmail("");
    setPassword("");
    setPasswordRepeat("");
    setTimeout(() => setShowAlert(false), 4000);
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create account
      </Typography>

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <StyledTextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={userEmail}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUserEmail(event.target.value);
          }}
          error={emailValidationError}
          helperText={emailValidationError ? "Incorrect email." : ""}
        />
        <Box>
          <StyledTextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
            }}
            error={passwordValidationError}
            helperText={
              passwordValidationError
                ? "Password must be at least 5 characters long."
                : ""
            }
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            name="passwordRepeat"
            label="Repeat password"
            type="password"
            id="passwordRepeat"
            autoComplete="current-password"
            value={passwordRepeat}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPasswordRepeat(event.target.value);
            }}
            error={passwordRepeatdValidationError}
            helperText={
              passwordRepeatdValidationError
                ? "Invalid confirmation password."
                : ""
            }
          />
        </Box>
        <Button
          disabled={!signUpValid}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link
              href=""
              variant="body2"
              onClick={(e: FormEvent) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>

        <StyledAlert
          showAlert={showAlert}
          alertTitle={showAlertTitle}
          severity={alertSeverity}
        />
      </Box>
    </Box>
  );
};

export { SignUpPage };
