import React, { useEffect, useRef, useState } from "react";
import DashBoardLayout from "../../layouts/DashBoardLayout";
import CardComponent from "../../Componets/CardComponent";
import { Outlet, useNavigate } from "react-router-dom";
import {
  addPropertyApi,
  getPropertyType,
  getRoomTypeList,
} from "../../services/propery/TypeService";
import { toast } from "react-toastify";
import {
  getPropertyTypeHook,
  propertyListHook,
} from "../../hooks/property/TypeHook";

const AddProperty = () => {
  const {
    dialog,
    propertyType,
    roomType,
    addProperty,
    handleSubmit,
    handleChangeInput,
    setAddProperty,
    handleImageRemove,
    roomNo,
    setDialog,
    setRoomNo,
  } = getPropertyTypeHook();

  const scrollContainerRef = useRef(null);
  const apartmentHook = propertyListHook("Apartment");
  const commercialHook = propertyListHook("Commercial (Shops)");
  const pgHook = propertyListHook("PG");
  const bhadaHouseHook = propertyListHook("Bhada House");

  // const { getProperty, setLoading, isLoading } = propertyListHook();
  const navigate = useNavigate();

  const handleEditDetails = async (type, id, whichOne) => {
    console.log({ type, id });
    const { getProperty } = type;

    const propertyDetails = getProperty.find((item) => item.id == id);

    navigate("/owner/property/room/edit", { state: propertyDetails });
  };

  const handleRoomShow = async (item) => {
    navigate("/owner/property/room", {
      state: item,
    });
  };

  console.log({ addProperty });

  return (
    <>
      <div className="absolute top-[9rem]">
        <h1 className="px-2 py-2 text-start text-2xl font-bold text-black md:text-left">
          Apartment list
        </h1>

        <button className="w-full px-5 text-end text-lg font-bold text-red-500 underline">
          View all
        </button>

        <div
          ref={scrollContainerRef}
          className="flex max-h-full w-[calc(100vw-0px)] gap-2 overflow-auto bg-white pt-5 md:w-[calc(100vw-250px)]"
        >
          {apartmentHook.isLoading && (
            <div role="status">
              <span class="sr-only">Loading...</span>
            </div>
          )}
          {apartmentHook.getProperty?.length > 0 ? (
            apartmentHook.getProperty &&
            apartmentHook.getProperty.map((item, index) => {
              return (
                <CardComponent
                  type={apartmentHook}
                  key={index}
                  data={item}
                  index={index}
                  handleEditView={handleEditDetails}
                  handleRoomView={handleRoomShow}
                  title={item.name}
                  address={item.address}
                  roomNo={item.no_of_room}
                  image={item.property_images}
                  propertyType={item.property_type.name}
                />
              );
            })
          ) : apartmentHook.isLoading ? (
            <div
              className={`ml-2 mr-2 flex h-[20rem] w-[95%] flex-shrink-0 flex-col items-center justify-center rounded-2xl bg-[#DCDCDC] md:w-full`}
            >
              <div className={`bg-bg-grey rounded-t-lg bg-cover`}>
                <div className="h-full w-full">
                  <svg
                    aria-hidden="true"
                    class="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              </div>
            </div>
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
        <h1 className="px-2 py-2 text-start text-2xl font-bold text-black md:text-left">
          Commercial (Shops)
        </h1>

        <button className="w-full px-5 text-end text-lg font-bold text-red-500 underline">
          View all
        </button>

        <div
          ref={scrollContainerRef}
          className="flex max-h-full w-[calc(100vw-0px)] gap-2 overflow-auto bg-white pt-5 md:w-[calc(100vw-250px)]"
        >
          {commercialHook.getProperty?.length > 0 ? (
            commercialHook.getProperty &&
            commercialHook.getProperty.map((item, index) => {
              return (
                <CardComponent
                  key={index}
                  title={item.name}
                  address={item.address}
                  roomNo={item.no_of_room}
                  image={item.property_images}
                  propertyType={item.property_type.name}
                />
              );
            })
          ) : (
            <div
              className={`ml-2 mr-2 flex h-[20rem] w-[95%] flex-shrink-0 flex-col items-center justify-center rounded-2xl md:w-full`}
            >
              <div className={`bg-bg-grey rounded-t-lg bg-cover`}>
                <div className="h-full w-full">
                  <h1>Data not found </h1>
                </div>
              </div>
            </div>
          )}
        </div>
        <h1 className="px-2 py-2 text-start text-2xl font-bold text-black md:text-left">
          PG list
        </h1>

        <button className="w-full px-5 text-end text-lg font-bold text-red-500 underline">
          View all
        </button>

        <div
          ref={scrollContainerRef}
          className="flex max-h-full w-[calc(100vw-0px)] gap-2 overflow-auto bg-white pt-5 md:w-[calc(100vw-250px)]"
        >
          {pgHook?.getProperty?.length > 0 ? (
            pgHook?.getProperty &&
            pgHook?.getProperty.map((item, index) => {
              return (
                <CardComponent
                  type={pgHook}
                  key={index}
                  data={item}
                  index={index}
                  handleEditView={handleEditDetails}
                  handleRoomView={handleRoomShow}
                  title={item.name}
                  address={item.address}
                  roomNo={item.no_of_room}
                  image={item.property_images}
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
        <h1 className="px-2 py-2 text-start text-2xl font-bold text-black md:text-left">
          Bhada house
        </h1>

        <button className="w-full px-5 text-end text-lg font-bold text-red-500 underline">
          View all
        </button>

        <div
          ref={scrollContainerRef}
          className="flex max-h-full w-[calc(100vw-0px)] gap-2 overflow-auto bg-white pt-5 md:w-[calc(100vw-250px)]"
        >
          {bhadaHouseHook.getProperty?.length > 0 ? (
            bhadaHouseHook.getProperty &&
            bhadaHouseHook.getProperty.map((item, index) => {
              return (
                <div
                  onClick={() => handleEditDetails(index, item.id, "edit")}
                  className="mb-20"
                >
                  <CardComponent
                    key={index}
                    title={item.name}
                    address={item.address}
                    roomNo={item.no_of_room}
                    image={item.property_images}
                    propertyType={item.property_type.name}
                  />
                </div>
              );
            })
          ) : (
            <div
              className={`ml-2 mr-2 flex h-[20rem] w-[95%] flex-shrink-0 flex-col items-center justify-center rounded-2xl md:w-full`}
            >
              <div className={`bg-bg-grey rounded-t-lg bg-cover`}>
                <div className="h-full w-full">
                  <h1>Data not found </h1>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="py-5">
        <div className="ml-10 mr-5 text-end">
          <button
            data-modal-target="default-modal"
            data-modal-toggle="default-modal"
            className="bg-black-700 rounded-lg text-center text-sm font-medium"
            type="button"
          >
            <i
              onClick={() => {
                setAddProperty({
                  propertyTypeId: "",
                  roomTypeId: "",
                  propertyName: "",
                  address: "",
                  noOfRoom: "",
                  roomNumber: [],
                  image: [],
                });
                setDialog((pre) => !pre);
              }}
              className="fa fa-plus-circle text-4xl md:text-5xl"
              aria-hidden="true"
            ></i>
          </button>
        </div>

        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className={`${dialog ? "" : "hidden"} top-30 left-0 right-0 z-20 flex h-[-webkit-fill-available] items-center justify-center ${
            dialog === true
              ? "animate-once animate-duration-500 z-100 animate-delay-200 animate-ease-in-out animate-jump-in"
              : `animate-once animate-duration-500 z-100 animate-delay-200 animate-ease-in-out hidden animate-jump-out opacity-0`
          } overflow-y-auto overflow-x-hidden md:inset-0`}
        >
          <div className="z-1 fixed bottom-0 max-h-full w-full max-w-2xl overflow-auto p-4">
            <div className="relative top-[4rem] rounded-lg bg-slate-400 shadow">
              <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-600">
                <h3 className="w-full text-center text-sm font-semibold text-gray-900 sm:text-lg md:text-2xl dark:text-white">
                  Add Property
                </h3>
                <button
                  type="button"
                  className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                  onClick={() => setDialog((pre) => !pre)}
                >
                  <svg
                    className="h-3 w-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="space-y-4 p-4 md:p-5">
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="mb-5">
                    <label
                      htmlFor="property"
                      className="mb-2 block text-sm font-medium text-gray-900 md:text-lg dark:text-white"
                    >
                      Select Property Types
                    </label>
                    <select
                      onChange={(e) => handleChangeInput(e)}
                      id="property"
                      name="propertyTypeId"
                      value={addProperty.propertyTypeId}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      {propertyType &&
                        propertyType.map((item, index) => {
                          return (
                            <option id={item.id} key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  {roomType?.length > 0 && (
                    <div className="mb-5">
                      <label
                        htmlFor="property"
                        className="mb-2 block text-sm font-medium text-gray-900 md:text-lg dark:text-white"
                      >
                        Select Room Type
                      </label>
                      <select
                        onChange={(e) => handleChangeInput(e)}
                        id="property"
                        name="roomTypeId"
                        value={addProperty.roomTypeId}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      >
                        {roomType &&
                          roomType.map((item, index) => {
                            return (
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  )}
                  <div className="mb-5">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-900 md:text-lg dark:text-white"
                    >
                      Property Name
                    </label>
                    <input
                      type="propertyName"
                      name="propertyName"
                      onChange={(e) => handleChangeInput(e)}
                      id="propertyName"
                      value={addProperty.propertyName}
                      className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="ex. shreenath"
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-900 md:text-lg dark:text-white"
                    >
                      Address
                    </label>
                    <input
                      type="address"
                      name="address"
                      id="address"
                      value={addProperty.address}
                      className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Address"
                      required
                      onChange={(e) => handleChangeInput(e)}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-900 md:text-lg dark:text-white"
                    >
                      Number of Room
                    </label>
                    <input
                      onChange={(e) => handleChangeInput(e)}
                      type="number"
                      name="noOfRoom"
                      id="noOfRoom"
                      value={addProperty.noOfRoom}
                      className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="no of room"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <h1 className="mb-2 block text-sm font-medium text-gray-900 md:text-lg dark:text-white">
                      Room Number
                    </h1>
                    <div className="flex flex-wrap gap-2">
                      {roomNo &&
                        addProperty.noOfRoom > 0 &&
                        roomNo.map((item, index) => {
                          return (
                            <input
                              key={index}
                              onChange={(e) => handleChangeInput(e, index)}
                              type="number"
                              value={addProperty.roomNumber[index]}
                              name="roomNumber"
                              id="email"
                              className="dark:shadow-sm-light block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                              placeholder={item}
                              required
                            />
                          );
                        })}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-900 md:text-lg dark:text-white"
                    >
                      Property Image
                    </label>
                    <div className="flex w-full items-center justify-center">
                      <label
                        htmlFor="dropzone-file"
                        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 dark:hover:bg-gray-800"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <svg
                            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          multiple
                          id="dropzone-file"
                          type="file"
                          name="image"
                          className="hidden"
                          onChangeCapture={(e) => handleChangeInput(e)}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="image-previews col-span-2">
                    <h1 className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Image Preview
                    </h1>

                    <div className="relative">
                      {addProperty?.image?.map((src, index) => (
                        <div
                          key={index}
                          className="m-2 inline-block h-[100px] w-[100px] rounded-lg border-2 border-cyan-500 p-2"
                        >
                          <img
                            src={URL.createObjectURL(src)}
                            alt={`Preview ${index}`}
                            className="left-0 top-0 h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            className="relative left-[80px] top-[-101px] text-end"
                            onClick={() => handleImageRemove(index)}
                          >
                            <i
                              className="fa fa-times-circle text-lg text-red-500"
                              aria-hidden="true"
                            ></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-[8rem] flex items-center justify-center rounded-b border-t border-gray-200 p-4 md:p-5 dark:border-gray-600">
                <button
                  onClick={() => handleSubmit()}
                  data-modal-hide="default-modal"
                  type="button"
                  className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Save
                </button>
                <button
                  data-modal-hide="default-modal"
                  type="button"
                  onClick={() => setDialog((pre) => !pre)}
                  className="ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProperty;
