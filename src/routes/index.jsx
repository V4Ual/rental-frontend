import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "../pages/daskborad/dashboard";
import DashBoardLayout from "../layouts/DashBoardLayout";
import AddProperty from "../pages/daskborad/AddProperty";
import ProtectedRoutes  from "./protectedRoute";
import SignupPage from "../pages/signup/SignupPage";
import AuthLayout from "../layouts/AuthLayout";
import EmailPage from "../pages/signup/EmailPage";
import SignInPage from "../pages/signup/SignInPage";
import ForgetPasswordPage from "../pages/signup/ForgetPassowrd";
import ChangePasswordPage from "../pages/signup/ChangePassword";
import RoomPage from '../pages/rooms/RoomPage'
import AddTenant from "../pages/rooms/AddTenant";
import EditRoom from "../pages/rooms/EditRoom";

 const RouterList = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes auth={false}>
        <AuthLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/singup",
        element: <SignupPage />,
      },
      {
        path: "/email",
        element: <EmailPage />,
      },
      {
        path: "/singin",
        element: <SignInPage />,
      },
      {
        path: "/forget",
        element: <ForgetPasswordPage />,
      },
      {
        path: "/resetpasswrd/:token",
        element: <ChangePasswordPage />,
      },
    ],
  },

 
  {
    path: "/owner",
    element: (
      <ProtectedRoutes auth={true}>
        <DashBoardLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        key: 1,
        path: "/owner/dashboard",
        element: <Dashboard />,
      },
      {
        key: 2,
        path: "/owner/property",
        element: <AddProperty />,
      },
      {
        key: 3,
        path: "/owner/property/room",
        element: <RoomPage />,
      },
      {
        key: 4,
        path: "/owner/property/room/tenant",
        element: <AddTenant />,
      },
      {
        key: 5,
        path: "/owner/property/room/edit",
        element: <EditRoom />,
      },
    ],
  },
]);


export default RouterList