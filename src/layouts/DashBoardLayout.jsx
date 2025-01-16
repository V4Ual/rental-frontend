import React, { Children, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import building from "../assets/building.png";
import {BottomNavComponent} from '../Componets/BottomNavComponent.jsx'

const DashBoardLayout = ({ children }) => {
  const navigation = useNavigate();
  const [close, setClose] = useState(false);
  return (
    <div>
      <div>
        <header>
          <nav className="">
            <div className="min-h-full bg-[#DCDCDC]">
              <div className="md:2xl bg-grey-100 z-10 flex h-[50px] w-full items-center justify-between px-2 pr-5 md:fixed md:justify-end md:bg-slate-500">
                <i
                  className="fa fa-bars text-3xl md:hidden"
                  aria-hidden="true"
                  onClick={() => setClose((pre) => !pre)}
                ></i>
                <div className="flex space-x-5">
                  <input
                    type="search"
                    className="relative hidden rounded-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Search Here...."
                    required
                  />
                  <i
                    className="fa fa-search hidden text-end text-3xl ssm:hidden md:block"
                    aria-hidden="true"
                  ></i>

                  {/* <i className="fa fa-search text-3xl md:hidden" aria-hidden="true"></i> */}
                  <i
                    className="fa fa-cog text-3xl md:hidden"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <div
          className={`animate-once fixed animate-fade-down rounded-3xl ${close == false ? "hidden" : ""} opacity-1.2 z-10 h-screen w-full bg-slate-400 bg-opacity-90 px-4 md:hidden`}
        >
          <button
            type="button"
            className="relative left-24 top-[-120px]"
            onClick={() => setClose((pre) => !pre)}
          >
            <i
              className="fa fa-times-circle text-lg text-red-500"
              aria-hidden="true"
            ></i>
          </button>
          <div className="flex h-[calc(100%-176px)] flex-col justify-between">
            <ul className="space-y-4">
              <li>
                <i
                  onClick={() => setClose((pre) => !pre)}
                  className="fa fa-times-circle w-full px-3 text-end text-3xl text-red-500"
                  aria-hidden="true"
                ></i>
              </li>
              <li className="bg-slate-500 p-4">
                <Link
                  onClick={() => setClose((pre) => !pre)}
                  className="bg-slate-500 p-4"
                  to={"dashboard"}
                >
                  Home
                </Link>
              </li>
              <li className="bg-slate-500 p-4">
                <Link
                  onClick={() => setClose((pre) => !pre)}
                  className="bg-slate-500 p-4"
                  to={"property"}
                >
                  Add Property
                </Link>
              </li>
              <li className="bg-slate-500 p-4">
                <Link
                  onClick={() => setClose((pre) => !pre)}
                  className="bg-slate-500 p-4"
                  to={"property"}
                >
                  Duo Payment
                </Link>
              </li>
            </ul>
            <li className="flex list-none items-center justify-between bg-slate-500 p-4 text-center">
              <button
                onClick={() => {
                  setClose((pre) => !pre);
                  localStorage.clear();
                  navigation("/singin");
                }}
                className="bg-slate-500 text-lg font-bold"
              >
                Logout
              </button>
              <span>
                <i className="fa fa-sign-out text-2xl" aria-hidden="true"></i>
              </span>
            </li>
          </div>
        </div>

        <div className="flex flex-row">
          <aside className="p-18 mt-20 hidden px-3 md:block md:w-[250px]">
            <ul className="fixed flex h-[-webkit-fill-available] flex-col justify-between space-y-4 md:w-[230px]">
              <div>
                <li className="rounded-2xl border-2 bg-gradient-to-r bg-gradient-to-t from-orange-800 to-indigo-600 p-4">
                  <Link
                    className="p-4 font-semibold text-white"
                    to={"dashboard"}
                  >
                    Home
                  </Link>
                </li>
                <li className="rounded-2xl border-2 bg-gradient-to-r from-orange-800 to-indigo-600 p-4">
                  <Link
                    className="p-4 font-semibold text-white"
                    to={"property"}
                  >
                    Add Property
                  </Link>
                </li>
                <li className="rounded-2xl border-2 bg-gradient-to-r from-orange-800 to-indigo-600 p-4">
                  <Link
                    className="p-4 font-semibold text-white"
                    to={"property"}
                  >
                    Add Property
                  </Link>
                </li>
              </div>
              <div>
                <li className="bottom-0 rounded-2xl border-2 bg-gradient-to-r from-orange-800 to-indigo-600 p-4">
                  <Link
                    className="p-4 font-semibold text-white"
                    to={"property"}
                  >
                    Add Property
                  </Link>
                </li>
              </div>

              {/* 
              <Link to="home">
              </Link> */}
            </ul>
          </aside>

          <div className="flex-1 md:mt-[50px] md:mb-[12rem]">
            <Outlet />
            {/* {children} */}
          </div>
          {/* <div className="h-15 fixed bottom-0 w-full rounded-t-3xl bg-red-400 pt-2">
            <div className="flex items-center justify-evenly">
              <div className="flex flex-col items-center justify-center">
                <div className="h-15 flex w-20 items-center justify-center rounded-full bg-white p-2">
                  <img src={building} className="items-center" alt="" />
                </div>
                <h4 className="font-bold">Add Property</h4>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="h-15 flex w-20 items-center justify-center rounded-full bg-white p-2">
                  <img src={building} className="items-center" alt="" />
                </div>
                <h4 className="font-bold">Add Property</h4>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="h-15 flex w-20 items-center justify-center rounded-full bg-white p-2">
                  <img src={building} className="items-center" alt="" />
                </div>
                <h4 className="font-bold">Add Property</h4>
              </div>
            </div>
          </div> */}
          <BottomNavComponent />
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
