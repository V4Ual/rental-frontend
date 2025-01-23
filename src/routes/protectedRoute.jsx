import { Route, Router, Navigate, useLocation } from "react-router-dom";
import SignupPage from "../pages/signup/SignupPage";
import { getLocalStorage } from "../utils/localData.util";


const ProtectedRoutes = ({ children, auth }) => {
  const location =   useLocation()
  if(location.pathname == "/"){
    return <Navigate to="/singup" replace={true} />;
  }
  
  const token  =  getLocalStorage('token') === 'undefined' ||  getLocalStorage('token') === null ?  false :  true || false
  
  if (auth && !token) {
    
    return <Navigate to="/singup" replace={true} />;
  }
  if (!auth && token) {
    
    return <Navigate to="/owner/dashboard" relative={true} />;
  }

  return children;
};

export default ProtectedRoutes
