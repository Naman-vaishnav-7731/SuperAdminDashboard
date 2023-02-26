import { Modal, Button } from 'react-bootstrap';
import SignUpForm from './SignUpForm';
import { ModalContext } from "../../Context/ModalContext";
import { useContext } from "react";

const SignupModal = (props) => {
  const {isSignupShow , setisSignupShow } = useContext(ModalContext);
 return(
    <><Modal show={isSignupShow}>
        <Modal.Header>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <SignUpForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setisSignupShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  </>
 )
}

export default SignupModal;