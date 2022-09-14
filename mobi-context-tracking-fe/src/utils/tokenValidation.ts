import jwt_decode from "jwt-decode";

export const isTokenExpired = (token: string) => {
  const decodedToken = jwt_decode(token) as any;
  const decodedTokenTimeInMilis = +decodedToken.exp * 1000;

  const expiration = new Date(decodedTokenTimeInMilis);
  const fiftyMinutes = 1000 * 60 * 50;
  const tokenExpired =
    expiration.getTime() < new Date().getTime() + fiftyMinutes;

  return tokenExpired;
};
