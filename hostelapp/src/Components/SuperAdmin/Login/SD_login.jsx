import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { loginSchema } from "../../../Validations/SignInvalidations";

const AdminLogin = () => {
  // Initial Values
  const intialValue = {
    email: "",
    password: "",
  };

  // Implement Form Handling and Validations using formik
  const { handleBlur, handleChange, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues: intialValue,
      validationSchema:loginSchema,
      onSubmit: async (values, action) => {
        // Our logic here
        console.log(values);

        // for reset the form
        action.resetForm();
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
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
            {touched.email && errors.email ? (
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
    </Container>
  );
};

export default AdminLogin;
