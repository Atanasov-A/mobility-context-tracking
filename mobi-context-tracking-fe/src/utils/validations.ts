export const isEmailValid = (email: string): boolean =>
  /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(
    email
  );

export const isPasswordValid = (password: string) => {
  return password.length >= 5;
};

export const isPasswordRepeatValid = (
  password: string,
  passwordRepeat: string
) => {
  return isPasswordValid(passwordRepeat) && password === passwordRepeat;
};

export const isSignUpValid = (
  email: string,
  password: string,
  passwordRepeat: string
) => {
  return (
    isEmailValid(email) &&
    isPasswordValid(password) &&
    isPasswordRepeatValid(password, passwordRepeat)
  );
};

export const isLoginValid = (email: string, password: string) => {
  return isPasswordValid(password) && isEmailValid(email);
};
