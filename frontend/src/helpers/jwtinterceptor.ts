import axios, { AxiosInstance } from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

const API_BASE_URL = BASE_URL;
const useAxiosWithJwtInterceptor = (): AxiosInstance => {
  const jwtAxios = axios.create({ baseURL: API_BASE_URL });
  const navigate = useNavigate();

  jwtAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    async (error) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
      const originalRequest = error.config;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.response.status === 401) {
        const goRoot = () => navigate("/");
        goRoot();

        // try {
        //   const response = await axios.post(
        //     "http://127.0.0.1:8000/api/token/refresh/",
        //   );
        //   if (response["status"] == 200) {
        //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        //     return jwtAxios(originalRequest);
        //   }
        // } catch (refreshError) {
        //   // logout();
        //   const goLogin = () => navigate("/login");
        //   goLogin();
        //   return Promise.reject(refreshError);
        // }
      }
      // return Promise.reject(error);
    },
  );
  return jwtAxios;
};
export default useAxiosWithJwtInterceptor;
