import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SignupPage from "./pages/signup/SignupPage";
import { RouterProvider } from "react-router-dom";
import  RouterList from "./routes/index.jsx";
import { ToastContainer, toast } from "react-toastify";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition={Bounce}
      />
      <RouterProvider router={RouterList} />
    </>
  );
}

export default App;
