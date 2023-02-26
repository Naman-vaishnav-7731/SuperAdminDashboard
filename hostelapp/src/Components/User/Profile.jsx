import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Form,
  Button,
} from "react-bootstrap";
import { useFormik } from "formik";
import { Authcontext } from "../../Context/AuthContext";
import UserProfileCard from "./UserProfileCard";
import axios from "../../api/axios";
import { useContext } from "react";
import { UserSchema } from "../../Validations/UserValidation";

const URL = "/users/";

const Profile = () => {
  const [isDislabled, setisDislabled] = useState(true);
  const currentUserEmail = JSON.parse(localStorage.getItem("userData")).email;
  const [isuserData, setisUserData] = useState([]);
  const {setisForcerender , isForcerender } = useContext(Authcontext);
  const user = {
    name: isuserData?.fname + " " +  isuserData?.lname,
    username: isuserData?.fname,
    bio: `Hello ! I m ${isuserData?.fname + " " +  isuserData?.lname} 🧑‍💻. I m Also User StudyHub`,
    imageSrc: "https://picsum.photos/200",
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(URL + currentUserEmail, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("Token"))}`,
        },
      });
      setisUserData(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isForcerender]);

  // initial fome value
  const intialValues = {
    fname: isuserData?.fname,
    lname: isuserData?.lname,
    phone: isuserData?.phone,
    email: isuserData?.email,
    address: isuserData?.address,
    pincode: isuserData?.pincode,
  };

  // implements formik for form validation
  const {
    handleBlur,
    handleChange,
    errors,
    touched,
    handleSubmit,
    values,
    resetForm,
  } = useFormik({
    initialValues: intialValues,
    enableReinitialize: true,
    validationSchema: UserSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.put(URL + currentUserEmail, values , {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("Token"))}`,
          }
        });
        setisForcerender(prev => prev + 1);
        setisDislabled(true);
        
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          type="text"
                          disabled={isDislabled}
                          value={values.fname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="fname"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          name="lname"
                          value={values.lname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text"
                          disabled={isDislabled}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isDislabled}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Phone Number</label>
                        <Form.Control
                          name="phone"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="City"
                          type="text"
                          disabled={isDislabled}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Postal Code</label>
                        <Form.Control
                          name="pincode"
                          value={values.pincode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="number"
                          disabled={isDislabled}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Address</label>
                        <Form.Control
                          name="address"
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          as="textarea"
                          disabled={isDislabled}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  {isDislabled ? (
                    <Button
                      className="btn-fill pull-right"
                      type="button"
                      variant="info"
                      onClick={() => setisDislabled(false)}
                    >
                      Update Profile
                    </Button>
                  ) : (
                    <>
                      <Button
                        className="btn-fill pull-right "
                        type="submit"
                        variant="success"
                      >
                        Save Changes
                      </Button>
                      <Button
                        className="btn-fill pull-right ml-3"
                        type="button"
                        variant="danger"
                        onClick={() => {
                          setisDislabled(true);
                        }}
                      >
                        Discard Changes
                      </Button>
                    </>
                  )}

                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <UserProfileCard {...user} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
