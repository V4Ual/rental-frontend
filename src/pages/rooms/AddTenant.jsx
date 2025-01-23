import React, { useState } from "react";
import { createTenantApi } from "../../services/propery/tenantService";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { AddTenantHook } from "../../hooks/Tenant/AddTenant";

const AddTenant = () => {
  const { addTenant ,addTenantData,handleImageRemove,handleInputField,navigation } = AddTenantHook()


  return (
    <div className="fixed max-h-full w-full overflow-scroll rounded-lg bg-[#e5e7eb] shadow">
      <div className="z-10 mb-[100px] max-h-full items-center justify-between overflow-auto rounded-t border-b p-4 md:p-5">
        <h3 className="w-full text-center text-xl font-semibold text-gray-900 sm:text-lg md:text-2xl">
          Add Tenant
        </h3>
        <div className="bottom-[10rem] col-span-2 max-w-full space-y-4 overflow-auto p-4 md:p-5">
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
            <div className="col-span-2 md:col-span-1">
              <h1 className="mb-2 text-sm font-bold text-black md:text-xl">
                Name
              </h1>
              <input
                className="w-full px-5  rounded-full border-2 border-black p-2 md:p-4"
                type="text"
                name="tenantName"
                onChange={(e) => handleInputField(e)}
                placeholder="Tenant Name"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <h1 className="mb-2 text-sm font-bold text-black md:text-xl">
                Phone Number
              </h1>

              <input
                className="w-full px-5 rounded-full border-2 border-black p-2 md:p-4"
                type="text"
                name="phoneNumber"
                onChange={(e) => handleInputField(e)}
                placeholder="Phone Number"
              />
            </div>
            <div className="col-span-2 text-sm md:text-xl">
              <label className="mb-2 block text-sm font-semibold text-black md:text-xl">
                Upload files
              </label>
              <input
                type="file"
                onChangeCapture={(e) => handleInputField(e)}
                name="profilePic"
                className="w-full cursor-pointer rounded border bg-white text-sm font-semibold text-gray-400 file:mr-4 file:cursor-pointer file:border-0 file:bg-gray-100 file:px-4 file:py-2.5 file:text-gray-600 file:hover:bg-gray-200"
              />
            </div>
            <div className="col-span-2">
              {addTenant?.profile && (
                <div className="flex items-center justify-between rounded-xl bg-slate-500 p-2 text-center">
                  <div className="flex flex-row gap-2">
                    <div className="h-[50px] w-[80px]">
                      <img
                        src={URL.createObjectURL(addTenant.profile)}
                        alt="Uploaded Profile"
                        className="h-full w-full rounded object-cover"
                      />
                    </div>
                    <div className="w-full text-center">
                      <h1 className="w-[10rem] break-words">
                        {addTenant?.profile?.name || "Image Name"}
                      </h1>
                    </div>
                  </div>
                  <div className="text-center">
                    <i
                      className="fa fa-times-circle-o cursor-pointer text-2xl text-black"
                      aria-hidden="true"
                      onClick={() => handleImageRemove(1, true)}
                    ></i>
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-2">
              <label className="mb-2 block text-sm font-semibold text-black md:text-xl">
                Document Upload
              </label>
              <input
                type="file"
                name="document"
                multiple
                size={2}
                onChangeCapture={(e) => handleInputField(e)}
                className="w-full cursor-pointer rounded border bg-white text-sm font-semibold text-gray-400 file:mr-4 file:cursor-pointer file:border-0 file:bg-gray-100 file:px-4 file:py-2.5 file:text-gray-600 file:hover:bg-gray-200"
              />
            </div>
            <div className="col-span-2">
              <h1 className="mb-2 block text-sm font-medium text-gray-900">
                Image Preview
              </h1>

              <div className="relative h-[10rem] w-full rounded-xl border-2 border-black">
                {addTenant?.image?.map((src, index) => (
                  <div
                    key={index}
                    className="m-2 inline-block h-[100px] w-[100px] rounded-lg border-2 border-cyan-500 p-2"
                  >
                    <img
                      loading="lazy"
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
            <div className="text-center">
              <button
                onClick={() => addTenantData()}
                className="rounded-full bg-gray-600 p-2 px-5"
              >
                <span className="text-white">Save</span>
              </button>
            </div>
            <div className="text-center">
              <button onClick={()=> navigation(-1)} className="rounded-full bg-gray-600 p-2 px-5">
                <span className="text-white">Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTenant;
