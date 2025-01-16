import React, { useRef } from "react";
import CardComponent from "../../Componets/CardComponent";
import DashBoardLayout from "../../layouts/DashBoardLayout";
import { Outlet } from "react-router";
import infoCircle from "../../assets/info-circle.png";
import building from "../../assets/building.png";
import home from "../../assets/home.png";
import payment from "../../assets/Payments.png";
import { propertyListHook, tenantListHook } from "../../hooks/property/TypeHook";

const Dashboard = () => {
  const scrollContainerRef = useRef(null);
  const { getProperty, setLoading, isLoading } = propertyListHook();
  const { getTenant } = tenantListHook();


  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200, // Adjust scroll amount
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200, // Adjust scroll amount
        behavior: "smooth",
      });
    }
  };
  const scrollContainerRef2 = useRef(null);

  const scrollLeft2 = () => {
    if (scrollContainerRef2.current) {
      scrollContainerRef2.current.scrollBy({
        left: -200, // Adjust scroll amount
        behavior: "smooth",
      });
    }
  };

  const scrollRight2 = () => {
    if (scrollContainerRef2.current) {
      scrollContainerRef2.current.scrollBy({
        left: 200, // Adjust scroll amount
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      {/* <DashBoardLayout> */}
      {/* <div> */}
      <h1 className="px-2 py-2 text-start text-2xl font-bold text-black md:text-left">
        Overview
      </h1>
      <div className="flex md:flex-col">
        {/* <div className="max-h-full bg-red-500 md:w-[25%] lg:w-[15%]"></div> */}

        <div className="flex flex-1 flex-row">
          <div className="max-h-full flex-1 bg-white px-2 md:space-y-10 md:py-5">
            <div className="min-h-full flex-1 bg-white py-3 md:space-y-10">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {/* <div className="bg-grey h-[15rem] w-[25%] rounded-lg bg-[#E1E3E6] p-5"> */}
                {/* </div> */}
                <div className="bg-grey flex min-h-full min-w-full flex-col items-baseline justify-between rounded-lg bg-[#DCDCDC] p-5 md:space-y-5">
                  <div className="rounded-full bg-[#CDE1FC] p-4">
                    <img src={building} className="h-8 w-8" alt="" />
                  </div>
                  <div className="flex flex-col space-y-0">
                    <h1 className="t font-bold lg:text-2xl">
                      Total Properties
                    </h1>
                    <h1 className="font-bold text-[#1A4BFF] lg:text-2xl">04</h1>
                  </div>
                </div>
                <div className="bg-grey flex min-h-full min-w-full flex-col items-baseline justify-between space-y-10 rounded-lg bg-[#DCDCDC] p-5">
                  <div className="rounded-full bg-[#CDE1FC] p-4">
                    <img src={home} className="h-8 w-8" alt="" />
                  </div>
                  <div className="flex flex-col space-y-0">
                    <h1 className="t font-bold lg:text-2xl">Active tenants</h1>
                    <h1 className="font-bold text-[#1A4BFF] lg:text-2xl">04</h1>
                  </div>
                </div>
                <div className="bg-grey flex min-h-full min-w-full flex-col items-baseline justify-between space-y-10 rounded-lg bg-[#DCDCDC] p-5">
                  <div className="rounded-full bg-[#CDE1FC] p-4">
                    <img src={payment} className="h-8 w-8" alt="" />
                  </div>
                  <div className="flex flex-col space-y-0">
                    <h1 className="t font-bold lg:text-2xl">Total Payments</h1>
                    <h1 className="font-bold text-[#1A4BFF] lg:text-2xl">
                      $10,000
                    </h1>
                  </div>
                </div>
                <div className="bg-grey flex min-h-full min-w-full flex-col items-baseline justify-between space-y-10 rounded-lg bg-[#DCDCDC] p-5">
                  <div className="rounded-full bg-[#CDE1FC] p-4">
                    <img src={infoCircle} className="h-8 w-8" alt="" />
                  </div>
                  <div className="flex flex-col space-y-0">
                    <h1 className="t font-bold lg:text-2xl">Due Payments</h1>
                    <h1 className="font-bold text-[#1A4BFF] lg:text-2xl">
                      $1,500
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1 className="px-2 py-2 text-start text-2xl font-bold text-black md:text-left">
        Property Details
      </h1>

      <button className="w-full px-5 text-end text-lg font-bold text-red-500 underline">
        View all
      </button>

      <div
        ref={scrollContainerRef}
        className="flex max-h-full w-[calc(100vw-0px)] gap-2 overflow-auto bg-white pt-5 md:w-[calc(100vw-250px)]"
      >
        {getProperty?.length > 0 ? (
          getProperty &&
          getProperty.map((item, index) => {
            return (
              <CardComponent
                key={index}
                title={item.name}
                address={item.address}
                roomNo={item.no_of_room}
                image={item.property_images}
                data={item}
                propertyType={item.property_type.name}
              />
            );
          })
        ) : (
          <div
            className={`ml-2 mr-2 flex h-[20rem] w-[95%] flex-shrink-0 flex-col items-center justify-center rounded-2xl bg-[#DCDCDC] md:w-full`}
          >
            <div className={`bg-bg-grey rounded-t-lg bg-cover`}>
              <div className="h-full w-full">
                <h1>Data not found </h1>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="relative bottom-[300px] hidden w-full justify-between space-x-10 px-2 text-center md:inline-flex">
        <button
          onClick={scrollLeft}
          // className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-700 text-white p-2 rounded"
        >
          <i
            className="fa fa-arrow-circle-o-left border-1 rounded-full border-orange-400 bg-orange-400 text-5xl font-bold"
            aria-hidden="true"
          ></i>
        </button>
        <button
          onClick={scrollRight}
          // className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-700 text-white p-2 rounded"
        >
          <i
            className="fa fa-arrow-circle-o-right border-1 rounded-full border-orange-400 bg-orange-400 text-5xl font-bold"
            aria-hidden="true"
          ></i>
        </button>
      </div>
      <h1 className="px-2 py-2 text-start text-2xl font-bold text-black md:text-left">
        Your Tenants
      </h1>
      <button className="w-full px-5 text-end text-lg font-bold text-red-500 underline">
        View all
      </button>

      <div
        ref={scrollContainerRef2}
        className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300 flex max-h-full w-[calc(100vw-0px)] gap-2 overflow-auto bg-white pb-[6rem] pt-5 md:w-[calc(100vw-250px)]"
      >
        {getTenant?.length > 0 ? (
          getTenant &&
          getTenant.map((item, index) => {
            // console.log(item.property_room);
            
            return (
              <CardComponent
                key={index}
                type="tenant"
                title={item.tenant_name}
                // address={item.address}
                phoneNumber={item.phone_number}
                roomNo={item?.property_room?.room_no}
                image={[item.profile_pic]}
                propertyType={item?.property_room?.property?.property_type?.name}
              />
            );
          })
        ) : (
          <div
            className={`ml-2 mr-2 flex h-[20rem] w-[95%] flex-shrink-0 flex-col items-center justify-center rounded-2xl bg-[#DCDCDC] md:w-full`}
          >
            <div className={`bg-bg-grey rounded-t-lg bg-cover`}>
              <div className="h-full w-full">
                <h1>Data not found </h1>
              </div>
            </div>
          </div>
        )}

        {/* <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent /> */}
      </div>
      <div className="relative bottom-[300px] hidden w-full justify-between space-x-10 px-2 text-center md:inline-flex">
        <button
          onClick={scrollLeft}
          // className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-700 text-white p-2 rounded"
        >
          <i
            className="fa fa-arrow-circle-o-left border-1 rounded-full border-orange-400 bg-orange-400 text-5xl font-bold"
            aria-hidden="true"
          ></i>
        </button>
        <button
          onClick={scrollRight}
          // className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-700 text-white p-2 rounded"
        >
          <i
            className="fa fa-arrow-circle-o-right border-1 rounded-full border-orange-400 bg-orange-400 text-5xl font-bold"
            aria-hidden="true"
          ></i>
        </button>
      </div>
      {/* </div> */}

      {/* </DashBoardLayout> */}
    </>
  );
};

export default Dashboard;
