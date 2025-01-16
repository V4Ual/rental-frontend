import { axiosService } from "../axios";


export const createTenantApi = async(data) =>{
      const responseData = await axiosService.post("/landlord/tenant/create",data);
      return responseData;
}

export const listTenantApi = async(data) =>{
      const {currentPage,pageSize} = data
      const responseData = await axiosService.get(`/landlord/tenant/list?currentPage=${currentPage}&pageSize=${pageSize}`);
      return responseData;
}