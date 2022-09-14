import jwt_decode from "jwt-decode";

export const isTokenExpired = (token: string) => {
  const decodedToken = jwt_decode(token) as any;

  const expiration = new Date(decodedToken.exp);
  const now = new Date();
  const fiftyMinutes = 1000 * 60 * 50;
  const tokenExpired = expiration.getTime() - now.getTime() < fiftyMinutes;

  return tokenExpired;
};
