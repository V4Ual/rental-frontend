import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { editPropertyApi, getPropertyType, getRoomTypeList } from "../../services/propery/TypeService";
import { toast } from "react-toastify";

export const EditRoomHook = () => {
  const location = useLocation();
  const stateData = location.state;
  const navigate = useNavigate();
  const [propertyType, setPropertyType] = useState();
  const [roomType, setRoomType] = useState();
  const [addProperty, setAddProperty] = useState();

  const fetchRoomType = async () => {
    if (addProperty?.propertyTypeId !== "") {
      const RT = await getRoomTypeList(addProperty?.propertyTypeId);
      if (RT.success) {
        setRoomType(RT.data);
      }
    }
  };
  useEffect(() => {
    fetchRoomType();
  }, [addProperty?.propertyTypeId]);

  useEffect(() => {
    setAddProperty({
      propertyId: stateData.id,
      propertyTypeId: stateData.type_fk,
      roomTypeId: stateData.room_type_fk,
      propertyName: stateData.name,
      address: stateData.address,
      noOfRoom: stateData.no_of_room,
      roomNumber: stateData.property_room_no.map((item) => item.room_no),
      image: stateData.property_images,
      delateImage: [],
    });
  }, []);

  //   console.log({ stateData });

  const fetchPropertyType = async () => {
    const PT = await getPropertyType();
    if (PT.success) {
      setPropertyType(PT.data);
    }
  };
  useEffect(() => {
    fetchPropertyType();
  }, []);

  const handleChangeInput = (e, index) => {
    const { value, id, name, files } = e.target;
    if (name === "roomNumber") {
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
      setAddProperty((previousState) => ({ ...previousState, [name]: value }));
    } else {
      setAddProperty((previous) => ({ ...previous, [name]: value }));
    }
  };

  console.log({ addProperty });

  const handleSubmit = async () => {
    let formData = new FormData();

    formData.append("propertyId", addProperty.propertyId);
    formData.append("name", addProperty.propertyName);
    formData.append("address", addProperty.address);
    formData.append("noOfRoom", addProperty.noOfRoom);
    formData.append("propertyTypeId", addProperty.propertyTypeId);
    formData.append("roomTypeId", addProperty.roomTypeId);

    for (let i = 0; i < addProperty?.image?.length; i++) {
      if (addProperty?.image[i] instanceof File) {
        formData.append("propertyImage", addProperty?.image[i]);
      }
    }
    if (addProperty?.delateImage && addProperty.delateImage.length > 0) {
      addProperty.delateImage.forEach((image, index) => {
        formData.append(`delateImage[${index}]`, image);
      });
    }

    for (let [key, value] of formData) {
      console.log(key, value);
    }
    const createProperty = await editPropertyApi(formData);
    if (createProperty.success) {
      toast.success(createProperty.message);
      navigate(-1);
    } else {
      toast.error(createProperty.message);
    }
  };
  const handleImageRemove = (index, src) => {
    console.log(src instanceof File, ":::::::::::");

    if (!(src instanceof File)) {
      setAddProperty((previousState) => ({
        ...(previousState || []),
        delateImage: [...previousState.delateImage, src.id],
      }));
    }
    setAddProperty((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));
  };

  return {
    handleChangeInput,
    handleImageRemove,
    handleSubmit,
    roomType,
    propertyType,
    location,
    addProperty,
    navigate
  };
};
