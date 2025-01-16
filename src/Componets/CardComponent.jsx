import React from "react";
import Keys from "../assets/keys.png";
import Home from '../assets/home.png'
const CardComponent = ({
  title,
  address,
  status,
  roomNo,
  tencent,
  index,
  image,
  data,
  type,
  editAble,
  propertyType,
  handleRoomView,
  handleEditView,
  phoneNumber
}) => {
  

  console.log({data,image});
  

  return (
    
      <>
        <div 
          className={`ml-2 mr-2 flex h-full flex-shrink-0 flex-col rounded-2xl bg-[#E1E3E6] md:w-[23rem]`}
        >
          <div
            style={{
              // backgroundImage: `url(${data?.property_images[0]?.image})`,
              backgroundImage: `url(${data === undefined ? image : data?.property_images[0]?.image
                })`,
            }}
            className={`w-[18rem] rounded-t-lg bg-cover md:w-[23rem]`}
          >
            <div className="relative p-5 text-end">
              <button onClick={() => handleEditView(type,data.id)}
                type="button"
                className="mb-2 me-2 rounded-full bg-green-700 px-5 py-2.5 text-sm font-medium text-black hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                EDIT
              </button>
            </div>
            <div className="relative p-5 text-start">
              <h1 className="truncate text-wrap text-2xl font-bold text-white">
                {title}
              </h1>
              <h1 className="line-clamp-3 break-words text-lg font-bold text-white">
                {address}
              </h1>
            </div>
          </div>
          <div className="flex max-h-full flex-col space-y-4 px-5 py-2">
            <div className="flex flex-row items-center space-x-2">
              <div className="jump-out flex flex-col items-center justify-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-bgScreen p-2`}
                >
                  <img src={Keys} className="w-10 items-center" alt="" />
                </div>
              </div>
              <h1 className=":text-3xl font-bold">
               { type=="tenant"? "Room No:" : propertyType === "Apartment" ? "Flat":"Rooms"} : <span className="font-normal">{roomNo}</span>
              </h1>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <div className="jump-out flex flex-col items-center justify-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-bgScreen p-2`}
                >
                  <img src={Home} className="w-10 items-center" alt="" />
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="sm:2xl md:3xl font-bold">
                 {type==="tenant"? <span className="font-bold"> Phone No:  {phoneNumber}</span>: <span className="font-normal"> Rooms :  3 Room</span>} 
                </h1>
                <div className="overlay flex">
                  {image.length > 0 &&
                    image.map((item) => {
                      <img
                        className="-ml-0 h-9 w-9 rounded-full object-cover"
                        src={item.image}
                        alt="Login Background"
                      />;
                    })}
                  {/* <img
                    className="-ml-0 h-9 w-9 rounded-full object-cover"
                    src="https://s3-alpha-sig.figma.com/img/6d8b/a6db/4598c5c462effc15a38ea901b508e3d1?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UqrNFAxIK~PoE8Lx-w0~~5VG0BSxeU5sZBNM53QMSbYJY1yu6fCPgc9ZUzmB5ZIPSnlOdekLXB2AqCWwJEHdYyP-5CWi7jQR47802SRNBVT2EFNQAp08~QOcrh-kJfks8qLyfHj4sReuASLXO1IRuhpyPLFpqMr-EChJiIUtEQYK4wK6MO4LAoYlC9VxJX2CvchE1YgTLMxzMYII2Cf8QJcX0-mDJv1AbXGSi6RgcKbTOzY7mVMZTE52dN1hwlFePK-v~JR4S9CxeacNreiXdsMSn43JKSrfuHqJ7ppE~h7LiRWFqxteBvl29H5pzA5SDPwsHZHl0PDq9Mf2nJ6XMg__"
                    alt="Login Background"
                  />
                  <img
                    className="-ml-5 h-9 w-9 rounded-full object-cover"
                    src="https://s3-alpha-sig.figma.com/img/6d8b/a6db/4598c5c462effc15a38ea901b508e3d1?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UqrNFAxIK~PoE8Lx-w0~~5VG0BSxeU5sZBNM53QMSbYJY1yu6fCPgc9ZUzmB5ZIPSnlOdekLXB2AqCWwJEHdYyP-5CWi7jQR47802SRNBVT2EFNQAp08~QOcrh-kJfks8qLyfHj4sReuASLXO1IRuhpyPLFpqMr-EChJiIUtEQYK4wK6MO4LAoYlC9VxJX2CvchE1YgTLMxzMYII2Cf8QJcX0-mDJv1AbXGSi6RgcKbTOzY7mVMZTE52dN1hwlFePK-v~JR4S9CxeacNreiXdsMSn43JKSrfuHqJ7ppE~h7LiRWFqxteBvl29H5pzA5SDPwsHZHl0PDq9Mf2nJ6XMg__"
                    alt="Login Background"
                  />
                  <img
                    className="-ml-5 h-9 w-9 rounded-full object-cover"
                    src="https://s3-alpha-sig.figma.com/img/6d8b/a6db/4598c5c462effc15a38ea901b508e3d1?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UqrNFAxIK~PoE8Lx-w0~~5VG0BSxeU5sZBNM53QMSbYJY1yu6fCPgc9ZUzmB5ZIPSnlOdekLXB2AqCWwJEHdYyP-5CWi7jQR47802SRNBVT2EFNQAp08~QOcrh-kJfks8qLyfHj4sReuASLXO1IRuhpyPLFpqMr-EChJiIUtEQYK4wK6MO4LAoYlC9VxJX2CvchE1YgTLMxzMYII2Cf8QJcX0-mDJv1AbXGSi6RgcKbTOzY7mVMZTE52dN1hwlFePK-v~JR4S9CxeacNreiXdsMSn43JKSrfuHqJ7ppE~h7LiRWFqxteBvl29H5pzA5SDPwsHZHl0PDq9Mf2nJ6XMg__"
                    alt="Login Background"
                  /> */}
                </div>
              </div>
            </div>
            <button onClick={() => handleRoomView(data)} className="mb-5 rounded-full bg-[#1A1A1A] py-2 text-white transition hover:bg-[#1A1A1A]">
              <i className="fa fa-hand-pointer-o mr-3"></i> More
            </button>
          </div>
        </div>
      </>
  
  );
};

export default CardComponent;
