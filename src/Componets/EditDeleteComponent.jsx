export const EditDelateBox = ({isVisible,title,name, inputValue,inputData, saveButton, cancelButton}) => {

  console.log({isVisible});
  

  return (
    <div
      className={`fixed ${isVisible ? "animate-jump-in opacity-100 ": "animate-jump-out opacity-0" } top-[10rem] z-10 flex h-[10rem] w-full items-center justify-center space-x-5 md:top-[20rem]`}
      onAnimationEnd={() => {
        if (!isVisible) cancelButton();
      }}
    >
      <div
        className={`px-25 absolute z-10 flex h-[200px] w-[300px] flex-col items-center justify-evenly rounded-3xl bg-blue-300 md:h-[200px] md:w-[400px]`}
      >
        {/* <span className="text-xl">Do you delete this room 1144 ?</span> */}
        <div className="flex w-full flex-col items-center justify-center gap-3 px-3">
          <span className="text-2xl font-bold">{title}</span>
          <input
            type="number"
            name={name}
            id={name}
            value={inputValue}
            className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="no of room"
            onChange={inputData}
          />

          <div className="flex flex-row gap-3">
            <button
              onClick={saveButton}
              className="w-full rounded-full bg-bgScreen px-5 py-2 text-lg"
            >
              Save
            </button>

            <button
            onClick={cancelButton}
            //   onClick={() => {
            //     setBoxClose((pre) => !pre);
            //     setEditBoxAvailable((pre) => !pre);
            //   }}
              className="w-full rounded-full bg-bgScreen px-5 py-2 text-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
