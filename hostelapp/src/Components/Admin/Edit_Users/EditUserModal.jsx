import { Modal, Button } from "react-bootstrap";
import { useContext } from "react";
import { ModalContext } from "../../../Context/ModalContext";
import EditForm from "./EditUserForm";

const EditUserModal = () => {
    const {isEditShow , setisEditShow} = useContext(ModalContext);
  return (
    <Modal show={isEditShow}>
      <Modal.Header>
        <Modal.Title>User Profile🧑‍💻</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <EditForm/>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setisEditShow(false);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
