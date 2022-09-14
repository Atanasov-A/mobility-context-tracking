import { serverClient } from "../serverClient";
import { UserRegisterCredentials } from "./../../../models/UserRegisterCredentials";

export const registerUser = (
  userRegisterCredentials: UserRegisterCredentials
) => {
  return serverClient.post("/register", { ...userRegisterCredentials });
};
