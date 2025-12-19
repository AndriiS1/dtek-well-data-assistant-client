import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

let getTokenRef: (() => Promise<string | null>) | null = null;

export const setTokenFetcher = (fn: (() => Promise<string | null>) | null) => {
  getTokenRef = fn;
};

apiClient.interceptors.request.use(
  async (config) => {
    if (getTokenRef) {
      const token = await getTokenRef();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
