import React, { useState } from "react";
import { StaticProperty } from "../constant/Property.jsx";
import building from "../assets/building.png";
import { useNavigate } from 'react-router-dom';

export const BottomNavComponent = ({index}) => {
  const [active,setActive] = useState(0)
  const navigate  =  useNavigate()
  const handleNavigation = (index) => {
    
    setActive(index);
    if (index === 0) {
      navigate('/owner/dashboard');
    } else if (index === 1) {
      navigate('/owner/property');
    }
  };
  return (
    <div className="md:hidden  h-15 fixed bottom-0 w-full rounded-t-3xl bg-bgScreen pt-2 z-10">
      <div className="flex items-center justify-evenly">
        {StaticProperty.BottomBar.map((item,index) => {
          
          return (
            <div key={index} onClick={()=> handleNavigation(index)} className="jump-out flex flex-col items-center justify-center">
              <div className={`h-10 flex w-15 items-center justify-center rounded-full  p-2 ${index === active ? 'transition ease-in-out delay-200  bg-white' :''}`}>
                <img src={item.image} className="items-center w-10" alt="" />
              </div>
              <h4 className="font-bold">{item.title}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};
