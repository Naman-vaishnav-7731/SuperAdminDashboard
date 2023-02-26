import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="bg-light py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h5> Stay Connected with Us</h5>
            <p className="text-justify">
              Our hostel is committed to providing a comfortable and enjoyable
              stay for all our guests. To stay up-to-date with our latest news,
              events, and special offers, be sure to follow us on social media.
            </p>
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <h5>Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link href="#">Link 1</Nav.Link>
              <Nav.Link href="#">Link 2</Nav.Link>
              <Nav.Link href="#">Link 3</Nav.Link>
            </Nav>
          </Col>
          <Col md={4}>
            <h5>Connect with Us</h5>
            <Navbar expand="lg" variant="light">
              <Nav className="mr-auto">
                <Nav.Link href="#">
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </Nav.Link>
                <Nav.Link href="#">
                  <FontAwesomeIcon icon={faTwitter} size="2x" />
                </Nav.Link>
                <Nav.Link href="#">
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </Nav.Link>
              </Nav>
            </Navbar>
          </Col>
        </Row>
        <hr />
        <p className="text-center">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
