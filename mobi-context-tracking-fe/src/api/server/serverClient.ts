import axios from "axios";
import { getTokenFromTheStorage } from "../../components/shared/hooks/useAuthToken";

const port = process.env.REACT_APP_SERVER_PORT || "3090";
const serverHost = process.env.REACT_APP_SERVER_HOST || "https://localhost";

const serverBaseUrl = `${serverHost}:${port}`;
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
