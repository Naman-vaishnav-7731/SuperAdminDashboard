import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import Signupschema from "../../Validations/SignUpvalidation";
import axios from "axios";
import { AlertContext } from "../../Context/AlertContext";
import { useContext, useState } from "react";
import DangerAlert from "../Alerts/DangerAlert";

const SignUpForm = () => {
  const { isSignupAlert, setisSignupAlert } = useContext(AlertContext);
  const [isError, setisError] = useState([]);
  const [isAlertColor, setisAlertColor] = useState("");
  // initial fome value
  const intialValues = {
    fname: "",
    lname: "",
    phone: "",
    email: "",
    address: "",
    pincode: "",
    password: "",
    profileImage: "",
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
    validationSchema: Signupschema,
    onSubmit: async (values, action) => {
      console.log("handle submit");
      try {
        const { data } = await axios.post(
          "http://localhost:3001/users/register",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(values);

        action.resetForm();
        setisAlertColor("success");
        setisError(["Sucessfully Created Your Account 🎉🎉"]);
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          let arr = [];
          Object.keys(error.response.data).forEach((ky) => {
            arr.push(error.response.data[ky]);
          });
          setisAlertColor("danger");
          setisError(arr);
          setisSignupAlert(true);
        } else {
          setisSignupAlert(false);
        }
      }
    },
  });

  return (
    <div className="container">
      <DangerAlert color={isAlertColor} message={isError} />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            name="fname"
            value={values.fname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.fname && errors.fname ? (
            <Form.Text className="text-danger">{errors.fname}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            name="lname"
            value={values.lname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.lname && errors.lname ? (
            <Form.Text className="text-danger">{errors.lname}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email ? (
            <Form.Text className="text-danger">{errors.fname}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password ? (
            <Form.Text className="text-danger">{errors.password}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group controlId="formBasicPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.phone && errors.phone ? (
            <Form.Text className="text-danger">{errors.phone}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group controlId="formBasicAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            name="address"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.address && errors.address ? (
            <Form.Text className="text-danger">{errors.address}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group controlId="formBasicPincode">
          <Form.Label>Pincode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter pincode"
            name="pincode"
            value={values.pincode}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.pincode && errors.pincode ? (
            <Form.Text className="text-danger">{errors.pincode}</Form.Text>
          ) : null}
        </Form.Group>
        <br />
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Your Profile Pic👤</Form.Label>
          <Form.Control
            type="file"
            name="profileImage"
            value={values.profileImage}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Upload Your Profile"
          />
        </Form.Group>
        <br />

        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignUpForm;
