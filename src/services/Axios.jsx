import axios from "axios";
import { getLocalStorage } from "../utils/localData.util";

export const axiosService = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosService.interceptors.request.use((config) => {
  try {
    console.log({config});

    // test token not in production 
    config.headers["requesttoken"] = "610904831af1a01c5251e5437c53421338a01032a0c01bcc7db9da73368e339b";
    if(config.headers.Authorization == null){
      const token =  getLocalStorage("token")
      config.headers["authorization"] = `Bearer ${token}`;
      
    }
    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});

axiosService.interceptors.response.use(
  (response) => {
    if (response.data.status === 200) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    }
    if (response.data.status === 202) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    }
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 404) {
        return {
          success: false,
          data: error.response.data.data,
          message: error.response.data.message,
        };
      } else if (error.response.status === 500) {
        return {
          success: false,
          data: error.response.data.data,
          message: error.response.data.message,
        };
      } else if (error.response.status === 401) {
        return {
          success: false,
          data: error.response.data.data,
          message: error.response.data.message,
        };
      } else if (error.response.status === 403) {

        return {
          success: false,
          data: error.response.data.data,
          message: error.response.data.message,
        };
      } else {
        return {
          success: false,
          data: error.response.data.data,
          message: error.response.data.message,
        };
      }
    } else if (error.request) {
      // Request was made but no response was received
      console.log("ERROR => No response received");
    } else {
      // Something happened in setting up the request
      console.log("ERROR => Request setup error:", error.message);
    }

    return Promise.reject(error);
  },
);
