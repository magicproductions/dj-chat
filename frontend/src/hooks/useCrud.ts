import { useState } from "react";
import useAxiosWithInterceptor from "../helpers/jwtinterceptor";
import { BASE_URL } from "../config";

interface IuseCrud<T> {
  dataCRUD: T[];
  fetchData: () => Promise<void>;
  error: Error | null;
  isLoading: boolean;
}

const useCrud = <T>(initialData: T[], apiURL: string): IuseCrud<T> => {
  const jwtAxios = useAxiosWithInterceptor();
  const [dataCRUD, setDataCRUD] = useState<T[]>(initialData);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await jwtAxios.get(`${BASE_URL}${apiURL}`, {});
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = response.data;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setDataCRUD(data);
      setError(null);
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return data;
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.response && error.response.status === 400) {
        setError(new Error("400"));
      }
      setIsLoading(false);
      throw error;
    }
  };

  return { fetchData, dataCRUD, error, isLoading };
};
export default useCrud;
