import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import "../../css/landing.css";

const LandingPage = () => {
  return (
    <Carousel slide={false} variant	= 'dark' interval={3000}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/3962292/pexels-photo-3962292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Welcome to Ecommerce Shop</h3>
          <p>"Discover the World of Online Shopping with Ecommer Shop"</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/3167310/pexels-photo-3167310.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    // <div>
    //   <Container className="p-0">
    //     <Row className="m-0">
    //       <Col md={6} className="p-0 order-2 order-md-1">
    //         <div className="landing-page-text p-5">
    //           <h1>Discover Your Perfect Hostel</h1>
    //           <p>
    //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
    //             nec pharetra urna, vel pulvinar ipsum. Nulla facilisi. Vivamus
    //             semper vitae neque eu mattis. Sed lobortis lectus in ultrices
    //             interdum.
    //           </p>
    //           <button className="btn btn-primary">Learn More</button>
    //         </div>
    //       </Col>
    //       <Col md={6} className="p-0 order-1 order-md-2">
    //         <div className="landing-page-image">
    //           <Image src={"https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"} fluid />
    //         </div>
    //       </Col>
    //     </Row>
    //   </Container>
    // </div>
  );
};

export default LandingPage;
