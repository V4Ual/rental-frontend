import React, { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { loginAuth } from "../../validation/auth/SignupValidation";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import { sentOtpApi } from "../../services/auth/auth.service";
import { AuthHook } from "../../hooks/auth/Auth.hook";

const SignupPage = () => {
    const { errorMessage, handleChangeInput,passwordShow,setPasswordShow,handleSignUp ,signData,} = AuthHook()

  return (
    <>
        <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg sm:p-10">
            <h1 className="mb-4 text-center text-2xl font-bold md:text-4xl">
              Get Started
            </h1>
            <p className="mb-6 text-center text-sm md:text-lg">
              Sign up to start managing your properties.
            </p>

            {/* Email Input */}
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                onChange={(e) => handleChangeInput(e)}
              />
              {errorMessage && (
                <span className="text-sm text-red-500">
                  {errorMessage.email}
                </span>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordShow ? "text" : "password"}
                  name="password"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  onChange={(e) => handleChangeInput(e)}
                />
                {errorMessage && (
                  <span className="text-sm text-red-500">
                    {errorMessage.password}
                  </span>
                )}
                {/* <span className='absolute right-2 top-1'>icon</span> */}
                <button
                  onClick={() => setPasswordShow((pre) => !pre)}
                  className="absolute right-3 top-2 text-gray-500"
                >
                  {passwordShow ? (
                    <i className="fa fa-eye-slash" aria-hidden="true"></i>
                  ) : (
                    <i className="fa fa-eye-slash" aria-hidden="true"></i>
                  )}
                </button>
              </div>
            </div>
            <Link to={'/forget'} className="top-20] relative bottom-3 left-[50%] text-red-400 md:bottom-3 md:left-[65%]">
              forget password ?
            </Link>

            {/* Sign Up Button */}
            <button
              onClick={() => handleSignUp()}
              className="mb-4 w-full rounded-full bg-blue-600 py-2 text-white transition hover:bg-blue-700"
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="mb-4 flex items-center">
              <div className="h-px flex-grow bg-gray-300"></div>
              <span className="px-2 text-sm text-gray-500">OR</span>
              <div className="h-px flex-grow bg-gray-300"></div>
            </div>

            {/* Google Login */}
            <button className="mb-3 flex w-full items-center justify-center rounded-full bg-red-600 py-2 text-white transition hover:bg-red-700">
              <i className="fa fa-google mr-3"></i> Login with Google
            </button>

            {/* Facebook Login */}
            <button className="mb-6 flex w-full items-center justify-center rounded-full bg-blue-600 py-2 text-white transition hover:bg-blue-700">
              <i className="fa fa-facebook mr-3"></i> Login with Facebook
            </button>

            {/* Sign Up Link */}
            <div className="text-center text-sm">
              Don’t have an account?{" "}
              <Link to={"/singin"} className="text-blue-600">
                Sign IN
              </Link>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default SignupPage;
