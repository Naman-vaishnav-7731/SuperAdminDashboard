import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { ModalContext } from "../../Context/ModalContext";
import { useContext } from "react";
import SignupModal from "../Signup/SignUpModal";
import SignInModal from "../SignIn/SignInModal";
import { Authcontext } from "../../Context/AuthContext";
import UserDropdown from "../UserDropDown/UserDropDown";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { setisSignupShow, setisSigninShow } = useContext(ModalContext);
  const { Islogged, setIslogged } = useContext(Authcontext);
  console.log("DSDSDS", Islogged);
  const navigate = useNavigate();

  return (
    <><Container style={{height:"9vh"}}></Container>
      <Navbar bg="light" expand="md" fixed="top">
        <Container>
          <Navbar.Brand onClick={() => navigate('/')} style={{cursor:"pointer"}}>Trupti Hostel</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link>
              <Button variant="outline" onClick={() => navigate('/')}>
                    Home
                  </Button>
              </Nav.Link>
              <Nav.Link>
                {!Islogged ? (
                  <Button
                    variant="primary"
                    onClick={() => setisSignupShow(true)}
                  >
                    Sign Up
                  </Button>
                ) : null}
              </Nav.Link>
              <Nav.Link>
                {Islogged ? (
                  <UserDropdown />
                ) : (
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      setisSigninShow(true);
                    }}
                  >
                    Sign In
                  </Button>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <SignupModal />
      <SignInModal />
    </>
  );
};
export default Header;
