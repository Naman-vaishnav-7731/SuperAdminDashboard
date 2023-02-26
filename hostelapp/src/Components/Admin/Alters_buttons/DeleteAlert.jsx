import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

const DeleteAlert = ({ isDeleteAlert, handleDeleteAlert , HandleDelete }) => {
  const handleClose = () => handleDeleteAlert(false);
  console.log(isDeleteAlert);

  // handle delete
  const handledelete = () => {
    HandleDelete();
    handleDeleteAlert(false)
}

  return (
    <>
      <Modal show={isDeleteAlert}  size="sm" animation="true" centered="true" className="bg-dark">
        <Modal.Header className="bg-danger">
          <Modal.Title className="text-light"><h5>Hey ! Admin Are Your Sure You Delete The User form our Website ? ?💀</h5></Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
             No
          </Button>
          <Button variant="danger" onClick={handledelete}>
              Yes ! Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteAlert;
