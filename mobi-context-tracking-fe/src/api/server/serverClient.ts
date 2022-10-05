import axios from "axios";
import { getTokenFromTheStorage } from "../../components/shared/hooks/useAuthToken";

const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL;

console.error(serverBaseUrl);
const serverClient = axios.create({
  baseURL: serverBaseUrl,
});

// Set the AUTH token for every request
serverClient.interceptors.request.use(function (config) {
  const token = getTokenFromTheStorage();
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export { serverClient };
