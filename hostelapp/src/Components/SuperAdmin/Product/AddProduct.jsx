import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";
import { useContext, useState } from "react";
import Swal from "sweetalert2";

const AddProduct = () => {
     // initial fome value
  const intialValues = {
    product_name: "",
    product_dec: "",
    profileImage: null,
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
    setFieldValue,
  } = useFormik({
    initialValues: intialValues,
    onSubmit: async (values, action) => {
      console.log("handle submit");
      console.log(values);

      // using form data append the form data
      const formData = new FormData();
      formData.append("address", values.address);   
      formData.append("email", values.email);
      formData.append("fname", values.fname);
      formData.append("lname", values.lname);
      formData.append("password", values.password);
      formData.append("phone", values.phone);
      formData.append("pincode", values.pincode);
      formData.append("profileImage", values.profileImage);

      try {
        const { data } = await axios.post(
          "http://localhost:3001/users/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
    
        if (data) {
          Swal.fire(`Succesfully Register Customer`, "", "success");
        }
        action.resetForm();
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          let arr = [];
          Object.keys(error.response.data).forEach((ky) => {
            arr.push(error.response.data[ky]);
          });

          Swal.fire(
            `${arr.map((element) => {
              return element + "<br />";
            })}`,
            " ",
            "error"
          );
        }
      }
    },
  });

  return (
    <div className="container border border-muted p-4 rounded">
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>Product Name</Form.Label>
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
          <Form.Label>Product Description</Form.Label>
          <Form.Control
             as="textarea"
            name="lname"
            value={values.lname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.lname && errors.lname ? (
            <Form.Text className="text-danger">{errors.lname}</Form.Text>
          ) : null}
        </Form.Group>
        {/* <br />
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Your Profile Pic👤</Form.Label>
          <Form.Control
            type="file"
            name="profileImage"
            onChange={(e) => {
              setFieldValue("profileImage", e?.currentTarget?.files[0]);
            }}
            onBlur={handleBlur}
            placeholder="Upload Your Profile"
          />
        </Form.Group> */}
        <br />

        <Button variant="primary" type="submit" className="w-100">
          Add Product
        </Button>
      </Form>
    </div>
  );
}

export default AddProduct;