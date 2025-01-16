import React, { useEffect, useRef, useState } from "react";
import { changePasswordHook } from "../../hooks/auth/Auth.hook";
import { captchaGenerate } from "../../utils/Captcha.utils";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

const ChangePasswordPage = () => {
  const { errorMessage, handleChangeInput, handleSubmit } =
    changePasswordHook();
  const token = useParams();
  console.log(token);
  

  return (
    <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
      <div className="h-[500px] w-full max-w-md rounded-lg bg-white p-6 shadow-lg sm:p-10">
        <h1 className="mb-4 text-center text-2xl font-bold md:text-2xl">
          Change Password
        </h1>
        <p className="mb-6 text-center text-sm md:text-lg">
          Please enter the new password what you want
          <span className="font-bold text-black"> </span>
        </p>
        <label htmlFor="password" className="mb-2 block text-sm font-medium">
          Password
        </label>
        <div className="flex flex-1 items-center justify-center pb-6">
          <input
            name="password"
            onChange={(e) => handleChangeInput(e)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="New password"
          />
        </div>
        {errorMessage && (
          <p className="mb-3 max-w-full items-center text-center text-sm text-red-500">
            {errorMessage.password}
          </p>
        )}
        <label htmlFor="password" className="mb-2 block text-sm font-medium">
          Confirm Password
        </label>
        <div className="flex flex-1 items-center justify-center pb-6">
          <input
            onChange={(e) => handleChangeInput(e)}
            name="confirmPassword"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm password"
          />
        </div>
        {errorMessage && (
          <p className="mb-3 max-w-full items-center text-center text-sm text-red-500">
            {errorMessage.confirmPassword}
          </p>
        )}
        {errorMessage && (
          <p className="mb-3 max-w-full items-center text-center text-sm text-red-500">
            {errorMessage.both}
          </p>
        )}

        {/* Sign Up Button */}
        <button
          onClick={() => handleSubmit(token)}
          className="mb-4 w-full rounded-full bg-blue-600 py-2 text-white transition hover:bg-blue-700"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
