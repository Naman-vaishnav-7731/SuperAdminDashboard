import { Modal, Button } from "react-bootstrap";
import EditRule from "./EditRule";

const RuleModal = ({isModalShow , HandleModal , isCurrentid , isRules , handleRender}) => {
  return (
    <Modal show={isModalShow}>
      <Modal.Header>
        <Modal.Title>Rules 🧑‍💻</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <EditRule isCurrentid={isCurrentid}  isRules={isRules} handleRender={handleRender}/>
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

export default RuleModal;
