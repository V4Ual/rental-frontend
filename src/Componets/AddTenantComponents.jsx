import { useEffect, useState } from "react";

export const AddTenantComponent = () => {
  const [addTenant, setAddTenant] = useState({});

  const handleInputField = (e) => {
    const { files, value, name } = e.target;
    if (name === "profilePic") {
      setAddTenant((pre) => ({ ...pre, profile: files }));
    } else if (name === "document") {
      console.log({addTenant});
      
      // if (e.target.files.length > 2 || addTenant?.image?.length >= 2) {
      //   alert("You can only upload up to 2 files.");
      //   e.target.value = ""; // Clear the input
      // } else {
      // }
      const document = Array.from(files);
      setAddTenant((pre) => {
        const updateImage = [...(pre?.image || []), ...document];
        return { ...pre, image: [...updateImage] };
      });
     
    } else {
      setAddTenant((pre) => ({ ...pre, [name]: value }));
    }
  };

  const handleImageRemove = (index) => {
    const filter = addTenant?.image?.filter((_, item) => item != index);
    setAddTenant((pre) => ({ ...pre, image: filter }));
  };

  return (
    // <div className=" flex w-full items-center bg-red-400 max-w-full max-h-full overflow-auto justify-center bg-gray-500">
    //   <div
    //     className={`px-25 fixed top-10 z-10 m-2 flex max-h-full w-[400px] flex-col items-center justify-center  rounded-3xl bg-blue-600 p-3 pt-5 md:h-[200px] md:w-[400px]`}
    //   >
    //     {/* <div className="flex flex-row items-center justify-center gap-3"> */}
    //     <div className="mx-auto grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
    //       <span className="col-span-2 divide-x text-center text-xl">
    //         Add Tenant
    //       </span>

    //       {/* <div className="bg-blue-100  text-center col-span-2">
    //         Add Tenant
    //       </div> */}
    //       <div className="">
    //         <span className="text-sm font-bold text-black">Tenant Name</span>
    //         <input
    //           className="w-full rounded-xl border-2 border-black p-2"
    //           type="text"
    //           name="tenantName"
    //           onChange={(e) => handleInputField(e)}
    //           placeholder="Tenant Name"
    //         />
    //       </div>
    //       <div className="">
    //         <span>Tenant Phone Number</span>
    //         <input
    //           className="w-full rounded-xl border-2 border-black p-2"
    //           type="text"
    //           name="phoneNumber"
    //           onChange={(e) => handleInputField(e)}
    //           placeholder="Tenant Name"
    //         />
    //       </div>
    //       <div className="col-span-2">
    //         <label className="mb-2 block text-base font-semibold text-gray-600">
    //           Upload files
    //         </label>
    //         <input
    //           type="file"
    //           onChangeCapture={(e) => handleInputField(e)}
    //           name="profilePic"
    //           className="w-full cursor-pointer rounded border bg-white text-sm font-semibold text-gray-400 file:mr-4 file:cursor-pointer file:border-0 file:bg-gray-100 file:px-4 file:py-2.5 file:text-gray-600 file:hover:bg-gray-200"
    //         />
    //       </div>
    //       <div className="col-span-2">
    //         <label className="mb-2 block text-base font-semibold text-gray-600">
    //           Document Upload
    //         </label>
    //         <input
    //           type="file"
    //           name="document"
    //           multiple
    //           onChangeCapture={(e) => handleInputField(e)}
    //           className="w-full cursor-pointer rounded border bg-white text-sm font-semibold text-gray-400 file:mr-4 file:cursor-pointer file:border-0 file:bg-gray-100 file:px-4 file:py-2.5 file:text-gray-600 file:hover:bg-gray-200"
    //         />
    //       </div>
    //       <div className="col-span-2">
    //         <h1 className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
    //           Image Preview
    //         </h1>

    //         <div className="relative">
    //           {addTenant?.image?.map((src, index) => (
    //             <div
    //               key={index}
    //               className="m-2 inline-block h-[100px] w-[100px] rounded-lg border-2 border-cyan-500 p-2"
    //             >
    //               <img
    //                 src={URL.createObjectURL(src)}
    //                 alt={`Preview ${index}`}
    //                 className="left-0 top-0 h-full w-full object-cover"
    //               />
    //               <button
    //                 type="button"
    //                 className="relative left-[80px] top-[-101px] text-end"
    //                 onClick={() => handleImageRemove(index)}
    //               >
    //                 <i
    //                   className="fa fa-times-circle text-lg text-red-500"
    //                   aria-hidden="true"
    //                 ></i>
    //               </button>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //       <div className="text-center">
    //         <button className="bg-red-600 p-2">Save</button>
    //       </div>
    //       <div className="text-center">
    //         <button className="bg-red-600 p-2">Cancel</button>
    //       </div>
    //       {/* </div> */}
    //     </div>
    //   </div>
    // </div>

    // <div className="absolute inset-0 z-10 flex overflow-auto items-center justify-center p-4">
    <div >
      {/* <div className="fixed w-full max-w-2xl rounded-lg bg-slate-400 shadow"> */}
        <div className="z-10 fixed mr-4 ml-4 max-h-full overflow-auto bg-gray-700 items-center justify-between rounded-t border-b p-4 md:p-5 bg-gren">
          <h3 className="w-full text-center text-sm font-semibold text-gray-900 sm:text-lg md:text-2xl dark:text-white">
          Add Tenant
          </h3>
          <button
            type="button"
            className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="default-modal"
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
        <div className="space-y-4 p-4 md:p-5">
          <div className="mx-auto grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
            <div className="">
              <span className="text-sm font-bold text-black">Name</span>
              <input
                className="w-full rounded-xl border-2 border-black p-2"
                type="text"
                name="tenantName"
                onChange={(e) => handleInputField(e)}
                placeholder="Tenant Name"
              />
            </div>
            <div className=" md:col-span-1">
              <span>Phone Number</span>
              <input
                className="w-full rounded-xl border-2 border-black p-2"
                type="text"
                name="phoneNumber"
                onChange={(e) => handleInputField(e)}
                placeholder="Tenant Name"
              />
            </div>
            <div className="col-span-2">
              <label className="mb-2 block text-base font-semibold text-gray-600">
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
              <label className="mb-2 block text-base font-semibold text-gray-600">
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
              <h1 className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Image Preview
              </h1>

              <div className="relative">
                {addTenant?.image?.map((src, index) => (
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
            <div className="text-center">
              <button className="bg-red-600 p-2">Save</button>
            </div>
            <div className="text-center">
              <button className="bg-red-600 p-2">Cancel</button>
            </div>
            {/* </div> */}
          </div>
        </div>
        </div>
    
      {/* </div> */}
    </div>
  );
};
