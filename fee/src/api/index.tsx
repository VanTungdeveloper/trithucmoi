import axios, { AxiosResponse, Method } from "axios";

const api = axios.create();

const request = (
  method: Method,
  url: string,
  params: any
): Promise<AxiosResponse> => {
  return api.request({
    method,
    url,
    params,
  });
};

export default request;
