import React, { useEffect, useRef, useState } from "react";
import { RoomComponents } from "../../Componets/RoomComponents";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createRoomNumber,
  deleteRoomApi,
  editRoomApi,
  propertyRoomList,
} from "../../services/propery/TypeService";
import { toast } from "react-toastify";
import { EditDelateBox } from "../../Componets/EditDeleteComponent";
import { DeleteBoxComponent } from "../../Componets/DeleteboxComponent";
import { AddTenantComponent } from "../../Componets/AddTenantComponents";

const RoomPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const propertyId = location?.state?.id;
  const [boxClose, setBoxClose] = useState(true);
  const [roomNumber, setRoomNumber] = useState("");
  const [roomNumberList, setRoomNumberList] = useState();
  const [deleteBox, setDeleteBox] = useState(false);
  const [deleteRoomIds, setDeleteRoomIds] = useState();
  const [editBoxAvailable, setEditBoxAvailable] = useState(false);
  const [addBoxAvailable, setAddBoxAvailable] = useState(false);
  const [roomId, setRoomId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender,setShouldRender] = useState(false)
  const roomNumberRef = useRef(0);

  const fetchRoomList = async () => {
    const roomNumberList = await propertyRoomList(propertyId);
    if (roomNumberList.success) {
      // toast.success(roomNumberList.message);
      setIsLoading(false);
      setRoomNumberList(roomNumberList.data);
    } else {
      toast.error(roomNumberList.message);
    }
  };

  const handleClickAddRoom = async (type) => {
    console.log({ type });

    if (type === "add") {
      const createRoom = await createRoomNumber({
        data: { propertyId: propertyId, roomNo: roomNumber },
      });

      if (createRoom.success) {
        toast.success(createRoom.message);
        setRoomNumber("");
        setBoxClose(true);
        setAddBoxAvailable((pre) => !pre);
        roomNumberRef.current = roomNumberRef.current + 1;
      } else {
        toast.error(createRoom.message);
      }
    } else if (type === "edit") {
      const prepare = {
        roomId: roomId.id,
        roomNo: roomNumber,
      };
      console.log({ prepare });

      const editRoom = await editRoomApi(prepare);

      if (editRoom.success) {
        toast.success(editRoom.message);
        setRoomNumber("");
        setBoxClose(false);
        setEditBoxAvailable((pre) => !pre);
        roomNumberRef.current = roomNumberRef.current + 1;
      }
    }
  };

  const deleteRoom = async () => {
    const deleteRoom = await deleteRoomApi(deleteRoomIds.id);
    if (deleteRoom.success) {
      toast.success(deleteRoom.message);
      setDeleteBox((pre) => !pre);
      roomNumberRef.current = roomNumberRef.current + 1;
    } else {
      toast.error(deleteRoom.message);
    }
  };

  const deleteRoomId = (roomId) => {
    if (roomId.occupancyStatus === "Occupied") {
      toast.error("All ready Occupied");
    } else {
      console.log({ roomId });
      setDeleteBox((pre) => !pre);
      setDeleteRoomIds(roomId);
    }
  };

  const addRoomHandleChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    if (name === "addRoomNo") {
      setRoomNumber(value);
    } else {
      // setRoomId((pre)=>({...pre,room_no:value}))
      setRoomNumber(value);
    }
  };

  const handleTenantButton = (item) => {
    console.log("click add tenant");

    if (item.occupancyStatus === "Occupied") {
      toast.error("All ready Occupied");
    } else {
      navigate("/owner/property/room/tenant", { state: item });
    }
  };

  useEffect(() => {
    fetchRoomList();
  }, [roomNumberRef.current]);

  return (
    <>
      <div className="relative">
        <div className="flex justify-between px-5 py-5 text-3xl">
          <button
            onClick={() => navigate("/owner/property")}
            className="text-xl font-bold md:text-2xl"
          >
            <i
              class="fa fa-arrow-left text-xl md:text-2xl"
              aria-hidden="true"
            ></i>{" "}
            Previous
          </button>
          <button className="font-bold">
            <i
              onClick={() => {
                setRoomNumber("");
                setAddBoxAvailable((pre) => !pre);
              }}
              class="fa fa-plus-circle text-4xl"
              aria-hidden="true"
            ></i>{" "}
          </button>
        </div>

        {addBoxAvailable && (
          <EditDelateBox
            isVisible={addBoxAvailable}
            name={"addRoomNo"}
            title={"Add Room"}
            inputValue={roomNumber}
            inputData={(e) => addRoomHandleChange(e)}
            saveButton={() => handleClickAddRoom("add")}
            cancelButton={() => setAddBoxAvailable((pre) => !pre)}
          />
        )}

        {shouldRender && (
          <EditDelateBox
            isVisible={editBoxAvailable}
            name={"editRoomNo"}
            title={"Edit room"}
            inputValue={roomNumber}
            inputData={(e) => addRoomHandleChange(e)}
            saveButton={() => handleClickAddRoom("edit")}
            cancelButton={() =>{
              setEditBoxAvailable(false);
              setTimeout(() => {
                setShouldRender(false);
              }, 500);
            }}
          />
        )}

        {deleteBox && (
          <DeleteBoxComponent
            isViable={deleteBox}
            deleteButton={() => deleteRoom()}
            cancelButton={() => setDeleteBox((pre) => !pre)}
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-1 px-[0.5rem] pb-[6rem] md:grid-cols-4 md:gap-4 lg:grid-cols-4">
        {roomNumberList &&
          roomNumberList.map((item, index) => (
            <RoomComponents
              key={index}
              data={item}
              addTenant={() => handleTenantButton(item)}
              deleteBox={() => setDeleteBox((pre) => !pre)}
              deleteRoom={() => deleteRoomId(item)}
              editBox={() => {
                                
                setRoomId(item);
                setRoomNumber(item.room_no);
                setEditBoxAvailable(true);  
                setShouldRender(true)
              }}
            />
          ))}
      </div>
      {isLoading && (
        <div className="flex items-center justify-center">
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
      )}
    </>
  );
};

export default RoomPage;
