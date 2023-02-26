import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import axios from "../../../api/axios";
import { Authcontext } from "../../../Context/AuthContext";
import { AlertContext } from "../../../Context/AlertContext";
import { useContext } from "react";
const LoginUrl = "/users/";

const DeleteAlert = (email) => {
  const {setisForcerender } = useContext(Authcontext);
  const {isDeleteAlert , setisDeleteAlert} = useContext(AlertContext);
  console.log({email});
 
  // Implement delete user informarion functionlity
  const HandleDelete = async () => {
    try {
      const response = await axios.delete(LoginUrl + email, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("Token"))}`,
        },
      });
      console.log(response);
      // forcefully re- render the component
      setisForcerender((prev) => prev + 1);
      setisDeleteAlert(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Alert show={isDeleteAlert} variant="danger">
        <Alert.Heading>Are You Sure!</Alert.Heading>
        <p>You Delete The User From Your website ! ⚠️</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={HandleDelete} variant="outline-success">
            Yes ! i Want To Delete
          </Button>
          <Button onClick={() => setisDeleteAlert(false)} variant="outline-success">
             No
          </Button>
        </div>
      </Alert>
    </>
  );
};

export default DeleteAlert;
