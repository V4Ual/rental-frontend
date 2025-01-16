import { toast } from "react-toastify";
import { axiosService } from "../axios";

export const sentOtpApi = async (data) => {
  console.log("from send otp", data);

  const responseData = await axiosService.post("/auth/send-otp", data, {
    headers: {
      roletype: "landlord",
    },
  });
  return responseData;
};

export const verifyOTP = async (data) => {
  const responseData = await axiosService.post("/auth/verify", data);
  return responseData;
};

export const otpTimeCheck = async (data) => {
  const responseData = await axiosService.get(
    `/auth/time-check?email=${data}`,
    data,
  );
  return responseData;
};

export const loginApi = async (data) => {
  const responseData = await axiosService.post(`/landlord/auth/login`, data);
  return responseData;
};

export const changePassword = async (data, token) => {
  console.log("+++++++++++++  ",token.token);
  
  const responseData = await axiosService.post(`/auth/change-password`, data, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });

  return responseData;
};
