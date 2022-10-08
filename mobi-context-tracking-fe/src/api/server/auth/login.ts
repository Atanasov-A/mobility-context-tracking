import { serverClient } from "../serverClient";
import { UserLoginCredentials } from "./../../../models/UserLoginCredentials";

export const login = (userLoginCredentials: UserLoginCredentials) => {
  return serverClient.post("/api/login", { ...userLoginCredentials });
};

export const validateToken = () => {
  return serverClient.get("/api/verify-token");
};
