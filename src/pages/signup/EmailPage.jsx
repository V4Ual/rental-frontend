import React, { useEffect, useRef, useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { convertMin } from "../../utils/TimeUtils";
import { OtpInput } from "../../Componets/OptComponent";
import { axiosService } from "../../services/axios";
import {
  otpTimeCheck,
  sentOtpApi,
  verifyOTP,
} from "../../services/auth/auth.service";
import { toast } from "react-toastify";
import { setLocalStorage } from "../../utils/localData.util";
import { otpValidation } from "../../validation/auth/SignupValidation";
import { emailVerify } from "../../hooks/auth/Auth.hook";

const EmailPage = () => {

  const { data, errorMessage, handleOtpSend, handleOtpChanges, seconds } =
    emailVerify();

  return (
      <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
        <div className="h-[500px] w-full max-w-md rounded-lg bg-white p-6 shadow-lg sm:p-10">
          <h1 className="mb-4 text-center text-2xl font-bold md:text-4xl">
            Email verification
          </h1>
          <p className="mb-6 text-center text-sm md:text-lg">
            Please enter the 6 digit verification code we sent to
            <span className="font-bold text-black"> {data.email} </span>
          </p>

          {/* Email Input */}
          {/* <div className="flex max-w-min space-x-4 "> */}

          <div className="flex flex-1 items-center justify-center pb-6">
            <OtpInput length={6} onChange={handleOtpChanges} />

            {/* </div> */}
          </div>
          {errorMessage && (
            <p className="mb-3 max-w-full items-center text-center text-sm text-red-500">
              {errorMessage.otp}
            </p>
          )}

          {/* Sign Up Button */}
          <button
            onClick={() => handleOtpSend()}
            className="mb-4 w-full rounded-full bg-blue-600 py-2 text-white transition hover:bg-blue-700"
          >
            Verify OTP
          </button>
          <p className="mb-6 text-center text-sm md:text-sm">
            Did’t get a code?
            <span className="font-bold text-black">
              {" "}
              resend in {convertMin(seconds)}{" "}
            </span>
          </p>
          <button
            onClick={() => {
              if (seconds == 0) handleOtpSend(true);
            }}
            className="relative bottom-3 left-[50%] top-[20] text-red-400 underline md:bottom-3 md:left-[80%]"
          >
            resent OTP
          </button>
        </div>
      </div>
    
  );
};

export default EmailPage;
