import { axiosService } from "../axios";

export const getPropertyType = async () => {
  const responseData = await axiosService.get("/room-type/property-type");
  return responseData;
};

export const getRoomTypeList = async (propertyId) => {
  const responseData = await axiosService.get(`/room-type/list/${propertyId}`);
  return responseData;
};

export const addPropertyApi = async (data) => {
  const responseData = await axiosService.post(
    `landlord/property/create`,
    data,
  );
  return responseData;
};

export const editPropertyApi = async (data) => {
  const responseData = await axiosService.post(
    `landlord/property/edit`,
    data,
  );
  return responseData;
};


export const propertyList = async(data) =>{
  const responseData = await axiosService.get(`landlord/property/list?type=${data}`)
  return responseData
}

export const propertyRoomList = async(propertyId) =>{
  const responseData = await axiosService.get(`landlord/property/room/list?propertyId=${propertyId}`)
  return responseData
}

export const createRoomNumber = async({data}) =>{
  const responseData = await axiosService.post(`landlord/property/room/create`,{...data})
  return responseData
}

export const deleteRoomApi = async(roomId) =>{
  const responseData = await axiosService.delete(`landlord/property/room/${roomId}`)
  return responseData
}


export const editRoomApi = async(data) =>{
  console.log({data});
  
  const responseData = await axiosService.put(`landlord/property/room/edit`,data)
  return responseData
}
