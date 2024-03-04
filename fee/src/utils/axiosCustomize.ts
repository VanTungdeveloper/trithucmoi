import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

instance.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${user.accessToken}`,
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    // console.log("error.response.data", error.response.data)
    // axios retry refreshtoken
    // if (error.response.data) {
    //   window.location.href = '/login'
    // }
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
