// Implement Add Role Component
// Super Admin Can add multiple Roles
import { Container, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";

const AddRoles = () => {

    // Intial Values
    const intialValue = {
        role_id:"",
        role_name:""
    }

    const {handleBlur , handleChange , handleSubmit , values} = useFormik({
        initialValues:intialValue,
        onSubmit:async (values , action) => {
            console.log(values)
            action.resetForm();
        }
    })

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-50">
      <div className=" text-center text-dark">
        <h4>Add Roles For Our Ecommerce Store🛒 </h4>
      </div>
      <Form className="border rounded p-4" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="text-dark">Role_Id</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Role id"
            name="role_id"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.role_id}
          />
        </Form.Group>
        <br />

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Role Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Role Name"
            name="role_name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.role_name}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-3">
          Add Role
        </Button>
      </Form>
    </Container>
  );
};

export default AddRoles;
