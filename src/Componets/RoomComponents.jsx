export const RoomComponents = ({ data, editBox, deleteBox,deleteRoom,addTenant }) => {
  return (
    <div className="h-[300px] text-xl md:text-xl">
      <div className="flex h-full w-full flex-col justify-between rounded-xl bg-red-400 px-2 py-5">
        <div className="mt-2 text-end">
          <button className={`${data.occupancyStatus === 'Occupied' ? "bg-green-300": "bg-red-600"} relative top-0 rounded-full text-sm  bg-gray-800 p-2 text-white`}>
            <span className="text-black font-bold">{data.occupancyStatus}</span> 
          </button>
        </div>
        <div className="w-full text-wrap text-center">
          <h1 className="xl:text-4xl   md:text-4xl font-bold text-black">{data.room_no}</h1>
        </div>
        <div className="flex flex-col">
          <div className="mb-2 flex w-full flex-row items-center justify-between">
            <button onClick={addTenant} className="relative top-0 w-full rounded-full bg-gray-800 p-2 text-sm text-white md:text-2xl">
              
              <i className="fa fa-plus-circle mr-3"></i>Add Tenant
            </button>
          </div>
          <div className="relative flex w-full flex-row items-center justify-center gap-2">
            <button
              onClick={editBox}
              className="relative top-0 w-full rounded-full bg-gray-800 p-2 text-sm text-white md:text-2xl"
            >
              <i className="fa fa-pencil-square mr-3"></i>Edit
            </button>
            <button
              onClick={deleteRoom}
              className="relative top-0 w-full rounded-full bg-gray-800 p-2 text-sm text-white md:text-2xl"
            >
              <i className="fa fa-minus-circle mr-3"></i>Del
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
