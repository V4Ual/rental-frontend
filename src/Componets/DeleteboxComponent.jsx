export const DeleteBoxComponent = ({
  isViable,
  deleteButton,
  cancelButton,
}) => {
  return (
    <div
      className={`fixed ${isViable ? "" : "hidden"} top-[10rem] z-10 flex h-[10rem] w-full items-center justify-center space-x-5 md:top-[20rem]`}
    >
      <div
        className={`px-25 absolute z-10 flex h-[200px] w-[300px] flex-col items-center justify-evenly rounded-3xl bg-blue-600 md:h-[200px] md:w-[400px]`}
      >
        <span className="text-xl">Do you delete this room ?</span>
        <div className="flex flex-row items-center justify-center gap-3">
          <button
            onClick={deleteButton}
            className="w-full rounded-full bg-bgScreen px-5 py-2 text-lg"
          >
            Delete
          </button>
          <button
            onClick={cancelButton}
            className="w-full rounded-full bg-bgScreen px-5 py-2 text-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
