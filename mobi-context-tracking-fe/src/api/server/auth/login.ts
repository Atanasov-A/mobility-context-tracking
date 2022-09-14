import { serverClient } from "../serverClient";
import { UserLoginCredentials } from "./../../../models/UserLoginCredentials";

export const login = (userLoginCredentials: UserLoginCredentials) => {
  return serverClient.post("/login", { ...userLoginCredentials });
};
