import axios from "axios";
import { getTokenFromTheStorage } from "../../components/shared/hooks/useAuthToken";

const serverClient = axios.create({
  baseURL: `https://localhost:3090`,
});

// Set the AUTH token for every request
serverClient.interceptors.request.use(function (config) {
  const token = getTokenFromTheStorage();
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export { serverClient };
