import { useEffect, useState } from "react";
import {
  addPropertyApi,
  getPropertyType,
  getRoomTypeList,
  propertyList,
} from "../../services/propery/TypeService";
import { toast } from "react-toastify";
import { listTenantApi } from "../../services/propery/tenantService";
import { useNavigate } from "react-router";

export const getPropertyTypeHook = () => {
  const [roomNo, setRoomNo] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [propertyType, setPropertyType] = useState();
  const [roomType, setRoomType] = useState();
  const [addProperty, setAddProperty] = useState({
    propertyTypeId: "",
    roomTypeId: "",
    propertyName: "",
    address: "",
    noOfRoom: "",
    roomNumber: [],
    image: [],
  });

  // image cancel
  const handleImageRemove = (index) => {
    setAddProperty((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));
  };

  const roomCreate = (number, exitingValues) => {
    const array = [];
    array.push(exitingValues);
    array.flat(Infinity);
    let textField = parseInt(number) - parseInt(exitingValues.length);

    if (textField === -1) {
      const roomTest = addProperty.roomNumber;
      roomTest.pop();

      setRoomNo(roomTest);
    }

    while (0 < textField) {
      array.push(" ");
      textField -= 1;
    }

    setRoomNo(array.flat(Infinity));
  };

  const handleChangeInput = (e, index) => {
    const { value, id, name, files } = e.target;
    if (name === "roomNumber") {
      console.log("====================", { [name]: value }, index);
      setAddProperty((previous) => {
        const updatedRoomNumbers = [...(previous.roomNumber || [])]; // Ensure it's an array
        updatedRoomNumbers[index] = value; // Update the specific index
        return { ...previous, roomNumber: updatedRoomNumbers };
      });
    } else if (name === "image") {
      const image = Array.from(files);
      setAddProperty((previous) => ({
        ...previous,
        image: [...previous.image, ...image],
      }));
    } else if (name === "noOfRoom") {
      setTimeout(() => {
        roomCreate(value, addProperty.roomNumber);
      }, 1000);

      setAddProperty((previousState) => ({ ...previousState, [name]: value }));
    } else {
      setAddProperty((previous) => ({ ...previous, [name]: value }));
    }
  };

  const fetchPropertyType = async () => {
    const PT = await getPropertyType();
    if (PT.success) {
      setPropertyType(PT.data);
    }
  };
  useEffect(() => {
    fetchPropertyType();
  }, []);

  const fetchRoomType = async () => {
    if (addProperty.propertyTypeId !== "") {
      const RT = await getRoomTypeList(addProperty?.propertyTypeId);
      //  console.log({ RT });

      if (RT.success) {
        setRoomType(RT.data);
      }
    }
  };
  useEffect(() => {
    fetchRoomType();
  }, [addProperty?.propertyTypeId]);

  const handleSubmit = async () => {
    let formData = new FormData();

    formData.append("name", addProperty.propertyName);
    formData.append("address", addProperty.address);
    formData.append("noOfRoom", addProperty.noOfRoom);
    formData.append("propertyTypeId", addProperty.propertyTypeId);
    formData.append("roomTypeId", addProperty.roomTypeId);
    addProperty.roomNumber.forEach((roomNumber, index) => {
      formData.append(`roomNumber[${index}]`, roomNumber);
    });

    for (let i = 0; i < addProperty?.image?.length; i++) {
      formData.append("propertyImage", addProperty?.image[i]);
    }

    const createProperty = await addPropertyApi(formData);
    if (createProperty.success) {
      toast.success(createProperty.message);
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
    } else {
      toast.error(createProperty.message);
    }
  };
  const navigate = useNavigate();
  const handleEditDetails = async (type, id, whichOne) => {
    const { getProperty } = type;
    const propertyDetails = getProperty.find((item) => item.id == id);
    navigate("/owner/property/room/edit", { state: propertyDetails });
  };
  const handleRoomShow = async (item) => {
    navigate("/owner/property/room", {
      state: item,
    });
  };



  return {
    dialog,
    propertyType,
    roomType,
    addProperty,
    setAddProperty,
    roomNo,
    setDialog,
    handleChangeInput,
    handleSubmit,
    handleImageRemove,
    setRoomNo,
    handleEditDetails,
    handleRoomShow
    
  };
};

export const propertyListHook = (type) => {
  const [getProperty, setProperty] = useState();
  const [isLoading, setLoading] = useState(true);

  const handlePropertyData = async () => {
    const data = await propertyList(type);
    console.log(data.data.rows);

    if (data.success) {
      setLoading(false);
      setProperty(data.data.rows);
    } else {
      setLoading(true);
    }
  };

  useEffect(() => {
    handlePropertyData();
  }, []);

  return {
    getProperty,
    setLoading,
    isLoading,
  };
};

export const tenantListHook = (type) => {
  const [getTenant, setTenant] = useState();
  const [isLoading, setLoading] = useState(true);

  const handlePropertyData = async () => {
    const data = await listTenantApi({pageSize:10,currentPage:1});
    console.log(data.data.rows);

    if (data.success) {
      setLoading(false);
      setTenant(data.data.rows);
    } else {
      setLoading(true);
    }
  };

  useEffect(() => {
    handlePropertyData();

  }, []);

  return {
    getTenant,
    setLoading,
    isLoading,
  };
};
