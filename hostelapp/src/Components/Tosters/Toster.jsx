import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toster = ({message , showToastMessage}) => {
 


  return (
    <div>
      <button onClick={showToastMessage}>cilck me </button>
      <ToastContainer />
    </div>
  );
};

export default Toster;
