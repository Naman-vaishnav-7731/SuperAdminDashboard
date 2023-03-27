import { Modal, Button } from "react-bootstrap";
import EditRole from "./EditRoles";


const RoleModal = ({isModalShow , HandleModal , isCurrentid}) => {
  return (
    <Modal show={isModalShow}>
      <Modal.Header>
        <Modal.Title>Roles 🧑‍💻</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <EditRole isCurrentid={isCurrentid}/>
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

export default RoleModal;
