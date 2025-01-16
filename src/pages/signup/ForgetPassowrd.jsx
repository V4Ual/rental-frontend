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
import {
  emailVerify,
  sendForgetPasswordHook,
} from "../../hooks/auth/Auth.hook";
import { captchaGenerate } from "../../utils/Captcha.utils";

const ForgetPasswordPage = () => {
  const location = useLocation();

  const data = location.state;

  const { forgetData,isLoading, setForgetData, errorMessage,handleSubmit,handleChangeInput } = sendForgetPasswordHook();
  const { canvasRef,captchaText,generateCaptcha } = captchaGenerate()
  // const { setSeconds,errorMessage,handleOtpSend,handleOtpChanges,seconds,refresh} = emailVerify()

  return (
    <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
      {isLoading ?   <p> Loading ............</p> : (      <div className="h-[500px] w-full max-w-md rounded-lg bg-white p-6 shadow-lg sm:p-10">
        <h1 className="mb-4 text-center text-2xl font-bold md:text-4xl">
          Forget Password
        </h1>
        <p className="mb-6 text-center text-sm md:text-lg">
          Please enter the email to send verification code to change password
          <span className="font-bold text-black"> </span>
        </p>

        <div className="flex flex-1 items-center justify-center pb-6">
          <input
            name="email"
            onChange={(e)=>handleChangeInput(e)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the email"
          />
        </div>
        {errorMessage && (
          <p className="mb-3 max-w-full items-center text-center text-sm text-red-500">
            {errorMessage.email}
          </p>
        )}
   

        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width="100px"
            height="80"
            className="px-3 py-3"
            //   style={{ border: "1px solid #ccc" }}
          ></canvas>
          <button onClick={() => generateCaptcha()}>
            <i className="fa fa-refresh text-2xl" aria-hidden="true"></i>
          </button>
        </div>
        <div className="flex flex-1 items-center justify-center pb-6">
          <input
            name="captcha"
            onChange={(e)=> handleChangeInput(e)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the captcha"
          />
        </div>

        {/* Sign Up Button */}
        <button
          onClick={() => handleSubmit(captchaText)}
          className="mb-4 w-full rounded-full bg-blue-600 py-2 text-white transition hover:bg-blue-700"
        >
          Send OTP
        </button>
      </div>)}

    </div>
  );
};

export default ForgetPasswordPage;
