import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addPropertyApi,
  editPropertyApi,
  getPropertyType,
  getRoomTypeList,
} from "../../services/propery/TypeService";
import { toast } from "react-toastify";
import { EditRoomHook } from "../../hooks/Room/EditRoom";

const EditRoom = () => {

  const {addProperty,navigate,handleChangeInput,handleImageRemove,handleSubmit,propertyType,roomType } = EditRoomHook()

  return (
    <div className="fixed max-h-full w-full overflow-scroll rounded-lg bg-[#e5e7eb] shadow">
      <div className="z-10 mb-[100px] max-h-full items-center justify-between overflow-auto rounded-t border-b p-4 md:p-5">
        <h3 className="w-full text-center text-xl font-semibold text-gray-900 sm:text-lg md:text-2xl">
          Edit Property
        </h3>
        <div className="bottom-[10rem] col-span-2 max-w-full space-y-4 overflow-auto p-4 md:p-5">
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
            <div className="col-span-2 md:col-span-1">
              <h1 className="mb-2 text-sm font-bold text-black md:text-xl">
                Select Property Types
              </h1>

              <select
                onChange={(e) => handleChangeInput(e)}
                id="property"
                name="propertyTypeId"
                value={addProperty?.propertyTypeId}
                className="w-full rounded-full border-2 border-black p-2 px-5 md:p-4"
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
              <div className="col-span-2 md:col-span-1">
                <div className="mb-5">
                  <h1 className="mb-2 text-sm font-bold text-black md:text-xl">
                    Select Room Type
                  </h1>

                  <select
                    onChange={(e) => handleChangeInput(e)}
                    id="property"
                    name="roomTypeId"
                    value={addProperty?.roomTypeId}
                    className="w-full rounded-full border-2 border-black p-2 px-5 md:p-4"
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
              </div>
            )}
            <div className="col-span-2 md:col-span-1">
              <h1 className="mb-2 text-sm font-bold text-black md:text-xl">
                Property Name
              </h1>

              <input
                className="w-full rounded-full border-2 border-black p-2 px-5 md:p-4"
                type="propertyName"
                name="propertyName"
                onChange={(e) => handleChangeInput(e)}
                id="propertyName"
                value={addProperty?.propertyName}
                placeholder="ex. shreenath"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <h1 className="mb-2 text-sm font-bold text-black md:text-xl">
                Address
              </h1>

              <input
                className="w-full rounded-full border-2 border-black p-2 px-5 md:p-4"
                type="address"
                name="address"
                id="address"
                value={addProperty?.address}
                placeholder="Address"
                required
                onChange={(e) => handleChangeInput(e)}
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <h1 className="mb-2 text-sm font-bold text-black md:text-xl">
                Number of Room
              </h1>

              <input
                onChange={(e) => handleChangeInput(e)}
                type="number"
                name="noOfRoom"
                id="noOfRoom"
                className="w-full rounded-full border-2 border-black p-2 px-5 md:p-4"
                value={addProperty?.noOfRoom}
                placeholder="no of room"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="mb-2 block text-sm font-semibold text-black md:text-xl">
                Upload Property Image
              </label>
              <input
                type="file"
                name="image"
                multiple
                size={2}
                onChangeCapture={(e) => handleChangeInput(e)}
                className="w-full cursor-pointer rounded border bg-white text-sm font-semibold text-gray-400 file:mr-4 file:cursor-pointer file:border-0 file:bg-gray-100 file:px-4 file:py-2.5 file:text-gray-600 file:hover:bg-gray-200"
              />
            </div>
            <div className="col-span-2">
              <h1 className="mb-2 block text-sm font-medium text-gray-900">
                Image Preview
              </h1>

              <div className="relative w-full rounded-xl border-2 border-black">
                {addProperty?.image?.map((src, index) => (
                  <div
                    key={index}
                    className="m-2 inline-block h-[100px] w-[100px] rounded-lg border-2 border-cyan-500 p-2"
                  >
                    <img
                      loading="lazy"
                      src={
                        src instanceof File
                          ? URL.createObjectURL(src)
                          : src.image
                      }
                      className="h-full w-full rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      className="relative left-[80px] top-[-101px] text-end"
                      onClick={() => handleImageRemove(index, src)}
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
            <div className="text-center">
              <button
                onClick={() => handleSubmit()}
                className="rounded-full bg-gray-600 p-2 px-5"
              >
                <span className="text-white">Save</span>
              </button>
            </div>
            <div className="text-center">
              <button
                onClick={() => navigate(-1)}
                className="rounded-full bg-gray-600 p-2 px-5"
              >
                <span className="text-white">Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;
