import React from "react";
import { Outlet } from "react-router";

const AuthLayout = ({children}) => {
  return (
    <div className="flex h-screen flex-col md:flex-row rounded-r-lg">
      {/* Left Section: Image */}
      <div className="hidden flex-1 md:flex rounded-r-lg">
        <img
          className="h-full w-full object-cover rounded-r-[200px]"
          src="https://media.istockphoto.com/id/2168843720/photo/close-up-of-house-keys-on-a-wooden-table.jpg?s=612x612&w=is&k=20&c=eF6ooYZlwtC3agLDlIwpT0nwj0hBDmujb5pBDyVOYRY="
          alt="Login Background"
        />
      </div>
        <Outlet />
        {children}
    </div>
  );
};

export default AuthLayout;
