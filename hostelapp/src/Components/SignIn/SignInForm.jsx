import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { loginSchema } from "../../Validations/SignInvalidations";
import axios from "../../api/axios";
import DangerAlert from "../Alerts/DangerAlert";
import { AlertContext } from "../../Context/AlertContext";
import { useContext } from "react";
import { useState } from "react";
import { Authcontext } from "../../Context/AuthContext";

import { ModalContext } from "../../Context/ModalContext";
const LoginUrl = "/users/login";

const SignInForm = () => {

  const {setisSignupAlert} = useContext(AlertContext);
  const { setIslogged } = useContext(Authcontext);
  const [isError , setisError] = useState([]);
  const [isAlertColor , setisAlertColor] = useState("");
  const { setisSignupShow, setisSigninShow } = useContext(ModalContext);

  const intialValues = {
    password: "",
    email: "",
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
    validationSchema: loginSchema,
    onSubmit: async (values, action) => {
      try {
          const response = await axios.post(LoginUrl , 
              values,
              {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
              }
            );
            
            // store access token and userdata in localstorage
            const accessToken = response?.data?.Token;
            const userData = {
              fname:response?.data?.fname,
              lname:response?.data?.lname,
              userType:response?.data?.userType,
              email:response?.data?.email
            }
            localStorage.setItem("userData", JSON.stringify(userData));
            localStorage.setItem("Token" , JSON.stringify(accessToken));

            action.resetForm();
            setisAlertColor("success");
            setisError(["Sucessfully Logged 🎉🎉"]);
            setIslogged(true);
            setisSigninShow(false);
           
      } catch (error) {
          console.log(error);
          console.log(error);
          if(error.response.status == 400){
              let arr = [];
              Object.keys(error.response.data).forEach((ky)=>{
                arr.push(error.response.data[ky]);
              })
               setisAlertColor('danger');
               setisError(arr);
               setisSignupAlert(true);
            }
        }
     },
  });
  return (
    <Container className="p-1">
        <DangerAlert color = {isAlertColor} message = {isError}/>
      <Row className="justify-content-center">
     
        <Col md={12} lg={8}>
          <div className="text-center mb-4">
            <h3 className="font-weight-normal">Login to your account</h3>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <div className="input-group">
                <div className="input-group-prepend"></div>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={values.email}
                  onChange={handleChange}
                  name="email"
                  onBlur={handleBlur}
                />
              </div>
              {touched.email && errors.email ? (
                <Form.Text className="text-danger">{errors.email}</Form.Text>
              ) : null}
            </Form.Group>
            <br />

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <div className="input-group">
                <div className="input-group-prepend"></div>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={6}
                />
              </div>
              {touched.password && errors.password ? (
                <Form.Text className="text-danger">{errors.password}</Form.Text>
              ) : null}
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-4">
              Login
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p className="text-muted">
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInForm;
