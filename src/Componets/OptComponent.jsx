import { useRef, useState } from "react";

export const OtpInput = ({ length, onChange }) => {
  const [otpBox, setOtpBox] = useState(Array(length).fill(""));
  const optRef = useRef([])

  const handleChange = (e, index) => {
    const { value } = e.target;
    const otp = [...otpBox];
    otp[index] = value;
  
    if(index < length-1) {
        optRef.current[index+1].focus() 
    }
    
    setOtpBox(otp);
    
    onChange(otp.join(""))
  };

  const handleKeyChange =(e,index) =>{
    if(e.key === 'Backspace' &&  otpBox[index] === ""){        
        if(index > 0) {
            optRef.current[index-1].focus()
        } 
    }
    
  } 

  return otpBox.map(( item, index) => (
    <input
      ref={(el) => (optRef.current[index] = el)}
      type="text"
      key={index}
      value={otpBox[index]}
      onChange={(e) => handleChange(e, index)}
      onKeyDown={(e)=> handleKeyChange(e,index)}
      //   ref={inputs}
      maxLength={1}
      className="w-12 rounded-full border border-gray-300 px-4 py-2 text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  ));
};
