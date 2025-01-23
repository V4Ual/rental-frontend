import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { createTenantApi } from "../../services/propery/tenantService";

export const AddTenantHook = () =>{
    const [addTenant, setAddTenant] = useState();
    const location = useLocation()

  
  const navigation = useNavigate()

  const handleInputField = (e) => {
    const { files, value, name } = e.target;
    if (name === "profilePic") {
      setAddTenant((pre) => ({ ...pre, profile: files[0] }));
    } else if (name === "document") {
      console.log({ addTenant });

      if (e.target.files.length > 2 || addTenant?.image?.length >= 2) {
        alert("You can only upload up to 2 files.");
        e.target.value = ""; // Clear the input
      } else {
        const document = Array.from(files);
        setAddTenant((pre) => {
          const updateImage = [...(pre?.image || []), ...document];
          return { ...pre, image: [...updateImage] };
        });
      }
    } else {
      setAddTenant((pre) => ({ ...pre, [name]: value }));
    }
  };

  console.log({addTenant});
  
  const handleImageRemove = (index, single) => {
    if (single) {
      setAddTenant((pre) => ({ ...pre, profile: "" }));
    } else {
      const filter = addTenant?.image?.filter((_, item) => item != index);
      setAddTenant((pre) => ({ ...pre, image: filter }));
    }
  };

  const addTenantData = async () => {
    let formData = new FormData();

    formData.append("tenantName", addTenant.tenantName);
    formData.append("roomId", location.state.id);
    formData.append("phoneNumber", addTenant.phoneNumber);
    formData.append("profilePic", addTenant.profile);
    formData.append('phoneCode',"+91")

    addTenant?.image.forEach((document, index) => {
      formData.append("document", addTenant?.image[index]);
    });

    const submitData = await createTenantApi(formData);

    if (submitData.success) {
      navigation(-1)
      toast.success(submitData.messages);
    } else {
      toast.error(submitData.messages);
    }

  };

  return {
    addTenant ,
    handleInputField,
    addTenantData,
    handleImageRemove,
    navigation
  }

}