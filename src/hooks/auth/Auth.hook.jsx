import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  changePassword,
  loginApi,
  otpTimeCheck,
  sentOtpApi,
  verifyOTP,
} from "../../services/auth/auth.service";
import { toast } from "react-toastify";
import moment from "moment";
import {
  confirmPasswordValidation,
  emailValidation,
  loginAuth,
  otpValidation,
} from "../../validation/auth/SignupValidation";
import { setLocalStorage } from "../../utils/localData.util";
import { validationSubmit, Validator } from "../../utils/Validator";

export const AuthHook = () => {
  const [signData, setSignData] = useState({
    email: "",
    password: "",
  });
  const [passwordShow, setPasswordShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const navigation = useNavigate();

  const handleChangeInput = async (e) => {
    const { value, name } = e.target;
    const data = { ...signData, [name]: value };
    await Validator(loginAuth, { [name]: value }, setErrorMessage, name);
    setSignData(data);
  };

  const getTime = async () => {
    const time = await otpTimeCheck(data.email);
    setSeconds(moment(time.data.time).diff(moment(), "second"));
  };

  const handleSignUp = async () => {
    const validationObject = await validationSubmit(loginAuth, signData);
    setErrorMessage(validationObject);
    if (Object.keys(validationObject).length === 0) {
      const response = await sentOtpApi(signData);
      if (response.success) {
        navigation("/email", {
          state: signData,
        });
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    }
  };

  return {
    passwordShow,
    setPasswordShow,
    handleChangeInput,
    handleSignUp,
    errorMessage,
    signData,
    navigation,
  };
};

// ======================================================= email verrify ============================================================

export const emailVerify = () => {
  const [refresh, setRefreshKey] = useState(0);
  const location = useLocation();

  const data = location.state;

  const navigation = useNavigate();
  const [verify, setVerify] = useState({
    email: "",
    otp: "",
    resentOtp: false,
  });
  const [seconds, setSeconds] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const handleOtpChanges = async (value) => {
    const verifyData = {
      email: data.email,
      otp: value,
    };

    setVerify(verifyData);
  };

  const getTime = async () => {
    const time = await otpTimeCheck(data.email);
    setSeconds(moment(time.data.time).diff(moment(), "second"));
  };

  useEffect(() => {
    getTime();
  }, [refresh]);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : "00")); // Decrement seconds
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const handleOtpSend = async (resend) => {
    if (resend) {
      const resendOtpData = { resentOtp: true, email: data.email };
      const isResend = await sentOtpApi(resendOtpData);
      if (isResend.success) {
        setSeconds(moment(isResend.data.time).diff(moment(), "second"));
        setRefreshKey((pre) => pre + 1);
        return toast.success(isResend.message);
      } else {
        return toast.error(isResend.message);
      }
    } else {
      const validationObject = await validationSubmit(otpValidation, {
        otp: verify.otp,
      });
      setErrorMessage(validationObject);
      
      if (Object.keys(validationObject).length === 0) {
        const isVerify = await verifyOTP(verify);
        
        setLocalStorage("token", isVerify.data.token);

        if (isVerify.success) {
          navigation("/owner/dashboard");
          toast.success(isVerify.message);
        } else {
          toast.error(isVerify.message);
        }
      }
    }
  };

  return {
    errorMessage,
    handleOtpSend,
    handleOtpChanges,
    seconds,
    data,
    setSeconds,
    refresh,
  };
};

// ======================================================= email verrify ============================================================

export const sendForgetPasswordHook = () => {
  const [forgetData, setForgetData] = useState({
    email:"",
    captcha:"",
    forgetPassword:true
  });
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading,setIsLoading] = useState(false)

  const handleChangeInput = async(e) => {
    const { value, name } = e.target;
    const onChange = { ...forgetData, [name]: value };
    await Validator(emailValidation, { [name]: value }, setErrorMessage, name);
    setForgetData(onChange);
  };

  const handleSubmit = async(captchaText) => {
    
    const validationObject = await validationSubmit(emailValidation, forgetData);
    setErrorMessage(validationObject);    
    if(captchaText !== forgetData.captcha){
      return toast.warn('Captcha not match')
    }
    
    if (Object.keys(validationObject).length === 0) {
      setIsLoading(true)
      const response = await sentOtpApi(forgetData);
      
      if (response.success) {
        // navigation("/", {
        //   state: signData,
        // });
        setIsLoading(false)
        toast.success("Check email for reset password");
      } else {
        setIsLoading(false)
        toast.error(response.message);
      }
    }
  };

  return {
    handleChangeInput,
    setForgetData,
    forgetData,
    errorMessage,
    handleSubmit,
    isLoading
  };
};

// =========================================== login ==============================================

export const loginHook = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigation = useNavigate();

  const [passwordShow, setPasswordShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleOnChangesInputLogin = async (e) => {
    const { value, name } = e.target;
    await Validator(loginAuth, { [name]: value }, setErrorMessage, name);
    setLoginData((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmitLogin = async () => {
    const validationObject = await validationSubmit(loginAuth, loginData);
    setErrorMessage(validationObject);
    if (Object.keys(validationObject).length === 0) {

      const isLogin = await loginApi(loginData)
      if(isLogin.success){
        
        setLocalStorage("token", isLogin.data.token);
        toast.success(isLogin.message)
        navigation("/owner/dashboard");
      }else{
        toast.error(isLogin.message)

      }
      
    }
  };

  return {
    setLoginData,
    errorMessage,
    handleSubmitLogin,
    handleOnChangesInputLogin,
    loginData,
    passwordShow,
    setPasswordShow,
    navigation
  };
};


// ===================================================== changepassword ===============================================


export const changePasswordHook = () =>{
  const navigation = useNavigate();
  const [passwordData,setChangePassword] = useState({
    password:"",
    confirmPassword:"",
    both:''
  })

  const [errorMessage, setErrorMessage] = useState();

  const handleChangeInput = async(e) =>{
    const {value, name} = e.target

    const data = {...passwordData,[name]:value}
    
    if(data.confirmPassword !== data.password){
      setErrorMessage((pre)=>({...pre,both:'both password not match'}))
    }else{
      setErrorMessage((pre)=>({...pre,both:''}))
      
    }
    
    setChangePassword((previous)=>({...previous,[name]:value}))

    await Validator(confirmPasswordValidation,{[name]:value},setErrorMessage,name)

  }

  const handleSubmit = async(token) =>{
      
    
    delete passwordData.both
    
    const validationObject = await validationSubmit(confirmPasswordValidation,passwordData)
    setErrorMessage(validationObject);

    if (Object.keys(validationObject).length === 0) {
      
      const isLogin = await changePassword(passwordData,token)
      if(isLogin.success){

        navigation("/singin");
        toast.success(isLogin.message)
      }else{
        toast.error(isLogin.message)

      }
      
    }
  }

  return {
    setChangePassword,
    passwordData,
    errorMessage,
    handleChangeInput,
    handleSubmit
  }
}
