import { useState } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import  RouterList from "./routes/index.jsx";
import { ToastContainer, toast } from "react-toastify";
function App() {

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
      />
      <RouterProvider router={RouterList} />
    </>
  );
}

export default App;
