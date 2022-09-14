import axios from "axios";

const serverClient = axios.create({
  baseURL: `https://localhost:3090`,
});

export { serverClient };
