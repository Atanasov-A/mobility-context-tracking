// https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
const useAuthToken = () => {
  const getToken = (): string | null => {
    const sessionStorageTokenString = sessionStorage.getItem("token") as
      | string
      | null;
    if (
      sessionStorageTokenString != null &&
      sessionStorageTokenString.trim() !== ""
    ) {
      return sessionStorageTokenString;
    }

    const localStorageTokenString = localStorage.getItem("token") as
      | string
      | null;

    if (
      localStorageTokenString != null &&
      localStorageTokenString.trim() !== ""
    ) {
      return localStorageTokenString;
    }
    return null;
    // const userToken = JSON.parse(tokenString);
    // return userToken?.token;
  };

  const saveTokenInLocalStorage = (userToken: string) => {
    // Session storage
    localStorage.setItem("token", userToken);
    sessionStorage.removeItem("token");

    // localStorage.setItem("token", JSON.stringify(userToken));
    // setToken(userToken.token);
  };

  const saveTokenInSesssionStorage = (userToken) => {
    sessionStorage.setItem("token", userToken);
    localStorage.removeItem("token");
  };

  const clearTokenStorage = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  };

  return {
    saveTokenInLocalStorage,
    getToken,
    saveTokenInSesssionStorage,
    clearTokenStorage,
  };
};

export { useAuthToken };
