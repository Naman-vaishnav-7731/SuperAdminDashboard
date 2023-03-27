import { Modal, Button } from "react-bootstrap";

const UserModal = ({isModalShow , HandleModal , isCurrentid}) => {
  return (
    <Modal show={isModalShow}>
      <Modal.Header>
        <Modal.Title>Roles 🧑‍💻</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={HandleModal}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
