import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { adminloginSchema } from "../../../Validations/adminLoginValidation";
import axios from "../../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Admin Login API Url
const adminLoginurl = "/admin/login";

const AdminLogin = () => {
  const navigate = useNavigate();
  // Initial Values
  const intialValue = {
    admin_email: "",
    password: "",
  };

  // Implement Form Handling and Validations using formik
  const { handleBlur, handleChange, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues: intialValue,
      validationSchema: adminloginSchema,
      onSubmit: async (values, action) => {
        try {
          const response = await axios.post(adminLoginurl, values, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });
          console.log(response);

          if (response) {
            Swal.fire({
              icon: "success",
              title: "Succesfully Login",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              navigate("dashboard");
            });
          }
          // Admin some details
          const AdminData = {
            admin_name: response?.data?.name,
            admin_email: response?.data?.email,
          };

          // Store Access Token
          const AccessToken = response?.data?.Token;

          localStorage.setItem("adminData", JSON.stringify(AdminData));
          localStorage.setItem("Token", JSON.stringify(AccessToken));

          action.resetForm();
        } catch (error) {
          console.log(error);
          // if Some errors is occurs
          if (error) {
            Swal.fire({
              icon: "error",
              title: 'Oops...',
              text: `${error.response.data.message}`,
              showConfirmButton: true,
            })
          }
        }
      },
    });

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="mb-5 text-center">
        <h4>Super Admin Login</h4>
        <p>Welcome back! Please login to your account.</p>
      </div>
      <Form className="border rounded p-4" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="admin_email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.admin_email}
          />
          {touched.admin_emai && errors.admin_emai ? (
            <Form.Text className="text-danger">{errors.email}</Form.Text>
          ) : null}
        </Form.Group>
        <br />

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {touched.password && errors.password ? (
            <Form.Text className="text-danger">{errors.password}</Form.Text>
          ) : null}
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-3">
          Login
        </Button>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default AdminLogin;
