import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import SignInForm from "./SignInForm";
import { ModalContext } from "../../Context/ModalContext";
import { useContext } from "react";

const SignInModal = (props) => {
  const {isSignupShow , setisSigninShow , isSigninShow } = useContext(ModalContext);
  return (
    <>
      <Modal show={isSigninShow}>
        <Modal.Header>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignInForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {setisSigninShow(false)}}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SignInModal;
