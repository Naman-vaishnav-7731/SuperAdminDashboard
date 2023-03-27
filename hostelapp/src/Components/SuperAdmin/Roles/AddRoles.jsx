// Implement Add Role Component
// Super Admin Can add multiple Roles
import { Container, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "../../../api/axios";
import { ToastContainer, toast } from "react-toastify";
const URL = "/role/";

const AddRoles = () => {
  // Intial Values
  const intialValue = {
    Role_name: "", 
  };

  const { handleBlur, handleChange, handleSubmit, values } = useFormik({
    initialValues: intialValue,
    onSubmit: async (values, action) => {
      try {
        const response = await axios.post(URL, values, {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("Token")
            )}`,
          withCredentials:true
        }});
        if (response) {
          toast.success(response.data.message);
        }
        action.resetForm();
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-50 mt-5">
      <div className=" text-center text-dark">
        <h4>Add Roles | Ecommerce Store🛒 </h4>
      </div>
      <Form className="border rounded p-4" onSubmit={handleSubmit}>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Role Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Role Name"
            name="Role_name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.Role_name}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-3">
          Add Role
        </Button>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default AddRoles;
