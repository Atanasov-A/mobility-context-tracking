import { serverClient } from "../serverClient";
import { UserLoginCredentials } from "./../../../models/UserLoginCredentials";

export const login = (userLoginCredentials: UserLoginCredentials) => {
  return serverClient.post("/login", { ...userLoginCredentials });
};

export const validateToken = () => {
  return serverClient.get("/verify-token");
};
