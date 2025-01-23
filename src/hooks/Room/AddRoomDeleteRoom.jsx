import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { createRoomNumber, deleteRoomApi, propertyRoomList } from "../../services/propery/TypeService";
import { toast } from "react-toastify";

export const AddRoomDeleteRoomHook = ()=>{
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

  return {
    deleteBox,
    addBoxAvailable,
    addRoomHandleChange,
    handleTenantButton,
    deleteRoomId,
    deleteRoom,
    handleClickAddRoom,
    shouldRender,
    roomNumberList ,
    isLoading ,
    editBoxAvailable,
    boxClose,
    setRoomId,
    setRoomNumber,
    setEditBoxAvailable,
    setShouldRender,
    roomNumber,
    setDeleteBox,
    setAddBoxAvailable,
    navigate


  }
}