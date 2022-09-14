import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AlertColor } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { AxiosError } from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../api/server/auth/login";
import { UserLoginCredentials } from "../../../models/UserLoginCredentials";
import {
  isEmailValid,
  isLoginValid,
  isPasswordValid,
} from "../../../utils/validations";
import { useAuthToken } from "../../shared/hooks/useAuthToken";
import { StyledAlert } from "../../shared/StyledAlert";
import { StyledTextField } from "../../shared/StyledTextField";

const SignInPage = () => {
  const navigate = useNavigate();
  const { saveTokenInLocalStorage, saveTokenInSesssionStorage } =
    useAuthToken();
  const [rememberMechecked, setRememberMechecked] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [emailValidationError, setEmailValidationError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordValidationError, setPasswordValidationError] = useState(false);
  const [signInValid, setSignInValid] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>("success");
  const [showAlertTitle, setShowAlertTitle] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userRegisterCredentials: UserLoginCredentials = {
      email: userEmail,
      password: password,
    };

    try {
      const response = (await login(userRegisterCredentials)).data;
      const token = response?.token as string | null;

      if (rememberMechecked) {
        saveTokenInLocalStorage(token);
      } else {
        saveTokenInSesssionStorage(token);
      }
      navigate("/add-route");
    } catch (error) {
      setAlertSeverity("error");
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        setShowAlertTitle("User doesn't exist");
      } else if (axiosError.response?.status === 401) {
        setShowAlertTitle("Credentials are not valid");
      } else {
        setShowAlertTitle("Something went wrong. Try again later");
      }
      setShowAlert(true);
    }
  };

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
    setSignInValid(isLoginValid(userEmail, password));
  }, [userEmail, password]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setRememberMechecked(event.target.checked);
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
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Box>
          <StyledTextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={userEmail}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUserEmail(event.target.value);
            }}
            error={emailValidationError}
            helperText={emailValidationError ? "Incorrect email." : ""}
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
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
        </Box>
        <FormControlLabel
          control={
            <Checkbox
              value="remember"
              color="primary"
              checked={rememberMechecked}
              onChange={handleCheckboxChange}
            />
          }
          label="Remember me"
        />
        <Button
          disabled={!signInValid}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link
              href=""
              variant="body2"
              onClick={(e: FormEvent) => {
                e.preventDefault();
                navigate("/sign-up");
              }}
            >
              Don't have an account? Sign Up
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

export { SignInPage };
