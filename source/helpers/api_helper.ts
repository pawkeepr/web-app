import axios, { AxiosRequestConfig } from "axios";
import config from "../config";

// default
axios.defaults.baseURL = config.api.API_URL;
// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

// content type
const token = 'token';

if (token)
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

// intercepting to capture errors
axios.interceptors.response.use(
  function (response: { data: any; }) {
    return response.data ? response.data : response;
  },
  function (error: { status: any; message: any; }) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token: any) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

class APIClient {
  /**
   * Fetches data from given url
   */

  //  get = (url, params) => {
  //   return axios.get(url, params);
  // };
  get = (url: string, params?: AxiosRequestConfig<any> | undefined) => {
    let response;

    let paramKeys: any[] = [];

    if (params) {
      Object.keys(params).map(key => {
        paramKeys.push(key + '=' + params[key]);
        return paramKeys;
      });

      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }

    return response;
  };
  /**
   * post given data to url
   */
  create = (url: string, data: any) => {
    return axios.post(url, data);
  };
  /**
   * Updates data
   */
  update = (url: string, data: any) => {
    return axios.patch(url, data);
  };

  put = (url: string, data: any) => {
    return axios.put(url, data);
  };
  /**
   * Delete
   */
  delete = (url: string, config?: AxiosRequestConfig<any> | undefined) => {
    return axios.delete(url, { ...config });
  };
}
const getLoggedinUser = () => {
  const user = sessionStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { APIClient, setAuthorization, getLoggedinUser };
